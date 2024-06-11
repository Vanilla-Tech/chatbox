var axiosInstance = require("../helpers/apiHelper").axiosInstance;

async function getActiveDepartmentByDepartmentCode(
  departmentCode,
  channelCode
) {
  try {
    var department = await axiosInstance.post(
      `/department/findactivebydepartmentcode`,
      { code: departmentCode, channelCode: channelCode }
    );
    return department.data;
  } catch (error) {
    console.log("getactiveDepartmentsByDepartmentCode: error", error);
    return null;
  }
}

async function getDepartmentByDepartmentCode(departmentCode, channelCode) {
  try {
    var department = await axiosInstance.post(
      `/department/findbydepartmentcode`,
      { code: departmentCode, channelCode: channelCode }
    );
    return department.data;
  } catch (error) {
    console.log("getDepartmentsByDepartmentCode: error", error);
    return null;
  }
}
module.exports = {
  getActiveDepartmentByDepartmentCode,
  getDepartmentByDepartmentCode
};
