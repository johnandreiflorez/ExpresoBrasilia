'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.create = create;
exports.getbyid = getbyid;
exports.destroy = destroy;
exports.upload = upload;
exports.downloadFile = downloadFile;
exports.deleteBlob = deleteBlob;
exports.deleteAllDocuments = deleteAllDocuments;
exports.synchronize = synchronize;
exports.viewImage = viewImage;
exports.getDocument = getDocument;
exports.FileVersions = FileVersions;
exports.FindDocumentUrl = FindDocumentUrl;
exports.FindViewDocumentUrl = FindViewDocumentUrl;
exports.EnsureExternalUserInGroup = EnsureExternalUserInGroup;
exports.updateFileVersion = updateFileVersion;
exports.uploadMetadata = uploadMetadata;
exports.ChangeState = ChangeState;
exports.AddWaterMark = AddWaterMark;
exports.checkAuth = checkAuth;
exports.LockTrackingFile = LockTrackingFile;
exports.DownloadFinalFile = DownloadFinalFile;

const ExcelJS = require('exceljs');
var _sqlConnector = require('../sqlConnector');
var _sqlConnector2 = _interopRequireDefault(_sqlConnector);
var _documents = require('./documents.model');
var _documents2 = _interopRequireDefault(_documents);
var _logger = require('../../config/logger');
var _logger2 = _interopRequireDefault(_logger);
global.globalThis = global;
const axios = require('axios');
const { BlobServiceClient } = require("@azure/storage-blob");
const { storageProvider, storageSettings } = require('../../config/appsettings');
const { async } = require('replace/bin/shared-options');
const AdmZip = require('adm-zip');
const xml2js = require('xml2js');

const { PDFDocument, rgb, degrees } = require('pdf-lib');

const crypto = require('crypto');
const JSZip = require("jszip");

const { DOMParser } = require('@xmldom/xmldom');
const Diff = require('diff');
const DiffMatchPatch = require('diff-match-patch');

let blobServiceClientInstance = null;
let lastCheckTime = 0;
const CHECK_INTERVAL_MS = 60000 * 5; // Verificar conexión solo 1 vez por cada 5 minutos
let containerStorage = storageSettings.ContainerName;
let sharepointTokenCache = null;
let sharepointTokenExpiresAt = 0;
let sharepointAuthPromise = null;

