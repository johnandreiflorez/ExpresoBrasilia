INSERT INTO [Empresas] ([EmpresaId],[Nit],[RazonSocial],[Direccion],[Telefono],[Email],[Estado],[FechaDeBaja],[Plan],[FechaRegistro],[FechaFinPlan])VALUES('ECCB3807-42FE-422E-BB7D-859F2712FA60','20260915','Mallas Coomeva','CL 12 11 60 P 3 BRR CHIPRE','3206930024','coomeva.mallas@yopmail.com','Activo',NULL,'Demo','Sep  9 2025 11:17:08:980AM','Jun 27 2027 11:39:50:867AM')
GO
INSERT INTO [Aplicaciones] ([AplicacionId],[Codigo],[Nombre],[EmpresaId],[ProviderConnectionString],[ServerName],[PasswordServer],[LoginServer],[DatabaseName],[UserDatabase],[PasswordDataBase],[Estado],[FechaDeBaja],[MultiTenant],[Icono],[TimeLine],[AlterDatabase],[RegisterForm],[Encuesta],[TimeLineFilterId],[Publicity],[CustomLogin],[Notifications],[ProfileActionId],[Version],[DefaultPath],[ColorTheme],[RolId],[EmailHost],[EmailPort],[EmailSecure],[EmailUsuario],[EmailPassword],[AppViewRegisterFormId],[Dominio],[Relationship],[Twoway],[Score],[EmailService],[SecundaryColorTheme],[DBAzure],[DBPlan],[UrlOData],[userAppFtp],[passwordAppFtp],[hostAppFtp],[connectionStringApp],[appTitle],[tabIcon],[backgroundImagelogin],[includeSocialMedia],[VideoCall],[Chat],[DBAppMode],[doSync],[AuthType],[Layout],[isIdle],[timeIdle],[twoFactor],[googleAuth],[facebookAuth],[KanbanView],[AccountConfirmedByLappiz],[StorageProvider],[StorageSettings],[RequireTLS],[FontFamilyDefault],[msalClientId],[msalTenantId],[EnablePasswordChange],[PeriodicityPasswordChange],[FrequencyPasswordChange],[TemplateActivateAccount],[TemplateUnlockUser],[TemplatePasswordRecovery],[TemplateChangedPassword],[ValidatePasswordHistory],[DisabledSendEmail],[FechaFinNube],[EmailFromSMTP],[PasswordLength],[NotificationStyle],[ConfirmLogout],[SingleSession])VALUES('DE110574-D371-41F0-AE53-97340DD35C73','Coomeva_Lappiz','Mallas','ECCB3807-42FE-422E-BB7D-859F2712FA60','SQL','192.168.32.15','qwer.1234','lappiz_test','Coomeva_Lappiz','Coomeva_Lappiz_Users','qwer.1234','Activo',NULL,0,'https://stglappizia.blob.core.windows.net/configapps/Coomeva_Lappiz/config/icono.png',0,1,0,0,NULL,0,0,0,NULL,'B35E4870-592F-44D2-9F52-28B38FED8166','/forms?viewName=Coomeva_Lappiz_Users&entityId=08b5b3e4-a5c5-4bcd-b8f0-2045b78b5c56&viewMenu=true&appViewId=74030db3-f337-4f37-b09d-0fd10c1394fd','#3c792c',NULL,NULL,0,0,NULL,NULL,NULL,NULL,0,0,0,NULL,'#c0f5bb',0,'Basic',NULL,NULL,NULL,NULL,'data source="192.168.32.15"; initial catalog="Coomeva_Lappiz"; user id="lappiz_test"; password="qwer.1234"; MultipleActiveResultSets=True; Encrypt=false; TrustServerCertificate=True; App=EntityFramework','Mallas',NULL,NULL,1,0,0,'New',0,'Lappiz','{''colorMenu'':''#ffffff'',''backgroundMenu'':''#3c792c'',''colorHeader'':''Default'',''backgroundHeader'':''Default'',''colorFooter'':''Default'',''backgroundFooter'':''Default'',''web'':{''headerHide'':false,''menuHide'':false,''footerHide'':false,''layout'':{''header'':''Default'',''menu'':''Default'',''footer'':''Default'',''headerTemplate'':'''',''menuTemplate'':'''',''footerTemplate'':''''}},''mobile'':{''headerHide'':false,''menuHide'':false,''footerHide'':false,''layout'':{''header'':''Default'',''menu'':''Default'',''footer'':''Default'',''headerTemplate'':'''',''menuTemplate'':'''',''footerTemplate'':''''}}}',0,0,0,NULL,NULL,0,1,NULL,NULL,0,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,NULL,0,0,'Oct  9 2025 11:17:08:980AM',NULL,8,NULL,0,0)
GO
INSERT INTO [Modulos] ([ModuloId],[Name],[Description],[AplicacionId],[IconAwesome])VALUES('2F810E81-3086-4CE2-B6A9-000E1CC752F5','Atención','Módulo para la atención al cliente.','DE110574-D371-41F0-AE53-97340DD35C73','fa-users')
GO
INSERT INTO [Modulos] ([ModuloId],[Name],[Description],[AplicacionId],[IconAwesome])VALUES('6D765CB9-E6BA-4EFF-A19D-81F9BEEE5DBA','Seguridad','Módulo para las opciones de seguridad.','DE110574-D371-41F0-AE53-97340DD35C73',NULL)
GO
INSERT INTO [Entities] ([TablaId],[Code],[Name],[AplicacionId],[Scheme],[PluralName],[Estado],[FechaDeBaja],[HasHistorics],[IsPresentAPI],[ModuloId],[IconAwesome],[NavigationPropertiesCollectionEnabled],[IsAnonymous],[InMemory],[OffLine],[ShowHistorics],[LogicalDelete],[DBEntityMode])VALUES('83652E59-67DC-45E1-8EC8-1F4F575F316D','Coomeva_Lappiz_CAV','Centro de antención de ventas','DE110574-D371-41F0-AE53-97340DD35C73','dbo','Centros de atenciones','Activo',NULL,1,0,NULL,'fa-building-o',0,0,0,0,0,0,NULL)
GO
INSERT INTO [Entities] ([TablaId],[Code],[Name],[AplicacionId],[Scheme],[PluralName],[Estado],[FechaDeBaja],[HasHistorics],[IsPresentAPI],[ModuloId],[IconAwesome],[NavigationPropertiesCollectionEnabled],[IsAnonymous],[InMemory],[OffLine],[ShowHistorics],[LogicalDelete],[DBEntityMode])VALUES('08B5B3E4-A5C5-4BCD-B8F0-2045B78B5C56','Coomeva_Lappiz_Users','User','DE110574-D371-41F0-AE53-97340DD35C73','dbo','Users','Activo',NULL,0,0,'6D765CB9-E6BA-4EFF-A19D-81F9BEEE5DBA',NULL,0,0,0,0,0,0,'New')
GO
INSERT INTO [Entities] ([TablaId],[Code],[Name],[AplicacionId],[Scheme],[PluralName],[Estado],[FechaDeBaja],[HasHistorics],[IsPresentAPI],[ModuloId],[IconAwesome],[NavigationPropertiesCollectionEnabled],[IsAnonymous],[InMemory],[OffLine],[ShowHistorics],[LogicalDelete],[DBEntityMode])VALUES('E959DF9E-E04D-49D9-8CD3-71D644BDB880','Coomeva_Lappiz_Colaborador','Colaborador','DE110574-D371-41F0-AE53-97340DD35C73','dbo','Colaboradores','Activo',NULL,1,0,NULL,'fa-users',0,0,0,0,0,0,NULL)
GO
INSERT INTO [Entities] ([TablaId],[Code],[Name],[AplicacionId],[Scheme],[PluralName],[Estado],[FechaDeBaja],[HasHistorics],[IsPresentAPI],[ModuloId],[IconAwesome],[NavigationPropertiesCollectionEnabled],[IsAnonymous],[InMemory],[OffLine],[ShowHistorics],[LogicalDelete],[DBEntityMode])VALUES('3570EC86-9BDD-4525-8D3A-7AD315ED5346','Coomeva_Lappiz_Novedades','Novedad','DE110574-D371-41F0-AE53-97340DD35C73','dbo','Novedades','Activo',NULL,1,0,NULL,'fa-users',0,0,0,0,0,0,'New')
GO
INSERT INTO [Entities] ([TablaId],[Code],[Name],[AplicacionId],[Scheme],[PluralName],[Estado],[FechaDeBaja],[HasHistorics],[IsPresentAPI],[ModuloId],[IconAwesome],[NavigationPropertiesCollectionEnabled],[IsAnonymous],[InMemory],[OffLine],[ShowHistorics],[LogicalDelete],[DBEntityMode])VALUES('BF761567-A014-4DA0-BF7E-A41D96882886','Coomeva_Lappiz_Empleados','Empleado','DE110574-D371-41F0-AE53-97340DD35C73','dbo','Empleados','Activo',NULL,1,0,'6D765CB9-E6BA-4EFF-A19D-81F9BEEE5DBA','System.String[]',0,0,0,0,0,0,'New')
GO
INSERT INTO [Entities] ([TablaId],[Code],[Name],[AplicacionId],[Scheme],[PluralName],[Estado],[FechaDeBaja],[HasHistorics],[IsPresentAPI],[ModuloId],[IconAwesome],[NavigationPropertiesCollectionEnabled],[IsAnonymous],[InMemory],[OffLine],[ShowHistorics],[LogicalDelete],[DBEntityMode])VALUES('EB1F5413-3216-4DBB-A8E2-A6B5BC64E0D8','Coomeva_Lappiz_HorarioCAVEspecial','Horario CAV  especial','DE110574-D371-41F0-AE53-97340DD35C73','dbo','Horarios CAV especial','Activo',NULL,1,0,NULL,'fa-building-o',0,0,0,0,0,0,'New')
GO
INSERT INTO [Entities] ([TablaId],[Code],[Name],[AplicacionId],[Scheme],[PluralName],[Estado],[FechaDeBaja],[HasHistorics],[IsPresentAPI],[ModuloId],[IconAwesome],[NavigationPropertiesCollectionEnabled],[IsAnonymous],[InMemory],[OffLine],[ShowHistorics],[LogicalDelete],[DBEntityMode])VALUES('F4B2601F-A657-4CE4-87ED-D3507CC8FF46','Coomeva_Lappiz_TurnosAtencion','Turno de atención','DE110574-D371-41F0-AE53-97340DD35C73','dbo','Turnos de atención','Activo',NULL,1,0,NULL,'fa-calendar',0,0,0,0,0,0,NULL)
GO
INSERT INTO [Entities] ([TablaId],[Code],[Name],[AplicacionId],[Scheme],[PluralName],[Estado],[FechaDeBaja],[HasHistorics],[IsPresentAPI],[ModuloId],[IconAwesome],[NavigationPropertiesCollectionEnabled],[IsAnonymous],[InMemory],[OffLine],[ShowHistorics],[LogicalDelete],[DBEntityMode])VALUES('E60238E1-6CF3-4DAD-8B7C-DD4261F157DC','Coomeva_Lappiz_Turno','Turno','DE110574-D371-41F0-AE53-97340DD35C73','dbo','Turnos','Activo',NULL,1,0,NULL,'fa-calendar',0,0,0,0,0,0,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('3B3B9B34-1B46-468D-A84D-0143B643B1CD','CavFk','Centro de atención de ventas',0,NULL,NULL,500,0,'Check',0,NULL,NULL,NULL,0,'Relacion','UniqueIdentifier',1,1,'E959DF9E-E04D-49D9-8CD3-71D644BDB880',0,'83652E59-67DC-45E1-8EC8-1F4F575F316D','Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('982D6071-385E-4FA6-88DD-09DF75D92046','IpAddress','IpAddress',0,'IpAddress','IpAddress',100,0,NULL,0,NULL,NULL,NULL,0,'Texto','VarChar',0,0,'E959DF9E-E04D-49D9-8CD3-71D644BDB880',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('CDB7A7A8-90DC-4A5C-A601-080F344E1EF0','Identificacion','Identificación',1,NULL,NULL,50,0,'Check',0,NULL,NULL,NULL,0,'Texto','VarChar',1,0,'E959DF9E-E04D-49D9-8CD3-71D644BDB880',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('8AC4CD31-FB1C-413C-83DE-0DEA2DA5313A','CEDescripcion','Descripcion',1,'Descripcion','Descripcion',200,0,NULL,1,NULL,NULL,NULL,1,'Texto','VarChar',1,0,'3570EC86-9BDD-4525-8D3A-7AD315ED5346',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('D8F9C8A8-B59D-4459-A3D1-0244DE1C8830','Created_date','Created_date',0,'Created_date','Created_date',NULL,0,NULL,0,NULL,NULL,NULL,1,'Fecha','DateTime',0,0,'E959DF9E-E04D-49D9-8CD3-71D644BDB880',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,'Now',NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('51A6641A-58F8-46CA-A8BD-132A5A4E1ACC','TiempoAtencion','Tiempo de atención',0,'Campo de tipo hora para el tiempo de atención.',NULL,50,0,'Check',0,NULL,NULL,NULL,0,'Time','VarChar',1,0,'F4B2601F-A657-4CE4-87ED-D3507CC8FF46',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'now',NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('6A10B848-E39B-4364-B8D5-06452AE41EAF','TipoContrato','Tipo de contrato',1,NULL,NULL,1000,0,'Check',0,NULL,NULL,'Directo,Temporal',0,'Lista','VarChar',1,0,'E959DF9E-E04D-49D9-8CD3-71D644BDB880',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('D06FD10A-8D30-4AA4-875A-06999D494353','FechaReporte','Fecha de reporte',0,NULL,NULL,NULL,0,'Check',0,NULL,NULL,NULL,0,'DateTime','DateTime',1,0,'3570EC86-9BDD-4525-8D3A-7AD315ED5346',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'now',NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('DD09D3A8-2985-473E-B0D3-16F6ACC7C9F4','Created_by','Created_by',0,'Created_by','Created_by',100,0,NULL,0,NULL,NULL,NULL,1,'Texto','UniqueIdentifier',0,0,'F4B2601F-A657-4CE4-87ED-D3507CC8FF46',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,'CurrentUserId',NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('E98D5211-8642-47DB-8BCD-171F019AEA2B','EventType','EventType',0,'EventType','EventType',100,0,NULL,0,NULL,NULL,NULL,0,'Texto','VarChar',0,0,'3570EC86-9BDD-4525-8D3A-7AD315ED5346',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('DBDA270C-DA73-4B2D-8044-138C7C67EAE5','CEObservacin','Observación',0,'Observación','Observación',200,0,NULL,1,NULL,NULL,NULL,1,'Texto','VarChar',1,0,'F4B2601F-A657-4CE4-87ED-D3507CC8FF46',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('68855E4F-1252-4A36-85F4-1A2215F3B65A','DeviceId','DeviceId',0,'DeviceId','DeviceId',2000,0,NULL,0,NULL,NULL,NULL,1,'Texto','VarChar',0,0,'08B5B3E4-A5C5-4BCD-B8F0-2045B78B5C56',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('B4A4C762-9F1E-4DE3-B3C8-178DA6FA42D7','Created_by','Created_by',0,'Created_by','Created_by',100,0,NULL,0,NULL,NULL,NULL,1,'Texto','UniqueIdentifier',0,0,'BF761567-A014-4DA0-BF7E-A41D96882886',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,'CurrentUserId',NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('E734A42A-DFE5-4C56-B4AA-18203F2D7493','Edited_date','Edited_date',0,'Edited_date','Edited_date',NULL,0,NULL,0,NULL,NULL,NULL,1,'Fecha','DateTime',0,0,'E959DF9E-E04D-49D9-8CD3-71D644BDB880',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,'Now',NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('5EE97058-D88D-4FDB-8E3B-1A993DB4FF74','Edited_date','Edited_date',0,'Edited_date','Edited_date',NULL,0,NULL,0,NULL,NULL,NULL,1,'Fecha','DateTime',0,0,'BF761567-A014-4DA0-BF7E-A41D96882886',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,'Now',NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('8A6C3274-0C41-48F7-BE1C-1FB466B0A6C3','EventType','EventType',0,'EventType','EventType',100,0,NULL,0,NULL,NULL,NULL,0,'Texto','VarChar',0,0,'08B5B3E4-A5C5-4BCD-B8F0-2045B78B5C56',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('29AEF97E-C6C2-4BDF-A772-0A5DCDC84757','CAVFK','Centro de antención de ventas',0,NULL,NULL,500,0,'Check',0,NULL,NULL,NULL,0,'Relacion','UniqueIdentifier',1,1,'EB1F5413-3216-4DBB-A8E2-A6B5BC64E0D8',0,'83652E59-67DC-45E1-8EC8-1F4F575F316D','Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('D1549594-A4A7-40A6-A892-0AAB89443BEC','Fecha','Fecha',0,'Campo de tipo fecha para establecer el turno de atención.',NULL,NULL,0,'Check',0,NULL,NULL,NULL,0,'Fecha','DateTime',1,0,'F4B2601F-A657-4CE4-87ED-D3507CC8FF46',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('E1B0D000-1501-453E-843C-1E314ECD6F5C','IpAddress','IpAddress',0,'IpAddress','IpAddress',100,0,NULL,0,NULL,NULL,NULL,0,'Texto','VarChar',0,0,'E60238E1-6CF3-4DAD-8B7C-DD4261F157DC',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('8A2108A0-E84B-49C8-8581-229B669DBB54','Edited_by','Edited_by',0,'Edited_by','Edited_by',100,0,NULL,0,NULL,NULL,NULL,1,'Texto','UniqueIdentifier',0,0,'83652E59-67DC-45E1-8EC8-1F4F575F316D',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,'CurrentUserId',NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('5B192E02-17B1-4D51-9CAD-208F670EB9D7','TwoFactorEnable','Doble factor',0,'Doble factor de autenticación','Doble factor de autenticación',NULL,0,NULL,0,NULL,NULL,NULL,0,'Check','Bit',1,0,'08B5B3E4-A5C5-4BCD-B8F0-2045B78B5C56',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('6BA32119-2D2C-44AE-A64D-2A90CF9A328B','UserEmail','UserEmail',0,'UserEmail','UserEmail',100,0,NULL,0,NULL,NULL,NULL,0,'Texto','VarChar',0,0,'E959DF9E-E04D-49D9-8CD3-71D644BDB880',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('A2112799-4624-41CB-A0D9-27D7A2954C50','HorarioCierre','Cierre',0,NULL,NULL,50,0,'Check',0,NULL,NULL,NULL,0,'Time','VarChar',1,0,'83652E59-67DC-45E1-8EC8-1F4F575F316D',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('9A83983E-902C-4492-B3AE-2C357B567795','Cargo','Cargo',0,NULL,NULL,100,0,'Check',0,NULL,NULL,NULL,0,'Texto','VarChar',1,0,'E959DF9E-E04D-49D9-8CD3-71D644BDB880',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('C6527E63-73E1-4E47-B9ED-1DBDECAA8281','IpAddress','IpAddress',0,'IpAddress','IpAddress',100,0,NULL,0,NULL,NULL,NULL,0,'Texto','VarChar',0,0,'08B5B3E4-A5C5-4BCD-B8F0-2045B78B5C56',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('05DF8186-4CBA-4075-80B0-26144C430968','FechaInicio','Fecha y hora de inicio',0,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,0,'DateTime','DateTime',1,0,'E60238E1-6CF3-4DAD-8B7C-DD4261F157DC',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'NOW',NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('7E38A17F-30AA-4F14-B9AB-308C70AE78D0','HoraFinAtencion','Hora de fin de la atención',0,'Campo de tipo hora para establecer el fin de la atención.',NULL,50,0,'Check',0,NULL,NULL,NULL,0,'Time','VarChar',1,0,'F4B2601F-A657-4CE4-87ED-D3507CC8FF46',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'now',NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('F8F793C1-851E-402D-9906-343A08EAF76B','HoraInicioEspera','Hora de inicio de espera',0,'Campo de tipo hora para el inicio de espera',NULL,50,0,'Check',0,NULL,NULL,NULL,0,'Time','VarChar',1,0,'F4B2601F-A657-4CE4-87ED-D3507CC8FF46',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'now',NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('70FF12DD-33CC-483D-9A1C-2523804C7E6D','Soportes','Soportes',0,NULL,NULL,8000,0,'Check',0,NULL,NULL,NULL,0,'Archive','VarChar',1,0,'3570EC86-9BDD-4525-8D3A-7AD315ED5346',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('F2C972CE-59B3-48F6-9E0A-36430F1FE4DE','Area','Area / Departamento',0,'Campo de tipo texto para el área.',NULL,100,0,'Check',0,NULL,NULL,NULL,0,'Texto','VarChar',1,0,'BF761567-A014-4DA0-BF7E-A41D96882886',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('51AB7A06-2B4D-4AA9-94CB-2C94A6165712','Created_by','Created_by',0,'Created_by','Created_by',100,0,NULL,0,NULL,NULL,NULL,1,'Texto','UniqueIdentifier',0,0,'83652E59-67DC-45E1-8EC8-1F4F575F316D',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,'CurrentUserId',NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('18454788-B3D0-4B90-8150-37689CDD4B15','Id','Coomeva_Lappiz_TurnosAtencionId',1,'Clave primaria de Turno de atención','Clave primaria de Turno de atención',NULL,1,NULL,0,NULL,NULL,NULL,0,'ClavePrimaria','UniqueIdentifier',0,0,'F4B2601F-A657-4CE4-87ED-D3507CC8FF46',1,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('5C50436C-98E2-4881-8E18-26416DCE3AF9','Address','Address',0,'Address','Address',200,0,NULL,0,NULL,NULL,NULL,1,'Texto','VarChar',1,0,'08B5B3E4-A5C5-4BCD-B8F0-2045B78B5C56',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('0D18C89E-FBC7-4599-8F29-3D51359CD87E','DemandaEstimada','Demanda estimada',0,NULL,NULL,NULL,0,'Check',0,NULL,NULL,NULL,0,'Entero','Int',1,0,'EB1F5413-3216-4DBB-A8E2-A6B5BC64E0D8',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('22E91957-9728-43C1-9C1A-3665FA0DB703','ColaboradorFk','Colaborador',0,NULL,NULL,500,0,'Check',0,NULL,NULL,NULL,0,'Relacion','UniqueIdentifier',1,1,'3570EC86-9BDD-4525-8D3A-7AD315ED5346',0,'E959DF9E-E04D-49D9-8CD3-71D644BDB880','Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('6FBB163E-BF2D-406E-8AFB-44B2B71FC49A','Id','Coomeva_Lappiz_NovedadesId',1,'Clave primaria de Novedad','Clave primaria de Novedad',NULL,1,NULL,0,NULL,NULL,NULL,0,'ClavePrimaria','UniqueIdentifier',0,0,'3570EC86-9BDD-4525-8D3A-7AD315ED5346',1,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('1FC1278D-8D7E-4391-A4E5-3DC1A2213452','IpAddress','IpAddress',0,'IpAddress','IpAddress',100,0,NULL,0,NULL,NULL,NULL,0,'Texto','VarChar',0,0,'3570EC86-9BDD-4525-8D3A-7AD315ED5346',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('F46AFE24-CCAA-498B-BFF3-4312C9F826FA','Created_date','Created_date',0,'Created_date','Created_date',NULL,0,NULL,0,NULL,NULL,NULL,1,'Fecha','DateTime',0,0,'08B5B3E4-A5C5-4BCD-B8F0-2045B78B5C56',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,'Now',NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('D3A89F1D-573D-4765-81E8-3F1A5304F364','CEDescripcion','Descripcion',0,'Descripcion','Descripcion',200,0,NULL,1,NULL,NULL,NULL,1,'Texto','VarChar',1,0,'E60238E1-6CF3-4DAD-8B7C-DD4261F157DC',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('5841005F-009F-4080-952D-442363DCAFF7','CENombre','Nombre',1,'Nombre','Nombre',200,0,NULL,1,NULL,NULL,NULL,1,'Texto','VarChar',1,0,'E959DF9E-E04D-49D9-8CD3-71D644BDB880',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('FB51E59E-CB7B-4E33-864D-467327ED9D0C','Edited_by','Edited_by',0,'Edited_by','Edited_by',100,0,NULL,0,NULL,NULL,NULL,1,'Texto','UniqueIdentifier',0,0,'BF761567-A014-4DA0-BF7E-A41D96882886',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,'CurrentUserId',NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('818BEE0E-23DD-4FDE-9126-46FEAD390AF1','CAVFK','Centro de antención de ventas',0,NULL,NULL,500,0,'Check',0,NULL,NULL,NULL,0,'Relacion','UniqueIdentifier',1,1,'E60238E1-6CF3-4DAD-8B7C-DD4261F157DC',0,'83652E59-67DC-45E1-8EC8-1F4F575F316D','Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('7540C507-C90E-407F-89DD-4599667E407B','TipoContrato','Tipo de contrato',0,'Campo de tipo texto para el tipo de contrato.',NULL,100,0,'Check',0,NULL,NULL,NULL,0,'Texto','VarChar',1,0,'BF761567-A014-4DA0-BF7E-A41D96882886',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('B69CE8C9-A17D-4C9D-AD0C-45BD583A2765','Id','Coomeva_Lappiz_ColaboradorId',1,'Clave primaria de Colaborador','Clave primaria de Colaborador',NULL,1,NULL,0,NULL,NULL,NULL,0,'ClavePrimaria','UniqueIdentifier',0,0,'E959DF9E-E04D-49D9-8CD3-71D644BDB880',1,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('1EB3D12F-6CAF-48C7-B220-4A1393853519','EventType','EventType',0,'EventType','EventType',100,0,NULL,0,NULL,NULL,NULL,0,'Texto','VarChar',0,0,'BF761567-A014-4DA0-BF7E-A41D96882886',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('99F2D7EE-FF38-476E-948C-4E4BFBDEF5E9','Edited_by','Edited_by',0,'Edited_by','Edited_by',100,0,NULL,0,NULL,NULL,NULL,1,'Texto','UniqueIdentifier',0,0,'E60238E1-6CF3-4DAD-8B7C-DD4261F157DC',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,'CurrentUserId',NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('878B5B54-8BE6-43D9-B218-4B3041D68FC6','Edited_date','Edited_date',0,'Edited_date','Edited_date',NULL,0,NULL,0,NULL,NULL,NULL,1,'Fecha','DateTime',0,0,'83652E59-67DC-45E1-8EC8-1F4F575F316D',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,'Now',NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('623D237A-22E8-476D-940E-4B64E6E72A6E','EsFestivo','Es festivo?',0,NULL,NULL,NULL,0,'Check',0,NULL,NULL,NULL,0,'Check','Bit',1,0,'E60238E1-6CF3-4DAD-8B7C-DD4261F157DC',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('A082B97B-2191-4B86-9C2D-55BA59311740','Contrasena','Contraseña',1,'Contraseña','Contraseña',50,0,NULL,0,NULL,NULL,NULL,1,'Password','VarChar',1,0,'08B5B3E4-A5C5-4BCD-B8F0-2045B78B5C56',0,NULL,'Activo',NULL,6,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('73B695B6-8F34-40AB-8C24-62CC7155C20B','Photo','Photo',0,'Photo','Photo',2000,0,NULL,0,NULL,NULL,NULL,1,'Carrousel','VarChar',1,0,'08B5B3E4-A5C5-4BCD-B8F0-2045B78B5C56',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('02A9BD4B-A23B-4FEB-9FB9-502E7423F3C3','Created_by','Created_by',0,'Created_by','Created_by',100,0,NULL,0,NULL,NULL,NULL,1,'Texto','UniqueIdentifier',0,0,'EB1F5413-3216-4DBB-A8E2-A6B5BC64E0D8',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,'CurrentUserId',NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('E2894016-059D-4953-A715-596CC9368044','Area','Área',0,NULL,NULL,100,0,'Check',0,NULL,NULL,NULL,0,'Texto','VarChar',1,0,'E959DF9E-E04D-49D9-8CD3-71D644BDB880',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('E30CBC32-B8F6-407A-A767-519EFA19145A','Created_by','Created_by',0,'Created_by','Created_by',100,0,NULL,0,NULL,NULL,NULL,1,'Texto','UniqueIdentifier',0,0,'3570EC86-9BDD-4525-8D3A-7AD315ED5346',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,'CurrentUserId',NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('27338158-F260-4DB7-A339-5D04AEA64B62','Created_date','Created_date',0,'Created_date','Created_date',NULL,0,NULL,0,NULL,NULL,NULL,1,'Fecha','DateTime',0,0,'EB1F5413-3216-4DBB-A8E2-A6B5BC64E0D8',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,'Now',NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('CAD55575-7A56-4009-A778-6E054D9C2146','Created_by','Created_by',0,'Created_by','Created_by',100,0,NULL,0,NULL,NULL,NULL,1,'Texto','UniqueIdentifier',0,0,'E60238E1-6CF3-4DAD-8B7C-DD4261F157DC',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,'CurrentUserId',NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('BD62365A-9C0C-4DAA-8B42-6E05CA7AF955','Created_date','Created_date',0,'Created_date','Created_date',NULL,0,NULL,0,NULL,NULL,NULL,1,'Fecha','DateTime',0,0,'3570EC86-9BDD-4525-8D3A-7AD315ED5346',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,'Now',NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('6AABFDDA-75AF-4EDF-94B6-5A6524C3DDC9','UserEmail','UserEmail',0,'UserEmail','UserEmail',100,0,NULL,0,NULL,NULL,NULL,0,'Texto','VarChar',0,0,'BF761567-A014-4DA0-BF7E-A41D96882886',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('A82453D4-4876-4CAC-9A03-6F6671302647','Region','Región',0,NULL,NULL,1000,0,'Check',0,NULL,NULL,'Medellín,Barranquilla,Cali,Bogota',0,'Lista','VarChar',1,0,'83652E59-67DC-45E1-8EC8-1F4F575F316D',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('B8FA9428-8D73-4D4F-AFA6-5B8B8E256329','EventType','EventType',0,'EventType','EventType',100,0,NULL,0,NULL,NULL,NULL,0,'Texto','VarChar',0,0,'E959DF9E-E04D-49D9-8CD3-71D644BDB880',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('45BA4D4E-D655-429F-BB19-668E43B60CB8','FullName','FullName',1,'FullName','FullName',200,0,NULL,1,NULL,NULL,NULL,1,'Texto','VarChar',1,0,'08B5B3E4-A5C5-4BCD-B8F0-2045B78B5C56',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('89C8342D-1BD6-4199-9DD2-70DFEA105777','Identification','Identification',0,'Identification','Identification',30,1,NULL,0,NULL,NULL,NULL,1,'Texto','VarChar',1,0,'08B5B3E4-A5C5-4BCD-B8F0-2045B78B5C56',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('F2FF79FF-05AB-4C2D-9B52-7130D2F587F0','Estado','Estado de la novedad',0,NULL,NULL,1000,0,'Check',0,NULL,NULL,'Pendiente,Aprobada,Cerrada,Cancelada',0,'Lista','VarChar',1,0,'3570EC86-9BDD-4525-8D3A-7AD315ED5346',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('F58A96FE-B2AA-4F1C-B5CB-7309669B3CB0','FechaGeneracion','Fecha de creación',0,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,0,'DateTime','DateTime',1,0,'E60238E1-6CF3-4DAD-8B7C-DD4261F157DC',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'NOW',NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('A01755C5-EC85-4734-B88A-781DB4138D2C','UserEmail','UserEmail',0,'UserEmail','UserEmail',100,0,NULL,0,NULL,NULL,NULL,0,'Texto','VarChar',0,0,'EB1F5413-3216-4DBB-A8E2-A6B5BC64E0D8',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('B87621CE-85D5-4A40-BA2A-68B122A9680D','HorasTrabajo','Horas de trabajo',0,NULL,NULL,NULL,0,'Check',0,NULL,NULL,NULL,0,'Entero','Int',1,0,'E959DF9E-E04D-49D9-8CD3-71D644BDB880',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,0,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('45AD1BC2-A52A-4252-95C3-7AE2A3CBB175','Nombre','Nombre',0,'Campo de tipo texto para el nombre completo del empleado.',NULL,200,0,'Check',0,NULL,NULL,NULL,0,'Texto','VarChar',1,0,'BF761567-A014-4DA0-BF7E-A41D96882886',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('C5E15E3F-9096-40ED-80DE-73CE3E710B74','CENombre','Nombre',1,'Nombre','Nombre',200,0,NULL,1,NULL,NULL,NULL,1,'Texto','VarChar',1,0,'83652E59-67DC-45E1-8EC8-1F4F575F316D',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('1DFB727D-9DB9-4C1E-B94A-7DFEFBACA6A0','IdTurno','Id del turno',0,'Campo de tipo texto para el Id del turno',NULL,100,0,'Check',0,NULL,NULL,NULL,0,'Texto','VarChar',1,0,'F4B2601F-A657-4CE4-87ED-D3507CC8FF46',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('7C1C7889-5618-4189-B1F4-783E3E0FF9B8','Edited_date','Edited_date',0,'Edited_date','Edited_date',NULL,0,NULL,0,NULL,NULL,NULL,1,'Fecha','DateTime',0,0,'EB1F5413-3216-4DBB-A8E2-A6B5BC64E0D8',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,'Now',NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('95D867FA-323C-4001-9EB8-839A098E617A','Id','Coomeva_Lappiz_HorarioCAVEspecialId',1,'Clave primaria de Horario CAV  especial','Clave primaria de Horario CAV  especial',NULL,1,NULL,0,NULL,NULL,NULL,0,'ClavePrimaria','UniqueIdentifier',0,0,'EB1F5413-3216-4DBB-A8E2-A6B5BC64E0D8',1,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('CEEA0C6A-C9B2-40E1-B72F-815531DD3F54','Servicio','Servicio',0,'Campo de tipo lista para establecer el tipo de servicio realizado por la atención.',NULL,1000,0,'Check',0,NULL,NULL,'Móvil,Hogar',0,'Lista','VarChar',1,0,'F4B2601F-A657-4CE4-87ED-D3507CC8FF46',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('25D8ABD1-872A-4D45-84C3-8DB9D7F6F0DE','HorarioApertura','Apertura',0,NULL,NULL,50,0,'Check',0,NULL,NULL,NULL,0,'Time','VarChar',1,0,'83652E59-67DC-45E1-8EC8-1F4F575F316D',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('2BC7DEDF-C17A-45A8-953F-7B3FAC8499E0','FechaEspecificada','Fecha especificada',0,NULL,NULL,NULL,0,'Check',0,NULL,NULL,NULL,0,'DateTime','DateTime',1,0,'EB1F5413-3216-4DBB-A8E2-A6B5BC64E0D8',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('0DD372A5-24CE-4CE3-BFDB-8AEB5A3FB49A','Id','Coomeva_Lappiz_TurnoId',1,'Clave primaria de Turno','Clave primaria de Turno',NULL,1,NULL,0,NULL,NULL,NULL,0,'ClavePrimaria','UniqueIdentifier',0,0,'E60238E1-6CF3-4DAD-8B7C-DD4261F157DC',1,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('F6E31C6C-6B53-409D-BEE3-8B806143F90A','Edited_date','Edited_date',0,'Edited_date','Edited_date',NULL,0,NULL,0,NULL,NULL,NULL,1,'Fecha','DateTime',0,0,'F4B2601F-A657-4CE4-87ED-D3507CC8FF46',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,'Now',NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('A9945714-85F5-46DB-9183-8CC1AFEF556A','NroNovedad','NroNovedad',0,NULL,NULL,38,0,'Check',0,NULL,1,NULL,0,'AutoNumerico','Decimal',1,0,'3570EC86-9BDD-4525-8D3A-7AD315ED5346',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('482C8CF9-9648-4F60-A728-8E3E09ECD362','TipoNovedad','Tipo de novedad',0,NULL,NULL,1000,0,'Check',0,NULL,NULL,'Cambio de turno,Ausencia,Solicitud',0,'Lista','VarChar',1,0,'3570EC86-9BDD-4525-8D3A-7AD315ED5346',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('76292ECB-65B6-4BE4-85E4-9423AE230426','HorasAsignadas','Horas asignadas',0,NULL,NULL,50,0,'Check',0,NULL,NULL,NULL,0,'Time','VarChar',1,0,'E60238E1-6CF3-4DAD-8B7C-DD4261F157DC',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('31A78140-C1CF-429E-89C3-90019F5979CF','Edited_by','Edited_by',0,'Edited_by','Edited_by',100,0,NULL,0,NULL,NULL,NULL,1,'Texto','UniqueIdentifier',0,0,'E959DF9E-E04D-49D9-8CD3-71D644BDB880',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,'CurrentUserId',NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('914427F2-A86D-4E48-A537-9779A9DBB844','Activo','Activo',0,'Activo','Activo',NULL,0,NULL,0,NULL,NULL,NULL,0,'Check','Bit',1,0,'08B5B3E4-A5C5-4BCD-B8F0-2045B78B5C56',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('51821C9E-05C8-41CD-805A-83AC1F3AA050','Identificacion','Identificación',0,'Campo de tipo texto para la identificación.',NULL,50,0,'Check',0,NULL,NULL,NULL,0,'Texto','VarChar',1,0,'BF761567-A014-4DA0-BF7E-A41D96882886',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('1B4FCB76-224E-4058-BAC5-95CBAA2F2C23','Turno','Turno afectado',0,NULL,NULL,500,0,NULL,0,NULL,NULL,NULL,0,'Relacion','UniqueIdentifier',1,1,'3570EC86-9BDD-4525-8D3A-7AD315ED5346',0,'E60238E1-6CF3-4DAD-8B7C-DD4261F157DC','Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('436C2AAD-46F7-433F-9A06-8ED6C9B8183A','CEObservacion','Observacion',0,'Observacion','Observacion',200,0,NULL,1,NULL,NULL,NULL,1,'Texto','VarChar',1,0,'BF761567-A014-4DA0-BF7E-A41D96882886',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('D74472E6-7525-43DC-B57E-9E0887087698','TiempoDesplazamiento','Tiempo de desplazamiento',0,'Campo de tipo hora para el tiempo de desplazamiento',NULL,50,0,'Check',0,NULL,NULL,NULL,0,'Time','VarChar',1,0,'F4B2601F-A657-4CE4-87ED-D3507CC8FF46',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'now',NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('4D6A76A5-1CBE-4042-99B1-977B70CF0619','Edited_date','Edited_date',0,'Edited_date','Edited_date',NULL,0,NULL,0,NULL,NULL,NULL,1,'Fecha','DateTime',0,0,'3570EC86-9BDD-4525-8D3A-7AD315ED5346',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,'Now',NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('5C6D9C26-6140-4B65-9B65-A3CCCA593480','Edited_by','Edited_by',0,'Edited_by','Edited_by',100,0,NULL,0,NULL,NULL,NULL,1,'Texto','UniqueIdentifier',0,0,'EB1F5413-3216-4DBB-A8E2-A6B5BC64E0D8',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,'CurrentUserId',NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('45D745BB-BA41-4E87-9D07-A23B6572B9B3','Id','Coomeva_Lappiz_UsersId',1,'Clave primaria de User','Clave primaria de User',NULL,1,NULL,0,NULL,NULL,NULL,0,'ClavePrimaria','UniqueIdentifier',0,0,'08B5B3E4-A5C5-4BCD-B8F0-2045B78B5C56',1,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('DACDED03-5ECA-439D-B629-A67F8BD07C73','UserEmail','UserEmail',0,'UserEmail','UserEmail',100,0,NULL,0,NULL,NULL,NULL,0,'Texto','VarChar',0,0,'E60238E1-6CF3-4DAD-8B7C-DD4261F157DC',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('13EE3B71-6738-463B-BB54-A0E1B399229E','UserEmail','UserEmail',0,'UserEmail','UserEmail',100,0,NULL,0,NULL,NULL,NULL,0,'Texto','VarChar',0,0,'08B5B3E4-A5C5-4BCD-B8F0-2045B78B5C56',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('3B61F1A8-F199-48A3-80A6-A817228498D6','Id','Coomeva_Lappiz_EmpleadosId',1,'Clave primaria de Empleado','Clave primaria de Empleado',NULL,1,NULL,0,NULL,NULL,NULL,0,'ClavePrimaria','UniqueIdentifier',0,0,'BF761567-A014-4DA0-BF7E-A41D96882886',1,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('5DE9335D-9137-46DB-A86E-A4EA39F321A0','Phone','Phone',0,'Phone','Phone',50,0,NULL,0,NULL,NULL,NULL,1,'Texto','VarChar',1,0,'08B5B3E4-A5C5-4BCD-B8F0-2045B78B5C56',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('DE4D0F87-8125-4AE1-B31E-AAC32483C6F5','IpAddress','IpAddress',0,'IpAddress','IpAddress',100,0,NULL,0,NULL,NULL,NULL,0,'Texto','VarChar',0,0,'EB1F5413-3216-4DBB-A8E2-A6B5BC64E0D8',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('CC413761-65F2-4961-AAC0-AD5CEEF66BEF','HorarioCierre','Cierre',0,NULL,NULL,50,0,'Check',0,NULL,NULL,NULL,0,'Time','VarChar',1,0,'EB1F5413-3216-4DBB-A8E2-A6B5BC64E0D8',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('D01CDFB7-B791-4723-8403-AFC05A15AB5E','IpAddress','IpAddress',0,'IpAddress','IpAddress',100,0,NULL,0,NULL,NULL,NULL,0,'Texto','VarChar',0,0,'F4B2601F-A657-4CE4-87ED-D3507CC8FF46',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('32639AD9-8D71-45B0-8309-AAC883A9668F','EsFinSemana','Es fin de semana?',0,NULL,NULL,NULL,0,'Check',0,NULL,NULL,NULL,0,'Check','Bit',1,0,'E60238E1-6CF3-4DAD-8B7C-DD4261F157DC',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('BB833BD2-6230-4EF0-8012-B4E915998DD8','Id','Coomeva_Lappiz_CAVId',1,'Clave primaria de Centro de antención de ventas','Clave primaria de Centro de antención de ventas',NULL,1,NULL,0,NULL,NULL,NULL,0,'ClavePrimaria','UniqueIdentifier',0,0,'83652E59-67DC-45E1-8EC8-1F4F575F316D',1,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('E7FDCFAB-AF11-4570-BBD1-A69D95BDACAB','HorarioApertura','Apertura',0,NULL,NULL,50,0,'Check',0,NULL,NULL,NULL,0,'Time','VarChar',1,0,'EB1F5413-3216-4DBB-A8E2-A6B5BC64E0D8',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('87441058-9802-4C05-BE0B-A70A2AF1B596','Descripcion','Descripcion',0,NULL,NULL,-1,0,'Check',0,NULL,NULL,NULL,0,'AreaDeTexto','VarChar',1,0,'83652E59-67DC-45E1-8EC8-1F4F575F316D',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('20199FF7-49E7-4CAE-A3C5-A9B99454F555','UserEmail','UserEmail',0,'UserEmail','UserEmail',100,0,NULL,0,NULL,NULL,NULL,0,'Texto','VarChar',0,0,'F4B2601F-A657-4CE4-87ED-D3507CC8FF46',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('A049AB1B-57B0-4DAE-8519-AEB49C3F4DD9','EventType','EventType',0,'EventType','EventType',100,0,NULL,0,NULL,NULL,NULL,0,'Texto','VarChar',0,0,'EB1F5413-3216-4DBB-A8E2-A6B5BC64E0D8',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('CEE0D83A-75C2-445F-9B92-B0C5AC3EFD16','EventType','EventType',0,'EventType','EventType',100,0,NULL,0,NULL,NULL,NULL,0,'Texto','VarChar',0,0,'E60238E1-6CF3-4DAD-8B7C-DD4261F157DC',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('2E502A96-33EA-47C5-8CB0-B9633649483C','HoraInicioDesplazamiento','Hora de inicio de desplazamiento',0,'Campo de tipo hora de desplazamiento',NULL,50,0,'Check',0,NULL,NULL,NULL,0,'Time','VarChar',1,0,'F4B2601F-A657-4CE4-87ED-D3507CC8FF46',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'now',NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('697F370C-6866-49A2-9781-BA154700564B','IpAddress','IpAddress',0,'IpAddress','IpAddress',100,0,NULL,0,NULL,NULL,NULL,0,'Texto','VarChar',0,0,'BF761567-A014-4DA0-BF7E-A41D96882886',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('C8A27AFB-7BC2-40EA-8D42-C65E689388F6','FechaEfectivaFin','Fecha efectiva fin',0,NULL,NULL,NULL,0,'Check',0,NULL,NULL,NULL,0,'DateTime','DateTime',1,0,'3570EC86-9BDD-4525-8D3A-7AD315ED5346',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('4A6B92AE-B9D9-41BA-9515-C5C1831B8358','HoraFin','Hora fin',0,NULL,NULL,50,0,'Check',0,NULL,NULL,NULL,0,'Time','VarChar',1,0,'E60238E1-6CF3-4DAD-8B7C-DD4261F157DC',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('58294C08-620F-4577-95AE-D26BBFA46585','Created_date','Created_date',0,'Created_date','Created_date',NULL,0,NULL,0,NULL,NULL,NULL,1,'Fecha','DateTime',0,0,'BF761567-A014-4DA0-BF7E-A41D96882886',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,'Now',NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('B75B095F-02FF-4E44-8C42-BBE45FF596CA','ColaboradorFK','Colaborador',0,NULL,NULL,500,0,'Check',0,NULL,NULL,NULL,0,'Relacion','UniqueIdentifier',1,1,'E60238E1-6CF3-4DAD-8B7C-DD4261F157DC',0,'E959DF9E-E04D-49D9-8CD3-71D644BDB880','Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('0B3CA231-45B0-4559-8FD9-D591E9306897','EsPreturno','Es pre-turno?',0,NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,0,'Check','Bit',1,0,'E60238E1-6CF3-4DAD-8B7C-DD4261F157DC',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('45C188E0-D339-46C8-9491-CFD42FF58DDA','EventType','EventType',0,'EventType','EventType',100,0,NULL,0,NULL,NULL,NULL,0,'Texto','VarChar',0,0,'83652E59-67DC-45E1-8EC8-1F4F575F316D',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('82BC2250-3E5F-4C81-9557-D0A4DFC9F1A7','Created_by','Created_by',0,'Created_by','Created_by',100,0,NULL,0,NULL,NULL,NULL,1,'Texto','UniqueIdentifier',0,0,'E959DF9E-E04D-49D9-8CD3-71D644BDB880',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,'CurrentUserId',NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('39D5433E-F7CD-4E23-B2EC-CE73C05AF888','Cola','Cola',0,'Campo de tipo lista para establecer la cola del turno de atención.',NULL,1000,0,'Check',0,NULL,NULL,'(G) OC Tramites y PQR,(G) EN Comprar',0,'Lista','VarChar',1,0,'F4B2601F-A657-4CE4-87ED-D3507CC8FF46',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('98E1903F-C852-49B5-92A0-CEA1B09DB7B4','NombreOficina','Nombre oficina',1,'Campo de tipo texto para el nombre de la oficina.',NULL,200,0,NULL,0,NULL,NULL,NULL,0,'Texto','VarChar',1,0,'F4B2601F-A657-4CE4-87ED-D3507CC8FF46',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('89DA9F5B-3379-44B2-8800-D70221D61EF4','UserEmail','UserEmail',0,'UserEmail','UserEmail',100,0,NULL,0,NULL,NULL,NULL,0,'Texto','VarChar',0,0,'3570EC86-9BDD-4525-8D3A-7AD315ED5346',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('08788065-631A-4FE0-9393-D7E96E95277F','Edited_by','Edited_by',0,'Edited_by','Edited_by',100,0,NULL,0,NULL,NULL,NULL,1,'Texto','UniqueIdentifier',0,0,'08B5B3E4-A5C5-4BCD-B8F0-2045B78B5C56',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,'CurrentUserId',NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('D1DA08D5-82E6-4427-8CCB-D6B9746F4B8A','Created_date','Created_date',0,'Created_date','Created_date',NULL,0,NULL,0,NULL,NULL,NULL,1,'Fecha','DateTime',0,0,'F4B2601F-A657-4CE4-87ED-D3507CC8FF46',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,'Now',NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('4A771896-79D2-40D9-B4EC-DF7C5F1FF051','Created_date','Created_date',0,'Created_date','Created_date',NULL,0,NULL,0,NULL,NULL,NULL,1,'Fecha','DateTime',0,0,'83652E59-67DC-45E1-8EC8-1F4F575F316D',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,'Now',NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('84EF4456-F0E0-4E63-967C-E3639DE15C5B','TiempoEspera','Tiempo de espera',0,'Campo de tipo hora para la espera de la atención al turno',NULL,50,0,'Check',0,NULL,NULL,NULL,0,'Time','VarChar',1,0,'F4B2601F-A657-4CE4-87ED-D3507CC8FF46',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'now',NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('8BF76745-97B8-4FDE-892B-E36620884313','Edited_by','Edited_by',0,'Edited_by','Edited_by',100,0,NULL,0,NULL,NULL,NULL,1,'Texto','UniqueIdentifier',0,0,'3570EC86-9BDD-4525-8D3A-7AD315ED5346',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,'CurrentUserId',NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('50F9F6DE-D309-43D4-95BE-E51BCB38CFFC','UserLdap','UserLdap',0,'UserLdap','UserLdap',-1,1,NULL,0,NULL,NULL,NULL,1,'Texto','VarChar',1,0,'08B5B3E4-A5C5-4BCD-B8F0-2045B78B5C56',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('9B381586-33BE-4D9F-894B-E571686ABCFF','HoraInicioAtencion','Hora de inicio de atención',0,'Campo de tipo hora para establecer el inicio de atención.',NULL,50,0,'Check',0,NULL,NULL,NULL,0,'Time','VarChar',1,0,'F4B2601F-A657-4CE4-87ED-D3507CC8FF46',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('C57B50ED-6DB3-46E5-B0A7-E8B773E2192F','Created_date','Created_date',0,'Created_date','Created_date',NULL,0,NULL,0,NULL,NULL,NULL,1,'Fecha','DateTime',0,0,'E60238E1-6CF3-4DAD-8B7C-DD4261F157DC',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,'Now',NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('9D4A4E18-61B1-40BE-AE3D-ED24E37874E6','Email','Email',1,'Email','Email',200,1,NULL,0,NULL,NULL,NULL,1,'Email','VarChar',1,0,'08B5B3E4-A5C5-4BCD-B8F0-2045B78B5C56',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('283C7CEC-2E90-48AC-8D41-D31473FCAF71','FechaEfectiva','Fecha efectiva inicio',0,NULL,NULL,NULL,0,'Check',0,NULL,NULL,NULL,0,'DateTime','DateTime',1,0,'3570EC86-9BDD-4525-8D3A-7AD315ED5346',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('F088237F-DB7E-45AD-B36D-D3952E1776A3','Edited_date','Edited_date',0,'Edited_date','Edited_date',NULL,0,NULL,0,NULL,NULL,NULL,1,'Fecha','DateTime',0,0,'E60238E1-6CF3-4DAD-8B7C-DD4261F157DC',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,'Now',NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('E84EF24D-01C8-4B2D-9C29-EAB78A96B4B2','UsuarioFK','Generado por',0,NULL,NULL,500,0,NULL,0,NULL,NULL,NULL,0,'Relacion','UniqueIdentifier',1,1,'E60238E1-6CF3-4DAD-8B7C-DD4261F157DC',0,'08B5B3E4-A5C5-4BCD-B8F0-2045B78B5C56','Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'sessionStorage.userId',NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('50F55868-390C-41A1-9069-EE38C9CD7A33','UserEmail','UserEmail',0,'UserEmail','UserEmail',100,0,NULL,0,NULL,NULL,NULL,0,'Texto','VarChar',0,0,'83652E59-67DC-45E1-8EC8-1F4F575F316D',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('6149E223-4314-4E74-8325-F38CD7415656','CavFk','CAV',0,NULL,NULL,500,0,'Check',0,NULL,NULL,NULL,0,'Relacion','UniqueIdentifier',1,1,'08B5B3E4-A5C5-4BCD-B8F0-2045B78B5C56',0,'83652E59-67DC-45E1-8EC8-1F4F575F316D','Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('5068868A-BFBA-4CC0-B582-FB01818C7B1E','Usuario','Usuario',0,'Campo de tipo de texto para el usuario.',NULL,100,0,'Check',0,NULL,NULL,NULL,0,'Texto','VarChar',1,0,'F4B2601F-A657-4CE4-87ED-D3507CC8FF46',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('076B4CB3-F92C-435E-B237-F8AD75E75433','Created_by','Created_by',0,'Created_by','Created_by',100,0,NULL,0,NULL,NULL,NULL,1,'Texto','UniqueIdentifier',0,0,'08B5B3E4-A5C5-4BCD-B8F0-2045B78B5C56',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,'CurrentUserId',NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('F1D0329A-1BEF-4483-8D08-FDAB8AA424CA','Edited_date','Edited_date',0,'Edited_date','Edited_date',NULL,0,NULL,0,NULL,NULL,NULL,1,'Fecha','DateTime',0,0,'08B5B3E4-A5C5-4BCD-B8F0-2045B78B5C56',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,'Now',NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('E9B8BC24-6F5B-41CC-B4DE-CF1BA4CE44CD','AuthType','Tipo de autenticación',0,'Tipo de autenticación','Tipo de autenticación',250,0,NULL,0,NULL,NULL,'Lappiz,OTP,AD',1,'Lista','VarChar',1,0,'08B5B3E4-A5C5-4BCD-B8F0-2045B78B5C56',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('ACA61246-A849-4E38-9FE8-F7B22112B540','EventType','EventType',0,'EventType','EventType',100,0,NULL,0,NULL,NULL,NULL,0,'Texto','VarChar',0,0,'F4B2601F-A657-4CE4-87ED-D3507CC8FF46',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('B00413CA-7A63-4374-8289-FBE1779B0EEF','HorasTrabajo','Horas',0,'Campos de tipo numérico para horas de trabajo.',NULL,NULL,0,'Check',0,NULL,NULL,NULL,0,'Entero','Int',1,0,'BF761567-A014-4DA0-BF7E-A41D96882886',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('F2AFCF68-68F4-464C-B865-FDE945D29A35','Edited_by','Edited_by',0,'Edited_by','Edited_by',100,0,NULL,0,NULL,NULL,NULL,1,'Texto','UniqueIdentifier',0,0,'F4B2601F-A657-4CE4-87ED-D3507CC8FF46',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,'CurrentUserId',NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('481436E7-D494-4582-B0B7-FE75C8737A50','CETipoDia','Tipo día',0,'TipoDia','TipoDia',1000,0,NULL,1,NULL,NULL,'Festivo,Fin de semana',1,'Lista','VarChar',1,0,'EB1F5413-3216-4DBB-A8E2-A6B5BC64E0D8',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('DDF0F8BF-4952-430F-B74F-F2E5EDA4E3A8','IpAddress','IpAddress',0,'IpAddress','IpAddress',100,0,NULL,0,NULL,NULL,NULL,0,'Texto','VarChar',0,0,'83652E59-67DC-45E1-8EC8-1F4F575F316D',0,NULL,'Activo',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,1,1,NULL,NULL,0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('3E3CA97C-20D3-4174-981B-FF4F5719A12C','CAVFK','Cav',0,'Campo de tipo relación para el cav.',NULL,500,0,'Check',0,NULL,NULL,NULL,0,'Relacion','UniqueIdentifier',1,1,'BF761567-A014-4DA0-BF7E-A41D96882886',0,'83652E59-67DC-45E1-8EC8-1F4F575F316D','Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [Campos] ([CampoId],[Code],[Name],[IsRequired],[Description],[ToolTip],[Length],[IsUnique],[ResultType],[Default],[Scala],[StartNumber],[Values],[IsAlphabetic],[Type],[SqlType],[IsVisible],[IsClaveForanea],[TablaId],[IsClavePrimaria],[TablaLlaveForaneaId],[Estado],[FechaDeBaja],[MinLength],[MinDate],[IsEditable],[Divisa],[UrlImagen],[MinValue],[MaxValue],[DefaultValue],[FilterId],[IsMultiple],[Format],[CascadeCombo],[CascadeComboParent],[BlockDelete],[BlockConfiguration],[Formula],[ExternalStorage],[InMemory],[Implementation],[localStorage],[ConfigFtpId],[IsCircularity],[DBFieldMode],[IsSpeech],[Configuration],[Validators],[FolderFunction])VALUES('6C1215F9-CC6C-4FB9-8365-FF3EB3EB9C59','Cargo','Cargo',0,'Campo de tipo texto para establecer el cargo.',NULL,100,0,'Check',0,NULL,NULL,NULL,0,'Texto','VarChar',1,0,'BF761567-A014-4DA0-BF7E-A41D96882886',0,NULL,'Activo',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,'Image',NULL,NULL,0,0,NULL,'No',0,NULL,0,NULL,0,'New',0,NULL,NULL,NULL)
GO
INSERT INTO [DetallesTemplates] ([DetallesTemplateId],[CampoId],[CampoTemplateId],[Order])VALUES('0E224C7F-8290-40A5-9527-740890F6C3FF','22E91957-9728-43C1-9C1A-3665FA0DB703','5841005F-009F-4080-952D-442363DCAFF7',1)
GO
INSERT INTO [DetallesTemplates] ([DetallesTemplateId],[CampoId],[CampoTemplateId],[Order])VALUES('7ED1A2DF-9417-493D-8EE5-3D0A2EA238F8','29AEF97E-C6C2-4BDF-A772-0A5DCDC84757','A82453D4-4876-4CAC-9A03-6F6671302647',2)
GO
INSERT INTO [DetallesTemplates] ([DetallesTemplateId],[CampoId],[CampoTemplateId],[Order])VALUES('84257FBB-C43C-4F13-A261-F467E5915460','3B3B9B34-1B46-468D-A84D-0143B643B1CD','C5E15E3F-9096-40ED-80DE-73CE3E710B74',1)
GO
INSERT INTO [DetallesTemplates] ([DetallesTemplateId],[CampoId],[CampoTemplateId],[Order])VALUES('EE98AA7E-1F61-4B87-8832-63D75353B3C3','29AEF97E-C6C2-4BDF-A772-0A5DCDC84757','C5E15E3F-9096-40ED-80DE-73CE3E710B74',1)
GO
INSERT INTO [DetallesTemplates] ([DetallesTemplateId],[CampoId],[CampoTemplateId],[Order])VALUES('1268766F-F48D-4C63-AC9E-F733F4F4D312','818BEE0E-23DD-4FDE-9126-46FEAD390AF1','C5E15E3F-9096-40ED-80DE-73CE3E710B74',1)
GO
INSERT INTO [DetallesTemplates] ([DetallesTemplateId],[CampoId],[CampoTemplateId],[Order])VALUES('F20A0493-078D-4334-AD61-31C676771D61','6149E223-4314-4E74-8325-F38CD7415656','C5E15E3F-9096-40ED-80DE-73CE3E710B74',1)
GO
INSERT INTO [DetallesTemplates] ([DetallesTemplateId],[CampoId],[CampoTemplateId],[Order])VALUES('E32EE442-335D-4007-BCD0-C22B83341602','818BEE0E-23DD-4FDE-9126-46FEAD390AF1','A82453D4-4876-4CAC-9A03-6F6671302647',2)
GO
INSERT INTO [DetallesTemplates] ([DetallesTemplateId],[CampoId],[CampoTemplateId],[Order])VALUES('AF664378-63A6-409F-9C48-C846384FC13F','B75B095F-02FF-4E44-8C42-BBE45FF596CA','9A83983E-902C-4492-B3AE-2C357B567795',2)
GO
INSERT INTO [DetallesTemplates] ([DetallesTemplateId],[CampoId],[CampoTemplateId],[Order])VALUES('F42B90D2-CAB9-45DB-B066-8C4668D094F8','6149E223-4314-4E74-8325-F38CD7415656','87441058-9802-4C05-BE0B-A70A2AF1B596',2)
GO
INSERT INTO [DetallesTemplates] ([DetallesTemplateId],[CampoId],[CampoTemplateId],[Order])VALUES('CBA1A685-8669-4595-AACC-26F8AB007CFA','1B4FCB76-224E-4058-BAC5-95CBAA2F2C23','D3A89F1D-573D-4765-81E8-3F1A5304F364',1)
GO
INSERT INTO [DetallesTemplates] ([DetallesTemplateId],[CampoId],[CampoTemplateId],[Order])VALUES('264EF90A-71F2-4700-ABB2-B542D12E2F19','B75B095F-02FF-4E44-8C42-BBE45FF596CA','5841005F-009F-4080-952D-442363DCAFF7',1)
GO
INSERT INTO [DetallesTemplates] ([DetallesTemplateId],[CampoId],[CampoTemplateId],[Order])VALUES('6A7C7A82-6E50-4773-B022-D8EEB3192347','E84EF24D-01C8-4B2D-9C29-EAB78A96B4B2','89C8342D-1BD6-4199-9DD2-70DFEA105777',2)
GO
INSERT INTO [DetallesTemplates] ([DetallesTemplateId],[CampoId],[CampoTemplateId],[Order])VALUES('267AEF39-AE4E-4ACA-87F5-31BCEB59CEC0','E84EF24D-01C8-4B2D-9C29-EAB78A96B4B2','45BA4D4E-D655-429F-BB19-668E43B60CB8',1)
GO
INSERT INTO [DetallesTemplates] ([DetallesTemplateId],[CampoId],[CampoTemplateId],[Order])VALUES('86B1CFFE-4626-4A83-8C87-5E236EBAA621','3E3CA97C-20D3-4174-981B-FF4F5719A12C','C5E15E3F-9096-40ED-80DE-73CE3E710B74',1)
GO
INSERT INTO [FormsEvents] ([FormsEventId],[Description],[Implementation],[EntityId],[EventTypeName],[Order],[IsBackend],[IsDisabled])VALUES('BF94BD7A-E0F1-4EE4-A799-0C1B24FDFA05','generateMallaConReferencia','function generateMallaConReferencia() {
  // Metodo encargado para ejecutar una lappoz function
  let nameFunction = ''GenerarMalla'';
  let lappizFunctionId = ''8da03ff7-3c8c-433c-b476-dcaf53396be0'';
  let method = ''POST'';
  let body = { idCav: JSON.parse(sessionStorage.LappizUser).CavFk, referenceMonth: {start: sessionStorage.fechaFiltroInicio, end: sessionStorage.fechaFiltroFin} };
  let config = { nameFunction, lappizFunctionId, body, method };
  execLF(config).then(success => {
    const message = success.message;
    Swal.fire({
      title: ''Recomendaciones'',
      html: `
    <div style="
      max-height: 400px; 
      overflow-y: auto; 
      text-align: left; 
      white-space: pre-wrap; 
      font-size: 14px; 
      line-height: 1.5;
    ">
      ${message}
    </div>
  `,
      width: ''60%'',
      confirmButtonText: ''Entendido'',
      confirmButtonColor: ''#3085d6'',
      background: ''#fefefe'',
      backdrop: `
    rgba(0,0,0,0.5)
    left top
    no-repeat
  `,
      scrollbarPadding: false,
      showCloseButton: true,
      customClass: {
        popup: ''rounded-2xl shadow-lg'',
        confirmButton: ''text-sm px-4 py-2'',
      }
    });
    
    addMonth(sessionStorage.fechaFiltroFin);
    addMonth(sessionStorage.fechaFiltroInicio);
    document.getElementsByClassName(''k-i-reload'')[0].click()
  }).catch(error => {
    console.log(error)
  })
}
function addMonth(path) {
  let fechaStr = sessionStorage.getItem(path);
  let fecha = new Date(fechaStr);
  fecha.setMonth(fecha.getMonth() + 1);
  let nuevaFecha = fecha.toISOString();
  sessionStorage.setItem(path, nuevaFecha);
}','E60238E1-6CF3-4DAD-8B7C-DD4261F157DC','General',0,0,0)
GO
INSERT INTO [FormsEvents] ([FormsEventId],[Description],[Implementation],[EntityId],[EventTypeName],[Order],[IsBackend],[IsDisabled])VALUES('D4114EF9-462C-46A0-9C44-33D2A822ABA8','Aprobar novedad','function aprobarNovedad() {
  const data = e.dataItem;

  notificationToast(''success'', ''Novedad Aprobada'');
  let email = ''supervisor.mallas@yopmail.com'';
  let subject = ''Aprobación de novedad '' + e.dataItem.NroNovedad;
  let text = '''';
  let HTML = `<div style="max-width:600px;margin:20px auto;background-color:#fff;border-radius:8px;box-shadow:0 4px 8px rgba(0,0,0,0.1);overflow:hidden;font-family:Arial,sans-serif;background-color:#f4f4f4;">
    <div style="background-color:#e53e3e;color:#fff;padding:20px;text-align:center;">
        <h2>Novedad Cancelada</h2>
    </div>
    <div style="padding:20px;text-align:center;">
        <h1 style="color:#2d3748;margin-top:0;">Hola,</h1>
        <p style="color:#4a5568;line-height:1.6;">Queremos informarte que la novedad con número <strong>#{{e.dataItem.NroNovedad}}</strong> ha sido cancelada exitosamente.</p>
        <p style="color:#4a5568;line-height:1.6;">Si tienes alguna pregunta o inquietud, por favor, no dudes en contactarnos.</p>
    </div>
    <div style="background-color:#cbd5e0;padding:10px;text-align:center;color:#4a5568;font-size:12px;">
        <p style="margin:0;">&copy; 2024 Lappiz. Todos los derechos reservados.</p>
    </div>
</div>`;
  let smtpsender = ''aws'';

  // sendEmail(smtpsender, email, subject, text, HTML).then(function (response) {
  //     toastr.info("Se ha notificado al supervisor acerca del cambio")

  // });

  let CavFk = JSON.parse(sessionStorage.LappizUser).CavFk;

  let query = `SELECT T.Id,T.ColaboradorFk, T.FechaInicio, T.HoraFin, C.CENombre FROM Coomeva_Lappiz_Turno as T 
    join Coomeva_Lappiz_Colaborador as C 
    on T.ColaboradorFk = C.Id WHERE FORMAT(T.FechaInicio, ''yyyy-MM-dd'') = 
    (SELECT FORMAT(FechaEfectiva, ''yyyy-MM-dd'') 
    FROM Coomeva_Lappiz_Novedades WHERE id = ''${data.Id}'') AND T.CavFk = ''${CavFk}'' `;
  execQuery(query).then(function (responseQuery) {
    let jsonTurnos = responseQuery[0];
    let infoNovedad = `Tipo de Novedad: ${data.TipoNovedad}, Id del colaborador: ${data.ColaboradorFk}, Fecha de la novedad: ${data.FechaEfectiva}`

    // Metodo encargado para ejecutar una lappoz function
    let nameFunction = ''GenerarRecomendacionNovedad'';
    let lappizFunctionId = ''d5b768f8-09ac-4196-b4fe-dc2206578473'';
    let method = ''POST'';
    let body = {
      jsonTurnos: jsonTurnos,
      infoNovedad: infoNovedad
    }

    let config = { nameFunction, lappizFunctionId, body, method }
    execLF(config).then(success => {
      const message = success.message;
      Swal.fire({
        title: ''Recomendaciones'',
        html: `
    <div style="
      max-height: 400px; 
      overflow-y: auto; 
      text-align: left; 
      white-space: pre-wrap; 
      font-size: 14px; 
      line-height: 1.5;
    ">
      ${message}
    </div>
  `,
        width: ''60%'',
        confirmButtonText: ''Entendido'',
        confirmButtonColor: ''#3085d6'',
        background: ''#fefefe'',
        backdrop: `
    rgba(0,0,0,0.5)
    left top
    no-repeat
  `,
        scrollbarPadding: false,
        showCloseButton: true,
        customClass: {
          popup: ''rounded-2xl shadow-lg'',
          confirmButton: ''text-sm px-4 py-2'',
        }
      });
    }).catch(error => {
      console.log(error)
    })
  });

}','3570EC86-9BDD-4525-8D3A-7AD315ED5346','General',0,0,0)
GO
INSERT INTO [FormsEvents] ([FormsEventId],[Description],[Implementation],[EntityId],[EventTypeName],[Order],[IsBackend],[IsDisabled])VALUES('C92C428B-AFC6-4FD3-83A2-4661968ACBF3','cancelar novedad','function cancelarNovedad() {
    (async () => {
        const sw = await confirmAlert(''warning'', ''¿Esta seguro de cancelar esta novedad?'');
        if (sw) {
            notificationToast(''error'', ''Novedad cancelada'');
            let email = ''supervisor.mallas@yopmail.com'';
            let subject = ''Cancelación de novedad '' + e.dataItem.NroNovedad;
            let text = '''';
            let HTML = `<div style="max-width:600px;margin:20px auto;background-color:#fff;border-radius:8px;box-shadow:0 4px 8px rgba(0,0,0,0.1);overflow:hidden;font-family:Arial,sans-serif;background-color:#f4f4f4;">
    <div style="background-color:#e53e3e;color:#fff;padding:20px;text-align:center;">
        <h2>Novedad Cancelada</h2>
    </div>
    <div style="padding:20px;text-align:center;">
        <h1 style="color:#2d3748;margin-top:0;">Hola,</h1>
        <p style="color:#4a5568;line-height:1.6;">Queremos informarte que la novedad con número <strong>#{{e.dataItem.NroNovedad}}</strong> ha sido cancelada exitosamente.</p>
        <p style="color:#4a5568;line-height:1.6;">Si tienes alguna pregunta o inquietud, por favor, no dudes en contactarnos.</p>
    </div>
    <div style="background-color:#cbd5e0;padding:10px;text-align:center;color:#4a5568;font-size:12px;">
        <p style="margin:0;">&copy; 2024 Lappiz. Todos los derechos reservados.</p>
    </div>
</div>`;
            let smtpsender = ''lappiz'';

            sendEmail(smtpsender, email, subject, text, HTML)
        } else {
            notificationToast(''info'', ''No se cancelo la novedad'');
        }
    })()
}','3570EC86-9BDD-4525-8D3A-7AD315ED5346','General',0,0,0)
GO
INSERT INTO [FormsEvents] ([FormsEventId],[Description],[Implementation],[EntityId],[EventTypeName],[Order],[IsBackend],[IsDisabled])VALUES('185D0C05-331A-4557-B362-6462D1919A97','CargarMallas','setTimeout(function() {
    const query_mallas = ''select * from VistaTurnosDetallados''
    execQuery(query_mallas).then(function(response){
        let data = response[0];
        
        kendo.jQuery("#grid_mallas").kendoGrid({
        dataSource: data, // Aquí se asigna la variable
        height: 550,
        sortable: true,
        reorderable: true,
        resizable: true,
        groupable: true,
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
        },
        columns: [
            { field: "NombreColaborador", title: "Colaborador", width: "150px" },
            { field: "NombreCAV", title: "CAV", width: "150px" },
            { field: "Lunes", title: "Lunes" },
            { field: "Martes", title: "Martes" },
            { field: "Miercoles", title: "Miércoles" },
            { field: "Jueves", title: "Jueves" },
            { field: "Viernes", title: "Viernes" },
            { field: "Sabado", title: "Sábado" },
            { field: "Domingo", title: "Domingo" }
        ]
    });
    });
}, 100);','E959DF9E-E04D-49D9-8CD3-71D644BDB880','FormLoaded',0,0,0)
GO
INSERT INTO [FormsEvents] ([FormsEventId],[Description],[Implementation],[EntityId],[EventTypeName],[Order],[IsBackend],[IsDisabled])VALUES('D967C892-C324-4F45-875B-A319EBAE337F',NULL,'const appViewId = getAppViewId()
if (appViewId.toLocaleLowerCase() == ''74030db3-f337-4f37-b09d-0fd10c1394fd''.toLocaleLowerCase()) {
    renderDashboard();
} else {
    setTimeout(async function () {
        debugger;
        // --- Configuración y Data Mock (Simulación de API) ---

        // Oficinas disponibles para el selector
        const AVAILABLE_OFFICES = [
            "CAV Bogotá Cra 7",
            "CAV Bogotá Mall Plaza NQS",
            "CAV Bogotá Restrepo"
        ];


        // Función para traducir las claves de las métricas a un formato legible en español
        function translateMetricKey(key) {
            const translations = {
                // Métricas del Modelo
                "mae": "Error Absoluto Medio (MAE)",
                "rmse": "Raíz del Error Cuadrático Medio (RMSE)",
                "r2": "Coeficiente de Determinación (R²)",
                "mape": "Error Porcentual Absoluto Medio (MAPE)",
                // Recursos
                "tiempo_atencion_mediano": "Tiempo Mediano de Atención (minutos)",
                "empleados_promedio_necesarios": "Empleados Promedio Requeridos",
                "empleados_pico": "Empleados en Hora Pico",
                "empleados_minimo": "Empleados Mínimos Requeridos",
                "utilizacion_promedio": "Utilización Promedio (%)",
            };
            return translations[key] || key;
        }

        // Función para dar formato al valor (con sufijo)
        function formatMetricValue(key, value) {
            let suffix = '''';
            let formattedValue = value.toFixed(2);

            if (key === ''utilizacion_promedio'' || key === ''mape'') {
                suffix = ''%'';
            } else if (key === ''tiempo_atencion_mediano'') {
                suffix = '' min'';
            } else if (key === ''empleados_pico'' || key === ''empleados_minimo'' || key === ''empleados_promedio_necesarios'') {
                formattedValue = Math.round(value);
            }

            return `${formattedValue}${suffix}`;
        }

        // --- FUNCIÓN DE FETCH PRINCIPAL (ADAPTADA AL PATRÓN LAPPIZ) ---
        async function fetchReportData(payload, retries = 3) {
            const loadingIA = document.getElementById(''loading-ia'');
            const loadingNormal = document.getElementById(''loading-normal'');
            const loadingDemanda = document.getElementById(''loading-demanda'');
            loadingIA.classList.remove(''d-none'');
            loadingNormal.classList.remove(''d-none'');
            loadingDemanda.classList.remove(''d-none'');

            console.log("Fetching report data with payload:", payload);

            try {
                // Metodo encargado para ejecutar una lappiz function
                let nameFunction = ''prediccion'';
                let lappizFunctionId = ''215754f9-097d-4d46-9926-056bef951cc4'';
                let method = ''POST'';
                let body = {
                    ...payload
                }
                let config = { nameFunction, lappizFunctionId, body, method }

                const response = await execLF(config);
                return { data: response };

            } catch (error) {
                console.error("Error en execLF o usando mock data:", error);
                throw new Error(`Error de conexión o de la función: ${error.message}.`);
            }
        }

        /**
         * Simula la obtención de datos para el resumen global.
         */
        async function fetchSummaryData() {
            const loadingSummary = document.getElementById(''loading-summary'');
            loadingSummary.classList.remove(''d-none'');

            try {
                // Aquí iría la lógica REAL de fetch para el resumen. 
                // Metodo encargado para ejecutar una lappoz function
                let nameFunction = ''resumen'';
                let lappizFunctionId = ''f371ba4e-9eb1-4743-a259-55b027f147f6'';
                let method = ''GET'';
                let body = {}
                let config = { nameFunction, lappizFunctionId, body, method }
                const response = await execLF(config);
                return response;
            } catch (error) {
                console.error("Error al obtener el resumen de métricas:", error);
                throw new Error("Error al cargar el resumen de métricas.");
            } finally {
                loadingSummary.classList.add(''d-none'');
            }
        }

        // --- Procesamiento y Gráficos (HTML/CSS) ---

        /**
         * Transforma la data cruda del API a un mapa de objetos {fecha: {hora: valor}}.
         */
        function processDataForHeatmap(apiDataRows, metricKey) {
            const dataMap = {};
            const values = [];

            apiDataRows.forEach(item => {
                const fecha = item.fecha;
                const hora = item.hora;
                const valor = item[metricKey] || 0;

                if (!dataMap[fecha]) dataMap[fecha] = {};
                dataMap[fecha][hora] = valor;
                values.push(valor);
            });

            const validValues = values.filter(v => typeof v === ''number'' && !isNaN(v));

            if (validValues.length === 0) {
                return { dataMap: {}, min: 0, max: 0, labelsY: [] };
            }

            const min = Math.min(...validValues);
            const max = Math.max(...validValues);
            const labelsY = Object.keys(dataMap).sort(); // Fechas ordenadas

            return { dataMap, min, max, labelsY };
        }

        /**
         * Agrega los datos por hora (calcula el promedio) para el gráfico de barras.
         */
        function aggregateDataForBarChart(apiDataRows, metricKey) {
            // Horas de 8 a 17
            const hoursX = Array.from({ length: 10 }, (_, i) => i + 8);
            const hourlyData = hoursX.map(hour => ({
                hour: hour,
                values: [],
                average: 0
            }));

            apiDataRows.forEach(item => {
                const hourIndex = item.hora - 8;
                if (item.hora >= 8 && item.hora <= 17) {
                    const value = item[metricKey] || 0;
                    hourlyData[hourIndex].values.push(value);
                }
            });

            let maxAvg = 0;
            hourlyData.forEach(data => {
                const sum = data.values.reduce((acc, val) => acc + val, 0);
                data.average = data.values.length > 0 ? sum / data.values.length : 0;
                if (data.average > maxAvg) {
                    maxAvg = data.average;
                }
            });

            return { hourlyData, maxAvg };
        }

        /**
         * Genera un color HSL dinámico basado en un valor normalizado.
         */
        function getColorForValue(normalizedValue, hue) {
            // Lightness (L): 95% (claro) -> 35% (oscuro)
            const lightness = 95 - normalizedValue * 60;
            // Saturation (S): 20% (pálido) -> 80% (vibrante)
            const saturation = 20 + normalizedValue * 60;

            return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        }

        /**
         * Renderiza el mapa de calor usando un Grid de HTML/CSS.
         */
        function renderHtmlHeatmap(containerId, processedData, metricTitle, colorHue) {
            const container = document.getElementById(containerId);
            const { dataMap, min, max, labelsY } = processedData;

            // Limpiar contenido anterior
            container.innerHTML = '''';

            if (labelsY.length === 0) {
                container.innerHTML = ''<p class="text-center text-gray-400 mt-8">No hay datos para mostrar en este rango.</p>'';
                return;
            }

            const hoursX = Array.from({ length: 10 }, (_, i) => i + 8); // Horas de 8 a 17

            const grid = document.createElement(''div'');
            grid.className = ''heatmap-grid'';

            // 1. Cabecera (Etiquetas X)
            grid.innerHTML = ''<div class="heatmap-header">Fecha \\ Hora</div>''; // Celda superior izquierda
            hoursX.forEach(hour => {
                grid.innerHTML += `<div class="heatmap-header">${hour}:00</div>`;
            });

            // 2. Filas de datos (Etiquetas Y + Celdas)
            labelsY.forEach(fecha => {
                // Etiqueta Y (Fecha)
                grid.innerHTML += `<div class="heatmap-label-y">${fecha}</div>`;

                // Celdas de datos
                hoursX.forEach(hour => {
                    const value = dataMap[fecha] ? dataMap[fecha][hour] : null;

                    let cellColor = ''#f9fafb''; // Gris claro (bg-gray-50)
                    let cellText = ''N/D'';
                    let tooltip = `Fecha: ${fecha}\nHora: ${hour}:00\nValor: No disponible`;

                    let cell = document.createElement(''div'');
                    cell.className = ''heatmap-cell'';

                    if (value != null && value != undefined) {
                        const normalized = max === min ? 0.5 : (value - min) / (max - min);
                        cellColor = getColorForValue(normalized, colorHue);
                        cellText = value.toFixed(1);
                        tooltip = `Fecha: ${fecha}\nHora: ${hour}:00\n${metricTitle}: ${value.toFixed(2)}`;

                        if (normalized > 0.7) {
                            cell.style.color = ''white''; // Texto blanco para valores altos
                        } else {
                            cell.style.color = ''#1f2937''; // Texto oscuro
                        }
                    } else {
                        cell.style.color = ''#9ca3af''; // Texto gris para N/D
                    }

                    cell.style.backgroundColor = cellColor;
                    cell.textContent = cellText;
                    cell.title = tooltip; // Usar el atributo title para el tooltip

                    grid.appendChild(cell);
                });
            });

            container.appendChild(grid);

            // Actualizar la leyenda
            updateLegend(containerId.replace(''report'', ''legend''), min, max, colorHue, metricTitle);
        }

        /**
         * Renderiza el gráfico de barras para el promedio horario.
         */
        function renderHtmlBarChart(containerId, data, metricTitle, colorHue) {
            const container = document.getElementById(containerId);
            container.innerHTML = '''';
            const { hourlyData, maxAvg } = data;

            if (maxAvg === 0) {
                container.innerHTML = ''<p class="text-center text-gray-400 mt-8">No hay datos de demanda predicha para mostrar.</p>'';
                return;
            }

            // Añadir Leyenda arriba (similar a los heatmaps)
            const legendDemanda = document.createElement(''div'');
            legendDemanda.id = ''legendDemanda'';
            legendDemanda.className = ''flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 mb-6 items-center'';
            legendDemanda.innerHTML = `<span class="font-bold">${metricTitle}:</span> Promedio por hora durante el periodo. Max: ${maxAvg.toFixed(2)}`;
            container.appendChild(legendDemanda);

            // Grid para el Bar Chart container
            const chartContainer = document.createElement(''div'');
            chartContainer.className = ''bar-chart-container'';

            const maxHeight = 200; // max height in pixels for the tallest bar

            hourlyData.forEach(item => {
                const hour = item.hour;
                const avg = item.average;
                const height = maxAvg > 0 ? (avg / maxAvg) * maxHeight : 0;
                const normalized = maxAvg > 0 ? avg / maxAvg : 0;
                const color = getColorForValue(normalized, colorHue);

                const barWrapper = document.createElement(''div'');
                barWrapper.className = ''bar-chart-bar-wrapper'';
                barWrapper.title = `Hora: ${hour}:00\nPromedio ${metricTitle}: ${avg.toFixed(2)}`;

                const bar = document.createElement(''div'');
                bar.className = ''bar-chart-bar'';
                // Usamos Math.max para asegurar una altura visible para valores pequeños
                bar.style.height = `${Math.max(height, avg > 0 ? 5 : 0)}px`;
                bar.style.backgroundColor = color;

                const labelTop = document.createElement(''div'');
                labelTop.className = ''bar-chart-label-top'';
                labelTop.textContent = avg.toFixed(1);

                const labelBottom = document.createElement(''div'');
                labelBottom.className = ''bar-chart-label-bottom'';
                labelBottom.textContent = `${hour}:00`;

                barWrapper.appendChild(labelTop);
                barWrapper.appendChild(bar);
                barWrapper.appendChild(labelBottom);

                chartContainer.appendChild(barWrapper);
            });

            container.appendChild(chartContainer);
        }

        /**
         * Actualiza la leyenda con los valores min y max de la escala.
         */
        function updateLegend(legendId, min, max, hue, title) {
            const legendEl = document.getElementById(legendId);
            legendEl.innerHTML = '''';

            if (max === min) {
                legendEl.innerHTML = `<span><span class="font-bold">${title}:</span> ${min.toFixed(2)} (Valor único)</span>`;
                return;
            }

            const steps = 5;
            let html = `<span class="font-bold">${title}:</span>`;

            for (let i = 0; i < steps; i++) {
                const normalized = i / (steps - 1);
                const value = min + normalized * (max - min);
                const color = getColorForValue(normalized, hue);

                html += `
                    <div class="flex items-center gap-1">
                        <span class="w-4 h-4 rounded-full shadow-md" style="background-color: ${color};"></span>
                        <span>${value.toFixed(2)}</span>
                    </div>
                `;
            }

            legendEl.innerHTML = html;
        }

        /**
         * Renderiza el resumen global del modelo.
         */
        function renderSummary(summaryData) {
            const container = document.getElementById(''modelSummary'');
            container.innerHTML = ''''; // Limpiar contenido anterior

            if (!summaryData || Object.keys(summaryData).length === 0) {
                container.innerHTML = ''<p class="text-center text-gray-400 mt-8">No se pudo cargar el resumen de métricas.</p>'';
                return;
            }

            let htmlContent = '''';

            // Títulos traducidos para las secciones principales
            const sectionTitles = {
                "metricas_modelo": "Métricas de Evaluación del Modelo",
                "recursos": "Resumen Global de Recursos",
                "oficinas": "Promedio de Tiempo de Espera por Oficina (Global)",
            };

            for (const sectionKey in summaryData) {
                const sectionData = summaryData[sectionKey];
                const title = sectionTitles[sectionKey] || sectionKey;

                htmlContent += `<h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">${title}</h3>`;
                htmlContent += ''<ul class="list-disc ml-6 space-y-1">'';

                for (const metricKey in sectionData) {
                    const value = sectionData[metricKey];
                    const translatedKey = translateMetricKey(metricKey);

                    let formattedValue;

                    if (sectionKey === ''oficinas'') {
                        // En la sección de oficinas, el key es el nombre de la oficina y el valor es el tiempo.
                        formattedValue = `${value.toFixed(2)} min`;
                        htmlContent += `<li class="text-sm">${metricKey}: <span class="font-mono font-bold text-blue-600">${formattedValue}</span></li>`;
                    } else {
                        // Para las demás secciones, se usa la traducción y el formato.
                        formattedValue = formatMetricValue(metricKey, value);
                        htmlContent += `<li class="text-sm">${translatedKey}: <span class="font-mono font-bold text-gray-900">${formattedValue}</span></li>`;
                    }
                }

                htmlContent += ''</ul>'';
            }

            container.innerHTML = htmlContent;
        }

        // --- Lógica del UI y Manejo de Eventos ---

        async function handleGenerateReport() {
            const fechaInicioInput = document.getElementById(''fecha-inicio'');
            const fechaFinInput = document.getElementById(''fecha-fin'');
            const oficinaSelect = document.getElementById(''oficina-select'');
            const errorMessage = document.getElementById(''error-message'');
            const loadingIA = document.getElementById(''loading-ia'');
            const loadingNormal = document.getElementById(''loading-normal'');
            const loadingDemanda = document.getElementById(''loading-demanda'');

            errorMessage.classList.add(''d-none'');

            // Mostrar loaders
            loadingIA.classList.remove(''d-none'');
            loadingNormal.classList.remove(''d-none'');
            loadingDemanda.classList.remove(''d-none'');

            const fecha_inicio = fechaInicioInput.value;
            const fecha_fin = fechaFinInput.value;
            const oficina = oficinaSelect.value;

            if (!fecha_inicio || !fecha_fin || !oficina) {
                errorMessage.textContent = ''Por favor, selecciona una oficina y un rango de fechas.'';
                errorMessage.classList.remove(''d-none'');
                loadingIA.classList.add(''d-none'');
                loadingNormal.classList.add(''d-none'');
                loadingDemanda.classList.add(''d-none'');
                return;
            }

            if (new Date(fecha_inicio) > new Date(fecha_fin)) {
                errorMessage.textContent = ''La fecha de inicio no puede ser posterior a la fecha de fin.'';
                errorMessage.classList.remove(''d-none'');
                loadingIA.classList.add(''d-none'');
                loadingNormal.classList.add(''d-none'');
                loadingDemanda.classList.add(''d-none'');
                return;
            }

            const payload = { fecha_inicio, fecha_fin, oficina };

            try {
                // LLAMADA AL API DE REPORTE (o simulación)
                const apiResponse = await fetchReportData(payload);
                const reportDataRows = apiResponse?.data?.rows || apiResponse?.data || [];

                if (reportDataRows.length === 0) {
                    errorMessage.textContent = ''No se encontraron datos de predicción para los filtros seleccionados.'';
                    errorMessage.classList.remove(''d-none'');
                    document.getElementById(''reportIA'').innerHTML = ''<p class="text-center text-gray-400 mt-8">No hay datos para mostrar en este rango.</p>'';
                    document.getElementById(''report'').innerHTML = ''<p class="text-center text-gray-400 mt-8">No hay datos para mostrar en este rango.</p>'';
                    document.getElementById(''reportDemanda'').innerHTML = ''<p class="text-center text-gray-400 mt-8">No hay datos para mostrar en este rango.</p>'';
                    return;
                }

                // 1. Gráfico IA (Tiempo de Espera Estimado) - Heatmap Rojo (Hue 0)
                const dataIA = processDataForHeatmap(reportDataRows, ''tiempo_espera_estimado'');
                renderHtmlHeatmap(''reportIA'', dataIA, ''Tiempo de Espera (min)'', 0);

                // 2. Gráfico Normal (Cantidad de Empleados Necesarios) - Heatmap Azul (Hue 200)
                const dataEmpleados = processDataForHeatmap(reportDataRows, ''empleados_necesarios'');
                renderHtmlHeatmap(''report'', dataEmpleados, ''Empleados Necesarios'', 200);

                // 3. Gráfico de Barras (Demanda Predicha) - Promedio Horario Verde (Hue 120)
                const dataDemandaBar = aggregateDataForBarChart(reportDataRows, ''demanda_predicha'');
                renderHtmlBarChart(''reportDemanda'', dataDemandaBar, ''Demanda Predicha (Promedio)'', 120);

            } catch (error) {
                console.error("Error al generar el reporte:", error);
                errorMessage.textContent = `Error de Reporte: ${error.message}.`;
                errorMessage.classList.remove(''d-none'');
                document.getElementById(''reportIA'').innerHTML = ''<p class="text-center text-gray-400 mt-8">Error al cargar el reporte.</p>'';
                document.getElementById(''report'').innerHTML = ''<p class="text-center text-gray-400 mt-8">Error al cargar el reporte.</p>'';
                document.getElementById(''reportDemanda'').innerHTML = ''<p class="text-center text-gray-400 mt-8">Error al cargar el reporte.</p>'';
            } finally {
                // Ocultar loaders de gráficos de reporte
                loadingIA.classList.add(''d-none'');
                loadingNormal.classList.add(''d-none'');
                loadingDemanda.classList.add(''d-none'');
            }
        }

        // Función para cargar el resumen al inicio (independiente de los filtros)
        async function loadSummary() {
            try {
                const summaryData = await fetchSummaryData();
                renderSummary(summaryData);
            } catch (error) {
                const container = document.getElementById(''modelSummary'');
                container.innerHTML = `<p class="text-center text-red-500 mt-8">${error.message}</p>`;
            }
        }

        // --- Inicialización de la Aplicación ---
        function initApp() {
            const officeSelect = document.getElementById(''oficina-select'');
            const generateBtn = document.getElementById(''generate-report-btn'');

            // 1. Cargar opciones del selector de oficina
            officeSelect.innerHTML = AVAILABLE_OFFICES.map(office =>
                `<option value="${office}">${office}</option>`
            ).join('''');

            // 2. Establecer fechas por defecto (Últimos 7 días)
            const today = new Date();
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(today.getDate() - 6);

            const formatDate = (date) => date.toISOString().split(''T'')[0];

            document.getElementById(''fecha-inicio'').value = formatDate(sevenDaysAgo);
            document.getElementById(''fecha-fin'').value = formatDate(today);

            // 3. Adjuntar el listener al botón
            generateBtn.addEventListener(''click'', handleGenerateReport);

            // 4. Cargar el Resumen Global de Métricas
            loadSummary();

            // 5. Ejecutar el reporte inicial (con un pequeño retraso para asegurar el DOM)
            setTimeout(handleGenerateReport, 100);
        }
        initApp();

    }, 2000);
}
async function renderDashboard() {
    // Se asegura de que los elementos existan antes de renderizar
    const elementCharts = document.querySelectorAll(''canvas'');
    if (elementCharts.length < 3) {
        setTimeout(renderDashboard, 100);
        return;
    }

    // Llamadas concurrentes a las APIs
    await Promise.all([
        fetchAndRenderNovedades(),
        fetchAndRenderTurnos(),
        fetchAndRenderDemanda()
    ]);
}

// Función para el primer reporte: Novedades por Tipo y Estado
async function fetchAndRenderNovedades() {
    const elementChart = document.getElementById(''novedadesChart'');
    const novedadesCountEl = document.getElementById(''novedades-count'');
    const url = "https://txtest.lappiz.io/Coomeva_Lappiz.api/api/lappiz/get/Coomeva_Lappiz_Novedades";
    const body = {
        "take": 1000, "skip": 0, "page": 1, "pageSize": 1000,
        "filter": { "logic": "and", "filters": [] },
        "includeEntities": "[]", "tenantId": "null",
        "parameters": {
            "userId": "762e5679-60c8-448d-8287-d2cf4e730158",
            "appViewId": "282a5474-287e-4fdb-80bf-d9037ca6372a",
            "pType": "showinmenu", "aType": "view", "environment": "TEST"
        }
    };
    try {
        const response = await fetch(url, {
            method: ''POST'',
            headers: { ''Content-Type'': ''application/json'', ''authorization'': localStorage.Authorization },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        const novedades = data.data?.rows || [];

        novedadesCountEl.textContent = novedades.length;

        const novedadesPorTipo = {};
        novedades.forEach(novedad => {
            const tipo = novedad.TipoNovedad;
            const estado = novedad.Estado;
            if (!novedadesPorTipo[tipo]) novedadesPorTipo[tipo] = {};
            if (!novedadesPorTipo[tipo][estado]) novedadesPorTipo[tipo][estado] = 0;
            novedadesPorTipo[tipo][estado]++;
        });

        const tipos = Object.keys(novedadesPorTipo);
        const estados = [...new Set(novedades.map(n => n.Estado))];
        const backgroundColors = [''#4A90E2'', ''#50E3C2'', ''#F5A623'', ''#BD10E0'', ''#FF2D55''];
        const datasets = estados.map((estado, index) => {
            const dataPoints = tipos.map(tipo => novedadesPorTipo[tipo][estado] || 0);
            return {
                label: `Estado: ${estado}`,
                data: dataPoints,
                backgroundColor: backgroundColors[index % backgroundColors.length],
                borderColor: backgroundColors[index % backgroundColors.length],
                borderWidth: 1
            };
        });

        const ctx = elementChart.getContext(''2d'');
        new Chart(ctx, {
            type: ''bar'',
            data: { labels: tipos, datasets: datasets },
            options: {
                responsive: true,
                scales: { y: { beginAtZero: true }, x: {} },
                plugins: { legend: { position: ''top'' }, title: { display: true, text: ''Novedades por Tipo y Estado'' } }
            }
        });
    } catch (error) {
        console.error("Error al obtener o procesar los datos de Novedades:", error);
    }
}

// Función para el segundo reporte: Turnos por CAV
async function fetchAndRenderTurnos() {
    const elementChart = document.getElementById(''turnosChart'');
    const turnosCountEl = document.getElementById(''turnos-count'');
    const url = "https://txtest.lappiz.io/Coomeva_Lappiz.api/api/lappiz/get/Coomeva_Lappiz_Turno";
    const body = {
        "take": 1000, "skip": 0, "page": 1, "pageSize": 1000,
        "filter": { "logic": "and", "filters": [] },

        "includeEntities": ''[{"model": modelo.Coomeva_Lappiz_CAV, "as": "Coomeva_Lappiz_CAV"}]'', "tenantId": "null",
        "parameters": {
            "userId": "762e5679-60c8-448d-8287-d2cf4e730158",
            "appViewId": "282a5474-287e-4fdb-80bf-d9037ca6372a",
            "pType": "showinmenu", "aType": "view", "environment": "TEST"
        }
    };
    try {
        const response = await fetch(url, {
            method: ''POST'',
            headers: { ''Content-Type'': ''application/json'', ''authorization'': localStorage.Authorization },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        const turnos = data.data?.rows || [];

        turnosCountEl.textContent = turnos.length;

        const turnosPorCAV = {};
        turnos.forEach(turno => {
            const cavNombre = turno.Coomeva_Lappiz_CAV?.CENombre || ''Sin CAV asignado'';
            if (!turnosPorCAV[cavNombre]) turnosPorCAV[cavNombre] = 0;
            turnosPorCAV[cavNombre]++;
        });

        const labels = Object.keys(turnosPorCAV);
        const dataPoints = Object.values(turnosPorCAV);
        const backgroundColors = [''#007BFF'', ''#28A745'', ''#FFC107'', ''#DC3545'', ''#17A2B8'', ''#6610F2''];
        const chartData = {
            labels: labels,
            datasets: [{
                label: ''Número de Turnos'',
                data: dataPoints,
                backgroundColor: backgroundColors,
                borderColor: backgroundColors,
                borderWidth: 1
            }]
        };

        const ctx = elementChart.getContext(''2d'');
        new Chart(ctx, {
            type: ''pie'',
            data: chartData,
            options: {
                responsive: true,
                plugins: { legend: { position: ''top'' }, title: { display: true, text: ''Distribución de Turnos por CAV'' } }
            }
        });
    } catch (error) {
        console.error("Error al obtener o procesar los datos de Turnos:", error);
    }
}

// Función para el tercer reporte: Demanda por CAV en Fechas Especiales
async function fetchAndRenderDemanda() {
    const elementChart = document.getElementById(''demandaChart'');
    const demandaCountEl = document.getElementById(''demanda-count'');
    const url = "https://txtest.lappiz.io/Coomeva_Lappiz.api/api/lappiz/get/Coomeva_Lappiz_HorarioCAVEspecial";
    const body = {
        "take": 1000, "skip": 0, "page": 1, "pageSize": 1000,
        "filter": { "logic": "and", "filters": [] },
        "includeEntities": "[{\"model\": modelo.Coomeva_Lappiz_CAV, \"as\": \"Coomeva_Lappiz_CAV\"}]", "tenantId": "null",
        "parameters": {
            "userId": "762e5679-60c8-448d-8287-d2cf4e730158",
            "appViewId": "282a5474-287e-4fdb-80bf-d9037ca6372a",
            "pType": "showinmenu", "aType": "view", "environment": "TEST"
        }
    };
    try {
        const response = await fetch(url, {
            method: ''POST'',
            headers: { ''Content-Type'': ''application/json'', ''authorization'': localStorage.Authorization },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        const horariosEspeciales = data.data?.rows || [];

        const totalDemanda = horariosEspeciales.reduce((sum, h) => sum + (h.DemandaEstimada || 0), 0);
        demandaCountEl.textContent = totalDemanda;

        const demandaPorCAV = {};
        horariosEspeciales.forEach(horario => {
            const cavNombre = horario.Coomeva_Lappiz_CAV?.CENombre || ''Sin CAV asignado'';
            const demanda = horario.DemandaEstimada || 0;
            if (!demandaPorCAV[cavNombre]) demandaPorCAV[cavNombre] = 0;
            demandaPorCAV[cavNombre] += demanda;
        });

        const labels = Object.keys(demandaPorCAV);
        const dataPoints = Object.values(demandaPorCAV);

        const ctx = elementChart.getContext(''2d'');
        new Chart(ctx, {
            type: ''bar'',
            data: {
                labels: labels,
                datasets: [{
                    label: ''Demanda Estimada'',
                    data: dataPoints,
                    backgroundColor: ''#FF7043'',
                    borderColor: ''#FF7043'',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: { y: { beginAtZero: true }, x: {} },
                plugins: { legend: { display: false }, title: { display: true, text: ''Demanda Estimada por CAV en Fechas Especiales'' } }
            }
        });
    } catch (error) {
        console.error("Error al obtener o procesar los datos de Demanda:", error);
    }
}','08B5B3E4-A5C5-4BCD-B8F0-2045B78B5C56','FormLoaded',0,0,0)
GO
INSERT INTO [FormsEvents] ([FormsEventId],[Description],[Implementation],[EntityId],[EventTypeName],[Order],[IsBackend],[IsDisabled])VALUES('76E6B5BB-F4BB-4A2A-901F-E11A181A146E','Generar malla con optimización','function generateMallaOptimizada() {
  // Metodo encargado para ejecutar una lappoz function
  let nameFunction = ''generateMeshOptimizations'';
  let lappizFunctionId = ''695dfb87-61df-44d2-a45d-d62286fa261b'';
  let method = ''POST'';
  
  let body = { cavId: JSON.parse(sessionStorage.LappizUser).CavFk };
  let config = { nameFunction, lappizFunctionId, body, method };
  
  execLF(config).then(success => {
    const message = success.message;
    Swal.fire({
      title: ''Recomendaciones'',
      html: `
        <div style="
          max-height: 400px; 
          overflow-y: auto; 
          text-align: left; 
          white-space: pre-wrap; 
          font-size: 14px; 
          line-height: 1.5;
        ">
          ${message}
        </div>
      `,
      width: ''60%'',
      confirmButtonText: ''Entendido'',
      confirmButtonColor: ''#3085d6'',
      background: ''#fefefe'',
      backdrop: `
        rgba(0,0,0,0.5)
        left top
        no-repeat
      `,
      scrollbarPadding: false,
      showCloseButton: true,
      customClass: {
        popup: ''rounded-2xl shadow-lg'',
        confirmButton: ''text-sm px-4 py-2'',
      }
    });
  }).catch(error => {
    console.log(error)
  })
}','E60238E1-6CF3-4DAD-8B7C-DD4261F157DC','General',0,0,0)
GO
INSERT INTO [FormsEvents] ([FormsEventId],[Description],[Implementation],[EntityId],[EventTypeName],[Order],[IsBackend],[IsDisabled])VALUES('D8445508-2544-4271-8EC2-EC4DE0CB0562','Call LF to generate Malla de turnos','function generateMalla() {
  // Metodo encargado para ejecutar una lappoz function
  let nameFunction = ''GenerarMalla'';
  let lappizFunctionId = ''8da03ff7-3c8c-433c-b476-dcaf53396be0'';
  let method = ''POST'';
  let body = { idCav: JSON.parse(sessionStorage.LappizUser).CavFk };
  let config = { nameFunction, lappizFunctionId, body, method };
  execLF(config).then(success => {
    const message = success.message;
    Swal.fire({
      title: ''Recomendaciones'',
      html: `
    <div style="
      max-height: 400px; 
      overflow-y: auto; 
      text-align: left; 
      white-space: pre-wrap; 
      font-size: 14px; 
      line-height: 1.5;
    ">
      ${message}
    </div>
  `,
      width: ''60%'',
      confirmButtonText: ''Entendido'',
      confirmButtonColor: ''#3085d6'',
      background: ''#fefefe'',
      backdrop: `
    rgba(0,0,0,0.5)
    left top
    no-repeat
  `,
      scrollbarPadding: false,
      showCloseButton: true,
      customClass: {
        popup: ''rounded-2xl shadow-lg'',
        confirmButton: ''text-sm px-4 py-2'',
      }
    });

  }).catch(error => {
    console.log(error)
  })
}','E60238E1-6CF3-4DAD-8B7C-DD4261F157DC','General',0,0,0)
GO
INSERT INTO [FormsEvents] ([FormsEventId],[Description],[Implementation],[EntityId],[EventTypeName],[Order],[IsBackend],[IsDisabled])VALUES('877DB60D-1C4B-4797-8DDC-EE44904D864D',NULL,'function enableButonSave(){
   const element = document.getElementById(''aea02f50-3a07-4baf-9f53-991b62f8adc2_save'');
    if(element)
        element.disabled = false
    else{
        setTimeout(enableButonSave, 100);
        return;
    }
}
function renderMeses(){
    const meses = [''Enero'', ''Febrero'', ''Marzo'', ''Abril'', ''Mayo'', ''Junio'', ''Julio'', ''Agosto'', ''Septiembre'', ''Octubre'', ''Noviembre'', ''Diciembre''];
    const elementDiv = document.getElementById(''meses'');
    if(!elementDiv){
        setTimeout(renderMeses, 100);
        return;
    }
    let html = '''';
    for(let mes of meses){
        html += `<div id="${mes}" class="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
                <h2 class="text-4xl font-extrabold text-blue-600 mt-2 animate-bounce">${mes}</h2>
            </div>
            `
    }
    elementDiv.innerHTML = html;
    elementDiv.addEventListener(''click'', (event)=>{
        const current = meses.findIndex(x => x == event.target.id);
        if(current>=0){
            let stringDateInit = `2025/${current + 1}/01`
            let stringDateEnd = `2025/${current + 1}/30`
            sessionStorage.fechaFiltroInicio = new Date(stringDateInit).toISOString();
            sessionStorage.fechaFiltroFin = new Date(stringDateEnd).toISOString();
            goLocation(''#/grids?viewName=Coomeva_Lappiz_Turno&workspaceId=fb6a951d-46dc-4a65-8b7b-497449ea39a3&entityId=e60238e1-6cf3-4dad-8b7c-dd4261f157dc&dato=Turnos&appViewId=282a5474-287e-4fdb-80bf-d9037ca6372a'')
        }
    })
}
renderMeses()','E60238E1-6CF3-4DAD-8B7C-DD4261F157DC','FormLoaded',0,0,0)
GO
INSERT INTO [Actions] ([ActionId],[Name],[EntityId],[Type],[QueryString],[FormEventId],[IconAwesomeAction])VALUES('3CC0BEFA-4AC5-4BCF-8EFF-644564756DF8','Malla inicial','E60238E1-6CF3-4DAD-8B7C-DD4261F157DC','Codigo',NULL,'D8445508-2544-4271-8EC2-EC4DE0CB0562','fa-plug')
GO
INSERT INTO [Actions] ([ActionId],[Name],[EntityId],[Type],[QueryString],[FormEventId],[IconAwesomeAction])VALUES('67E35661-9605-4AEF-851F-8D31B701CB20','Malla con base a este mes','E60238E1-6CF3-4DAD-8B7C-DD4261F157DC','Codigo',NULL,'BF94BD7A-E0F1-4EE4-A799-0C1B24FDFA05','fa-th-list')
GO
INSERT INTO [Actions] ([ActionId],[Name],[EntityId],[Type],[QueryString],[FormEventId],[IconAwesomeAction])VALUES('76F5EAE8-B4B0-47D2-963C-B0DADF3CADAF','Cancelar','3570EC86-9BDD-4525-8D3A-7AD315ED5346','Codigo',NULL,'C92C428B-AFC6-4FD3-83A2-4661968ACBF3','fa-times-circle-o')
GO
INSERT INTO [Actions] ([ActionId],[Name],[EntityId],[Type],[QueryString],[FormEventId],[IconAwesomeAction])VALUES('517B4CB6-DA59-4912-9F8F-BF820364C360','Malla optimizada','E60238E1-6CF3-4DAD-8B7C-DD4261F157DC','Codigo',NULL,'76E6B5BB-F4BB-4A2A-901F-E11A181A146E','fa-database')
GO
INSERT INTO [Actions] ([ActionId],[Name],[EntityId],[Type],[QueryString],[FormEventId],[IconAwesomeAction])VALUES('B43B06B0-BAFA-46E9-91F7-F22690479364','Aprobar','3570EC86-9BDD-4525-8D3A-7AD315ED5346','Codigo',NULL,'D4114EF9-462C-46A0-9C44-33D2A822ABA8','fa-check')
GO
INSERT INTO [ViewActions] ([ViewActionId],[AppViewId],[ActionId],[GlobalAction])VALUES('25AEF13A-DBB3-43FA-8AE9-115EC0EAF642','B07C5504-3514-4D0B-B5F6-8DCD47566482','C077DED8-B3DF-4FE5-B851-011297F4A489',0)
GO
INSERT INTO [ViewActions] ([ViewActionId],[AppViewId],[ActionId],[GlobalAction])VALUES('2FC975D7-5317-41F7-817D-29039EF4B92A','44293EE2-E5CC-4E98-ADEB-9767BCFF10AA','C077DED8-B3DF-4FE5-B851-011297F4A489',0)
GO
INSERT INTO [ViewActions] ([ViewActionId],[AppViewId],[ActionId],[GlobalAction])VALUES('02413000-2E35-46C0-8B23-2B02C233E662','282A5474-287E-4FDB-80BF-D9037CA6372A','517B4CB6-DA59-4912-9F8F-BF820364C360',1)
GO
INSERT INTO [ViewActions] ([ViewActionId],[AppViewId],[ActionId],[GlobalAction])VALUES('A7D3DD6B-7D06-4AC3-83E7-5B9136397243','F47443E7-25FA-4C2D-8616-F45895CA632A','76F5EAE8-B4B0-47D2-963C-B0DADF3CADAF',0)
GO
INSERT INTO [ViewActions] ([ViewActionId],[AppViewId],[ActionId],[GlobalAction])VALUES('A8119092-A80A-4443-B0C2-658F9958366B','44B8A2B4-CE81-456A-938C-563CAEBB300D','C077DED8-B3DF-4FE5-B851-011297F4A489',0)
GO
INSERT INTO [ViewActions] ([ViewActionId],[AppViewId],[ActionId],[GlobalAction])VALUES('3857BC55-F94E-4555-BC9B-8BC2ABF24604','282A5474-287E-4FDB-80BF-D9037CA6372A','3CC0BEFA-4AC5-4BCF-8EFF-644564756DF8',1)
GO
INSERT INTO [ViewActions] ([ViewActionId],[AppViewId],[ActionId],[GlobalAction])VALUES('9FC503F0-24E7-4631-88E9-9E7946910E47','F47443E7-25FA-4C2D-8616-F45895CA632A','B43B06B0-BAFA-46E9-91F7-F22690479364',0)
GO
INSERT INTO [ViewActions] ([ViewActionId],[AppViewId],[ActionId],[GlobalAction])VALUES('3F754933-5E2D-4241-8CD2-A7E7EED652D5','40409D89-74FD-41A0-B616-222F03CB76B8','C077DED8-B3DF-4FE5-B851-011297F4A489',0)
GO
INSERT INTO [ViewActions] ([ViewActionId],[AppViewId],[ActionId],[GlobalAction])VALUES('47354045-1793-4175-9EED-AB3C7D741D7D','E22C8030-9C24-4ED2-82AC-147928CEDE4D','C077DED8-B3DF-4FE5-B851-011297F4A489',0)
GO
INSERT INTO [ViewActions] ([ViewActionId],[AppViewId],[ActionId],[GlobalAction])VALUES('B127C7CA-ABD7-4B26-9966-E202F740FD0D','282A5474-287E-4FDB-80BF-D9037CA6372A','67E35661-9605-4AEF-851F-8D31B701CB20',1)
GO
INSERT INTO [ViewActions] ([ViewActionId],[AppViewId],[ActionId],[GlobalAction])VALUES('6D954984-BD2A-4131-A694-E46FE9C0EBF8','AEA02F50-3A07-4BAF-9F53-991B62F8ADC2','C077DED8-B3DF-4FE5-B851-011297F4A489',0)
GO
INSERT INTO [ViewActions] ([ViewActionId],[AppViewId],[ActionId],[GlobalAction])VALUES('F55BC411-9674-4D7A-A694-FE5C2782A9A9','1794FED9-A624-43B1-9B2D-8077249B1DB7','C077DED8-B3DF-4FE5-B851-011297F4A489',0)
GO
INSERT INTO [Filters] ([FilterId],[Name],[Descripcion],[TablaId],[Stringfilter])VALUES('2FE50EBA-CA6C-4FFB-B29C-F25986D70896','filtrar por mes','filtrar por mes','E60238E1-6CF3-4DAD-8B7C-DD4261F157DC','#UrlBase#/Coomeva_Lappiz_Turno?$filter=FechaInicio gt ''#sessionStorage.fechaFiltroInicio#'' and FechaInicio lt ''#sessionStorage.fechaFiltroFin#''')
GO
INSERT INTO [AppViews] ([AppViewId],[EntityId],[Name],[Code],[Description],[Type],[FilterId],[Default],[RemoveEdit],[RemoveDelete],[EditViewId],[CreateViewId],[OptionFilter],[OptionOrder],[OptionSelect],[OptionTop],[OptionExpand],[HideCancelButton],[DisplayMenuTab],[HideCreateButton],[ConfirmAbortWithData])VALUES('475F2523-50C9-4E16-8EE0-0ECF63188B19','E60238E1-6CF3-4DAD-8B7C-DD4261F157DC','Turnos','Turnos','Turnos','List',NULL,0,0,0,'E22C8030-9C24-4ED2-82AC-147928CEDE4D','E22C8030-9C24-4ED2-82AC-147928CEDE4D',NULL,NULL,NULL,NULL,NULL,0,0,0,0)
GO
INSERT INTO [AppViews] ([AppViewId],[EntityId],[Name],[Code],[Description],[Type],[FilterId],[Default],[RemoveEdit],[RemoveDelete],[EditViewId],[CreateViewId],[OptionFilter],[OptionOrder],[OptionSelect],[OptionTop],[OptionExpand],[HideCancelButton],[DisplayMenuTab],[HideCreateButton],[ConfirmAbortWithData])VALUES('74030DB3-F337-4F37-B09D-0FD10C1394FD','08B5B3E4-A5C5-4BCD-B8F0-2045B78B5C56','Inicio','Inicio','Inicio','Form',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,0)
GO
INSERT INTO [AppViews] ([AppViewId],[EntityId],[Name],[Code],[Description],[Type],[FilterId],[Default],[RemoveEdit],[RemoveDelete],[EditViewId],[CreateViewId],[OptionFilter],[OptionOrder],[OptionSelect],[OptionTop],[OptionExpand],[HideCancelButton],[DisplayMenuTab],[HideCreateButton],[ConfirmAbortWithData])VALUES('E22C8030-9C24-4ED2-82AC-147928CEDE4D','E60238E1-6CF3-4DAD-8B7C-DD4261F157DC','Turno','Turno detalle','Turno detalle','Form',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,0)
GO
INSERT INTO [AppViews] ([AppViewId],[EntityId],[Name],[Code],[Description],[Type],[FilterId],[Default],[RemoveEdit],[RemoveDelete],[EditViewId],[CreateViewId],[OptionFilter],[OptionOrder],[OptionSelect],[OptionTop],[OptionExpand],[HideCancelButton],[DisplayMenuTab],[HideCreateButton],[ConfirmAbortWithData])VALUES('40409D89-74FD-41A0-B616-222F03CB76B8','E959DF9E-E04D-49D9-8CD3-71D644BDB880','Colaborador','ColaboradorForm','ColaboradorForm','Form',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,0)
GO
INSERT INTO [AppViews] ([AppViewId],[EntityId],[Name],[Code],[Description],[Type],[FilterId],[Default],[RemoveEdit],[RemoveDelete],[EditViewId],[CreateViewId],[OptionFilter],[OptionOrder],[OptionSelect],[OptionTop],[OptionExpand],[HideCancelButton],[DisplayMenuTab],[HideCreateButton],[ConfirmAbortWithData])VALUES('A748C249-CA4E-4CB5-A744-55387AADB3A9','E959DF9E-E04D-49D9-8CD3-71D644BDB880','Colaboradores','ColaboradoresList','ColaboradoresList','List',NULL,0,0,0,'40409D89-74FD-41A0-B616-222F03CB76B8','40409D89-74FD-41A0-B616-222F03CB76B8',NULL,NULL,NULL,NULL,NULL,0,0,0,0)
GO
INSERT INTO [AppViews] ([AppViewId],[EntityId],[Name],[Code],[Description],[Type],[FilterId],[Default],[RemoveEdit],[RemoveDelete],[EditViewId],[CreateViewId],[OptionFilter],[OptionOrder],[OptionSelect],[OptionTop],[OptionExpand],[HideCancelButton],[DisplayMenuTab],[HideCreateButton],[ConfirmAbortWithData])VALUES('44B8A2B4-CE81-456A-938C-563CAEBB300D','EB1F5413-3216-4DBB-A8E2-A6B5BC64E0D8','Horario especial','Horario especial','Horario especial','Form',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,0)
GO
INSERT INTO [AppViews] ([AppViewId],[EntityId],[Name],[Code],[Description],[Type],[FilterId],[Default],[RemoveEdit],[RemoveDelete],[EditViewId],[CreateViewId],[OptionFilter],[OptionOrder],[OptionSelect],[OptionTop],[OptionExpand],[HideCancelButton],[DisplayMenuTab],[HideCreateButton],[ConfirmAbortWithData])VALUES('BF8B6404-9D12-4C13-BB00-7855AFD98BAE','E60238E1-6CF3-4DAD-8B7C-DD4261F157DC','Meses','Meses','Meses','Form',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,0)
GO
INSERT INTO [AppViews] ([AppViewId],[EntityId],[Name],[Code],[Description],[Type],[FilterId],[Default],[RemoveEdit],[RemoveDelete],[EditViewId],[CreateViewId],[OptionFilter],[OptionOrder],[OptionSelect],[OptionTop],[OptionExpand],[HideCancelButton],[DisplayMenuTab],[HideCreateButton],[ConfirmAbortWithData])VALUES('1794FED9-A624-43B1-9B2D-8077249B1DB7','3570EC86-9BDD-4525-8D3A-7AD315ED5346','Novedad','NovedadForm','NovedadForm','Form',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,0)
GO
INSERT INTO [AppViews] ([AppViewId],[EntityId],[Name],[Code],[Description],[Type],[FilterId],[Default],[RemoveEdit],[RemoveDelete],[EditViewId],[CreateViewId],[OptionFilter],[OptionOrder],[OptionSelect],[OptionTop],[OptionExpand],[HideCancelButton],[DisplayMenuTab],[HideCreateButton],[ConfirmAbortWithData])VALUES('B07C5504-3514-4D0B-B5F6-8DCD47566482','83652E59-67DC-45E1-8EC8-1F4F575F316D','Centro de atención de ventas','Centro de atención de ventas','Centro de atención de ventas','Form',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,0)
GO
INSERT INTO [AppViews] ([AppViewId],[EntityId],[Name],[Code],[Description],[Type],[FilterId],[Default],[RemoveEdit],[RemoveDelete],[EditViewId],[CreateViewId],[OptionFilter],[OptionOrder],[OptionSelect],[OptionTop],[OptionExpand],[HideCancelButton],[DisplayMenuTab],[HideCreateButton],[ConfirmAbortWithData])VALUES('44293EE2-E5CC-4E98-ADEB-9767BCFF10AA','08B5B3E4-A5C5-4BCD-B8F0-2045B78B5C56','Usuario','UsuarioForm','UsuarioForm','Form',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,0)
GO
INSERT INTO [AppViews] ([AppViewId],[EntityId],[Name],[Code],[Description],[Type],[FilterId],[Default],[RemoveEdit],[RemoveDelete],[EditViewId],[CreateViewId],[OptionFilter],[OptionOrder],[OptionSelect],[OptionTop],[OptionExpand],[HideCancelButton],[DisplayMenuTab],[HideCreateButton],[ConfirmAbortWithData])VALUES('AEA02F50-3A07-4BAF-9F53-991B62F8ADC2','E60238E1-6CF3-4DAD-8B7C-DD4261F157DC','Crear turno','Turno','Turno','Form',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,0)
GO
INSERT INTO [AppViews] ([AppViewId],[EntityId],[Name],[Code],[Description],[Type],[FilterId],[Default],[RemoveEdit],[RemoveDelete],[EditViewId],[CreateViewId],[OptionFilter],[OptionOrder],[OptionSelect],[OptionTop],[OptionExpand],[HideCancelButton],[DisplayMenuTab],[HideCreateButton],[ConfirmAbortWithData])VALUES('0B18B0D5-6A97-4BDA-B8AA-A9E173E4ACAE','EB1F5413-3216-4DBB-A8E2-A6B5BC64E0D8','Horarios especiales','Horarios especiales','Horarios especiales','List',NULL,0,0,0,'44B8A2B4-CE81-456A-938C-563CAEBB300D','44B8A2B4-CE81-456A-938C-563CAEBB300D',NULL,NULL,NULL,NULL,NULL,0,0,0,0)
GO
INSERT INTO [AppViews] ([AppViewId],[EntityId],[Name],[Code],[Description],[Type],[FilterId],[Default],[RemoveEdit],[RemoveDelete],[EditViewId],[CreateViewId],[OptionFilter],[OptionOrder],[OptionSelect],[OptionTop],[OptionExpand],[HideCancelButton],[DisplayMenuTab],[HideCreateButton],[ConfirmAbortWithData])VALUES('BD190CAE-519C-47EA-8CB6-C33529C226BC','E959DF9E-E04D-49D9-8CD3-71D644BDB880','Visualización de Mallas','MallasList','MallasList','Form',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,0)
GO
INSERT INTO [AppViews] ([AppViewId],[EntityId],[Name],[Code],[Description],[Type],[FilterId],[Default],[RemoveEdit],[RemoveDelete],[EditViewId],[CreateViewId],[OptionFilter],[OptionOrder],[OptionSelect],[OptionTop],[OptionExpand],[HideCancelButton],[DisplayMenuTab],[HideCreateButton],[ConfirmAbortWithData])VALUES('045A453E-E6CF-44D9-8B14-C7A8951A3CFE','83652E59-67DC-45E1-8EC8-1F4F575F316D','Centros de atención de ventas','Centros de atención de ventas','Centros de atención de ventas','List',NULL,0,0,0,'B07C5504-3514-4D0B-B5F6-8DCD47566482','B07C5504-3514-4D0B-B5F6-8DCD47566482',NULL,NULL,NULL,NULL,NULL,0,0,0,0)
GO
INSERT INTO [AppViews] ([AppViewId],[EntityId],[Name],[Code],[Description],[Type],[FilterId],[Default],[RemoveEdit],[RemoveDelete],[EditViewId],[CreateViewId],[OptionFilter],[OptionOrder],[OptionSelect],[OptionTop],[OptionExpand],[HideCancelButton],[DisplayMenuTab],[HideCreateButton],[ConfirmAbortWithData])VALUES('0FE5CCDE-A02F-4E24-8A0D-CD54E6D96789','08B5B3E4-A5C5-4BCD-B8F0-2045B78B5C56','Usuarios','UsuariosList','UsuariosList','List',NULL,0,0,0,'44293EE2-E5CC-4E98-ADEB-9767BCFF10AA','44293EE2-E5CC-4E98-ADEB-9767BCFF10AA',NULL,NULL,NULL,NULL,NULL,0,0,0,0)
GO
INSERT INTO [AppViews] ([AppViewId],[EntityId],[Name],[Code],[Description],[Type],[FilterId],[Default],[RemoveEdit],[RemoveDelete],[EditViewId],[CreateViewId],[OptionFilter],[OptionOrder],[OptionSelect],[OptionTop],[OptionExpand],[HideCancelButton],[DisplayMenuTab],[HideCreateButton],[ConfirmAbortWithData])VALUES('282A5474-287E-4FDB-80BF-D9037CA6372A','E60238E1-6CF3-4DAD-8B7C-DD4261F157DC','Todos los turnos','Todos los turnos','Todos los turnos','List','2FE50EBA-CA6C-4FFB-B29C-F25986D70896',0,0,0,'AEA02F50-3A07-4BAF-9F53-991B62F8ADC2','AEA02F50-3A07-4BAF-9F53-991B62F8ADC2',NULL,NULL,NULL,NULL,NULL,0,0,0,0)
GO
INSERT INTO [AppViews] ([AppViewId],[EntityId],[Name],[Code],[Description],[Type],[FilterId],[Default],[RemoveEdit],[RemoveDelete],[EditViewId],[CreateViewId],[OptionFilter],[OptionOrder],[OptionSelect],[OptionTop],[OptionExpand],[HideCancelButton],[DisplayMenuTab],[HideCreateButton],[ConfirmAbortWithData])VALUES('C25555BD-70F6-4171-8ED8-DF8C743329FF','08B5B3E4-A5C5-4BCD-B8F0-2045B78B5C56','Predicción','Predicción','Predicción','Form',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,0)
GO
INSERT INTO [AppViews] ([AppViewId],[EntityId],[Name],[Code],[Description],[Type],[FilterId],[Default],[RemoveEdit],[RemoveDelete],[EditViewId],[CreateViewId],[OptionFilter],[OptionOrder],[OptionSelect],[OptionTop],[OptionExpand],[HideCancelButton],[DisplayMenuTab],[HideCreateButton],[ConfirmAbortWithData])VALUES('F47443E7-25FA-4C2D-8616-F45895CA632A','3570EC86-9BDD-4525-8D3A-7AD315ED5346','Novedades','NovedadesList','NovedadesList','List',NULL,0,0,0,'1794FED9-A624-43B1-9B2D-8077249B1DB7','1794FED9-A624-43B1-9B2D-8077249B1DB7',NULL,NULL,NULL,NULL,NULL,0,0,0,0)
GO
INSERT INTO [Tabs] ([TabId],[Name],[Description],[Order],[AppViewId],[NroColumn],[Configuration])VALUES('D4343921-B9C0-423A-BF7F-D5721172AAFE','General',NULL,0,'74030DB3-F337-4F37-B09D-0FD10C1394FD',1,NULL)
GO
INSERT INTO [Tabs] ([TabId],[Name],[Description],[Order],[AppViewId],[NroColumn],[Configuration])VALUES('A805726D-840C-4EF7-8C31-7A306D658C1A','General',NULL,0,'E22C8030-9C24-4ED2-82AC-147928CEDE4D',1,NULL)
GO
INSERT INTO [Tabs] ([TabId],[Name],[Description],[Order],[AppViewId],[NroColumn],[Configuration])VALUES('CEA29FD9-FFE1-4441-B879-A738DBB96D6E','General',NULL,0,'40409D89-74FD-41A0-B616-222F03CB76B8',1,NULL)
GO
INSERT INTO [Tabs] ([TabId],[Name],[Description],[Order],[AppViewId],[NroColumn],[Configuration])VALUES('5B871442-88A9-42B7-A869-62AF62C1C6AF','General',NULL,0,'44B8A2B4-CE81-456A-938C-563CAEBB300D',1,NULL)
GO
INSERT INTO [Tabs] ([TabId],[Name],[Description],[Order],[AppViewId],[NroColumn],[Configuration])VALUES('42458F47-B692-47DD-B136-866E327F0C11','General',NULL,0,'BF8B6404-9D12-4C13-BB00-7855AFD98BAE',1,NULL)
GO
INSERT INTO [Tabs] ([TabId],[Name],[Description],[Order],[AppViewId],[NroColumn],[Configuration])VALUES('86DA8015-B098-4D09-B72E-1BC39338E7D0','Adjuntos',NULL,1,'1794FED9-A624-43B1-9B2D-8077249B1DB7',1,'')
GO
INSERT INTO [Tabs] ([TabId],[Name],[Description],[Order],[AppViewId],[NroColumn],[Configuration])VALUES('BFA75D9D-CFBC-45E9-AE3E-D8FF1388FFE9','General',NULL,0,'1794FED9-A624-43B1-9B2D-8077249B1DB7',1,NULL)
GO
INSERT INTO [Tabs] ([TabId],[Name],[Description],[Order],[AppViewId],[NroColumn],[Configuration])VALUES('8C5850AA-DE16-423E-96E6-E92FFABACC66','General',NULL,0,'B07C5504-3514-4D0B-B5F6-8DCD47566482',1,NULL)
GO
INSERT INTO [Tabs] ([TabId],[Name],[Description],[Order],[AppViewId],[NroColumn],[Configuration])VALUES('3705BE42-B8F3-4E15-858E-A802B48BF715','General',NULL,0,'44293EE2-E5CC-4E98-ADEB-9767BCFF10AA',1,NULL)
GO
INSERT INTO [Tabs] ([TabId],[Name],[Description],[Order],[AppViewId],[NroColumn],[Configuration])VALUES('F662C077-3196-4407-A265-CC9F8D043129','General',NULL,0,'AEA02F50-3A07-4BAF-9F53-991B62F8ADC2',1,NULL)
GO
INSERT INTO [Tabs] ([TabId],[Name],[Description],[Order],[AppViewId],[NroColumn],[Configuration])VALUES('B448EEF3-9B8C-4062-BA9D-B5EFE3D11711','General',NULL,0,'BD190CAE-519C-47EA-8CB6-C33529C226BC',1,NULL)
GO
INSERT INTO [Tabs] ([TabId],[Name],[Description],[Order],[AppViewId],[NroColumn],[Configuration])VALUES('FDFED7C1-C48A-4987-8E61-87BC6510C1F6','General',NULL,0,'C25555BD-70F6-4171-8ED8-DF8C743329FF',1,NULL)
GO
INSERT INTO [Sections] ([SectionId],[TabId],[Name],[Code],[NroRow],[NroColumn],[Order],[Configuration])VALUES('971742CE-DF58-4A9A-96B1-01046469084A','CEA29FD9-FFE1-4441-B879-A738DBB96D6E','Datos básicos',NULL,1,2,0,NULL)
GO
INSERT INTO [Sections] ([SectionId],[TabId],[Name],[Code],[NroRow],[NroColumn],[Order],[Configuration])VALUES('24DECF85-4C92-4176-8DB1-13B7C088BC14','F662C077-3196-4407-A265-CC9F8D043129','Datos básicos',NULL,1,2,0,NULL)
GO
INSERT INTO [Sections] ([SectionId],[TabId],[Name],[Code],[NroRow],[NroColumn],[Order],[Configuration])VALUES('B889584E-7C4C-4828-B9F5-24E3FF45736C','8C5850AA-DE16-423E-96E6-E92FFABACC66','Datos básicos',NULL,1,2,0,NULL)
GO
INSERT INTO [Sections] ([SectionId],[TabId],[Name],[Code],[NroRow],[NroColumn],[Order],[Configuration])VALUES('6A87AE96-FE43-4611-94CE-2640A20E3688','42458F47-B692-47DD-B136-866E327F0C11','Datos básicos',NULL,1,1,0,'')
GO
INSERT INTO [Sections] ([SectionId],[TabId],[Name],[Code],[NroRow],[NroColumn],[Order],[Configuration])VALUES('0890848A-C221-4957-A7B5-2C5CA32DF3CA','B448EEF3-9B8C-4062-BA9D-B5EFE3D11711','Información',NULL,1,1,0,'')
GO
INSERT INTO [Sections] ([SectionId],[TabId],[Name],[Code],[NroRow],[NroColumn],[Order],[Configuration])VALUES('5F9080CF-8A0A-43BF-93F8-2E8B00A11654','BFA75D9D-CFBC-45E9-AE3E-D8FF1388FFE9','Fechas de la novedad',NULL,0,2,1,'')
GO
INSERT INTO [Sections] ([SectionId],[TabId],[Name],[Code],[NroRow],[NroColumn],[Order],[Configuration])VALUES('67960F6E-2B4E-49BB-821E-3922940640BB','8C5850AA-DE16-423E-96E6-E92FFABACC66','Horarios especiales',NULL,0,1,2,'')
GO
INSERT INTO [Sections] ([SectionId],[TabId],[Name],[Code],[NroRow],[NroColumn],[Order],[Configuration])VALUES('586054DA-F974-41DC-A1D3-534CB678AACA','BFA75D9D-CFBC-45E9-AE3E-D8FF1388FFE9','Datos básicos',NULL,1,2,0,NULL)
GO
INSERT INTO [Sections] ([SectionId],[TabId],[Name],[Code],[NroRow],[NroColumn],[Order],[Configuration])VALUES('E026C1DE-4D32-42B9-9CC2-5F9F537A6921','FDFED7C1-C48A-4987-8E61-87BC6510C1F6','Datos básicos',NULL,2,1,0,'')
GO
INSERT INTO [Sections] ([SectionId],[TabId],[Name],[Code],[NroRow],[NroColumn],[Order],[Configuration])VALUES('EAAC37CA-B4EA-4B96-8334-61A4699B38C0','5B871442-88A9-42B7-A869-62AF62C1C6AF','Datos básicos',NULL,1,2,0,NULL)
GO
INSERT INTO [Sections] ([SectionId],[TabId],[Name],[Code],[NroRow],[NroColumn],[Order],[Configuration])VALUES('7563C669-2D16-46FC-BB13-74A71B195F5C','D4343921-B9C0-423A-BF7F-D5721172AAFE','Datos básicos',NULL,2,1,0,'')
GO
INSERT INTO [Sections] ([SectionId],[TabId],[Name],[Code],[NroRow],[NroColumn],[Order],[Configuration])VALUES('49473F94-09E5-4B0C-9695-A2B6597FD82C','3705BE42-B8F3-4E15-858E-A802B48BF715','Datos básicos',NULL,2,2,0,NULL)
GO
INSERT INTO [Sections] ([SectionId],[TabId],[Name],[Code],[NroRow],[NroColumn],[Order],[Configuration])VALUES('B9F3F703-5C48-4DC1-B1DB-C002FABE2E35','86DA8015-B098-4D09-B72E-1BC39338E7D0','Carga de archivos',NULL,0,1,0,'')
GO
INSERT INTO [Sections] ([SectionId],[TabId],[Name],[Code],[NroRow],[NroColumn],[Order],[Configuration])VALUES('1560E597-5D1B-44BA-9653-CD70946413BA','A805726D-840C-4EF7-8C31-7A306D658C1A','Datos básicos',NULL,1,3,0,'')
GO
INSERT INTO [Sections] ([SectionId],[TabId],[Name],[Code],[NroRow],[NroColumn],[Order],[Configuration])VALUES('258CE331-98A4-4480-89B8-F2AEFEB702E4','8C5850AA-DE16-423E-96E6-E92FFABACC66','Turnos',NULL,0,1,1,'')
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('C0D0549F-FD0F-4B8A-981C-088026DEC790',0,0,'5841005F-009F-4080-952D-442363DCAFF7','971742CE-DF58-4A9A-96B1-01046469084A',NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('D71B1B18-9F91-458E-A7E0-0A6BAB3A2BBB',0,7,'E84EF24D-01C8-4B2D-9C29-EAB78A96B4B2','1560E597-5D1B-44BA-9653-CD70946413BA','Relacion',0,NULL,NULL,NULL,'Coomeva_Lappiz_Users',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('F6F8CB04-70A4-4140-BFE3-1BFDFF6FA255',0,8,'E84EF24D-01C8-4B2D-9C29-EAB78A96B4B2','24DECF85-4C92-4176-8DB1-13B7C088BC14','Relacion',0,NULL,NULL,NULL,'Coomeva_Lappiz_Users',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('D3AEA9F5-45B7-4165-85F8-1C4B019F63BC',0,1,'3B3B9B34-1B46-468D-A84D-0143B643B1CD','971742CE-DF58-4A9A-96B1-01046469084A','Relacion',0,NULL,NULL,NULL,'Coomeva_Lappiz_CAV',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('DDE61848-2C9E-4B12-AE54-12FAF1B095C9',0,0,'29AEF97E-C6C2-4BDF-A772-0A5DCDC84757','67960F6E-2B4E-49BB-821E-3922940640BB','Detalles',1,NULL,NULL,NULL,'Vistas.Coomeva_Lappiz_CAV','0B18B0D5-6A97-4BDA-B8AA-A9E173E4ACAE',0,NULL,'Insert',NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('1B2167B9-75BF-4145-BD71-16E9E01EA994',0,7,'76292ECB-65B6-4BE4-85E4-9423AE230426','24DECF85-4C92-4176-8DB1-13B7C088BC14','Time',0,NULL,NULL,NULL,'HorasAsignadas',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('B83738B6-A4F9-45A0-BCEB-2958A9F97BDF',0,1,'D06FD10A-8D30-4AA4-875A-06999D494353','586054DA-F974-41DC-A1D3-534CB678AACA','DateTime',0,NULL,NULL,NULL,'FechaReporte',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('1E6B3CA5-5F2A-4D04-BCD0-29A023447307',0,4,'87441058-9802-4C05-BE0B-A70A2AF1B596','B889584E-7C4C-4828-B9F5-24E3FF45736C','AreaDeTexto',0,NULL,NULL,NULL,'Descripcion',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('36FEB216-DF8C-4291-A694-1F0DD500DEAB',0,1,'B75B095F-02FF-4E44-8C42-BBE45FF596CA','24DECF85-4C92-4176-8DB1-13B7C088BC14','Relacion',0,NULL,NULL,NULL,'Coomeva_Lappiz_Colaborador',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('E677E4EF-AED8-4439-A49B-2393DFE434E6',0,2,'25D8ABD1-872A-4D45-84C3-8DB9D7F6F0DE','B889584E-7C4C-4828-B9F5-24E3FF45736C','Time',0,NULL,NULL,NULL,'HorarioApertura',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('866F9B6E-77C5-48C6-8073-39C1163406F6',0,2,'9A83983E-902C-4492-B3AE-2C357B567795','971742CE-DF58-4A9A-96B1-01046469084A','Texto',0,NULL,NULL,NULL,'Cargo',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('65461AB1-9684-4CCE-A672-3D39373BB4FB',0,0,'283C7CEC-2E90-48AC-8D41-D31473FCAF71','5F9080CF-8A0A-43BF-93F8-2E8B00A11654','DateTime',0,NULL,NULL,NULL,'FechaEfectiva',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('3E30F3FC-8044-4EB1-AF3F-2DB49916B3FA',0,5,'623D237A-22E8-476D-940E-4B64E6E72A6E','1560E597-5D1B-44BA-9653-CD70946413BA','Check',0,NULL,NULL,NULL,'EsFestivo',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('D02A23A9-3801-492E-A19F-457206F96E0F',0,1,'A082B97B-2191-4B86-9C2D-55BA59311740','49473F94-09E5-4B0C-9695-A2B6597FD82C','Password',0,NULL,NULL,NULL,'Contrasena',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('1055B07C-764F-48EF-92F9-58D305A338BB',0,0,'9D4A4E18-61B1-40BE-AE3D-ED24E37874E6','49473F94-09E5-4B0C-9695-A2B6597FD82C',NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('EFC6B39F-37C4-4AC4-A2D9-78FA5D133F72',0,9,'F58A96FE-B2AA-4F1C-B5CB-7309669B3CB0','24DECF85-4C92-4176-8DB1-13B7C088BC14','DateTime',0,NULL,NULL,NULL,'FechaGeneracion',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('193FC1FF-C091-4E78-BC89-605DDBB1D359',0,2,'E7FDCFAB-AF11-4570-BBD1-A69D95BDACAB','EAAC37CA-B4EA-4B96-8334-61A4699B38C0','Time',0,NULL,NULL,NULL,'HorarioApertura',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('A7CA7CED-63BF-43B1-8621-61254D394EDB',0,2,'4A6B92AE-B9D9-41BA-9515-C5C1831B8358','1560E597-5D1B-44BA-9653-CD70946413BA','Time',0,NULL,NULL,NULL,'HoraFin',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('82AB3715-7A17-4905-A419-46FF7919E9A6',0,8,'F58A96FE-B2AA-4F1C-B5CB-7309669B3CB0','1560E597-5D1B-44BA-9653-CD70946413BA','DateTime',0,NULL,NULL,NULL,'FechaGeneracion',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('BC3615E4-D9B7-4FB8-B61D-49FB1E0D3981',0,0,'70FF12DD-33CC-483D-9A1C-2523804C7E6D','B9F3F703-5C48-4DC1-B1DB-C002FABE2E35','Archive',0,NULL,NULL,NULL,'Soportes',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('D8404F18-3418-460E-AD8B-806C6F54D7DD',0,0,'B75B095F-02FF-4E44-8C42-BBE45FF596CA','1560E597-5D1B-44BA-9653-CD70946413BA','Relacion',0,NULL,NULL,NULL,'Coomeva_Lappiz_Colaborador',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('B9C80DF2-7E8D-4712-B644-81BCE0DA2A2B',0,2,'45BA4D4E-D655-429F-BB19-668E43B60CB8','49473F94-09E5-4B0C-9695-A2B6597FD82C',NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('A9CB521E-283C-492B-8132-33915CDF4601',0,3,'E9B8BC24-6F5B-41CC-B4DE-CF1BA4CE44CD','49473F94-09E5-4B0C-9695-A2B6597FD82C','Lista',0,NULL,NULL,NULL,'AuthType',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('72983BA9-55C3-49C4-966C-8DAE6E31DA44',0,6,'76292ECB-65B6-4BE4-85E4-9423AE230426','1560E597-5D1B-44BA-9653-CD70946413BA','Time',0,NULL,NULL,NULL,'HorasAsignadas',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('F1DE4235-F726-4EE3-9FFF-62A6E12225DB',0,2,'482C8CF9-9648-4F60-A728-8E3E09ECD362','586054DA-F974-41DC-A1D3-534CB678AACA','Lista',0,NULL,NULL,NULL,'TipoNovedad',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('0719A822-89C7-4660-8533-9790E3FB87C1',0,4,'914427F2-A86D-4E48-A537-9779A9DBB844','49473F94-09E5-4B0C-9695-A2B6597FD82C','Check',0,NULL,NULL,NULL,'Activo',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('0C36E6CF-8F70-4320-9F4E-885D02D318D3',0,3,'0B3CA231-45B0-4559-8FD9-D591E9306897','1560E597-5D1B-44BA-9653-CD70946413BA','Check',0,NULL,NULL,NULL,'EsPreturno',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('7B71E1D5-3D48-4C47-BF76-A0D5ACE89332',0,0,'2BC7DEDF-C17A-45A8-953F-7B3FAC8499E0','EAAC37CA-B4EA-4B96-8334-61A4699B38C0','DateTime',0,NULL,NULL,NULL,'FechaEspecificada',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('786373B9-E278-4D0B-9606-9CFDD79B884D',0,3,'8AC4CD31-FB1C-413C-83DE-0DEA2DA5313A','586054DA-F974-41DC-A1D3-534CB678AACA','Texto',0,NULL,NULL,NULL,'CEDescripcion',NULL,0,'Descripción',NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('723F2248-392C-4A21-B3E0-B683253C2DB6',0,5,'6149E223-4314-4E74-8325-F38CD7415656','49473F94-09E5-4B0C-9695-A2B6597FD82C','Relacion',0,NULL,NULL,NULL,'Coomeva_Lappiz_CAV',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('D6A1D997-1D61-4AD1-8B92-A93A1F38734D',0,4,'1B4FCB76-224E-4058-BAC5-95CBAA2F2C23','586054DA-F974-41DC-A1D3-534CB678AACA','Relacion',0,NULL,NULL,NULL,'Coomeva_Lappiz_Turno',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('6859AC85-14FB-4D9A-9AB1-BD89511AA038',0,5,'F2FF79FF-05AB-4C2D-9B52-7130D2F587F0','586054DA-F974-41DC-A1D3-534CB678AACA','Lista',0,NULL,NULL,NULL,'Estado',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('8CC6A7CA-85C3-4A19-BBDB-B290EF3A7C43',0,4,'0D18C89E-FBC7-4599-8F29-3D51359CD87E','EAAC37CA-B4EA-4B96-8334-61A4699B38C0','Entero',0,NULL,NULL,NULL,'DemandaEstimada',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('231EC6A1-AB87-4F1E-9285-CA38A5479555',0,5,'32639AD9-8D71-45B0-8309-AAC883A9668F','24DECF85-4C92-4176-8DB1-13B7C088BC14','Check',0,NULL,NULL,NULL,'EsFinSemana',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('19BFAA6B-62AE-4EE0-9280-C0B487D92FA5',0,1,'481436E7-D494-4582-B0B7-FE75C8737A50','EAAC37CA-B4EA-4B96-8334-61A4699B38C0','Lista',0,NULL,NULL,NULL,'CETipoDia',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('BB40BA88-1FCA-4E43-A8C6-C2C30F94466C',0,0,'818BEE0E-23DD-4FDE-9126-46FEAD390AF1','258CE331-98A4-4480-89B8-F2AEFEB702E4','Detalles',1,NULL,NULL,NULL,'Vistas.Coomeva_Lappiz_CAV','475F2523-50C9-4E16-8EE0-0ECF63188B19',0,NULL,'Insert',NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('9F8BA1B0-4FC9-4945-88FB-A492BB06BBD5',0,1,'C8A27AFB-7BC2-40EA-8D42-C65E689388F6','5F9080CF-8A0A-43BF-93F8-2E8B00A11654','DateTime',0,NULL,NULL,NULL,'FechaEfectivaFin',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('86A42994-5F39-4F4F-B52D-D9EDE00FABB4',0,4,'0B3CA231-45B0-4559-8FD9-D591E9306897','24DECF85-4C92-4176-8DB1-13B7C088BC14','Check',0,NULL,NULL,NULL,'EsPreturno',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('2F07F3C2-A00D-4C77-8120-CC4733634DE0',0,1,'05DF8186-4CBA-4075-80B0-26144C430968','1560E597-5D1B-44BA-9653-CD70946413BA','DateTime',0,NULL,NULL,NULL,'FechaInicio',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('7A9221B7-2B3D-4EB6-A9CF-CE9ECAE6A2FC',0,10,'D3A89F1D-573D-4765-81E8-3F1A5304F364','24DECF85-4C92-4176-8DB1-13B7C088BC14','Texto',0,NULL,NULL,NULL,'CEDescripcion',NULL,0,'Descripción',NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('5119ECB0-D1CE-4C04-9167-E420A2474A9A',0,6,'623D237A-22E8-476D-940E-4B64E6E72A6E','24DECF85-4C92-4176-8DB1-13B7C088BC14','Check',0,NULL,NULL,NULL,'EsFestivo',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('BD1D087F-8720-43B2-BB9C-E6C61E668C10',0,0,'22E91957-9728-43C1-9C1A-3665FA0DB703','586054DA-F974-41DC-A1D3-534CB678AACA','Relacion',0,NULL,NULL,NULL,'Coomeva_Lappiz_Colaborador',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('AFAB4CFC-F0CA-499B-AFB9-DFB4DC4E8343',0,3,'A2112799-4624-41CB-A0D9-27D7A2954C50','B889584E-7C4C-4828-B9F5-24E3FF45736C','Time',0,NULL,NULL,NULL,'HorarioCierre',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('23C90E14-8243-4200-8636-E30EB165B84F',0,4,'32639AD9-8D71-45B0-8309-AAC883A9668F','1560E597-5D1B-44BA-9653-CD70946413BA','Check',0,NULL,NULL,NULL,'EsFinSemana',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('1EBE05DE-03F3-472C-AF0D-E380E1D4D90C',0,0,'C5E15E3F-9096-40ED-80DE-73CE3E710B74','B889584E-7C4C-4828-B9F5-24E3FF45736C',NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('F44B43FB-823A-4F07-B05F-F60C7313D437',0,1,'A82453D4-4876-4CAC-9A03-6F6671302647','B889584E-7C4C-4828-B9F5-24E3FF45736C','Lista',0,NULL,NULL,NULL,'Region',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('F216984C-6F95-48DB-886A-DC61E5819298',0,0,'818BEE0E-23DD-4FDE-9126-46FEAD390AF1','24DECF85-4C92-4176-8DB1-13B7C088BC14','Relacion',0,NULL,NULL,NULL,'Coomeva_Lappiz_CAV',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('AC3A23B4-164B-4383-BC96-E8A1BF3B8328',0,2,'05DF8186-4CBA-4075-80B0-26144C430968','24DECF85-4C92-4176-8DB1-13B7C088BC14','DateTime',0,NULL,NULL,NULL,'FechaInicio',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('3E649362-7194-4EB2-A227-FFF8977E6132',0,3,'4A6B92AE-B9D9-41BA-9515-C5C1831B8358','24DECF85-4C92-4176-8DB1-13B7C088BC14','Time',0,NULL,NULL,NULL,'HoraFin',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [Configurations] ([ConfigurationId],[Row],[Column],[CampoId],[SectionId],[ControlType],[IsGridDetails],[CampoParentId],[CampoCheckId],[FilterId],[Ruta],[DetailsViewId],[IsEditable],[DisplayName],[Import],[ImportAction],[AddFilter])VALUES('F2A255BF-443A-451E-8DAE-FBD1593C0B64',0,3,'CC413761-65F2-4961-AAC0-AD5CEEF66BEF','EAAC37CA-B4EA-4B96-8334-61A4699B38C0','Time',0,NULL,NULL,NULL,'HorarioCierre',NULL,0,NULL,NULL,NULL,0)
GO
INSERT INTO [CustomViewParts] ([CustomViewPartId],[DisplayName],[SectionId],[ContentHtml],[Row],[Column],[Debug])VALUES('80F8E851-4962-4A2A-8262-3C23A6292AFA','Vista personalizada','6A87AE96-FE43-4611-94CE-2640A20E3688','<script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: [''Inter'', ''sans-serif''],
                    },
                }
            }
        }
    </script>
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
 <body class="bg-gray-100 p-4 font-sans">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div id="meses" class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        </div>
    </div>
</body>',0,0,0)
GO
INSERT INTO [CustomViewParts] ([CustomViewPartId],[DisplayName],[SectionId],[ContentHtml],[Row],[Column],[Debug])VALUES('EAEAABCD-AA3E-4051-BEB0-06F1EA9BD86E','','0890848A-C221-4957-A7B5-2C5CA32DF3CA','<div id="grid_mallas">
    
</div>',0,0,0)
GO
INSERT INTO [CustomViewParts] ([CustomViewPartId],[DisplayName],[SectionId],[ContentHtml],[Row],[Column],[Debug])VALUES('859C2AF1-312D-4E56-8641-4935F8C0F518','','E026C1DE-4D32-42B9-9CC2-5F9F537A6921','  <script src="https://cdn.tailwindcss.com"></script>
    <!-- Configuración para usar la fuente Inter -->
    <style>
        @import url(''https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap'');
        body {
            font-family: ''Inter'', sans-serif;
            background-color: #f3f4f6;
        }
        /* Estilos personalizados para el Heatmap */
        .heatmap-grid {
            display: grid;
            /* 1 columna para la etiqueta de fecha + 10 columnas para las horas (8 a 17) */
            grid-template-columns: 80px repeat(10, 1fr); 
            gap: 1px;
            overflow-x: auto;
            min-width: 700px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }
        .heatmap-header, .heatmap-label-y, .heatmap-cell {
            padding: 8px 4px;
            text-align: center;
            font-size: 0.75rem; /* text-xs */
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 500;
        }
        .heatmap-header {
            background-color: #e5e7eb; /* bg-gray-200 */
            font-weight: 600;
            color: #1f2937; /* text-gray-800 */
            position: sticky;
            top: 0;
            z-index: 10;
        }
        .heatmap-label-y {
            background-color: #f3f4f6; /* bg-gray-100 */
            justify-content: flex-start;
            padding-left: 8px;
            font-weight: 600;
            color: #4b5563; /* text-gray-600 */
            position: sticky;
            left: 0;
            z-index: 5;
        }
        .heatmap-cell {
            border-radius: 4px;
            transition: background-color 0.3s ease, transform 0.1s ease;
            cursor: default;
        }
        .heatmap-cell:hover {
            transform: scale(1.05);
            z-index: 2;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        }
        
        /* Estilos para el Bar Chart */
        .bar-chart-container {
            display: flex;
            align-items: flex-end;
            justify-content: space-around;
            height: 300px;
            width: 100%;
            padding: 20px 0;
            border-bottom: 1px solid #e5e7eb;
        }
        .bar-chart-bar-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 10%;
            min-width: 40px;
            position: relative;
        }
        .bar-chart-bar {
            width: 80%;
            min-height: 5px; /* Minimum height to show 0 values or small values */
            border-radius: 4px 4px 0 0;
            transition: height 0.5s ease;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .bar-chart-label-top {
            position: absolute;
            top: -20px;
            font-size: 0.75rem;
            font-weight: 600;
            color: #4b5563;
        }
        .bar-chart-label-bottom {
            font-size: 0.75rem;
            margin-top: 5px;
            color: #6b7280;
        }
        .bar-chart-max-label {
            font-size: 0.875rem;
            font-weight: 600;
            color: #10b981;
            margin-bottom: 10px;
            text-align: right;
            padding-right: 10px;
        }

        /* Estilo para el loading spinner */
        .spinner {
            border: 4px solid rgba(0, 0, 0, 0.1);
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border-left-color: #3b82f6; /* blue-500 */
            animation: spin 1s ease infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
<body class="p-4 md:p-8">

    <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-extrabold text-gray-900 mb-6">Panel de Optimización de CAV</h1>
        
        <!-- Controles de Filtro -->
        <div class="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-200">
            <h2 class="text-xl font-semibold text-gray-700 mb-4">Filtros de Reporte</h2>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                
                <div>
                    <label for="oficina-select" class="block text-sm font-medium text-gray-700 mb-1">Oficina</label>
                    <select id="oficina-select" class="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500">
                        <!-- Opciones cargadas por JS -->
                    </select>
                </div>

                <div>
                    <label for="fecha-inicio" class="block text-sm font-medium text-gray-700 mb-1">Fecha de Inicio</label>
                    <input type="date" id="fecha-inicio" class="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500">
                </div>

                <div>
                    <label for="fecha-fin" class="block text-sm font-medium text-gray-700 mb-1">Fecha de Fin</label>
                    <input type="date" id="fecha-fin" class="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500">
                </div>
                
                <div>
                    <button id="generate-report-btn" class="w-full p-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150 ease-in-out transform hover:scale-[1.01]">
                        Generar Reporte
                    </button>
                </div>
            </div>
            <div id="error-message" class="hidden mt-3 text-sm font-medium text-red-600 bg-red-50 p-3 rounded-lg border border-red-200"></div>
        </div>

        <!-- Sección de Gráficos -->
        <div class="space-y-10 mb-10">

<!-- 3. Gráfico de Barras: Demanda Predicha (Promedio Horario) -->
            <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-200 overflow-x-auto">
                <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    Demanda Predicha Promedio por Hora
                    <span id="loading-demanda" class="hidden ml-4 spinner"></span>
                </h2>
                <div id="reportDemanda" class="w-full relative">
                    <p class="text-center text-gray-400 mt-8">Cargando datos...</p>
                </div>
            </div>
            <!-- 1. Mapa de Calor: Tiempo de Espera (IA) -->
            <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-200 overflow-x-auto">
                <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    Predicción de Tiempo de Espera Estimado (IA)
                    <span id="loading-ia" class="hidden ml-4 spinner"></span>
                </h2>
                <div id="legendIA" class="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 mb-4 items-center">
                    <!-- Leyenda cargada por JS -->
                </div>
                <div id="reportIA" class="w-full">
                    <p class="text-center text-gray-400 mt-8">Cargando datos...</p>
                </div>
            </div>

            <!-- 2. Mapa de Calor: Empleados Necesarios (Recursos) -->
            <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-200 overflow-x-auto">
                <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    Recursos Óptimos Requeridos (Empleados Necesarios)
                    <span id="loading-normal" class="hidden ml-4 spinner"></span>
                </h2>
                <div id="legend" class="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 mb-4 items-center">
                    <!-- Leyenda cargada por JS -->
                </div>
                <div id="report" class="w-full">
                    <p class="text-center text-gray-400 mt-8">Cargando datos...</p>
                </div>
            </div>
            
            
        </div>
        
        <!-- 4. Sección de Resumen del Modelo (NUEVA) -->
        <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                Resumen de Métricas Globales del Modelo
                <span id="loading-summary" class="hidden ml-4 spinner"></span>
            </h2>
            <div id="modelSummary" class="text-gray-700">
                <p class="text-center text-gray-400 mt-8">Cargando resumen de métricas...</p>
            </div>
        </div>

    </div>
</body>',0,0,0)
GO
INSERT INTO [CustomViewParts] ([CustomViewPartId],[DisplayName],[SectionId],[ContentHtml],[Row],[Column],[Debug])VALUES('924A72D1-D59F-431C-B8DE-A34611005C08','','7563C669-2D16-46FC-BB13-74A71B195F5C','<script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: [''Inter'', ''sans-serif''],
                    },
                }
            }
        }
    </script>
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
 <body class="bg-gray-100 p-4 font-sans">

    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h1 class="text-3xl font-bold text-gray-800 text-center mb-4">Reporte Consolidado</h1>
            <p class="text-gray-500 text-center">Análisis de Novedades, Turnos y Demanda de CAV</p>
        </div>

        <!-- Sección de Indicadores Clave -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
                <p class="text-gray-500 font-medium">Total de Novedades</p>
                <h2 id="novedades-count" class="text-4xl font-extrabold text-blue-600 mt-2 animate-bounce">0</h2>
            </div>
            <div class="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
                <p class="text-gray-500 font-medium">Total de Turnos</p>
                <h2 id="turnos-count" class="text-4xl font-extrabold text-green-600 mt-2 animate-bounce">0</h2>
            </div>
            <div class="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
                <p class="text-gray-500 font-medium">Demanda Estimada Total</p>
                <h2 id="demanda-count" class="text-4xl font-extrabold text-orange-600 mt-2 animate-bounce">0</h2>
            </div>
        </div>

        <!-- Sección de Gráficos -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h2 class="text-2xl font-bold text-gray-800 text-center mb-4">Novedades por Tipo y Estado</h2>
                <canvas id="novedadesChart"></canvas>
            </div>
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h2 class="text-2xl font-bold text-gray-800 text-center mb-4">Distribución de Turnos por CAV</h2>
                <canvas id="turnosChart"></canvas>
            </div>
            <div class="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
                <h2 class="text-2xl font-bold text-gray-800 text-center mb-4">Demanda Estimada por CAV</h2>
                <canvas id="demandaChart"></canvas>
            </div>
        </div>
    </div>
</body>',0,0,0)
GO
INSERT INTO [ControlsListViews] ([ControlsListViewId],[AppViewId],[Order],[ListControlType],[TimeRefreshSelect],[TimeRefresh],[Template])VALUES('705FF97B-0694-4C00-B1F9-4DA3A543DFAA','045A453E-E6CF-44D9-8B14-C7A8951A3CFE',0,'Grid',0,NULL,NULL)
GO
INSERT INTO [ControlsListViews] ([ControlsListViewId],[AppViewId],[Order],[ListControlType],[TimeRefreshSelect],[TimeRefresh],[Template])VALUES('E8274A30-0DD9-4F07-BB14-6256B850BAAA','F47443E7-25FA-4C2D-8616-F45895CA632A',0,'Grid',0,NULL,NULL)
GO
INSERT INTO [ControlsListViews] ([ControlsListViewId],[AppViewId],[Order],[ListControlType],[TimeRefreshSelect],[TimeRefresh],[Template])VALUES('FB53B50A-0755-4E0A-AF8E-63CD9E47C94B','282A5474-287E-4FDB-80BF-D9037CA6372A',0,'Grid',0,NULL,NULL)
GO
INSERT INTO [ControlsListViews] ([ControlsListViewId],[AppViewId],[Order],[ListControlType],[TimeRefreshSelect],[TimeRefresh],[Template])VALUES('E5711DA4-0614-42F7-B3BD-6C9A32354A91','0FE5CCDE-A02F-4E24-8A0D-CD54E6D96789',0,'Grid',0,NULL,NULL)
GO
INSERT INTO [ControlsListViews] ([ControlsListViewId],[AppViewId],[Order],[ListControlType],[TimeRefreshSelect],[TimeRefresh],[Template])VALUES('A019D5A2-16A4-4094-8890-BB19C4DE8F50','0B18B0D5-6A97-4BDA-B8AA-A9E173E4ACAE',0,'Grid',0,NULL,NULL)
GO
INSERT INTO [ControlsListViews] ([ControlsListViewId],[AppViewId],[Order],[ListControlType],[TimeRefreshSelect],[TimeRefresh],[Template])VALUES('2203EF12-125A-4223-AF9A-F12CFA1C69D2','475F2523-50C9-4E16-8EE0-0ECF63188B19',0,'Grid',0,NULL,NULL)
GO
INSERT INTO [ControlsListViews] ([ControlsListViewId],[AppViewId],[Order],[ListControlType],[TimeRefreshSelect],[TimeRefresh],[Template])VALUES('7B8AE572-BF73-4FB8-B5FA-FBC90D2CA211','A748C249-CA4E-4CB5-A744-55387AADB3A9',0,'Grid',0,NULL,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('14B2F8B4-E925-47E3-982F-001B925DBA2D','2203EF12-125A-4223-AF9A-F12CFA1C69D2',4,'0B3CA231-45B0-4559-8FD9-D591E9306897',0,0,0,0,0,0,0,0,'EsPreturno',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('3D0838BE-967C-4DEE-B7C4-0283ADB08244','2203EF12-125A-4223-AF9A-F12CFA1C69D2',3,'4A6B92AE-B9D9-41BA-9515-C5C1831B8358',0,0,0,0,0,0,0,0,'HoraFin',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('7F76AD4E-439A-45FB-9C9C-08236391DC47','E8274A30-0DD9-4F07-BB14-6256B850BAAA',3,'D06FD10A-8D30-4AA4-875A-06999D494353',0,0,0,0,0,0,0,0,'FechaReporte',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('98D50BB9-5976-48C3-922A-185B5E83E2C5','7B8AE572-BF73-4FB8-B5FA-FBC90D2CA211',0,'5841005F-009F-4080-952D-442363DCAFF7',0,0,0,0,0,0,0,0,'CENombre',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('C0EBAB32-09F0-4A99-BB5F-191C450D4CDE','A019D5A2-16A4-4094-8890-BB19C4DE8F50',4,'0D18C89E-FBC7-4599-8F29-3D51359CD87E',0,0,0,0,0,0,0,0,'DemandaEstimada',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('51ED889D-9CAF-4D8D-A39C-19DD81071914','FB53B50A-0755-4E0A-AF8E-63CD9E47C94B',0,'C5E15E3F-9096-40ED-80DE-73CE3E710B74',0,0,0,0,0,0,0,0,'Coomeva_Lappiz_CAVDetails.CENombre',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('8256B5FD-6E40-4883-A4A8-263779326FA9','E5711DA4-0614-42F7-B3BD-6C9A32354A91',1,'9D4A4E18-61B1-40BE-AE3D-ED24E37874E6',0,0,0,0,0,0,0,0,'Email',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('737D8054-447F-4493-B0AD-2876E7C4FAFF','2203EF12-125A-4223-AF9A-F12CFA1C69D2',5,'32639AD9-8D71-45B0-8309-AAC883A9668F',0,0,0,0,0,0,0,0,'EsFinSemana',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('8090DA79-5F5E-4109-B5B5-28EC5707DF3F','705FF97B-0694-4C00-B1F9-4DA3A543DFAA',1,'A82453D4-4876-4CAC-9A03-6F6671302647',0,0,0,0,0,0,0,0,'Region',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('47FEE66F-9A79-451D-9166-2C68C7F81F79','FB53B50A-0755-4E0A-AF8E-63CD9E47C94B',9,'76292ECB-65B6-4BE4-85E4-9423AE230426',0,0,0,0,0,0,0,0,'HorasAsignadas',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('898EAC57-9D4E-4DF7-AC16-3397EBCA1FEE','A019D5A2-16A4-4094-8890-BB19C4DE8F50',2,'E7FDCFAB-AF11-4570-BBD1-A69D95BDACAB',0,0,0,0,0,0,0,0,'HorarioApertura',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('4CFD3DE9-4F62-4669-B849-3493C58155F2','FB53B50A-0755-4E0A-AF8E-63CD9E47C94B',10,'F58A96FE-B2AA-4F1C-B5CB-7309669B3CB0',0,0,0,0,0,0,0,0,'FechaGeneracion',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('21C6D91F-3E6F-47DF-9684-37EA0E688787','E8274A30-0DD9-4F07-BB14-6256B850BAAA',6,'482C8CF9-9648-4F60-A728-8E3E09ECD362',0,0,0,0,0,0,0,0,'TipoNovedad',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('340DFF88-01FE-4E8A-914D-399407B85191','705FF97B-0694-4C00-B1F9-4DA3A543DFAA',2,'25D8ABD1-872A-4D45-84C3-8DB9D7F6F0DE',0,0,0,0,0,0,0,0,'HorarioApertura',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('703CB669-EEF2-436D-8B77-40873E2BD356','FB53B50A-0755-4E0A-AF8E-63CD9E47C94B',5,'4A6B92AE-B9D9-41BA-9515-C5C1831B8358',0,0,0,0,0,0,0,0,'HoraFin',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('1F7FB991-42B3-4347-BCE2-5024DEC66B27','705FF97B-0694-4C00-B1F9-4DA3A543DFAA',3,'A2112799-4624-41CB-A0D9-27D7A2954C50',0,0,0,0,0,0,0,0,'HorarioCierre',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('77F4C359-B3B1-4B52-90F7-506E5C9078A6','E5711DA4-0614-42F7-B3BD-6C9A32354A91',3,'E9B8BC24-6F5B-41CC-B4DE-CF1BA4CE44CD',0,0,0,0,0,0,0,0,'AuthType',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('EA065EDC-B2AD-4543-872D-5856752527F9','E8274A30-0DD9-4F07-BB14-6256B850BAAA',2,'C5E15E3F-9096-40ED-80DE-73CE3E710B74',0,0,0,0,0,0,0,0,'Coomeva_Lappiz_ColaboradorDetails.Coomeva_Lappiz_CAVDetails.CENombre',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('AF788363-F359-4C89-976E-5D52C7BB06D5','7B8AE572-BF73-4FB8-B5FA-FBC90D2CA211',2,'A82453D4-4876-4CAC-9A03-6F6671302647',0,0,0,0,0,0,0,0,'Coomeva_Lappiz_CAVDetails.Region',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('181581D5-6E3A-4A69-9B92-62798DBA9836','E8274A30-0DD9-4F07-BB14-6256B850BAAA',1,'5841005F-009F-4080-952D-442363DCAFF7',0,0,0,0,0,0,0,0,'Coomeva_Lappiz_ColaboradorDetails.CENombre',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('141AD277-4718-401B-B83E-681586E9F674','A019D5A2-16A4-4094-8890-BB19C4DE8F50',3,'CC413761-65F2-4961-AAC0-AD5CEEF66BEF',0,0,0,0,0,0,0,0,'HorarioCierre',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('EB8A5134-D89F-47AE-88CE-6A6D598C0C7F','FB53B50A-0755-4E0A-AF8E-63CD9E47C94B',8,'623D237A-22E8-476D-940E-4B64E6E72A6E',0,0,0,0,0,0,0,0,'EsFestivo',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('49F5BE4B-2709-478D-864A-6B07785B29D6','E8274A30-0DD9-4F07-BB14-6256B850BAAA',8,'8AC4CD31-FB1C-413C-83DE-0DEA2DA5313A',0,0,0,0,0,0,0,0,'CEDescripcion',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('6F3C899B-42CE-4D9F-917D-6C50A7777153','E5711DA4-0614-42F7-B3BD-6C9A32354A91',0,'45BA4D4E-D655-429F-BB19-668E43B60CB8',0,0,0,0,0,0,0,0,'FullName',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('7E6456F0-F5A2-45FC-B0FD-6F2E9BD20464','FB53B50A-0755-4E0A-AF8E-63CD9E47C94B',3,'9A83983E-902C-4492-B3AE-2C357B567795',0,0,0,0,0,0,0,0,'Coomeva_Lappiz_ColaboradorDetails.Cargo',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('DE1A980E-91D2-48B0-8DDB-7DB467DAEDB5','2203EF12-125A-4223-AF9A-F12CFA1C69D2',2,'05DF8186-4CBA-4075-80B0-26144C430968',0,0,0,0,0,0,0,0,'FechaInicio',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('983868D3-D83A-42B6-9DDC-7FB80BA41C9D','7B8AE572-BF73-4FB8-B5FA-FBC90D2CA211',3,'9A83983E-902C-4492-B3AE-2C357B567795',0,0,0,0,0,0,0,0,'Cargo',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('CA27EF2F-FDC9-4F47-A2E5-89D30AC00065','2203EF12-125A-4223-AF9A-F12CFA1C69D2',6,'623D237A-22E8-476D-940E-4B64E6E72A6E',0,0,0,0,0,0,0,0,'EsFestivo',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('5446C59C-B66D-454E-A738-8EB4AA4CCF97','E8274A30-0DD9-4F07-BB14-6256B850BAAA',4,'283C7CEC-2E90-48AC-8D41-D31473FCAF71',0,0,0,0,0,0,0,0,'FechaEfectiva',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('82D6DAE4-ADE1-4FB9-AF59-8F5254B0F206','FB53B50A-0755-4E0A-AF8E-63CD9E47C94B',4,'05DF8186-4CBA-4075-80B0-26144C430968',0,0,0,0,0,0,0,0,'FechaInicio',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('03867C2E-CF1C-4703-96E7-905B16E53E83','2203EF12-125A-4223-AF9A-F12CFA1C69D2',0,'5841005F-009F-4080-952D-442363DCAFF7',0,0,0,0,0,0,0,0,'Coomeva_Lappiz_ColaboradorDetails.CENombre',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('61FB99CD-BDEB-45AF-952D-970EA2043F6C','FB53B50A-0755-4E0A-AF8E-63CD9E47C94B',7,'32639AD9-8D71-45B0-8309-AAC883A9668F',0,0,0,0,0,0,0,0,'EsFinSemana',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('B51E3D71-7FBE-4B8A-9966-A1D124AEB944','E8274A30-0DD9-4F07-BB14-6256B850BAAA',7,'F2FF79FF-05AB-4C2D-9B52-7130D2F587F0',0,0,0,0,0,0,0,0,'Estado',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('DF5F5A7F-B365-4125-AEF9-AD0D6449535D','FB53B50A-0755-4E0A-AF8E-63CD9E47C94B',1,'A82453D4-4876-4CAC-9A03-6F6671302647',0,0,0,0,0,0,0,0,'Coomeva_Lappiz_CAVDetails.Region',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('347B3F56-46CC-4671-AB10-ADC06C42B704','A019D5A2-16A4-4094-8890-BB19C4DE8F50',1,'481436E7-D494-4582-B0B7-FE75C8737A50',0,0,0,0,0,0,0,0,'CETipoDia',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('57349408-A773-4998-A90C-B22120917FC5','E8274A30-0DD9-4F07-BB14-6256B850BAAA',5,'C8A27AFB-7BC2-40EA-8D42-C65E689388F6',0,0,0,0,0,0,0,0,'FechaEfectivaFin',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('96EA8972-69A9-4944-896C-B54C2903584B','FB53B50A-0755-4E0A-AF8E-63CD9E47C94B',2,'5841005F-009F-4080-952D-442363DCAFF7',0,0,0,0,0,0,0,0,'Coomeva_Lappiz_ColaboradorDetails.CENombre',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('6B6AA89D-88F2-47AC-9199-B83B0CF16315','E5711DA4-0614-42F7-B3BD-6C9A32354A91',2,'914427F2-A86D-4E48-A537-9779A9DBB844',0,0,0,0,0,0,0,0,'Activo',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('DE52045B-28CE-4C1D-8324-D1E39AFD5916','2203EF12-125A-4223-AF9A-F12CFA1C69D2',8,'F58A96FE-B2AA-4F1C-B5CB-7309669B3CB0',0,0,0,0,0,0,0,0,'FechaGeneracion',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('4164B214-FE82-4E62-BD92-D845FACD8580','7B8AE572-BF73-4FB8-B5FA-FBC90D2CA211',1,'C5E15E3F-9096-40ED-80DE-73CE3E710B74',0,0,0,0,0,0,0,0,'Coomeva_Lappiz_CAVDetails.CENombre',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('B5820A89-917B-4EE7-9627-EB33F9DE7223','A019D5A2-16A4-4094-8890-BB19C4DE8F50',0,'2BC7DEDF-C17A-45A8-953F-7B3FAC8499E0',0,0,0,0,0,0,0,0,'FechaEspecificada',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('0045ECA1-F419-43B4-8D9E-EC9C8272835D','705FF97B-0694-4C00-B1F9-4DA3A543DFAA',0,'C5E15E3F-9096-40ED-80DE-73CE3E710B74',0,0,0,0,0,0,0,0,'CENombre',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('844E7D11-1E0B-4DA0-91A2-F8FDF51B0E45','2203EF12-125A-4223-AF9A-F12CFA1C69D2',1,'9A83983E-902C-4492-B3AE-2C357B567795',0,0,0,0,0,0,0,0,'Coomeva_Lappiz_ColaboradorDetails.Cargo',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('287B9B0C-9391-4061-BAF8-FA52EC796C26','FB53B50A-0755-4E0A-AF8E-63CD9E47C94B',6,'0B3CA231-45B0-4559-8FD9-D591E9306897',0,0,0,0,0,0,0,0,'EsPreturno',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('D9B79538-41C4-4C01-8DCA-FB7243683E66','2203EF12-125A-4223-AF9A-F12CFA1C69D2',7,'76292ECB-65B6-4BE4-85E4-9423AE230426',0,0,0,0,0,0,0,0,'HorasAsignadas',0,0,0,0,0,NULL)
GO
INSERT INTO [FieldsControlsListViews] ([FieldsControlsListViewId],[ControlsListViewId],[Order],[CampoId],[IsGeolocalizacion],[IsNombreCarrusel],[IsDescripcionCarrusel],[IsCarrusel],[IsTitleScheduler],[IsStartScheduler],[IsEndScheduler],[IsDescriptionScheduler],[Ruta],[IsEditableInGrid],[IsColumn],[IsRow],[IsValue],[IsFilter],[Aggregate])VALUES('F844376E-D3CB-450D-AE3A-FFB0DA32DED1','E8274A30-0DD9-4F07-BB14-6256B850BAAA',0,'A9945714-85F5-46DB-9183-8CC1AFEF556A',0,0,0,0,0,0,0,0,'NroNovedad',0,0,0,0,0,NULL)
GO
INSERT INTO [AspNetUsers] ([Id],[Email],[EmailConfirmed],[PasswordHash],[SecurityStamp],[PhoneNumber],[PhoneNumberConfirmed],[TwoFactorEnabled],[LockoutEndDateUtc],[LockoutEnabled],[AccessFailedCount],[UserName],[EmpresaId],[Activo],[UserLdap],[LdapId],[PasswordRijndael],[KeyRijndael],[IVRijndael],[OTPCode],[AuthType],[OtpCodeExpiration],[LastPasswordChange],[FullName])VALUES('762e5679-60c8-448d-8287-d2cf4e730158','admin.mallas@yopmail.com',1,'ABaP2IXvfYRl2YPM8K6uYRTL+wlwuAuES9eAa4xw97tkjRh8zsRp76uUjJG3XPMxow==','986d8adf-48f6-4b12-a79b-e4ca149da286',NULL,0,0,NULL,0,0,'admin.mallas@yopmail.com','ECCB3807-42FE-422E-BB7D-859F2712FA60',1,NULL,'00000000-0000-0000-0000-000000000000','aUorNqq2cAfW1MF4FvhNiw==','H0Yv8a4FjBeSbeqljxwMsowDlFE118eFy36UJxYrYEA=','8hj2iCKU9TNMwN74a4CTfQ==',0,'Lappiz',NULL,'Jul 24 2026  9:46:58:100AM','admin@mallas.io')
GO
INSERT INTO [AspNetRoles] ([Id],[Name],[Description],[Discriminator],[EmpresaId],[AplicacionId],[Status])VALUES('1bd3b6f5-f9ac-47f6-af70-57f1a4fc2226','Admin Mallas',NULL,'ApplicationRole','ECCB3807-42FE-422E-BB7D-859F2712FA60','DE110574-D371-41F0-AE53-97340DD35C73',1)
GO
INSERT INTO [AspNetUserRoles] ([UserId],[RoleId],[Discriminator],[Role_Id],[ApplicationUser_Id],[tenantFk])VALUES('762e5679-60c8-448d-8287-d2cf4e730158','1bd3b6f5-f9ac-47f6-af70-57f1a4fc2226','ApplicationUserRole',NULL,NULL,NULL)
GO
INSERT INTO [RuntimeMenus] ([RuntimeMenuId],[ApplicationId],[Active],[MenuDefinition],[Description],[IsMobile])VALUES('9E6D41A6-CE38-44D4-97E8-DC7C38627C80','DE110574-D371-41F0-AE53-97340DD35C73',1,'[{"Type":"Root","Label":"Menu","index":0,"items":[{"Label":"Seguridad","Type":"Module","id":"","index":0,"ModuleId":"6d765cb9-e6ba-4eff-a19d-81f9beee5dba","items":[{"Label":"Roles","Type":"StaticFeature","id":"","index":0,"StaticFeatureId":"a5e62267-5bfc-405a-89c0-14fdb99c9669"},{"Label":"Asignar permisos","Type":"StaticFeature","id":"","index":1,"StaticFeatureId":"b5e62267-5bfc-405a-89c0-14fdb99c966b"},{"Label":"Usuarios","Type":"View","id":"","index":2,"EntityId":"08b5b3e4-a5c5-4bcd-b8f0-2045b78b5c56","AppViewId":"0fe5ccde-a02f-4e24-8a0d-cd54e6d96789","ViewMode":""}],"expanded":false},{"Label":"Dashboard","Type":"View","id":"","index":1,"EntityId":"08b5b3e4-a5c5-4bcd-b8f0-2045b78b5c56","AppViewId":"74030db3-f337-4f37-b09d-0fd10c1394fd","ViewMode":"New"},{"Label":"CAVs","Type":"View","id":"","index":2,"EntityId":"83652e59-67dc-45e1-8ec8-1f4f575f316d","AppViewId":"045a453e-e6cf-44d9-8b14-c7a8951a3cfe","ViewMode":""},{"Label":"Colaboradores","Type":"View","id":"","index":3,"EntityId":"e959df9e-e04d-49d9-8cd3-71d644bdb880","AppViewId":"a748c249-ca4e-4cb5-a744-55387aadb3a9","ViewMode":""},{"Label":"Turnos","Type":"View","id":"","index":4,"EntityId":"e60238e1-6cf3-4dad-8b7c-dd4261f157dc","AppViewId":"282a5474-287e-4fdb-80bf-d9037ca6372a","ViewMode":""},{"Label":"Novedades","Type":"View","id":"","index":5,"EntityId":"3570ec86-9bdd-4525-8d3a-7ad315ed5346","AppViewId":"f47443e7-25fa-4c2d-8616-f45895ca632a","ViewMode":""},{"Label":"Visualizar mallas","Type":"View","id":"","index":6,"EntityId":"e959df9e-e04d-49d9-8cd3-71d644bdb880","AppViewId":"bd190cae-519c-47ea-8cb6-c33529c226bc","ViewMode":"New"},{"Label":"Meses","Type":"View","id":"","index":7,"EntityId":"e60238e1-6cf3-4dad-8b7c-dd4261f157dc","AppViewId":"bf8b6404-9d12-4c13-bb00-7855afd98bae","ViewMode":"New"},{"Label":"Optimización","Type":"View","id":"","index":8,"EntityId":"08b5b3e4-a5c5-4bcd-b8f0-2045b78b5c56","AppViewId":"c25555bd-70f6-4171-8ed8-df8c743329ff","ViewMode":"New","selected":true}],"expanded":true}]',NULL,0)
GO
INSERT INTO [GlobalEvents] ([GlobaEventId],[ApplicationId],[Description],[EventTypeName],[Implementation],[Order],[IsBackend],[IsDisabled])VALUES('6CBEC65B-ED6A-4CC4-B559-42258FB5B8E6','DE110574-D371-41F0-AE53-97340DD35C73',NULL,'ApplicationLoaded','sessionStorage.typeAlert = ''Sweet''',0,0,0)
GO
INSERT INTO [GlobalEvents] ([GlobaEventId],[ApplicationId],[Description],[EventTypeName],[Implementation],[Order],[IsBackend],[IsDisabled])VALUES('630885B5-8837-4336-AC79-86DBBCCD75E9','DE110574-D371-41F0-AE53-97340DD35C73',NULL,'LoginLoaded','sessionStorage.typeAlert = ''Sweet''',0,0,0)
GO
INSERT INTO [GlobalEvents] ([GlobaEventId],[ApplicationId],[Description],[EventTypeName],[Implementation],[Order],[IsBackend],[IsDisabled])VALUES('9FF87993-B351-4330-84EB-911B756505B1','DE110574-D371-41F0-AE53-97340DD35C73','Alertas de SWAL','GlobalGeneral','function notificationToast(icon, text, title=''''){
    let options = { 
        text,
        title: title || null,
        icon, 
        toast: true,
        position: ''bottom-end'',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    };
    Swal.fire(options);
}
async function confirmAlert(icon, text){
    try{
        let result  = await Swal.fire({
          position: ''top'',
          text,
          icon,
          showCancelButton: true,
          confirmButtonText: ''Si'',
          cancelButtonText: ''No''
        })
        if (result.dismiss === Swal.DismissReason.cancel) {
            return false;
        }
        return true;
    }catch(error){
        return false;
    }
}
async function inputAlert(text, input=''text'', title= null, inputPlaceholder = "", inputValue= null, showCloseButton= false){
    try{
        const value = await Swal.fire({
          title: title || null,
          input: input,
          inputLabel: text,
          inputValue: inputValue,
          showCloseButton: showCloseButton,
          allowOutsideClick: false,
          inputPlaceholder: inputPlaceholder||null
        });
        return value.value;   
    }catch(error){
        return null;
    }
}',0,0,0)
GO
INSERT INTO [LappizFunctions] ([LappizFunctionId],[Name],[Description],[Implementation],[AplicacionId],[IsAnonymous],[Methodo])VALUES('215754F9-097D-4D46-9926-056BEF951CC4','prediccion',NULL,'(async ()=>{
    try{
        //return res.status(200).send("Entro");
         let headersList = {
        "Content-Type": "application/json"
        }
        let reqOptions = {
          url: "https://ineffaceable-transnationally-xzavier.ngrok-free.dev/api/prediccion/demanda",
          method: "POST",
          headers: headersList,
          data: obj.body,
        }
        const response = await axios.request(reqOptions);
        console.log(response)
        return res.status(200).send(response.data);    
    }catch(error){
        console.error(error.message);
        return res.status(200).send([]);
    }
})();','DE110574-D371-41F0-AE53-97340DD35C73',1,'POST')
GO
INSERT INTO [LappizFunctions] ([LappizFunctionId],[Name],[Description],[Implementation],[AplicacionId],[IsAnonymous],[Methodo])VALUES('F371BA4E-9EB1-4743-A259-55B027F147F6','resumen',NULL,'(async ()=>{
    try {
        let headersList = {
            "Content-Type": "application/json"
        }
        const config = {
            methodo: ''GET'',
            url: "https://ineffaceable-transnationally-xzavier.ngrok-free.dev/api/resumen",
            headers: headersList
        }
        const response = await axios.request(config);
        console.log(response)
        return res.status(200).send(response.data); 
    } catch (e) {
         console.error(error.message);
        return res.status(200).send({});
    }
})();','DE110574-D371-41F0-AE53-97340DD35C73',1,'GET')
GO
INSERT INTO [LappizFunctions] ([LappizFunctionId],[Name],[Description],[Implementation],[AplicacionId],[IsAnonymous],[Methodo])VALUES('695DFB87-61DF-44D2-A45D-D62286FA261B','generateMeshOptimizations','Generar malla con optimizaciones','(async () => {
    try {
        const { cavId, referenceMonth } = obj.body;

        /* Obtienen datos principales para realizar mallas */
        const cav = await getCav(cavId);
        if (!cav) return res.status(404).json({ message: ''CAV no encontrado.'' });

        const employees = await getEmployees(cavId);
        if (!employees.length) return res.status(400).json({ message: ''El CAV no tiene colaboradores activos.'' });

        const reference = await getReferences(cavId, referenceMonth);

        /* Obtenemos información de productividad del cav */
        const [
            conteoTotal,
            traficoPatrones,
            tiempoAtencionGlobal,
            capacidadStaff
        ] = await Promise.all([
            totalNumberVisitsHeadquarters(cavId),
            trafficShiftsPerMonth(cavId),
            avarageServiceTime(cavId),
            employeesPerLocation(cavId)
        ]);

        const dataAnalitics = {
            conteoTotal,
            traficoPatrones,
            tiempoAtencionGlobal,
            capacidadStaff
        };
        
        const inputData = optimizeData(dataAnalitics);

        // 2. Creamos un string denso explicándole a la IA el formato
        const stringifiedData = `
            METRICAS COMPRIMIDAS (Formato: Dia|Franja|Valor):
            [TRAFICO_HISTORICO]
            ${inputData.trafico.join(''\n'')}

            [PROMEDIO_GLOBAL_TIEMPOS_ATENCION_SEG]: ${inputData.tpa}

            [CAPACIDAD_TOTAL_STAFF]: ${inputData.capacity}
            [PROMEDIO_ATENCIONES_DIA]: ${inputData.total}
        `;

        /* Preparamos petición para la IA */
        const headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        }

        const bodyContent = JSON.stringify({
            "prompt": `ROL: Experto en Workforce Management.
                OBJETIVO: Generar script SQL (Coomeva_Lappiz_Turno) para la semana del ${getMondayOfCurrentWeek()}.
                CONTEXTO: CAV ID: ${cavId} el CAV tiene un hora de apertura ${cav.HorarioApertura} y cierra a las ${cav.HorarioCierre}. IDs Colaboradores: [${employees.join('','')}] (Total: ${employees.length}).
                DATOS DE ENTRADA (Lectura de métricas comprimidas):
                Leyenda: M=Mañana, T=Tarde, N=Noche.
                Los datos a continuación representan el comportamiento histórico.
                ---
                ${stringifiedData}
                ---
                CRITERIOS DE OPTIMIZACIÓN:
                1. Si [TRAFICO_HISTORICO] es alto en una franja, asignar más turnos.
                2. Si [TIEMPOS_ATENCION_SEG] > 800s, solapar turnos para reducir espera.
                3. No exceder [CAPACIDAD_TOTAL_STAFF] por día.
                REGLAS DE NEGOCIO:
                1. Turnos de 8h o 4h.
                2. Máx 2 domingos al mes por ID.
                3. Rotación equitativa de los IDs provistos.
                4. La hora de la fecha del turno debe coincidir con la hora de apertura de la tienda.
                5. La hora fin debe de coincidir con la hora de cierre de la tienda.
                OBJETIVO: Generar la malla de turnos óptima.
                SALIDA REQUERIDA (JSON PURO):
                Devuelve un objeto con una única clave "turnos" que contenga un array.
                Usa estas claves cortas para ahorrar espacio:
                - "date": Fecha del turno (formato fecha ISO 8601 para SQL Server)
                - "id": ID del colaborador
                - "hourEnd": Hora fin (HH:MM)
                Ejemplo de respuesta esperada:
                {
                    "suggestion": "Se priorizó el turno matutino debido al tráfico...",
                    "query": [
                        { "date": "2025-09-04T...", "id": "4BCC...", "hourEnd": "08:00" },
                        { "date": "2025-11-04T...", "id": "0680...", "hourEnd": "10:00" }
                    ]
                }
                IMPORTANTE: No incluyas texto markdown, ni explicaciones fuera del JSON. Solo el JSON válido.
            `
        });

        let reqOptions = {
            url: "https://tempapi-cgeec8hfdja6bud5.canadacentral-01.azurewebsites.net/generate",
            method: "POST",
            headers: headersList,
            data: bodyContent,
        }

        const response = await axios.request(reqOptions)
        if (!response) return res.status(200).json({ message: ''No es posible generar una malla de turnos ya que el cav no tiene colaboradores.'' });

        const result = getResponse(response.data.respuesta_gemini);
        const query = generateSqlScript(result[''query''], cavId);

        if (query) {
            await controller.execQuery({ query });
            return res.status(200).json({ message: result[''suggestion''] });
        }
    } catch(error) {
        return res.status(401).json({ message: error.message });
    }
})();

/**
 * Obtiene la información del Cav
 * @param { String } cavId 
 * @returns { Promise<Array> }
 */
async function getCav(cavId) {
    try {
        const cav = await modelo.Coomeva_Lappiz_CAV.findOne({ where: { Id: cavId } });

        if (!cav) {
            return res.status(200).json({ message: ''No es posible generar una malla de turnos ya que el cav no existe.'' });
        } 

        return cav;
    } catch(error) {
        return res.status(200).json({ message: ''No es posible generar una malla de turnos ya que el cav no existe.'' });
    }
}

/**
 * Obtiene los colaboradores del CAV
 * @param { String } cavId 
 * @returns { Promise<Array> }
 */
async function getEmployees(cavId) {
    try {
        const employees = await modelo.Coomeva_Lappiz_Colaborador.findAll({ where: { CavFk: cavId }, attributes: [''Id''] });

        if (!employees || employees.length == 0) {
            return res.status(200).json({ message: ''No es posible generar una malla de turnos ya que el cav no tiene colaboradores.'' });
        }

        return employees.map(employee => employee.Id);
    } catch(error) {
        return res.status(200).json({ message: ''No es posible generar una malla de turnos ya que el cav no tiene colaboradores.'' });
    }
}

/**
 * Obtiene las referencias para las nuevas mallas
 * @param { String } cavId
 *  @param { String } referenceMonth
 * @returns { Promise<Array> }
 */
async function getReferences(cavId, referenceMonth) {
    try {
        let dataReferenceString = '''';

        if (referenceMonth) {
            const dataReference = await modelo.Coomeva_Lappiz_Turno
                .findAll({where: { FechaInicio: { ''between'': [referenceMonth.start, referenceMonth.end] }, CAVFk: cavId }, 
                    attributes: [''FechaInicio'', ''CAVFk'', ''ColaboradorFK'', ''HoraFin'', ''EsFinSemana'']});
            
            dataReferenceString = `Ten en cuenta que te puedes basar en la referencia que te paso a continuación en formato de arreglo, 
                referencia: ${JSON.stringify(dataReference)}. Si la referencia existe planea el mes siguiente al de la referencia, 
                es decir si el mes es Noviembre genera la de Diciembre.`
        }

        return dataReferenceString;
    } catch(error) {
        return res.status(200).json({ message: ''No es posible obetener la referencia.'' });
    }
}

/**
 * Retorna el conteo Total de Atenciones por Sede (NombreOficina)
 * @param { String } cavId 
 * @returns { Promise<Array> }
 */
async function totalNumberVisitsHeadquarters(cavId) {
    try {
        const query = getQueryForTotalNumberVisitsHeadquarters(cavId);
        const response = await controller.execQuery({ query });

        return response.result[0];;
    } catch(error) {
        return null;
    }
}

function getQueryForTotalNumberVisitsHeadquarters(cavId) {
    return `WITH ConteoDiarioPorSede AS (
            SELECT
                NombreOficina,
                CAST(Fecha AS DATE) AS Dia,
                COUNT(IdTurno) AS TotalAtencionesDiarias
            FROM
                [Coomeva_Lappiz].[dbo].[Coomeva_Lappiz_TurnosAtencion]
            WHERE
                HoraFinAtencion IS NOT NULL
            GROUP BY
                NombreOficina,
                CAST(Fecha AS DATE)
        ),

        PromedioDiarioPorSede AS (
            SELECT
                NombreOficina,
                AVG(CAST(TotalAtencionesDiarias AS DECIMAL(18, 4))) AS PromedioDiarioAtenciones
            FROM
                ConteoDiarioPorSede
            GROUP BY
                NombreOficina
        )

        SELECT
            T.NombreOficina,
            COUNT(T.IdTurno) AS TotalAtencionesEnPeriodo,
            PD.PromedioDiarioAtenciones
        FROM
            Coomeva_Lappiz_TurnosAtencion AS T
        JOIN
            PromedioDiarioPorSede AS PD
            ON T.NombreOficina = PD.NombreOficina
        WHERE
            T.HoraFinAtencion != ''NULL''
            AND T.CEObservacin = ''${cavId}''
        GROUP BY
            T.NombreOficina,
            PD.PromedioDiarioAtenciones
        ORDER BY
            TotalAtencionesEnPeriodo DESC;
    `;
} 

/**
 * Consulta Optimizada: Tráfico Agrupado por Mes, Día Semana y Franja
 * @param { String } cavId 
 * @returns { Promise<Array> }
 */
async function trafficShiftsPerMonth(cavId) {
    try {
        const query = getQueryTrafficShiftsPerMonth(cavId);
        const response = await controller.execQuery({ query });

        return response.result[0];
    } catch(error) {
        return null;
    }
}

function getQueryTrafficShiftsPerMonth(cavId) {
    return `
        WITH DatosLimpios AS (
        SELECT
            CEObservacin AS CAVId,
            NombreOficina,
            Fecha,
            TRY_CAST(HoraInicioEspera AS TIME) AS HoraInicio,
            IdTurno
        FROM
            Coomeva_Lappiz_TurnosAtencion
        WHERE
            HoraInicioEspera IS NOT NULL
            AND HoraInicioEspera NOT IN (''NULL'', '''')
            AND HoraFinAtencion NOT IN (''NULL'', '''')
    ),
    CalculoFranjas AS (
        SELECT
            CAVId,
            NombreOficina,
            YEAR(Fecha) AS Anio,
            MONTH(Fecha) AS MesNumero,
            DATENAME(MONTH, Fecha) AS NombreMes,        -- Ej: Noviembre
            DATENAME(WEEKDAY, Fecha) AS DiaSemana,      -- Ej: Lunes
            DATEPART(WEEKDAY, Fecha) AS DiaSemanaNum,   -- Para ordenar (1=Domingo o Lunes según config)
            CASE
                WHEN DATEPART(HOUR, HoraInicio) BETWEEN 0 AND 6 THEN ''04_Madrugada (00:00 - 06:59)''
                WHEN DATEPART(HOUR, HoraInicio) BETWEEN 7 AND 11 THEN ''01_Mañana (07:00 - 11:59)''
                WHEN DATEPART(HOUR, HoraInicio) BETWEEN 12 AND 17 THEN ''02_Tarde (12:00 - 17:59)''
                WHEN DATEPART(HOUR, HoraInicio) >= 18 THEN ''03_Noche (18:00 - 23:59)''
                ELSE ''05_Hora Desconocida''
            END AS FranjaHoraria,
            IdTurno
        FROM
            DatosLimpios
        WHERE
            HoraInicio IS NOT NULL
    )
    SELECT
        DiaSemana,
        FranjaHoraria,
        COUNT(IdTurno) AS TotalTurnos
    FROM
        CalculoFranjas
    WHERE
        CAVId = ''${cavId}''
    GROUP BY
        DiaSemanaNum,
        DiaSemana,
        FranjaHoraria
    ORDER BY
        DiaSemanaNum,
        FranjaHoraria;
    `; 
}

/**
 * Tiempo Promedio de Atención (TPA) por Sede, Día y Franja Horaria
 * @param { String } cavId 
 * @returns { Promise<Array> }
 */
async function avarageServiceTime(cavId) {
    try {
        const query = getQueryAvarageService(cavId);
        const response = await controller.execQuery({ query });

        return response.result[0];
    } catch(error) {
        return null;
    }
}

function getQueryAvarageService(cavId) {
    return `
        SELECT 
            AVG(CAST(DATEDIFF(SECOND, ''00:00:00'', TRY_CAST(TiempoAtencion AS TIME)) AS FLOAT)) / 60.0 AS PromedioGlobalMinutos
        FROM 
            Coomeva_Lappiz_TurnosAtencion
        WHERE 
            CEObservacin = ''${cavId}''
            AND HoraInicioEspera IS NOT NULL 
            AND HoraInicioEspera NOT IN (''NULL'', '''')
            AND HoraFinAtencion NOT IN (''NULL'', '''')
            AND TRY_CAST(TiempoAtencion AS TIME) IS NOT NULL;
    `;
}

/**
 * Cantidad de colabores por sede
 * @param { String } cavId 
 * @returns { Promise<Array> }
 */
async function employeesPerLocation(cavId) {
    try {
        const query = `
            SELECT 
                CL.CAVFK AS CAVId,
                C.CENombre AS NombreCav,
                COUNT(CL.Identificacion) AS CantidadEmpleados
            FROM Coomeva_Lappiz_Colaborador AS CL
            JOIN Coomeva_Lappiz_CAV AS C ON CL.CavFk = C.Id
            WHERE C.Id = ''${cavId}''
            GROUP BY 
                CL.CAVFK,
                C.CENombre
        `;
        const response = await controller.execQuery({ query });

        return response.result[0];
    } catch(error) {
        return null;
    }
}

function getResponse(responseIA) {
  let cleanJson = responseIA.replace(/json|\n|```/g, '''');
  let objectIA = JSON.parse(cleanJson);

  if (objectIA.query && objectIA.suggestion) {
    return objectIA;
  } else {
    return { query: null, suggestion: ''Error en el formato que entrega la IA'' };
  }
}

function optimizeData(metrics) {
    // Mapeo de días a corto plazo (ahorra tokens)
    const dayMap = { ''Sunday'': ''DOM'', ''Monday'': ''LUN'', ''Tuesday'': ''MAR'', ''Wednesday'': ''MIE'', ''Thursday'': ''JUE'', ''Friday'': ''VIE'', ''Saturday'': ''SAB'' };
    
    // Mapeo de franjas a códigos simples
    const slotMap = (str) => {
        if (str.includes(''Mañana'')) return ''M''; // Mañana
        if (str.includes(''Tarde'')) return ''T'';  // Tarde
        if (str.includes(''Noche'')) return ''N'';  // Noche
        return ''X'';
    };

    return {
        // Solo enviamos el número total, el nombre de la oficina ya lo tiene el contexto o no es relevante para el algoritmo matemático
        total: metrics.conteoTotal[0][''PromedioDiarioAtenciones''] || 0,
        
        // Convertimos a CSV array
        trafico: metrics.traficoPatrones.map(t => 
            `${dayMap[t.DiaSemana]}|${slotMap(t.FranjaHoraria)}|${t.TotalTurnos}`
        ),
        
        // Eliminamos fechas redundantes y segundos formateados, dejamos solo el entero
        tpa: metrics.tiempoAtencionGlobal[0][''PromedioGlobalMinutos''] || 0,
        
        capacity: metrics.capacidadStaff[0][''CantidadEmpleados''] || 0,
    };
};

function getMondayOfCurrentWeek() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Domingo) a 6 (Sábado)
    
    // Lógica para calcular la diferencia de días respecto al Lunes
    // Si es Domingo (0), restamos 6 días para volver al Lunes de esa semana.
    // Si es otro día (ej. Martes = 2), restamos (2 - 1) = 1 día.
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    // Ajustamos la fecha
    const mondayDate = new Date(today); // Clonamos para no mutar el original si se usara fuera
    mondayDate.setDate(today.getDate() + diffToMonday);

    // Formateamos a YYYY-MM-DD manualmente para evitar problemas de zona horaria (UTC)
    const year = mondayDate.getFullYear();
    const month = String(mondayDate.getMonth() + 1).padStart(2, ''0''); // Los meses van de 0 a 11
    const day = String(mondayDate.getDate()).padStart(2, ''0'');

    return `${year}-${month}-${day}`;
}

/**
 * Genera el script SQL optimizado y seguro
 */
function generateSqlScript(data, cavId) {
    if (!data || data.length === 0) return "No hay datos para insertar";

    // Preparamos los valores
    const valueTuples = data.map(({ date, id, hourEnd }) => {
        // Calculamos dinámicamente si es fin de semana/festivo
        const esFinSemana = getIsWeekendOrHoliday(date);
        
        // Limpieza básica de inyección SQL (Por seguridad)
        const cleanId = id.replace(/''/g, "''''"); 
        const cleanDate = date.replace(/''/g, "''''");
        const cleanHour = hourEnd.replace(/''/g, "''''");

        return `(''${cleanDate}'', ''${cleanHour}'', ''${cavId}'', ''${cleanId}'', ${esFinSemana})`;
    });

    const query = `INSERT INTO Coomeva_Lappiz_Turno (FechaInicio, HoraFin, CAVFk, ColaboradorFK, EsFinSemana) VALUES`;
    return `${query} ${valueTuples.join('','')};`;
};

/**
 * Determina si una fecha es Fin de Semana
 * @param {string} dateStr - Fecha en formato ISO (ej: 2025-11-17T08:00:00.000Z)
 * @returns {number} 1 si es Sábado, Domingo
 */
function getIsWeekendOrHoliday(dateStr) {
    const date = new Date(dateStr);
    
    // 1. Verificamos Fin de Semana (Usamos UTC para coincidir con la Z del string)
    // 0 = Domingo, 6 = Sábado
    const dayOfWeek = date.getUTCDay(); 
    if (dayOfWeek === 0 || dayOfWeek === 6) return 1;

    return 0;
};','DE110574-D371-41F0-AE53-97340DD35C73',0,'POST')
GO
INSERT INTO [LappizFunctions] ([LappizFunctionId],[Name],[Description],[Implementation],[AplicacionId],[IsAnonymous],[Methodo])VALUES('D5B768F8-09AC-4196-B4FE-DC2206578473','GenerarRecomendacionNovedad','Generar recomendaciones de acuerdo con una novedad','(async () => {
  try {
    const { jsonTurnos, infoNovedad } = obj.body;
  
    if (jsonTurnos.length == 0)
      return res.status(200).json({ message: ''Ahora no puedo hacer una sugerencia ya que los turnos no se encuentran afectados con esta novedad.'' });
    
    if (!infoNovedad )
      return res.status(200).json({ message: ''Necesito más información acerca de la novedad'' });
  
    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({
      "prompt": `La malla de turnos ha sufrido la siguiente novedad: ${infoNovedad}, de acuerdo con esto esta novedad afecta los siguientes turnos: ${jsonTurnos}. Redacta un mensaje haciendo sugerencias de cómo poder ajustar esta novedad, ejemplo, contratar a otra persona. Mover a algún empleado de horario para que lo cubra, entre otras alternativas. Debes responder a esta solicitud en formato json donde en un atributo suggestion guardes dichas sugerencias. Solo responde lo puntual, no agregues otro contenido.`
    });


    let reqOptions = {
      url: "https://tempapi-cgeec8hfdja6bud5.canadacentral-01.azurewebsites.net/generate",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    }

    const response = await axios.request(reqOptions)
    if (!response)
      return res.status(200).json({ message: ''No es posible generar una malla de turnos ya que el cav no tiene colaboradores.'' });
    const { suggestion } = getResponse(response.data.respuesta_gemini);

    return res.status(200).json({ message: suggestion });
  } catch (error) {
    return res.status(200).json({ message: error.message });
  }
})();

function getResponse(responseIA) {
  let cleanJson = responseIA.replace(/json|\n|```/g, '''');
  let objectIA = JSON.parse(cleanJson);
  if (objectIA.suggestion)
    return objectIA;
  else
    return { suggestion: ''Error en el formato que entrega la IA'' };
}','DE110574-D371-41F0-AE53-97340DD35C73',0,'POST')
GO
INSERT INTO [LappizFunctions] ([LappizFunctionId],[Name],[Description],[Implementation],[AplicacionId],[IsAnonymous],[Methodo])VALUES('8DA03FF7-3C8C-433C-B476-DCAF53396BE0','GenerarMalla','Código para generar la malla de turnos con IA','(async () => {
  try {
    const { idCav, referenceMonth } = obj.body;
    const cav = await modelo.Coomeva_Lappiz_CAV.findOne({ where: { Id: idCav } });
    if (!cav)
      return res.status(200).json({ message: ''No es posible generar una malla de turnos ya que el cav no existe.'' });
    const empleados = await modelo.Coomeva_Lappiz_Colaborador.findAll({ where: { CavFk: idCav }, attributes: [''Id''] });
    if (!empleados || empleados.length == 0)
      return res.status(200).json({ message: ''No es posible generar una malla de turnos ya que el cav no tiene colaboradores.'' });
    let idsEmpleados = [];
    for (let empleado of empleados) {
      idsEmpleados.push(empleado.Id);
    }
    let dataReferenceString = '''';
    if(referenceMonth){
      const dataReference = await modelo.Coomeva_Lappiz_Turno.findAll({where: {
  FechaInicio: { ''between'': [referenceMonth.start, referenceMonth.end] },
  CAVFk: idCav
}
, attributes: [''FechaInicio'', ''CAVFk'', ''ColaboradorFK'', ''HoraFin'', ''EsFinSemana'']});
      dataReferenceString = `Ten en cuenta que te puedes basar en la referncia que te paso a continuación en formato de arreglo, referencia: ${JSON.stringify(dataReference)}. Si la referencia existe planea el mes siguiente al de la referencia, es decir si el mes es Noviembre genera la de Diciembre.`
    }
    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({
      "prompt": `Genera y diseña la optimización de una malla laboral para 1 semana de acuerdo con la siguiente información: Ten en cuenta que estamos en Noviembre 04 del 2025 CAV (Sede) ${idCav} y se cuenta con los siguientes colaboradores ${idsEmpleados.join('','')} (son los IDS de la BD). ${cav.Descripcion}. ${dataReferenceString} Teniendo en cuenta que la tabla de Coomeva_Lappiz_Turno se compone de atributos como: FechaInicio (formato 2025-09-12T08:00:00.000Z), CAVFk(Sede), ColaboradorFK, HoraFin (Formato HH:MM), EsFinSemana. Entrega  la respuesta en formato JSON, solo dame el JSON listo para hacerle un JSON.parse, ten en cuenta que el JSON debe tener dos atributos. query (Que debe tener el script sql server para ejecutar) y el atributo suggestion (para hacer recomendaciones cortas)`
    });


    let reqOptions = {
      url: "https://tempapi-cgeec8hfdja6bud5.canadacentral-01.azurewebsites.net/generate",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    }

    const response = await axios.request(reqOptions)
    if (!response)
      return res.status(200).json({ message: ''No es posible generar una malla de turnos ya que el cav no tiene colaboradores.'' });
    const { query, suggestion } = getResponse(response.data.respuesta_gemini);
    if (query)
      await controller.execQuery({ query });
    return res.status(200).json({ message: suggestion });
  } catch (error) {
    return res.status(200).json({ message: error.message });
  }
})();

function getResponse(responseIA) {
  let cleanJson = responseIA.replace(/json|\n|```/g, '''');
  let objectIA = JSON.parse(cleanJson);
  if (objectIA.query && objectIA.suggestion)
    return objectIA;
  else
    return { query: null, suggestion: ''Error en el formato que entrega la IA'' };
}','DE110574-D371-41F0-AE53-97340DD35C73',0,'POST')
GO
INSERT INTO [LappizFunctions] ([LappizFunctionId],[Name],[Description],[Implementation],[AplicacionId],[IsAnonymous],[Methodo])VALUES('66EFB0BC-EFEE-4322-80E5-F8596560684D','getAttentionShifts','Lappiz function para obtener turnos de atención','/**
 * @name getAttentionShifts
 * @description Lappiz funtion para obtener los turnos de atención.
 * @author Camilo Villa Polo
 */
 
 const count = obj.body.count;

(async () => {
    const countRows = count ? `TOP ${parseInt(count)}` : '''';
    const query = `
        SELECT 
            ${countRows}
            Id, 
        	NombreOficina, 
        	IdTurno, 
        	Fecha, 
        	HoraInicioEspera, 
        	HoraInicioDesplazamiento, 
        	HoraInicioAtencion, 
        	HoraFinAtencion, 
        	TiempoEspera,
        	TiempoDesplazamiento, 
        	TiempoAtencion,
        	Usuario,
        	Cola,
        	Servicio
        FROM Coomeva_Lappiz_TurnosAtencion`;
    const response = await controller.execQuery({ query });

    if (response && response.result) {
        managementResponse(200, response.result[0]);
    } else {
        const messageError = [{ message: `Ocurrió un error al obtener los turnos de atención.` }];
        managementResponse(401, messageError);
    }
})();

/**
 * Gestiona la respuesta de la petición realizada
 * @param { Number } status 
 * @param { Array } jsonResponse 
 * @returns { Array }
 */
function managementResponse(status, jsonResponse) {
    if (res) { return res.status(status).json(jsonResponse); }
}','DE110574-D371-41F0-AE53-97340DD35C73',1,'POST')
GO
INSERT INTO [AplicationsUser] ([Id],[UserId],[AplicacionId],[IsDev],[Status],[ExpirationDate])VALUES('41FAE638-EAF3-49C5-9FAE-C6CAC331F890','762e5679-60c8-448d-8287-d2cf4e730158','DE110574-D371-41F0-AE53-97340DD35C73',1,'Active','Jun 27 2027 11:39:50:867AM')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('1812B064-5652-4034-A750-06D43A05C457',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',1,1,NULL,'EB1F5413-3216-4DBB-A8E2-A6B5BC64E0D8',0,1,NULL,0,NULL,NULL,NULL,1,NULL,0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('0F2317AC-217F-4039-AD97-170ABC05C64C',1,0,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,1,NULL,'E60238E1-6CF3-4DAD-8B7C-DD4261F157DC',0,0,NULL,0,'517B4CB6-DA59-4912-9F8F-BF820364C360',NULL,NULL,0,NULL,0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('87FC4818-1425-40E5-B616-20DE71F249AC',0,0,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,0,NULL,NULL,0,0,NULL,0,NULL,NULL,NULL,0,NULL,0,'66EFB0BC-EFEE-4322-80E5-F8596560684D',0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('D05945A7-FDE3-49BB-982B-2C4469034F54',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',1,1,NULL,'F4B2601F-A657-4CE4-87ED-D3507CC8FF46',0,1,NULL,0,NULL,NULL,NULL,1,NULL,0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('719B4520-4108-48D9-839F-31C9A0BA2BE2',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,1,NULL,NULL,0,1,NULL,0,NULL,NULL,'B5E62267-5BFC-405A-89C0-14FDB99C966B',0,NULL,0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('40983411-AF1A-4D5D-B981-469BA58FDF3A',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',1,1,NULL,'E60238E1-6CF3-4DAD-8B7C-DD4261F157DC',0,1,NULL,0,NULL,NULL,NULL,1,NULL,0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('667BF66D-D4D8-40FD-A951-49E2C3530592',0,0,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,0,NULL,NULL,0,0,NULL,0,NULL,NULL,'5033382F-BF20-4E57-ADC1-5D5D8C6230C3',0,NULL,0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('76AA6493-871B-4B2A-8199-4A08FE7CAF63',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',1,1,NULL,'3570EC86-9BDD-4525-8D3A-7AD315ED5346',0,1,NULL,0,NULL,NULL,NULL,1,NULL,0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('30E25990-E6FD-414A-B0B0-4A98B6176775',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,1,NULL,NULL,0,1,NULL,0,NULL,'E22C8030-9C24-4ED2-82AC-147928CEDE4D',NULL,0,'A805726D-840C-4EF7-8C31-7A306D658C1A',0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('275D10B6-D590-4ADB-B81D-4B3C60B90263',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,1,NULL,NULL,0,1,NULL,0,NULL,NULL,'A5E62267-5BFC-405A-89C0-14FDB99C9669',0,NULL,0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('8EC3E46F-EA2A-42AA-A406-4D70418AF763',1,0,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,1,NULL,'E60238E1-6CF3-4DAD-8B7C-DD4261F157DC',0,0,NULL,0,'67E35661-9605-4AEF-851F-8D31B701CB20',NULL,NULL,0,NULL,0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('37B7B464-6D0C-48C7-88DA-546C3C3A90FC',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,1,NULL,'E60238E1-6CF3-4DAD-8B7C-DD4261F157DC',0,1,NULL,0,NULL,'BF8B6404-9D12-4C13-BB00-7855AFD98BAE',NULL,0,NULL,0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('B9950776-3CBB-4C2D-BC3E-559EAB2E776F',0,0,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,0,NULL,NULL,0,0,NULL,0,NULL,NULL,'C20BEEFA-7F37-43AC-AD40-5A0C7351240E',0,NULL,0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('5FA2765B-9A0E-4156-9FF7-582DA714C187',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,1,NULL,'3570EC86-9BDD-4525-8D3A-7AD315ED5346',0,1,NULL,0,NULL,'F47443E7-25FA-4C2D-8616-F45895CA632A',NULL,0,NULL,0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('ABAC6FDD-F56A-43BF-A23C-5BDD360E776F',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,1,NULL,'83652E59-67DC-45E1-8EC8-1F4F575F316D',0,1,NULL,0,NULL,'B07C5504-3514-4D0B-B5F6-8DCD47566482',NULL,1,NULL,0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('B3A6BEEA-EAD7-4E2D-8ED0-5F76FC6EBB7E',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',1,1,NULL,'E959DF9E-E04D-49D9-8CD3-71D644BDB880',0,1,NULL,0,NULL,NULL,NULL,1,NULL,0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('AEA59922-F303-4C94-BE2E-6369288C5512',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,1,NULL,'EB1F5413-3216-4DBB-A8E2-A6B5BC64E0D8',0,1,NULL,0,NULL,'0B18B0D5-6A97-4BDA-B8AA-A9E173E4ACAE',NULL,0,NULL,0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('E0B8F3FD-4E9B-436F-AEAD-63AD78A2046A',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,1,NULL,NULL,0,1,NULL,0,NULL,'44293EE2-E5CC-4E98-ADEB-9767BCFF10AA',NULL,0,'3705BE42-B8F3-4E15-858E-A802B48BF715',0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('3ABA35C5-7B62-4550-B681-66932BEB44DB',0,0,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,0,NULL,NULL,0,0,NULL,0,NULL,NULL,NULL,0,NULL,1,'D5B768F8-09AC-4196-B4FE-DC2206578473',0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('59F7B856-DF51-4EEB-8207-671039D216BE',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,1,NULL,NULL,0,1,NULL,0,NULL,'BF8B6404-9D12-4C13-BB00-7855AFD98BAE',NULL,0,'42458F47-B692-47DD-B136-866E327F0C11',0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('7E9DCFD5-60FF-4B12-A6AC-6B272EF8ED77',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',1,1,NULL,'08B5B3E4-A5C5-4BCD-B8F0-2045B78B5C56',0,1,NULL,0,NULL,NULL,NULL,1,NULL,0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('8B3C9113-C125-43F6-839F-6D564D7341E5',0,0,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,0,NULL,NULL,0,0,NULL,0,NULL,NULL,NULL,0,NULL,1,'8DA03FF7-3C8C-433C-B476-DCAF53396BE0',0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('A1C3BECA-E29F-412F-B662-71E721EC9020',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,1,NULL,'83652E59-67DC-45E1-8EC8-1F4F575F316D',0,1,NULL,0,NULL,'045A453E-E6CF-44D9-8B14-C7A8951A3CFE',NULL,1,NULL,0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('910937AC-40F9-4ABD-B0EB-75871FF41CC4',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,1,NULL,'EB1F5413-3216-4DBB-A8E2-A6B5BC64E0D8',0,1,NULL,0,NULL,'44B8A2B4-CE81-456A-938C-563CAEBB300D',NULL,0,NULL,0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('773DDCC9-3FB5-4FBD-B2F2-7D5731B51B0F',0,0,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,0,NULL,NULL,0,0,NULL,0,NULL,NULL,NULL,0,NULL,1,'695DFB87-61DF-44D2-A45D-D62286FA261B',0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('F1C85B6B-44CF-4151-9841-833B3DD3089F',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,1,NULL,NULL,0,1,NULL,0,NULL,'1794FED9-A624-43B1-9B2D-8077249B1DB7',NULL,0,'BFA75D9D-CFBC-45E9-AE3E-D8FF1388FFE9',0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('777595C4-5D11-4E7D-B063-87120AD258F0',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,1,NULL,'3570EC86-9BDD-4525-8D3A-7AD315ED5346',0,1,NULL,0,NULL,'1794FED9-A624-43B1-9B2D-8077249B1DB7',NULL,0,NULL,0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('6F94C611-BF4F-404C-83B9-89C9131E29A6',1,0,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,1,NULL,'E60238E1-6CF3-4DAD-8B7C-DD4261F157DC',0,0,NULL,0,'3CC0BEFA-4AC5-4BCF-8EFF-644564756DF8',NULL,NULL,0,NULL,0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('990E2973-B47D-42B4-A327-8B6068D1D1F7',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,1,NULL,'E959DF9E-E04D-49D9-8CD3-71D644BDB880',0,1,NULL,0,NULL,'BD190CAE-519C-47EA-8CB6-C33529C226BC',NULL,0,NULL,0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('8481D5BA-D00E-4A04-8C82-93D86676A363',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,1,NULL,NULL,0,1,NULL,0,NULL,'B07C5504-3514-4D0B-B5F6-8DCD47566482',NULL,0,'8C5850AA-DE16-423E-96E6-E92FFABACC66',0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('3BE8DC6D-79D8-4E68-9693-940BBD8D2A95',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,1,NULL,'E959DF9E-E04D-49D9-8CD3-71D644BDB880',0,1,NULL,0,NULL,'40409D89-74FD-41A0-B616-222F03CB76B8',NULL,0,NULL,0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('8FF6F0A5-5C2B-4E40-82CB-96E7F676F9D8',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,1,NULL,NULL,0,1,NULL,0,NULL,'BD190CAE-519C-47EA-8CB6-C33529C226BC',NULL,0,'B448EEF3-9B8C-4062-BA9D-B5EFE3D11711',0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('55A3A318-570F-4B1F-B287-A17778F2EAB6',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,1,NULL,'08B5B3E4-A5C5-4BCD-B8F0-2045B78B5C56',0,1,NULL,0,NULL,'44293EE2-E5CC-4E98-ADEB-9767BCFF10AA',NULL,1,NULL,0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('8E968E53-9FA1-4C58-B6B4-A3699A389BD2',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,1,NULL,'E60238E1-6CF3-4DAD-8B7C-DD4261F157DC',0,1,NULL,0,NULL,'475F2523-50C9-4E16-8EE0-0ECF63188B19',NULL,0,NULL,0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('424D0E0B-4BDE-4408-A3F7-A6ADBB5D15A2',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',1,1,NULL,'83652E59-67DC-45E1-8EC8-1F4F575F316D',0,1,NULL,0,NULL,NULL,NULL,1,NULL,0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('74B3BAFE-70B4-4312-ACBF-A878B75D7AB8',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,1,NULL,NULL,0,1,NULL,0,NULL,'AEA02F50-3A07-4BAF-9F53-991B62F8ADC2',NULL,0,'F662C077-3196-4407-A265-CC9F8D043129',0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('AD7E7F6E-BC57-43D4-A1D3-ACB116FBDD7B',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,1,NULL,'E60238E1-6CF3-4DAD-8B7C-DD4261F157DC',0,1,NULL,0,NULL,'E22C8030-9C24-4ED2-82AC-147928CEDE4D',NULL,0,NULL,0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('F9D50054-5B35-44F1-9480-ADF6C798D621',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,1,NULL,NULL,0,1,NULL,0,NULL,'1794FED9-A624-43B1-9B2D-8077249B1DB7',NULL,0,'86DA8015-B098-4D09-B72E-1BC39338E7D0',0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('45C5BE0F-AF69-464D-B69C-B184AAC83D52',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,1,NULL,'08B5B3E4-A5C5-4BCD-B8F0-2045B78B5C56',0,1,NULL,0,NULL,'0FE5CCDE-A02F-4E24-8A0D-CD54E6D96789',NULL,1,NULL,0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('1D9EF450-B03B-4294-A8C6-B41D51ED493D',1,0,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,1,NULL,'3570EC86-9BDD-4525-8D3A-7AD315ED5346',0,0,NULL,0,'76F5EAE8-B4B0-47D2-963C-B0DADF3CADAF',NULL,NULL,0,NULL,0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('054BB7F5-58FC-4567-8397-B46E0615A603',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,1,NULL,'E60238E1-6CF3-4DAD-8B7C-DD4261F157DC',0,1,NULL,0,NULL,'282A5474-287E-4FDB-80BF-D9037CA6372A',NULL,0,NULL,0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('5754C9FE-6D5B-42C8-A870-C1E10571E99F',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,1,NULL,NULL,0,1,NULL,0,NULL,'44B8A2B4-CE81-456A-938C-563CAEBB300D',NULL,0,'5B871442-88A9-42B7-A869-62AF62C1C6AF',0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('F13B42E6-FBEC-44F2-90AE-C31D66CD02F9',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,1,NULL,NULL,0,1,NULL,0,NULL,'C25555BD-70F6-4171-8ED8-DF8C743329FF',NULL,0,'FDFED7C1-C48A-4987-8E61-87BC6510C1F6',0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('B5A25FC8-19CB-4B84-ADFE-C690D208909D',0,0,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,0,NULL,NULL,0,0,NULL,0,NULL,NULL,'7E8A8723-031F-4551-96AA-36D08E1319EA',0,NULL,1,NULL,1,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('37BC8286-EFB9-4109-80BA-D89836205ED9',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,1,NULL,'08B5B3E4-A5C5-4BCD-B8F0-2045B78B5C56',0,1,NULL,0,NULL,'C25555BD-70F6-4171-8ED8-DF8C743329FF',NULL,1,NULL,0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('65AA598E-892E-4009-8D2D-D8B13916429D',1,0,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,1,NULL,'3570EC86-9BDD-4525-8D3A-7AD315ED5346',0,0,NULL,0,'B43B06B0-BAFA-46E9-91F7-F22690479364',NULL,NULL,0,NULL,0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('93CE02D1-A653-48A9-9871-DEA52A0F18C2',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,1,NULL,'E959DF9E-E04D-49D9-8CD3-71D644BDB880',0,1,NULL,0,NULL,'A748C249-CA4E-4CB5-A744-55387AADB3A9',NULL,0,NULL,0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('F13D53AD-02CE-416F-88F9-E92C54C28753',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,1,NULL,NULL,0,1,NULL,0,NULL,'74030DB3-F337-4F37-B09D-0FD10C1394FD',NULL,0,'D4343921-B9C0-423A-BF7F-D5721172AAFE',0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('AD9A4E7E-888B-406A-8907-EEA3B8C7E5FF',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,1,NULL,NULL,0,1,NULL,0,NULL,'40409D89-74FD-41A0-B616-222F03CB76B8',NULL,0,'CEA29FD9-FFE1-4441-B879-A738DBB96D6E',0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('6E61F58C-07A8-44D3-B823-EF4245E87ACF',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,1,NULL,'E60238E1-6CF3-4DAD-8B7C-DD4261F157DC',0,1,NULL,0,NULL,'AEA02F50-3A07-4BAF-9F53-991B62F8ADC2',NULL,0,NULL,0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('FB4465D6-D116-45AD-B161-F260B2B1958C',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,1,NULL,'08B5B3E4-A5C5-4BCD-B8F0-2045B78B5C56',0,1,NULL,0,NULL,'74030DB3-F337-4F37-B09D-0FD10C1394FD',NULL,1,NULL,0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('CAF09E66-3505-4BB5-BB80-F683B99CB465',0,0,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',0,0,NULL,NULL,0,0,NULL,0,NULL,NULL,'CC62AEC3-4146-4C5B-8520-5670FDA1AEC6',0,NULL,0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
INSERT INTO [Permisos] ([PermisoId],[Guardar],[Eliminar],[RolId],[Consultar],[Editar],[CampoId],[TablaId],[Obligatorio],[ShowInMenu],[DashboardId],[Show],[ActionId],[AppViewId],[StaticFeatureId],[VerItem],[TabId],[Execute],[LappizFunctionId],[ExecTx],[LappizPageId])VALUES('E2A7F51C-D7D3-4561-B072-F836D3361231',1,1,'1BD3B6F5-F9AC-47F6-AF70-57F1A4FC2226',1,1,NULL,'BF761567-A014-4DA0-BF7E-A41D96882886',0,1,NULL,0,NULL,NULL,NULL,1,NULL,0,NULL,0,'00000000-0000-0000-0000-000000000000')
GO
