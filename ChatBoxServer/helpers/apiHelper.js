const axios = require("axios");
const instance = axios.create({
  baseURL: process.env.API_URI + "api/",
  timeout: 20000,
  headers: { ClientId: process.env.CLIENT_KEY, SecretKey: process.env.CLIENT_SECRET }
});
module.exports = {
  axiosInstance: instance
};