const getBlobClient = () => {
    if (!blobServiceClientInstance) {
        blobServiceClientInstance = BlobServiceClient.fromConnectionString(storageSettings.ConnectionString);
    }
    return blobServiceClientInstance;
};
const storagFuntions = {
    AzureBlobStorage: {
        auth: async () => {
            try {
                const client = getBlobClient();
                // Optimización: No llamar a Azure en cada request
                const now = Date.now();
                if (now - lastCheckTime < CHECK_INTERVAL_MS) {
                    // Asumimos que sigue bien si validamos hace poco
                    return { status: true, AuthorizationStorage: client };
                }

                // Solo validamos conexión real ocasionalmente
                const containerIterator = client.listContainers({ maxPageSize: 1 });
                await containerIterator.next();
                lastCheckTime = now;
                return { status: true, AuthorizationStorage: client };


            } catch (error) {
                console.error('AzureBlobStorage: Error de Autenticación o Conexión.', error.message);
                // Captura errores de credenciales, DNS, o red.
                return {
                    status: false,
                    errorMessage: "Fallo de conexión o autenticación con Azure Blob Storage.",
                    details: error.message
                };
            }
        },
        uploadFile: async (req, res) => {
            try {
                const { entityCode, fieldCode } = req.params;
                const { route, id } = req.query;

                if (!req.files || !req.files.length) {
                    return { failed: true, message: "No se enviaron archivos." };
                }

                if (!entityCode || !fieldCode) {
                    return { failed: true, message: "Parámetros incompletos." };
                }

                const containerName = changeName(containerStorage);
                const container = await createContainer(containerName);

                if (container.failed) {
                    return { failed: true, message: "Error creando contenedor." };
                }

                const ids = id ? id.split(",") : [];
                const sanitize = str => changeName(String(str).replace(/\.\./g, "").trim());

                const uploadPromises = req.files.map((file, index) => (async () => {

                    const cleanName = sanitize(file.originalname);

                    const fileName = storageSettings.ExcludeDateInName
                        ? cleanName
                        : `${getDateFormat(new Date().toISOString())};${cleanName}`;

                    const blobPath = route
                        ? `${sanitize(route)}/${fileName}`
                        : `${sanitize(entityCode)}/${sanitize(fieldCode)}/${fileName}`;

                    const blobClient = container.getBlockBlobClient(blobPath);

                    await blobClient.upload(file.buffer, file.buffer.length);

                    return {
                        Name: file.originalname,
                        Encoding: file.encoding,
                        MimeType: file.mimetype,
                        Size: file.size,
                        Link: blobPath,
                        Buffer: "",
                        State: ids[index] ? "Synchronized" : "Pending",
                        EntityCode: entityCode,
                        ...(ids[index] && { Id: ids[index] })
                    };
                })());

                const docs = await Promise.all(uploadPromises);

                // *** UNA SOLA RESPUESTA ***
                return {
                    success: true,
                    files: docs
                };

            } catch (err) {
                console.error("uploadFile ERROR →", err);

                // *** UNA SOLA RESPUESTA EN CATCH ***
                if (!res.headersSent) {
                    return {
                        failed: true,
                        message: err.message || "Error interno"
                    };
                }
                // Si ya se enviaron headers, solo logueo:
                console.error("⚠ No se pudo enviar error porque headers ya habían sido enviados");
            }
        },
        downloadFile: async (req, res) => {
            try {
                const { blobName } = req.params;
                const containerClient = blobServiceClientInstance.getContainerClient(changeName(containerStorage));
                const blobClient = containerClient.getBlobClient(blobName.split("%7C").join("/").split("|").join("/"));
                const blobResponse = await blobClient.download();
                const buffer = await streamToBuffer(blobResponse.readableStreamBody);
                const properties = await blobClient.getProperties();
                res.setHeader("Content-Disposition", `attachment; filename=${blobName.split(";")[1]}`);
                res.setHeader("Content-Type", properties.contentType);
                res.setHeader("Content-Length", properties.contentLength);
                return res.send(buffer.toString('base64'));
            } catch (err) {
                console.error("downloadFile ERROR →", err);
                return res.status(500).json({ message: "Error al descargar el archivo" });
            }
        },
        deleteFile: async (req, res) => {
            const { blobName } = req.params;
            const containerClient = blobServiceClientInstance.getContainerClient(changeName(containerStorage));
            let message = { success: [], error: [] };
            const blobClient = containerClient.getBlobClient(blobName.split("%7C").join("/").split("|").join("/"));
            try {
                await blobClient.delete();
                message.success.push(`Blob "${blobName}" eliminado exitosamente.`)
                if (!res) return true;
                res.status(200).json(message);
            } catch (error) {
                if (!res) return false;
                message.error.push(`Error al eliminar el blob "${blobName}": ${error.message}`);
                res.status(500).json(message);
            }
        },
        viewImage: async (req, res) => {
            try {
                const { blobName } = req.params;
                const containerClient = blobServiceClientInstance.getContainerClient(changeName(containerStorage));
                const blobClient = containerClient.getBlobClient(blobName.split("%7C").join("/").split("|").join("/"));
                const blobResponse = await blobClient.download();
                const buffer = await streamToBuffer(blobResponse.readableStreamBody);
                const properties = await blobClient.getProperties();
                res.setHeader("Content-Disposition", `inline; filename=${storageSettings.ExcludeDateInName ? blobName : blobName.split(";")[1]}`);
                res.setHeader("Content-Type", properties.contentType);
                res.setHeader("Content-Length", properties.contentLength);
                res.end(buffer);
            } catch (error) {
                res.status(500).send(error);
            }
        }
    },
    Sharepoint: {
        auth: async () => {
            const now = Date.now();

            // 1. Token aún válido (con margen de seguridad)
            if (sharepointTokenCache && now < sharepointTokenExpiresAt - 60000) {
                return {
                    status: true,
                    AuthorizationStorage: sharepointTokenCache
                };
            }

            // 2. Ya hay una petición de token en curso
            if (sharepointAuthPromise) {
                return sharepointAuthPromise;
            }

            // 3. Crear nueva petición (lock de concurrencia)
            sharepointAuthPromise = (async () => {
                try {
                    const FormData = require('form-data');
                    const data = new FormData();

                    data.append('grant_type', 'client_credentials');
                    data.append('client_id', storageSettings.ClientId);
                    data.append('scope', storageSettings.Scope);
                    data.append('client_secret', storageSettings.ClientSecret);

                    const response = await axios.post(
                        `https://login.microsoftonline.com/${storageSettings.TenantNameGraph}/oauth2/v2.0/token`,
                        data,
                        { headers: data.getHeaders() }
                    );

                    sharepointTokenCache = response.data.access_token;
                    sharepointTokenExpiresAt = now + response.data.expires_in * 1000;

                    return {
                        status: true,
                        AuthorizationStorage: sharepointTokenCache
                    };

                } catch (error) {
                    return {
                        status: false,
                        errorMessage: 'Error autenticando contra Microsoft Graph',
                        details: error.message
                    };
                } finally {
                    sharepointAuthPromise = null;
                }
            })();

            return sharepointAuthPromise;
        },
        uploadFile: async (req, res) => {
            try {
                let message = "Creado exitosamente";
                const { entityCode, fieldCode } = req.params;
                const { route, id } = req.query;
                const containerName = changeName(storageSettings.ContainerName);
                const arrayFiles = req.files;
                const URL_BASE = `https://graph.microsoft.com/v1.0/drives/${storageSettings.DriveId}/root:/${containerName}/`
                let config = {
                    method: 'put',
                    maxBodyLength: Infinity,
                    url: '',
                    headers: {
                        'Content-Type': 'image/png',
                        'Authorization': `Bearer ${req.body.AuthorizationStorage}`
                    },
                    data: ''
                };
                let docs = [];
                let index = 0;
                for (const file of arrayFiles) {
                    let fileNameOriginal = file.originalname;
                    if (!fileNameOriginal)
                        fileNameOriginal = file.Name;
                    const fileName = storageSettings.ExcludeDateInName ? `${changeName(fileNameOriginal)}` : `${getDateFormat(new Date().toISOString())};${changeName(fileNameOriginal)}`;
                    const blobName = route ? `${changeNameRoute(route)}/${fileName}` : `${changeName(entityCode)}/${changeName(fieldCode)}/${fileName}`;
                    const UrlFile = `${URL_BASE}${blobName}:`;
                    config.url = `${UrlFile}/content`;
                    config.headers['Content-Type'] = file.mimetype;
                    let modifiedBuffer = file.buffer;

                    if (storageSettings.ManageVersions) {
                        modifiedBuffer = await prepareDocumentForVersioning(file);
                    }

                    config.data = modifiedBuffer;

                    let responseService = await axios.request(config);

                    let doc = { FileId: responseService.data.id, Name: fileNameOriginal, Encoding: file.encoding, MimeType: file.mimetype, Size: file.size, Buffer: '', Link: blobName, State: 'Pending', EntityCode: entityCode };
                    if (id) {
                        doc.Id = id.split(',')[index];
                        doc.State = 'Synchronized';
                    }
                    const dataMetaData = req.body ? req.body : {};
                    const newBody = storageSettings.ParametersDocumentLibrary ? Object.keys(dataMetaData)
                        .filter(key => storageSettings.ParametersDocumentLibrary.some(currentColumn => currentColumn.value == key)) // Mantener solo las claves que estén en la lista ParametersDocumentLibrary
                        .reduce((acc, key) => {
                            acc[storageSettings.ParametersDocumentLibrary.find(currentColumn => currentColumn.value == key).column] = dataMetaData[key];
                            return acc;
                        }, {}) : {};
                    if (storageSettings.ManageVersions) {
                        try {
                            const result = await storagFuntions[storageProvider].uploadMetadata(newBody, req.body.AuthorizationStorage, UrlFile);
                            doc.MetaData = JSON.stringify(result);
                        } catch (err) {
                            doc.MetaData = {
                                failed: true,
                                message: err.message
                            };
                        }
                    }
                    if (storageSettings.SaveTemp) {
                        const fileNameTemp = `TEMP_${fileName}`;
                        const blobName = route ? `${changeNameRoute(route)}/${fileNameTemp}` : `${changeName(entityCode)}/${changeName(fieldCode)}/${fileNameTemp}`;
                        const UrlFile = `${URL_BASE}${blobName}:`;
                        config.url = `${UrlFile}/content`;
                        let responseServiceTemp = await axios.request(config);
                        doc.FileIdTemp = responseServiceTemp.data.id;
                        await storagFuntions[storageProvider].uploadMetadata(newBody, req.body.AuthorizationStorage, UrlFile);
                    }
                    index++;
                    docs.push(doc);
                }

                return { failed: false, files: docs };

            } catch (err) {
                return { failed: true, message: err.message };
            }
        },
        uploadMetadata: async (metadata, token, urlFile, useColon = false) => {
            let objRet = { failed: false };
            try {
                objRet.data = metadata;

                const url = `${urlFile}/listItem/fields`;
                objRet.Status = "Actualizar archivo";
                const config = {
                    method: "patch",
                    maxBodyLength: Infinity,
                    url: url,
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    data: metadata,
                };

                await axios.request(config);
                objRet.Status = "Archivo actualizado.";
            }
            catch (err) {
                objRet = Object.assign(objRet, { failed: true, message: err.message });
            }
            return objRet;
        },
        LockTrackingFile: async (req, res) => {
            let objRet = { failed: false };
            const { FileId, Lock, AuthorizationStorage } = req.body;
            try {

                const graphBaseUrl = `https://graph.microsoft.com/v1.0/drives/${storageSettings.DriveId}/items`;
                //Obtener archivo desfe FileId
                const URLTEMP = `${graphBaseUrl}/${FileId}/content`;
                try {
                    // 1. Obtener el archivo desde FileIdTemp
                    const fileTempResponse = await getFileArraySharepoint(URLTEMP, AuthorizationStorage);

                    const fileTempContent = fileTempResponse.data;

                    const mimeType = fileTempResponse.headers['content-type'];
                    console.log('MIME Type:', mimeType);

                    //Bloquear siempre el archivo principal.
                    let BufferPrincipalFile;
                    if (storageSettings.ManageVersions) {
                        if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                            if (Lock) {
                                BufferPrincipalFile = await lockTracking(fileTempContent, storageSettings.KeyBlockingTracking);
                            } else {
                                BufferPrincipalFile = await enableTrackRevision(fileTempContent);
                            }
                        } else {
                            BufferPrincipalFile = fileTempContent;
                        }
                    } else {
                        BufferPrincipalFile = fileTempContent;
                    }

                    // 2. Actualizar el archivo en FileId con el contenido de FileIdTemp
                    await axios.put(
                        `${graphBaseUrl}/${FileId}/content`,
                        BufferPrincipalFile,
                        {
                            headers: {
                                Authorization: `Bearer ${AuthorizationStorage}`,
                                "Content-Type": "application/octet-stream", // Tipo de contenido para archivos binarios
                            },
                        }
                    );
                } catch (error) {
                    if (error.response && error.response.status === 423)
                        throw new Error("El documento se encuentra bloqueado por uno o varios usuarios. Por favor, ciérrelo y vuelva a intentar en unos minutos.");
                    else
                        throw new Error(error.message);
                }
                console.log("Archivo actualizado");

                objRet.message = "Archivo actualizado exitosamente.";

                console.log("Nuevo archivo creado en la misma carpeta y propiedades actualizadas");

            }
            catch (err) {
                objRet = Object.assign(objRet, { failed: true, message: err.message });
            }
            return objRet;
        },
        getNextDeleteName: async (driveId, itemId, originalName, accessToken) => {
            const base = "DELETE#";
            const extension = originalName.substring(originalName.lastIndexOf("."));
            const nameWithoutExt = originalName.replace(extension, "");

            for (let i = 1; i < 999; i++) {
                const newName = `${base}${i}_${nameWithoutExt}${extension}`;

                try {
                    await axios.get(
                        `https://graph.microsoft.com/v1.0/drives/${driveId}/root:/${newName}`,
                        {
                            headers: { Authorization: `Bearer ${accessToken}` }
                        }
                    );
                    // Existe → intentar otro
                } catch {
                    return newName; // NO existe → usarlo
                }
            }

            return `${base}${Date.now()}_${nameWithoutExt}${extension}`;
        },
        updateFileVersion: async (req, res) => {
            console.log("Entro al metodo updateFileVersion")
            let objRet = { failed: false };
            const { FileId, FileIdTemp, LockTrackingFile, AuthorizationStorage, Attempt } = req.body;
            try {

                const graphBaseUrl = `https://graph.microsoft.com/v1.0/drives/${storageSettings.DriveId}/items`;
                console.log("URL BASE sharepoint", graphBaseUrl);
                const URLTEMP = `${graphBaseUrl}/${FileIdTemp}/content`;
                console.log("URL sharepoint", URLTEMP);
                // 1. Obtener el archivo desde FileIdTemp
                const fileTempResponse = await getFileArraySharepoint(URLTEMP, AuthorizationStorage);
                console.log("Obtuvo el array de archivos sharepoint", fileTempResponse);

                const fileTempContent = fileTempResponse.data;

                const mimeType = fileTempResponse.headers['content-type'];
                console.log('MIME Type:', mimeType);

                try {

                    // 3. Obtener la ruta del archivo temporal (FileIdTemp)
                    const fileTempMetadataResponse = await axios.get(
                        `${graphBaseUrl}/${FileIdTemp}`,
                        {
                            headers: {
                                Authorization: `Bearer ${AuthorizationStorage}`,
                            },
                        }
                    );
                    console.log("Encontro la ruta temporal", fileTempMetadataResponse)

                    let fileName = fileTempMetadataResponse.data.name; // Nombre del archivo
                    const parentFolderId = fileTempMetadataResponse.data.parentReference.id; // ID de la carpeta padre
                    const parentFolderPath = fileTempMetadataResponse.data.parentReference.path; // Ruta completa de la carpeta
                    const metadata = fileTempMetadataResponse.data;

                    console.log(parentFolderPath);


                    try {
                        // Hacer check-out primero
                        await axios.post(
                            `${graphBaseUrl}/${FileIdTemp}/checkout`,
                            {},
                            { headers: { Authorization: `Bearer ${AuthorizationStorage}` } }
                        );
                        console.log("Check-out realizado antes del check-in");

                        // Luego hacer check-in para liberar el lock
                        await axios.post(
                            `${graphBaseUrl}/${FileIdTemp}/checkin`,
                            { comment: "Liberar lock antes de eliminación" },
                            { headers: { Authorization: `Bearer ${AuthorizationStorage}` } }
                        );
                        console.log("Archivo desbloqueado con check-in");
                    } catch (checkErr) {
                        if (checkErr.response && checkErr.response.status === 400) {
                            console.error("El archivo no estaba check-out, se omite el check-in.");
                            if (err.response && err.response.status === 423 && Attempt && Attempt < 3) {
                                objRet = Object.assign(objRet, { failed: true, message: err.message });
                                return objRet;
                            }
                        } else {
                            console.error("Error inesperado al intentar check-in:", checkErr.message);
                        }
                    }
                    // 4. Eliminar el archivo FileIdTemp
                    let isDeleteSuccessfull = false;
                    try {
                        await axios.delete(
                            `${graphBaseUrl}/${FileIdTemp}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${AuthorizationStorage}`,
                                },
                            }
                        );
                        console.log("Archivo temporal eliminado");
                        isDeleteSuccessfull = true;
                    } catch (err) {
                        isDeleteSuccessfull = false;
                        if (err.response && err.response.status === 423 && Attempt && Attempt < 3) {
                            objRet = Object.assign(objRet, { failed: true, message: err.message });
                            return objRet;
                        }
                        console.error('Error al eliminar el documento: ', err.message);
                    }
                    // Renombrar
                    if (!isDeleteSuccessfull) {
                        let nameFileDelete = fileName;
                        try {
                            const deleteName = await storagFuntions[storageProvider].getNextDeleteName(storageSettings.DriveId, null, fileName, AuthorizationStorage);
                            await axios.patch(
                                `${graphBaseUrl}/${FileIdTemp}`,
                                { name: deleteName },
                                { headers: { Authorization: `Bearer ${AuthorizationStorage}` } }
                            );
                            nameFileDelete = deleteName;
                        } catch (err) {
                            console.error('Error al renombrar el documento: ', err.message);
                            console.error(err.response)
                            if (err.response && err.response.status === 423 && Attempt && Attempt < 3) {
                                objRet = Object.assign(objRet, { failed: true, message: err.message });
                                return objRet;
                            }
                        } finally {
                            try {
                                // Registrar la ruta para que el job lo elimine
                                const SQLConnector = require('../sqlConnector');
                                const baseUrlDeteleJob = parentFolderPath.split(`${changeName(storageSettings.ContainerName)}/`)[1];
                                const comand = `insert into Lappiz_AllDocuments (Id, [Buffer], [Name], Link, [State]) values(newid(), '', '${nameFileDelete}', '${baseUrlDeteleJob}/${nameFileDelete}', 'Pending')`;
                                const [data] = await SQLConnector.query(comand);
                            } catch (error) {
                                console.error("Error al insertar en allDocuments: ", error.message);
                            }
                        }
                    }

                    // 5. Crear un nuevo archivo en la misma ruta de FileIdTemp
                    const match = fileName.match(/TEMP(\d*)/); // Busca "TEMP" seguido de un número opcional

                    if (match) {
                        let num = match[1] ? parseInt(match[1]) + 1 : 1; // Si hay número, sumarle 1; si no, empezar en 1
                        fileName = fileName.replace(/TEMP\d*/, `TEMP${num}`);
                    }
                    console.log("Se creará documento con nombre " + fileName);

                    let BufferTempFile = fileTempContent;
                    if (storageSettings.ManageVersions) {
                        const documentType = getDocumentType(fileName, mimeType);
                        switch (documentType) {
                            case 'word':
                                if (LockTrackingFile) {
                                    BufferTempFile =
                                        await lockTracking(
                                            fileTempContent,
                                            storageSettings.KeyBlockingTracking
                                        );
                                }
                                else {
                                    BufferTempFile =
                                        await enableTrackRevision(
                                            fileTempContent
                                        );
                                }

                                break;
                            case 'excel':
                                BufferTempFile =
                                    await prepareExcelDocument(
                                        fileTempContent
                                    );
                                break;
                            default:
                                BufferTempFile =
                                    fileTempContent;
                        }
                    } else {
                        BufferTempFile = fileTempContent;
                    }

                    const newFileResponse = await axios.put(
                        `${graphBaseUrl}/${parentFolderId}:/${fileName}:/content`, // Subir en la misma carpeta
                        BufferTempFile,
                        {
                            headers: {
                                Authorization: `Bearer ${AuthorizationStorage}`,
                                "Content-Type": "application/octet-stream",
                            },
                        }
                    );

                    const NewFileIdTemp = newFileResponse.data.id; // Nuevo ID del archivo creado
                    objRet.NewFileIdTemp = NewFileIdTemp;
                    // 6. Actualizar propiedades del archivo nuevo (nombre y email)
                    const newBody = Object.keys(metadata)
                        .filter(key => storageSettings.ParametersDocumentLibrary.some(currentColumn => key == currentColumn.column)) // Mantener solo las claves que estén en la lista ParametersDocumentLibrary
                        .reduce((acc, key) => {
                            acc[key] = metadata[key];
                            return acc;
                        }, {});

                    try {
                        const result = await storagFuntions[storageProvider].uploadMetadata(newBody, AuthorizationStorage, `${graphBaseUrl}/${NewFileIdTemp}`);
                    } catch (err) {

                    }
                } catch (error) {
                    console.log(error);
                    if (error.response && error.response.status === 423)
                        throw new Error("El documento se encuentra bloqueado por uno o varios usuarios. Por favor, ciérrelo y vuelva a intentar en unos minutos.");
                    else
                        throw new Error(error.message);
                }
                //Bloquear siempre el archivo principal.
                let BufferPrincipalFile;
                if (storageSettings.ManageVersions) {
                    if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                        BufferPrincipalFile = await lockTracking(fileTempContent, storageSettings.KeyBlockingTracking);
                    } else {
                        BufferPrincipalFile = fileTempContent;
                    }
                } else {
                    BufferPrincipalFile = fileTempContent;
                }

                // 2. Actualizar el archivo en FileId con el contenido de FileIdTemp
                await axios.put(
                    `${graphBaseUrl}/${FileId}/content`,
                    BufferPrincipalFile,
                    {
                        headers: {
                            Authorization: `Bearer ${AuthorizationStorage}`,
                            "Content-Type": "application/octet-stream", // Tipo de contenido para archivos binarios
                        },
                    }
                );
                console.log("Archivo actualizado");

                objRet.message = "Archivo actualizado exitosamente.";


                console.log("Nuevo archivo creado en la misma carpeta y propiedades actualizadas");

            }
            catch (err) {
                objRet = Object.assign(objRet, { failed: true, message: err.message });
            }
            return objRet;
        },
        FindDocumentUrl: async (req, res) => {
            let objRet = { failed: false };
            const { FileId, AuthorizationStorage } = req.body;
            try {
                const Link = await createViewLinkForFile(FileId, AuthorizationStorage);
                objRet.Link = Link;
            }
            catch (err) {
                objRet = Object.assign(objRet, { failed: true, message: err.message });
            }
            return objRet;
        },
        FindViewDocumentUrl: async (req, res) => {
            let objRet = { failed: false };
            const { FileId, AuthorizationStorage } = req.body;
            try {
                const Link = await getDirectFileUrl(FileId, AuthorizationStorage);
                objRet.Link = Link;
            }
            catch (err) {
                objRet = Object.assign(objRet, { failed: true, message: err.message });
            }
            return objRet;
        },
        EnsureExternalUserInGroup: async (req, res) => {
            let objRet = { failed: false };
            const { Email, DisplayName, AuthorizationStorage, AuthorizationStorageSharepoint } = req.body;
            try {
                console.log(`Email: ${Email}`);

                // const execute = await CodeEnsureExternalUserInGroup(Email, DisplayName,AuthorizationStorageSharepoint, AuthorizationStorage);
                const execute = await CodeEnsureExternalUser(DisplayName, Email, AuthorizationStorage);
                console.log(execute);
                return execute;
            }
            catch (err) {
                objRet = Object.assign(objRet, { failed: true, message: err.message });
            }
            return objRet;
        },
        FileVersions: async (req, res) => {
            const { FileId, AuthorizationStorage } = req.body;
            const url = `https://graph.microsoft.com/v1.0/drives/${storageSettings.DriveId}/items/${FileId}/versions`;
            const viewLink = await createViewLinkForFile(FileId, AuthorizationStorage);
            let objReturn = { failed: false };
            objReturn.viewLink = viewLink;
            try {
                const response = await axios.get(url, {
                    headers: { Authorization: `Bearer ${AuthorizationStorage}` }
                });

                let versions = response.data.value;
                versions.pop(); // Se usa para eliminar la primer versión ya que se crean 2 versiones del archivo al crearse uno nuevo.
                const fileData = await GetFileById(FileId, sharepointTokenCache);
                const extension = fileData && fileData.file ? fileData.file.fileExtension : undefined;

                for (let i = 0; i < versions.length - 1; i++) {

                    const currentVersion = versions[i];
                    const previousVersion = versions[i + 1];
                
                    const currentVersionFile =
                        await axios.get(
                            currentVersion['@microsoft.graph.downloadUrl'],
                            { responseType: 'arraybuffer' }
                        );
                
                    const previousVersionFile =
                        await axios.get(
                            previousVersion['@microsoft.graph.downloadUrl'],
                            { responseType: 'arraybuffer' }
                        );
                
                    if (extension === '.xlsx') {
                
                        currentVersion.Resumen =
                            await compareExcelVersions(
                                previousVersionFile.data,
                                currentVersionFile.data
                            );
                
                    }
                    else if (extension === '.docx') {
                        currentVersion.Resumen =
                            await compareWordVersions(
                                previousVersionFile.data,
                                currentVersionFile.data
                            );
                
                    }
                }
                objReturn.data = versions;
            } catch (error) {
                objReturn.failed = true;
                objReturn.message = `Error al obtener cambios entre versiones: ${error.message}`;
            }

            return objReturn;
        },
        ChangeState: async (req, res) => {
            const { FileId, AuthorizationStorage } = req.body;
            const graphBaseUrl = `https://graph.microsoft.com/v1.0/drives/${storageSettings.DriveId}/items`;
            let objRet = { failed: false, NewFileId: null, NewFileIdTemp: null };

            try {
                // Obtener el archivo (byte array)
                const fileUrl = `${graphBaseUrl}/${FileId}/content`;
                const fileResponse = await getFileArraySharepoint(fileUrl, AuthorizationStorage);
                let fileContent = await removeAllCommentsFromDocx(fileResponse.data);
                fileContent = await enableTrackRevision(fileContent);

                // Obtener el nombre del archivo
                const metadataResponse = await axios.get(`${graphBaseUrl}/${FileId}`, {
                    headers: { Authorization: `Bearer ${AuthorizationStorage}` },
                });

                let fileNameOriginal = metadataResponse.data.name;

                if (fileNameOriginal.includes(";")) {
                    fileNameOriginal = fileNameOriginal.split(";").pop().trim();
                }
                const fileName = storageSettings.ExcludeDateInName ? `${changeName(fileNameOriginal)}` : `${getDateFormat(new Date().toISOString())};${changeName(fileNameOriginal)}`;
                const parentFolderId = metadataResponse.data.parentReference.id;

                const newFileName = `${fileName}`;
                const newFileResponse = await axios.put(
                    `${graphBaseUrl}/${parentFolderId}:/${newFileName}:/content`,
                    fileContent,
                    {
                        headers: {
                            Authorization: `Bearer ${AuthorizationStorage}`,
                            "Content-Type": "application/octet-stream",
                        },
                    }
                );
                objRet.NewFileId = newFileResponse.data.id;

                try {
                    const updateFileSecondVersionResponse = await axios.put(
                        `${graphBaseUrl}/${objRet.NewFileId}/content`,
                        fileContent,
                        {
                            headers: {
                                Authorization: `Bearer ${AuthorizationStorage}`,
                                "Content-Type": "application/octet-stream",
                            },
                        }
                    );
                } catch (err) {
                    console.log("Error al crear una versión del documento." + err.message);
                }

                // ** Guardar otra copia con TEMP_ y la fecha y hora en el nombre **
                const tempFileName = `TEMP_${fileName}`;
                const tempFileResponse = await axios.put(
                    `${graphBaseUrl}/${parentFolderId}:/${tempFileName}:/content`,
                    fileContent,
                    {
                        headers: {
                            Authorization: `Bearer ${AuthorizationStorage}`,
                            "Content-Type": "application/octet-stream",
                        },
                    }
                );
                objRet.NewFileIdTemp = tempFileResponse.data.id;

                const NewFileIdTemp = tempFileResponse.data.id; // Nuevo ID del archivo creado
                console.log(NewFileIdTemp);
                const newBody = { "Estado": "Para aprobar bot" };
                console.log(newBody);

                try {
                    const result = await storagFuntions[storageProvider].uploadMetadata(newBody, AuthorizationStorage, `${graphBaseUrl}/${NewFileIdTemp}`);
                    console.log(result);
                } catch (err) {
                    console.log("ocurrió un error al actualizar el estado: " + err);
                }

                objRet.message = "Archivos creados exitosamente.";
            } catch (err) {
                objRet = { failed: true, message: err.message };
            }

            return objRet;
        },
        AddWaterMark: async (req, res) => {
            const { FileId, AuthorizationStorage } = req.body;
            const graphBaseUrl = `https://graph.microsoft.com/v1.0/drives/${storageSettings.DriveId}/items`;
            try {
                // URLs para contenido y metadata
                const fileUrl = `${graphBaseUrl}/${FileId}/content?format=pdf`;
                const metadataUrl = `${graphBaseUrl}/${FileId}`;
                // Consultas paralelas
                const fileResponse = await getFileArraySharepoint(fileUrl, AuthorizationStorage);
                const metadata = await getFileMetadata(metadataUrl, AuthorizationStorage);
                const fileName = (metadata.name || 'documento.docx').replace(/\.[^/.]+$/, '.pdf');

                const mimeType = fileResponse.headers['content-type'];
                let fileBuffer = fileResponse.data;
                let base64Data = "";
                fileBuffer = await addWatermarkToPdf(fileBuffer);
                base64Data = fileBuffer.toString('base64');
                return res.json({
                    success: true,
                    fileName,
                    mimeType,
                    base64: base64Data
                });
            } catch (err) {
                // Log detallado solo en consola
                console.error('Error en AddWaterMark:', {
                    message: err.message,
                    stack: err.stack,
                    name: err.name
                });
                // Devolver solo el mensaje de error y un código de error
                return res.status(500).json({
                    failed: true,
                    message: err.message || 'Error interno al procesar el archivo.'
                });
            }
        },
        DownloadFinalFile: async (req, res) => {
            const { FileId, AuthorizationStorage } = req.body;
            const graphBaseUrl = `https://graph.microsoft.com/v1.0/drives/${storageSettings.DriveId}/items`;
            let arrData = [];

            try {
                const metadataUrl = `${graphBaseUrl}/${FileId}`;
                const metadata = await getFileMetadata(metadataUrl, AuthorizationStorage);

                // URLs para contenido y metadata
                const fileUrlPdf = `${graphBaseUrl}/${FileId}/content?format=pdf`;
                const fileResponsePdf = await getFileArraySharepoint(fileUrlPdf, AuthorizationStorage);
                const fileNamePdf = (metadata.name || 'documento.docx').replace(/\.[^/.]+$/, '.pdf');
                const mimeTypePdf = fileResponsePdf.headers['content-type'];
                const fileBufferPdf = fileResponsePdf.data;

                const base64Datapdf = fileBufferPdf.toString('base64');

                arrData.push({
                    success: true,
                    fileNamePdf,
                    mimeTypePdf,
                    base64: base64Datapdf
                });

                const fileUrl = `${graphBaseUrl}/${FileId}/content`;
                const fileResponse = await getFileArraySharepoint(fileUrl, AuthorizationStorage);
                const fileName = metadata.name || 'documento.docx';
                const mimeType = fileResponse.headers['content-type'];
                const fileBuffer = fileResponse.data;
                const base64Data = fileBuffer.toString('base64');

                arrData.push({
                    success: true,
                    fileName,
                    mimeType,
                    base64: base64Data
                });


                return res.json(arrData);

            } catch (err) {
                // Log detallado solo en consola
                console.error('Error en DownloadFinalFile:', {
                    message: err.message,
                    stack: err.stack,
                    name: err.name
                });

                // Devolver solo el mensaje de error y un código de error
                return res.status(500).json({
                    failed: true,
                    message: err.message || 'Error interno al procesar el archivo.'
                });
            }
        },
        downloadFile: async (req, res) => {
            const { blobName } = req.params;
            const blobNameFolder = blobName.split("%7C").join("/").split("|").join("/");

            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `https://graph.microsoft.com/v1.0/Drives/${storageSettings.DriveId}/items/root:/${changeName(storageSettings.ContainerName)}/${blobNameFolder}`,
                headers: {
                    'Authorization': `Bearer ${req.body.AuthorizationStorage}`
                }
            };

            let response = await axios.request(config);
            return res.status(200).json({ url: response.data["@microsoft.graph.downloadUrl"] })
        },
        deleteFile: async (req, res) => {
            const { blobName } = req.params;
            console.log(blobName);
            const blobNameFolder = blobName.split("%7C").join("/").split("|").join("/");
            const ContainerName = changeName(storageSettings.ContainerName);
            let message = { success: [], error: [] };
            console.log(req.body.AuthorizationStorage);
            let config = {
                method: 'delete',
                maxBodyLength: Infinity,
                url: `https://graph.microsoft.com/v1.0/Drives/${storageSettings.DriveId}/items/root:/${ContainerName}/${blobNameFolder}`,
                headers: {
                    'Authorization': `Bearer ${req.body.AuthorizationStorage}`
                }
            };
            try {
                let response = await axios.request(config);
                if (!res) return true;
                message.success.push(`Blob "${blobNameFolder}" eliminado exitosamente.`)

                return res.status(200).json(message);
            } catch (error) {
                if (!res) return false;
                message.error.push(`Error al eliminar el blob "${blobName}": ${error.message}`);
                return res.status(500).json(message);
            }
        },
        viewImage: async (req, res) => {
            try {
                const { blobName } = req.params;
                const blobNameFolder = blobName.split("%7C").join("/").split("|").join("/");
                const responseAuth = await storagFuntions[storageProvider].auth();
                if (!responseAuth.status && responseAuth.errorMessage)
                    return res.status(400).send(responseAuth);
                const AuthorizationStorage = responseAuth.AuthorizationStorage
                let config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: `https://graph.microsoft.com/v1.0/Drives/${storageSettings.DriveId}/items/root:/${changeName(storageSettings.ContainerName)}/${blobNameFolder}`,
                    headers: {
                        'Authorization': `Bearer ${AuthorizationStorage}`
                    }
                };

                let response = await axios.request(config);
                let config2 = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: response.data["@microsoft.graph.downloadUrl"],
                    responseType: 'arraybuffer'
                };
                let responseFinally = await axios.request(config2);
                console.log(responseFinally);
                const contentType = responseFinally.headers['content-type'] || 'application/octet-stream';

                res.setHeader("Content-Disposition", `inline; filename=${storageSettings.ExcludeDateInName ? blobName : blobName.split(";")[1]}`);
                res.setHeader("Content-Type", contentType);
                res.setHeader("Content-Length", response.data.size);
                res.end(responseFinally.data);
            } catch (error) {
                res.status(500).send(error)
            }
        }
    }
}
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function (entity) {
        if (entity) {
            var docs = [];
            for (var key in entity) {
                if (entity.hasOwnProperty(key)) {
                    var element = entity[key];
                    docs.push({
                        Id: element.Id,
                        Name: element.Name,
                        MimeType: element.MimeType,
                        Size: element.Size,
                        Encoding: element.Encoding,
                        Created_date: element.Created_date,
                        Link: element.Link,
                        EntityCode: element.EntityCode,
                        State: element.State
                    });
                }
            }
            return res.status(statusCode).json(docs);
        }
        return null;
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
        _logger2.default.error(err);
        res.status(statusCode).send(err);
    };
}

