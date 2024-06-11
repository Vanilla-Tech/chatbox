var apiHelper = require("../helpers/apiHelper");
var axiosInstance = apiHelper.axiosInstance;

async function saveCustomer(
  name,
  email,
  mobileNumber,
  departmentCode,
  channelCode
) {
  try {
    var savedCustomer = await axiosInstance.post("/customer/departmentsave", {
      name: name,
      email: email,
      mobileNumber: mobileNumber,
      departmentCode: departmentCode,
      channelCode: channelCode,
    });
    return savedCustomer.data;
  } catch (error) {
    console.log("saveCustomerError", error);
    return null;
  }
}

module.exports = {
  saveCustomer,
};
