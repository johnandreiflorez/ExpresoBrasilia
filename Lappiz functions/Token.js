(async () => {
    try {
      const result = await getToken();
      if (result.error) {
        return res.status(400).json(result);
      }
      return res.status(200).send(result);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  })();

  async function getToken() {
    try {
      const url = "https://designertest.lappiz.io/Api/token";
      const data = new URLSearchParams();
      data.append("grant_type", "password");
      data.append("username", "gerencia@mobilitysolutionsas.com");
      data.append("password", "Mobility.2025");
      const config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      };
  
      const response = await axios.post(url, data, config);
      return response.data.access_token;
    } catch (error) {
      console.log("error", error);
      return res.status(400).json(error);
    }
  }