//#region BD
function create(req, res) {
    console.log('Insertando documento....');
    return _sqlConnector2.default.transaction(function (t) {
        var docs = [];
        const { id } = req.query;
        let ids = ''
        if (id) {
            ids = id.split(',');
        }
        let i = 0;
        for (var key in req.files) {
            if (!req.files.hasOwnProperty(key)) continue;
            var body = req.files[key];
            var doc = {
                Id: ids[i],
                Name: body.originalname,
                Encoding: body.encoding,
                MimeType: body.mimetype,
                State: 'Synchronized',
                Size: body.size,
                Buffer: body.buffer.toString('base64')
            };
            i++;
            console.log(doc);
            docs.push(doc);
        }
        return _documents2.default.bulkCreate(docs, { transaction: t }).then(respondWithResult(res, 201)).catch(handleError(res));
    }).then(function (result) {
        // Transaction has been committed
        // result is whatever the result of the promise chain returned to the transaction callback
    }).catch(handleError(res));
}

function getbyid(req, res) {

    return _documents2.default.findOne({ where: { Id: req.params.id.split('.')[0] } }).then(function (data) {
        res.writeHead(200, {
            'Content-Type': data.MimeType,
            'Content-disposition': 'attachment;filename= ' + data.Name,
            'Content-Length': data.Size
        });
        res.end(new Buffer(data.Buffer, 'base64'));
    });
}

function destroy(req, res) {
    return _documents2.default.destroy({
        force: true,
        where: {
            Id: req.params.id
        }
    }).then(respondWithResult(res)).catch(handleError(res));
}
//#endregion

async function createContainer(containerName) {
    try {
        let container = await blobServiceClientInstance.getContainerClient(containerName);
        if (!await container.exists())
            await container.createIfNotExists();
        else
            console.log("Ya existe el contenedor")
        return container;
    } catch (err) {
        return { message: `requestId - ${err.request.requestId}, statusCode - ${err.statusCode}, errorCode - ${err.details.errorCode}\n`, failed: true }
    }
}

async function streamToBuffer(readableStream) {
    try {
        return new Promise((resolve, reject) => {
            const chunks = [];
            readableStream.on('data', (data) => {
                chunks.push(data instanceof Buffer ? data : Buffer.from(data));
            });
            readableStream.on('end', () => {
                resolve(Buffer.concat(chunks));
            });
            readableStream.on('error', reject);
        });
    } catch (e) {
        console.log(e)
    }
}

function getDateFormat(date) {
    let charts = ['T', ':', '.', '-', 'Z']
    charts.forEach(chart => {
        date = date.split(chart).join('');
    })
    return date;
}

function accentRemover(name) {
    if (!name) return '';
    // Remover acentos
    name = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Remover caracteres especiales excepto '.', '-', '_', y '/'
    name = name.replace(/[^a-zA-Z0-9\s._\-\/]/g, "")
        .replace(/[ñÑ]/g, "n")
        .replace(/[áÁ]/g, "a")
        .replace(/[éÉ]/g, "e")
        .replace(/[íÍ]/g, "i")
        .replace(/[óÓ]/g, "o")
        .replace(/[úÚüÜ]/g, "u");
    return name;
}

function changeName(name) {
    return accentRemover(name).toLowerCase().split('_').join('-').split('/').join('-');
}
function changeNameRoute(name) {
    return accentRemover(name).toLowerCase().split('_').join('-');
}

//#region PROVIDERS

async function upload(req, res) {

    return _sqlConnector2.default.transaction(async function (t) {
        const responseAuth = await storagFuntions[storageProvider].auth();
        if (!responseAuth.status && responseAuth.errorMessage)
            return res.status(400).send(responseAuth);
        req.body.AuthorizationStorage = responseAuth.AuthorizationStorage
        const DOCS = await storagFuntions[storageProvider].uploadFile(req, res);
        console.log(DOCS);
        if (DOCS.failed) handleError(res)
        return _documents2.default.bulkCreate(DOCS.files, { transaction: t }).then(respondWithResult(res, 201)).catch(handleError(res));
    }).then(function (result) {
        // Transaction has been committed
        // result is whatever the result of the promise chain returned to the transaction callback
    }).catch(handleError(res));
}

async function downloadFile(req, res) {
    try {
        const responseAuth = await storagFuntions[storageProvider].auth();
        if (!responseAuth.status && responseAuth.errorMessage)
            return res.status(400).send(responseAuth);
        req.body.AuthorizationStorage = responseAuth.AuthorizationStorage
        await storagFuntions[storageProvider].downloadFile(req, res);
    } catch (error) {
        console.error("Error al descargar el archivo:", error.message);
        return res.status(500).json({ message: "Error al descargar el archivo" });
    }
}

async function deleteBlob(req, res) {
    try {
        const responseAuth = await storagFuntions[storageProvider].auth();
        if (!responseAuth.status && responseAuth.errorMessage)
            return res.status(400).send(responseAuth);
        req.body.AuthorizationStorage = responseAuth.AuthorizationStorage
        await storagFuntions[storageProvider].deleteFile(req, res);
    } catch (e) {
        res.status(500).json({ message: 'No se pudo eliminar ningún documento', error: e.message })
    }
}

async function viewImage(req, res) {
    try {
        await storagFuntions[storageProvider].viewImage(req, res);
    } catch (error) {
        console.error("Error al obtener el archivo:", error.message);
        return res.status(500).json({ message: "Error al obtener el archivo" });
    }
}
//#endregion
//#region RELATIONSHIP
async function deleteAllDocuments() {
    if (storageProvider) {
        let req = { body: {}, params: { blobName: '' } };
        let ids = []
        try {
            const SQLConnector = require('../sqlConnector');
            const comand = "SELECT TOP 100 Id, Link FROM Lappiz_AllDocuments WHERE  [State] = 'Pending' AND [Created_date] <  dateadd(day,-1,GETDATE())";
            const [data] = await SQLConnector.query(comand);
            console.log(data);
            const responseAuth = await storagFuntions[storageProvider].auth();
            if (!responseAuth.status && responseAuth.errorMessage)
                return;
            req.body.AuthorizationStorage = responseAuth.AuthorizationStorage
            for (let i = 0; i < data.length; i++) {
                console.log(data[i]);
                req.params.blobName = data[i].Link;
                let deleted = await storagFuntions[storageProvider].deleteFile(req, null);
                if (deleted) {
                    ids.push(data[i].Id);
                }
            }

            const affectedRows = await _documents2.default.destroy({ where: { Id: ids } })
            console.log(`Se eliminarón ${affectedRows} registros`);
        } catch (error) {
            console.error('Error al eliminar registros:', error);
        };
    }
}

async function synchronize(obj, res) {
    const IDS = obj.body.ids;
    try {
        const affectedRows = await _documents2.default.update({ State: 'Synchronized' }, { where: { Id: IDS } });
        console.log(affectedRows);
        let message = `Se actualizarón ${affectedRows} registros`;
        res.status(200).json({ message });
    } catch (error) {
        res.status(500).json(error);
    }
}

async function getDocument(req, res) {
    const { id } = req.params;
    return _documents2.default.findOne({ where: { Id: id } }).then(function (data) {
        if (res)
            res.status(200).send(data);
        else
            return data;
    }).catch(error => {
        return res.status(500).send(error);
    });
}

async function uploadMetadata(req, res) {
    if (storageProvider) {
        const URL_BASE = `https://graph.microsoft.com/v1.0/drives/${storageSettings.DriveId}/root:/${containerName}/`
        const metaData = req.body;
        const responseAuth = await storagFuntions[storageProvider].auth();
        if (!responseAuth.status && responseAuth.errorMessage)
            return res.status(400).send(responseAuth);
        const token = responseAuth.AuthorizationStorage
        const document = await getDocument(req, null);
        const UrlFile = `${URL_BASE}${document.Link}:`;
        const result = await storagFuntions[storageProvider].uploadMetadata(metaData, token, UrlFile);
        if (result.failed) {
            return res.status(500).send(result.message)
        }
        return res.status(200).send(result);
    }
}

function generatePasswordHash(password) {
    const salt = crypto.randomBytes(16).toString('base64');

    // Iteraciones y longitud del hash según la especificación de Word
    const iterations = 100000;
    const hashLength = 32; // 32 bytes (256 bits)

    // Crear el hash usando PBKDF2 con SHA-512 (usado por Word)
    const hash = crypto
        .pbkdf2Sync(password, Buffer.from(salt, 'base64'), iterations, hashLength, 'sha512')
        .toString('base64');

    // Retornar el hash y el salt
    return { hash, salt };
}

async function lockTracking(docPath, password) {
    try {
        const zip = new AdmZip(docPath);
        const settingsPath = 'word/settings.xml';

        // Leer settings.xml
        const settingsEntry = zip.getEntry(settingsPath);
        if (!settingsEntry) {
            throw new Error('No se encontró settings.xml en el documento.');
        }
        const settingsContent = settingsEntry.getData().toString('utf8');

        // Parsear el contenido XML
        const parser = new xml2js.Parser();
        const builder = new xml2js.Builder();
        const settingsXml = await parser.parseStringPromise(settingsContent);

        // Habilitar control de cambios
        if (!settingsXml['w:settings']['w:trackRevisions']) {
            settingsXml['w:settings']['w:trackRevisions'] = [{}]; // Añadir el elemento si no existe
        }

        // Generar hash y sal de la contraseña
        const { hash, salt } = generatePasswordHash(password);

        // Agregar o modificar <w:documentProtection>
        if (!settingsXml['w:settings']['w:documentProtection']) {
            settingsXml['w:settings']['w:documentProtection'] = [{}];
        }
        settingsXml['w:settings']['w:documentProtection'][0] = {
            $: {
                'w:edit': 'trackedChanges',
                'w:enforcement': '1',
                'w:cryptProviderType': 'rsaAES',
                'w:cryptAlgorithmClass': 'hash',
                'w:cryptAlgorithmType': 'typeAny',
                'w:cryptAlgorithmSid': '14',
                'w:cryptSpinCount': '100000',
                'w:hash': hash,
                'w:salt': salt,
            },
        };

        // Serializar el XML actualizado
        const updatedSettingsContent = builder.buildObject(settingsXml);

        // Reemplazar settings.xml en el archivo DOCX
        zip.updateFile(settingsPath, Buffer.from(updatedSettingsContent, 'utf8'));

        // Devolver el contenido actualizado como un buffer
        return zip.toBuffer();
    } catch (error) {
        console.error('Error al bloquear el seguimiento:', error.message);
    }
}
async function enableTrackRevision(_buffer) {
    try {
        const zip = new AdmZip(_buffer);
        const settingsPath = 'word/settings.xml';
        // Leer settings.xml
        const settingsEntry = zip.getEntry(settingsPath);
        if (!settingsEntry) {
            throw new Error('No se encontr  settings.xml en el documento.');
        }
        const settingsContent = settingsEntry.getData().toString('utf8');
        // Parsear el contenido XML
        const parser = new xml2js.Parser();
        const builder = new xml2js.Builder();
        const settingsXml = await parser.parseStringPromise(settingsContent);
        // Habilitar control de cambios
        if (!settingsXml['w:settings']['w:trackRevisions']) {
            settingsXml['w:settings']['w:trackRevisions'] = [{}]; // A adir el elemento si no existe
        }
        // Agregar o modificar <w:documentProtection>
        // if (!settingsXml['w:settings']['w:documentProtection']) {
        settingsXml['w:settings']['w:documentProtection'] = [{}];
        // }
        // Serializar el XML actualizado
        const updatedSettingsContent = builder.buildObject(settingsXml);
        // Reemplazar settings.xml en el archivo DOCX
        zip.updateFile(settingsPath, Buffer.from(updatedSettingsContent, 'utf8'));
        // Devolver el contenido actualizado como un buffer
        return zip.toBuffer();
    } catch (error) {
        console.error('Error al bloquear el seguimiento:', error.message);
    }
}
async function extractComments(buffer) {
    const zip = new JSZip();
    await zip.loadAsync(buffer); // Cargar el contenido del buffer como un archivo ZIP

    const commentsFile = zip.file("word/comments.xml");
    const documentFile = zip.file("word/document.xml");

    if (!commentsFile || !documentFile) {
        return []; // No hay comentarios o el archivo no es válido
    }

    const commentsContent = await commentsFile.async("string");
    const documentContent = await documentFile.async("string");

    const parser = new xml2js.Parser();
    const commentsData = await parser.parseStringPromise(commentsContent);
    const documentData = await parser.parseStringPromise(documentContent);

    const comments = commentsData["w:comments"] ? commentsData["w:comments"]["w:comment"] || [] : [];
    const bodyContent = documentData["w:document"] ? documentData["w:document"]["w:body"][0] : null;

    if (!bodyContent) return [];

    const results = [];
    let currentPage = 1;
    let page = 0;

    // Mapeo de comentarios y respuestas
    const commentMap = new Map();
    comments.forEach((comment) => {
        const commentId = comment["$"]["w:id"];
        const parentId = comment["$"]["w:parentId"];

        if (parentId) {
            if (!commentMap.has(parentId)) {
                commentMap.set(parentId, { main: null, replies: [] });
            }
            commentMap.get(parentId).replies.push(comment);
        } else {
            if (!commentMap.has(commentId)) {
                commentMap.set(commentId, { main: null, replies: [] });
            }
            commentMap.get(commentId).main = comment;
        }
    });

    function searchForComments(node, path = []) {
        if (node["w:br"] && node["w:br"].some((br) => br["$"] && br["$"]["w:type"] === "page")) {
            currentPage++;
        }

        if (node["w:lastRenderedPageBreak"]) {
            if (page < 7) {
                page++;
                currentPage++;
            } else {
                page = 0;
            }
        }

        if (node["w:commentRangeStart"]) {
            node["w:commentRangeStart"].forEach((commentNode) => {
                const commentId = commentNode["$"]["w:id"];
                if (commentMap.has(commentId)) {
                    const { main, replies } = commentMap.get(commentId);

                    if (main) {
                        agregarComentario(main, commentId, false, node);
                    }

                    replies.forEach((reply) => {
                        agregarComentario(reply, commentId, true, node);
                    });
                }
            });
        }

        Object.keys(node).forEach((key) => {
            if (Array.isArray(node[key])) {
                node[key].forEach((childNode, index) => {
                    searchForComments(childNode, [...path, `${key}[${index}]`]);
                });
            }
        });
    }

    function agregarComentario(comment, parentId, isReply, node) {
        let commentTextNodes = [];
        if (Array.isArray(comment["w:p"])) {
            commentTextNodes = comment["w:p"].reduce((acc, p) => {
                if (Array.isArray(p["w:r"])) {
                    const texts = p["w:r"].map((r) => {
                        if (r["w:t"] && typeof r["w:t"][0] === "string") {
                            return r["w:t"].join("");
                        } else if (r["w:t"] && typeof r["w:t"][0] === "object") {
                            return r["w:t"][0]["_"] || "";
                        }
                        return null;
                    }).filter(Boolean);
                    return acc.concat(texts);
                }
                return acc;
            }, []);
        }

        const fullCommentText = commentTextNodes.join("");

        const parasId = comment["w:p"]
            ? comment["w:p"].map((p) => (p["$"] ? p["$"]["w14:paraId"] : null))
            : [];
        const paraId = parasId[0];
        const paraIdLast = parasId[parasId.length - 1];

        let textNodes =
            (node["w:r"] &&
                node["w:r"].map((r) => (r["w:t"] && r["w:t"][0] ? r["w:t"][0] : null)).filter(Boolean)) ||
            [];
        let fullTextParagraph = textNodes
            .map((textNode, index) => {
                let text = "";
                if (typeof textNode === "string") {
                    text = textNode;
                } else if (typeof textNode === "object") {
                    text = textNode["_"] || "";
                } else {
                    text = "";
                }
                return index === 0
                    ? text
                    : text.startsWith(" ") || text.startsWith(".") || text.startsWith(",")
                        ? text
                        : " " + text;
            })
            .join("")
            .trim();

        if (fullTextParagraph === "") {
            fullTextParagraph = "El comentario se encuentra en una ubicación que no fue posible detectar.";
        }

        results.push({
            id: paraId || comment["$"]["w:id"],
            lastId: paraIdLast || comment["$"]["w:id"],
            parentId: isReply ? parentId : null,
            author: comment["$"]["w:author"],
            date: comment["$"]["w:date"],
            text: fullCommentText,
            paragraphText: fullTextParagraph,
            page: currentPage,
        });
    }

    searchForComments(bodyContent);
    return results;
}

// Función para extraer el texto del documento
async function extractText(buffer) {
    try {
        const zip = new AdmZip(buffer);
        const documentXml = zip.getEntry('word/document.xml');
        if (!documentXml) return '';

        let content = documentXml.getData().toString('utf-8');

        // Elimina cualquier cosa antes del primer '<'
        const firstTagIndex = content.indexOf('<');
        if (firstTagIndex > 0) {
            content = content.slice(firstTagIndex);
        }

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(content, 'text/xml');

        const texts = xmlDoc.getElementsByTagName('w:t');
        let fullText = '';

        for (let i = 0; i < texts.length; i++) {
            fullText += texts[i].textContent;
        }

        return fullText;
    } catch (error) {
        console.error('Error al extraer texto del documento Word:', error.message);
        return '';
    }
}

function getCleanTextDiff(oldText, newText) {
    const dmp = new DiffMatchPatch();

    let diffs = dmp.diff_main(oldText, newText);

    // Limpieza semántica (CRÍTICO)
    dmp.diff_cleanupSemantic(diffs);

    let addedText = '';
    let removedText = '';

    for (const diff of diffs) {
        const operation = diff[0];
        const text = diff[1];

        if (operation === 1) {
            addedText += text;
        } else if (operation === -1) {
            removedText += text;
        }
    }

    return {
        addedText: addedText.trim(),
        removedText: removedText.trim()
    };
}

function getImagesFromDocx(buffer) {
    const imageNames = [];
    try {
        const zip = new AdmZip(buffer);
        const imageMap = getImageMap(zip);
        const documentXml = zip.getEntry('word/document.xml');
        if (!documentXml) return [];

        let xml = documentXml.getData().toString('utf-8');
        const firstTagIndex = xml.indexOf('<');
        if (firstTagIndex > 0) xml = xml.slice(firstTagIndex);

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xml, 'text/xml');

        const blips = xmlDoc.getElementsByTagName('a:blip');

        for (let i = 0; i < blips.length; i++) {
            const embedId = blips[i].getAttribute('r:embed');
            if (embedId && imageMap[embedId]) {
                imageNames.push(imageMap[embedId]);
            }
        }
    }
    catch (err) {
        console.log("Error al obtener las imagenes del documento: " - err)
    }
    return imageNames; // ['image1.png', 'firma.png']
}

function getImageMap(zip) {
    const relsXml = zip.getEntry('word/_rels/document.xml.rels');
    if (!relsXml) return {};

    let content = relsXml.getData().toString('utf-8');
    const firstTagIndex = content.indexOf('<');
    if (firstTagIndex > 0) content = content.slice(firstTagIndex);

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(content, 'text/xml');

    const relationships = xmlDoc.getElementsByTagName('Relationship');
    const map = {};

    for (let i = 0; i < relationships.length; i++) {
        const rel = relationships[i];
        const id = rel.getAttribute('Id');
        const target = rel.getAttribute('Target');
        if (target && target.startsWith('media/')) {
            map[id] = target.replace('media/', '');
        }
    }

    return map; // { rId4: 'image1.png', rId5: 'image2.jpeg' }
}

// Función para comparar comentarios entre dos versiones
function compareComments(prevComments, currentComments) {
    const currentIds = new Set(currentComments.map(comment => comment.id));
    const othercurrentIds = new Set(currentComments.map(comment => comment.lastId));
    const allCurrentIds = new Set([...currentIds, ...othercurrentIds]);
    // const added = currentComments.filter(comment => !prevIds.has(parseInt(comment.id)));
    const removed = prevComments.filter(comment => !allCurrentIds.has(comment.id));

    return { removed };
}

async function FileVersions(req, res) {
    const responseAuth = await storagFuntions[storageProvider].auth();
    if (!responseAuth.status && responseAuth.errorMessage)
        return res.status(400).send(responseAuth);
    req.body.AuthorizationStorage = responseAuth.AuthorizationStorage
    const DOCS = await storagFuntions[storageProvider].FileVersions(req, res);
    res.status(200).send(DOCS)
}
async function ChangeState(req, res) {
    const responseAuth = await storagFuntions[storageProvider].auth();
    if (!responseAuth.status && responseAuth.errorMessage)
        return res.status(400).send(responseAuth);
    req.body.AuthorizationStorage = responseAuth.AuthorizationStorage
    const DOCS = await storagFuntions[storageProvider].ChangeState(req, res);
    res.status(200).send(DOCS)
}
async function LockTrackingFile(req, res) {
    const responseAuth = await storagFuntions[storageProvider].auth();
    if (!responseAuth.status && responseAuth.errorMessage)
        return res.status(400).send(responseAuth);
    req.body.AuthorizationStorage = responseAuth.AuthorizationStorage
    const DOCS = await storagFuntions[storageProvider].LockTrackingFile(req, res);
    res.status(200).send(DOCS)
}
async function updateFileVersion(req, res) {
    const responseAuth = await storagFuntions[storageProvider].auth();
    if (!responseAuth.status && responseAuth.errorMessage)
        return res.status(400).send(responseAuth);
    req.body.AuthorizationStorage = responseAuth.AuthorizationStorage
    const DOCS = await storagFuntions[storageProvider].updateFileVersion(req, res);
    res.status(200).send(DOCS)
}

async function FindDocumentUrl(req, res) {
    const responseAuth = await storagFuntions[storageProvider].auth();
    if (!responseAuth.status && responseAuth.errorMessage)
        return res.status(400).send(responseAuth);
    req.body.AuthorizationStorage = responseAuth.AuthorizationStorage
    const DOCS = await storagFuntions[storageProvider].FindDocumentUrl(req, res);
    res.status(200).send(DOCS)
}
async function FindViewDocumentUrl(req, res) {
    const responseAuth = await storagFuntions[storageProvider].auth();
    if (!responseAuth.status && responseAuth.errorMessage)
        return res.status(400).send(responseAuth);
    req.body.AuthorizationStorage = responseAuth.AuthorizationStorage
    const DOCS = await storagFuntions[storageProvider].FindViewDocumentUrl(req, res);
    res.status(200).send(DOCS)
}

async function EnsureExternalUserInGroup(req, res) {
    const responseAuth = await storagFuntions[storageProvider].auth();
    if (!responseAuth.status && responseAuth.errorMessage)
        return res.status(400).send(responseAuth);
    req.body.AuthorizationStorage = responseAuth.AuthorizationStorage
    const DOCS = await storagFuntions[storageProvider].EnsureExternalUserInGroup(req, res);
    res.status(200).send(DOCS)
}
/**
 * Crea un enlace de visualización para el archivo más reciente (no una versión específica).
 * @param {string} itemId - ID del archivo.
 * @param {string} accessToken - Token de acceso para Microsoft Graph.
 * @returns {Promise<string>} - Devuelve el enlace de visualización.
 */
async function createViewLinkForFile(itemId, accessToken) {
    try {
        const url = `https://graph.microsoft.com/v1.0/drives/${storageSettings.DriveId}/items/${itemId}/createLink`;

        const response = await axios.post(
            url,
            {
                type: "view", // Esto genera un enlace de solo visualización
                scope: "users", // Especifica si el enlace es para la organización o para usuarios externos
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        // Obtener el enlace de visualización generado
        const viewLink = response.data.link.webUrl;
        return viewLink;
    } catch (error) {
        return "Error creando el enlace de visualización para el archivo:", JSON.stringify(error.response.data || error.message);
    }
}

/**
 * Crea un enlace de visualizaci n para el archivo m s reciente (no una versi n espec fica).
 * @param {string} itemId - ID del archivo.
 * @param {string} accessToken - Token de acceso para Microsoft Graph.
 * @returns {Promise<string>} - Devuelve el enlace de visualizaci n.
 */
async function getDirectFileUrl(itemId, accessToken) {
    try {
        const url = `https://graph.microsoft.com/v1.0/drives/${storageSettings.DriveId}/items/${itemId}`;

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const directUrl = response.data["@microsoft.graph.downloadUrl"]; // URL directa del archivo

        return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(directUrl)}`;

    } catch (error) {
        return `Error obteniendo URL directa: ${JSON.stringify(error.response.data || error.message)}`;
    }
}


async function getSiteId(token) {
    try {
        const res = await axios.get(
            `https://graph.microsoft.com/v1.0/sites/${storageSettings.TenantNameSharepoint}.sharepoint.com:/sites/${storageSettings.SiteName}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );

        return res.data.id;

    } catch (err) {
        const graph = err.response.data.error;
        throw new Error(`getSiteId failed (${graph.code}): ${graph.message}`);
    }
}
async function getListIdByName(siteId, listName, token) {
    try {
        const url = `https://graph.microsoft.com/v1.0/sites/${siteId}/lists?$filter=displayName eq '${listName}'`;
        const res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!res.data.value || res.data.value.length === 0) {
            throw new Error(`List '${listName}' not found`);
        }

        return res.data.value[0].id;

    } catch (err) {
        const graph = err.response.data.error;
        throw new Error(`getSiteId failed (${graph.code}): ${graph.message}`);
    }
}


/**
 * Añadir usuario al grupo de ExternalUsers
 * @param {string} fullName - Nombre del usuario
 * @param {string} email - Correo del usuario externo
 * @param {string} token - Token válido de Graph con permisos adecuados
 */
async function CodeEnsureExternalUser(fullName, email, token) {
    let objRet = { failed: false };
    const SiteId = await getSiteId(token);
    console.log("SiteId");
    console.log(SiteId);
    const ExternalUserListId = await getListIdByName(SiteId, "EnsureExternalUser", token);
    console.log("ExternalUserListId");
    console.log(ExternalUserListId);
    const url = `https://graph.microsoft.com/v1.0/sites/${SiteId}/lists/${ExternalUserListId}/items`;

    try {
        const payload = {
            fields: {
                Title: fullName,
                FullName: fullName,
                Email: email
            }
        };

        await axios.post(url, payload, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        objRet.status = "User registered";

    } catch (err) {
        objRet = {
            failed: true,
            message: err.response.data.error.message || err.message,
            statusCode: err.response.status,
            responseData: err.response.data
        };
    }

    return objRet;
}

async function getFileArraySharepoint(URL, accessToken) {
    const fileTempResponse = await axios.get(
        URL,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            responseType: "arraybuffer", // Necesitamos el contenido en formato binario
        }
    );
    return fileTempResponse;
}

async function getFileMetadata(URL, accessToken) {
    const metadataResponse = await axios.get(URL, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    });
    return metadataResponse.data;
}


async function removeAllCommentsFromDocx(fileTempContent) {
    // Crear un objeto AdmZip para manipular el archivo ZIP
    const zip = new AdmZip(fileTempContent);

    // Verificar si existe el archivo 'comments.xml' en el archivo Word
    const commentsXmlEntry = zip.getEntry('word/comments.xml');

    if (commentsXmlEntry) {
        // Eliminar directamente el archivo 'comments.xml' del ZIP
        zip.deleteFile('word/comments.xml');
        console.log('Archivo comments.xml eliminado.');
    } else {
        console.log('No se encontraron comentarios en el archivo.');
    }

    // Obtener el archivo 'document.xml'
    const documentXmlEntry = zip.getEntry('word/document.xml');

    if (documentXmlEntry) {
        let documentXmlContent = documentXmlEntry.getData().toString('utf-8');

        // Eliminar todas las referencias de comentarios en el documento principal
        documentXmlContent = documentXmlContent
            .replace(/<w:commentRangeStart[\s\S]*?\/>/g, '')
            .replace(/<w:commentRangeEnd[\s\S]*?\/>/g, '')
            .replace(/<w:commentReference[\s\S]*?\/>/g, '');

        // Actualizar el contenido de 'document.xml' en el archivo ZIP
        zip.updateFile('word/document.xml', Buffer.from(documentXmlContent, 'utf-8'));
        console.log('Referencias a comentarios eliminadas de document.xml.');
    } else {
        console.log('No se encontró document.xml en el archivo.');
    }

    // Volver a convertir el archivo ZIP modificado a un buffer
    const updatedFileContent = zip.toBuffer();

    return updatedFileContent;
}

async function checkAuth(req, res) {
    try {
        console.log('checkAuth')
        if (!storageProvider) {
            return res.status(200).send({ status: true, AuthorizationStorage: "Lappiz storage" });
        }
        const responseAuth = await storagFuntions[storageProvider].auth();
        if (!responseAuth.status && responseAuth.errorMessage)
            res.status(400).send(responseAuth);
        res.status(200).send(responseAuth);
    } catch (error) {
        console.error("Error al obtener la autorización del storage:", error.message);
        res.status(500).json({ message: "Error al obtener la autorización del storage" });
    }
}

async function AddWaterMark(req, res) {
    try {
        const responseAuth = await storagFuntions[storageProvider].auth();
        if (!responseAuth.status && responseAuth.errorMessage)
            return res.status(400).send(responseAuth);
        req.body.AuthorizationStorage = responseAuth.AuthorizationStorage
        await storagFuntions[storageProvider].AddWaterMark(req, res);
    } catch (error) {
        console.error("Error al descargar el archivo:", error.message);
        return res.status(500).json({ message: "Error al descargar el archivo" });
    }
}

async function DownloadFinalFile(req, res) {
    try {
        const responseAuth = await storagFuntions[storageProvider].auth();
        if (!responseAuth.status && responseAuth.errorMessage)
            return res.status(400).send(responseAuth);
        req.body.AuthorizationStorage = responseAuth.AuthorizationStorage
        await storagFuntions[storageProvider].DownloadFinalFile(req, res);
    } catch (error) {
        console.error("Error al descargar el archivo:", error.message);
        return res.status(500).json({ message: "Error al descargar el archivo" });
    }
}
async function addWatermarkToPdf(inputBuffer) {
    const pdfDoc = await PDFDocument.load(inputBuffer);
    const pages = pdfDoc.getPages();
    pages.forEach((page) => {
        const { width, height } = page.getSize();
        page.drawText('DOCUMENTO NO APROBADO', {
            x: width / 2 - 200,
            y: height / 2 - 150,
            size: 40,
            color: rgb(0.7, 0.7, 0.7),
            rotate: degrees(45),
            opacity: 0.3,
        });
    });
    const pdfBytes = await pdfDoc.save(); // pdfBytes es un Uint8Array
    return Buffer.from(pdfBytes);
}
//#endregion
//# sourceMappingURL=documents.controller.js.map

async function prepareDocumentForVersioning(file) {

    const mimeType = file.mimetype;

    switch (mimeType) {

        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return await prepareWordDocument(file.buffer);

        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            return await prepareExcelDocument(file.buffer);

        default:
            return file.buffer;
    }
}
async function prepareWordDocument(buffer) {

    return await enableTrackRevision(buffer);

}
async function prepareExcelDocument(buffer) {

    return buffer;

}
function getDocumentType(fileName, mimeType) {

    if (
        mimeType ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
        return 'word';
    }

    if (
        mimeType ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
        return 'excel';
    }

    return 'other';
}

async function compareWordVersions(
    previousVersionBuffer,
    currentVersionBuffer
) {

    const currentText =
        await extractText(
            currentVersionBuffer
        );

    const previousText =
        await extractText(
            previousVersionBuffer
        );

    const currentComments =
        await extractComments(
            currentVersionBuffer
        );

    const previousComments =
        await extractComments(
            previousVersionBuffer
        );

    const { removed } =
        compareComments(
            previousComments,
            currentComments
        );

    const {
        addedText,
        removedText
    } =
        getCleanTextDiff(
            previousText,
            currentText
        );

    const imgsV1 =
        getImagesFromDocx(
            previousVersionBuffer
        );

    const imgsV2 =
        getImagesFromDocx(
            currentVersionBuffer
        );

    const addedImage =
        imgsV2.filter(
            i => !imgsV1.includes(i)
        );

    const removedImage =
        imgsV1.filter(
            i => !imgsV2.includes(i)
        );

    return {
        currentComments: currentComments,
        previousComments: previousComments,
        comentariosEliminados:
            removed,

        countComentariosEliminados:
            removed.length,

        textoAnadido:
            addedText,

        textoEliminado:
            removedText,

        ImagenesNuevas:
            addedImage,

        ImagenesEliminadas:
            removedImage

    };
}
async function compareExcelVersions(previousBuffer, currentBuffer) {

    const previousWorkbook = await extractWorkbookData(previousBuffer);
    const currentWorkbook = await extractWorkbookData(currentBuffer);

    const previousComments = await extractExcelComments(previousBuffer);
    const currentComments = await extractExcelComments(currentBuffer);

    const previousImages = await extractExcelImages(previousBuffer);
    const currentImages = await extractExcelImages(currentBuffer);

    const workbookDiff = compareWorkbookChanges(
        previousWorkbook,
        currentWorkbook
    );

    const commentsDiff = compareExcelComments(
        previousComments,
        currentComments
    );
    console.log(
        "Comentarios anteriores:",
        previousComments.length
    );
    
    console.log(
        "Comentarios actuales:",
        currentComments.length
    );
    
    console.log(
        "Workbook diff:",
        JSON.stringify(workbookDiff, null, 2)
    );
    return {
        celdasModificadas: workbookDiff.celdasModificadas,
        celdasAgregadas: workbookDiff.celdasAgregadas,
        hojasAgregadas: workbookDiff.hojasAgregadas,
        hojasEliminadas: workbookDiff.hojasEliminadas,
        formulasModificadas: workbookDiff.formulasModificadas,
        comentariosAgregados: commentsDiff.agregados,
        comentariosEliminados: commentsDiff.eliminados,
        imagenesAgregadas: currentImages.filter(
            x => !previousImages.includes(x)
        ),
        imagenesEliminadas: previousImages.filter(
            x => !currentImages.includes(x)
        )
    };
}
async function extractExcelComments(buffer) {
// await debugExcelStructure (buffer);
    const excelJsComments =
        await extractExcelCommentsExcelJS(
            buffer
        );

    const threadedComments =
        await extractThreadedComments(
            buffer
        );

    const persons =
        await extractThreadedPersons(
            buffer
        );

    const normalizedThreaded =
        threadedComments.map(comment => ({

            sheet: null,

            cell: comment.ref,

            comment: comment.text,

            author:
                persons[
                    comment.personId
                ] ? persons[comment.personId].displayName : '',

            source:
                'threaded'

        }));

    const allComments = [

        ...excelJsComments,

        ...normalizedThreaded

    ];

    return allComments;
}
async function debugExcelStructure(buffer) {

    const zip = await JSZip.loadAsync(buffer);

    console.log(
        Object.keys(zip.files)
            .filter(f =>
                f.includes('comment') ||
                f.includes('person')
            )
    );

}
async function extractExcelCommentsExcelJS(buffer) {

    const workbook = new ExcelJS.Workbook();

    await workbook.xlsx.load(buffer);

    const comments = [];

    workbook.worksheets.forEach(sheet => {

        sheet.eachRow(row => {

            row.eachCell(cell => {

                if (!cell.note)
                    return;

                let commentText = '';

                if (typeof cell.note === 'string') {

                    commentText = cell.note;

                } else if (
                    cell.note.texts &&
                    Array.isArray(cell.note.texts)
                ) {

                    commentText =
                        cell.note.texts
                            .map(t => t.text || '')
                            .join('');

                }

                comments.push({
                    sheet: sheet.name,
                    cell: cell.address,
                    comment: commentText,
                    source: 'exceljs'
                });

            });

        });

    });

    return comments;
}
async function extractThreadedComments(buffer) {

    const zip = await JSZip.loadAsync(buffer);

    const parser = new xml2js.Parser();

    const comments = [];

    const threadedFiles = Object.keys(zip.files)
        .filter(file =>
            file.startsWith(
                'xl/threadedComments/'
            ) &&
            file.endsWith('.xml')
        );

    for (const fileName of threadedFiles) {

        const xml =
            await zip.files[fileName]
                .async('string');

        const parsed =
            await parser.parseStringPromise(xml);

        const threadedComments =
            parsed && parsed.ThreadedComments
                 ? parsed.ThreadedComments.threadedComment : [];

        threadedComments.forEach(comment => {

            comments.push({

                personId:
                    comment.$ ? comment.$.personId : undefined,

                ref:
                    comment.$ ? comment.$.ref : undefined,

                id:
                    comment.$ ? comment.$.id : undefined,

                text:
                    comment.text ? comment.text[0] || '' : '',

                source:
                    'threaded'

            });

        });

    }

    return comments;
}
async function extractThreadedPersons(buffer) {

    const zip = await JSZip.loadAsync(buffer);

    const parser = new xml2js.Parser();

    const file =
        zip.files['xl/persons/person.xml'];

    if (!file)
        return {};

    const xml =
        await file.async('string');

    const parsed =
        await parser.parseStringPromise(xml);

    const result = {};

    const persons = parsed && parsed.personList ? parsed.personList.person : [];

    persons.forEach(person => {

        result[person.$.id] = {

            displayName:
                person.$.displayName,

            userId:
                person.$.userId

        };

    });

    return result;
}
async function extractExcelImages(buffer) {

    const workbook = new ExcelJS.Workbook();

    await workbook.xlsx.load(buffer);

    const images = [];

    workbook.worksheets.forEach(sheet => {

        const sheetImages = sheet.getImages();

        sheetImages.forEach(img => {

            images.push(
                `${sheet.name}_${img.imageId}`
            );

        });

    });

    return images;
}
function compareExcelComments(previous, current) {

    const previousSet = new Set(
        previous.map(
            x => `${x.sheet}|${x.cell}|${x.comment}`
        )
    );

    const currentSet = new Set(
        current.map(
            x => `${x.sheet}|${x.cell}|${x.comment}`
        )
    );

    const agregados =
        current.filter(
            x => !previousSet.has(
                `${x.sheet}|${x.cell}|${x.comment}`
            )
        );

    const eliminados =
        previous.filter(
            x => !currentSet.has(
                `${x.sheet}|${x.cell}|${x.comment}`
            )
        );

    return {
        agregados,
        eliminados
    };
}
function compareWorkbookChanges(oldBook, newBook) {

    const result = {

        celdasModificadas: [],
        celdasAgregadas: [],
        hojasAgregadas: [],
        hojasEliminadas: [],
        formulasModificadas: []

    };

    const oldSheets = Object.keys(oldBook);
    const newSheets = Object.keys(newBook);

    result.hojasAgregadas =
        newSheets.filter(
            x => !oldSheets.includes(x)
        );

    result.hojasEliminadas =
        oldSheets.filter(
            x => !newSheets.includes(x)
        );

    for (const sheetName of newSheets) {

        if (!oldBook[sheetName])
            continue;

        const oldSheet = oldBook[sheetName];
        const newSheet = newBook[sheetName];

        const allCells = new Set([
            ...Object.keys(oldSheet),
            ...Object.keys(newSheet)
        ]);

        for (const cellAddress of allCells) {

            const oldCell = oldSheet[cellAddress];
            const newCell = newSheet[cellAddress];

            if (!oldCell && newCell) {

                result.celdasAgregadas.push({
                    hoja: sheetName,
                    celda: cellAddress,
                    valor: newCell.value
                });

                continue;
            }

            if (!newCell)
                continue;

            const oldValue =
                JSON.stringify(oldCell.value);

            const newValue =
                JSON.stringify(newCell.value);

            if (oldValue !== newValue) {

                result.celdasModificadas.push({

                    hoja: sheetName,
                    celda: cellAddress,
                    valorAnterior: oldCell.value,
                    valorNuevo: newCell.value

                });
            }

            if (
                oldCell.formula !==
                newCell.formula
            ) {

                result.formulasModificadas.push({

                    hoja: sheetName,
                    celda: cellAddress,
                    formulaAnterior:
                        oldCell.formula,

                    formulaNueva:
                        newCell.formula

                });

            }
        }
    }

    return result;
}

async function extractWorkbookData(buffer) {

    const workbook = new ExcelJS.Workbook();

    await workbook.xlsx.load(buffer);

    const result = {};

    workbook.worksheets.forEach(sheet => {

        result[sheet.name] = {};

        sheet.eachRow(row => {

            row.eachCell(cell => {

                result[sheet.name][cell.address] = {
                    value: cell.value,
                    formula: cell.formula || null
                };

            });

        });

    });

    return result;
}

async function GetFileById(itemId, accessToken) {
    try {

        const url =
            `https://graph.microsoft.com/v1.0/drives/${storageSettings.DriveId}/items/${itemId}`;

        const response = await axios.get(
            url,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data;

    } catch (error) {

        console.error(
            "Error obteniendo archivo:",
            error.response ? error.response.data || error.message : error.message
        );

        throw error;
    }
}
