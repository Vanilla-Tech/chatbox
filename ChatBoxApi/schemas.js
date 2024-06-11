const Joi = require('joi')

const authDataSchema = Joi.object({
  staffId: Joi.string().uppercase().trim().required(),
  sourcePortal: Joi.string().uppercase().required(),
  password: Joi.string().required().strict()
})

const resetPasswordSchema = Joi.object({
  userId: Joi.string().uppercase().required(),
  password: Joi.string().required().strict()
})

const userIdSchema = Joi.object({
  userId: Joi.string().uppercase().required()
})

const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required().strict(),
  password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/)
    .required()
    .strict(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().strict()
})

const agentByEmailSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required()
})

const agentByIdSchema = Joi.object({
  agentId: Joi.string().required()
})

const customerSaveSchema = Joi.object({
  name: Joi.string().allow(''),
  email: Joi.string().email().lowercase().allow(''),
  mobileNumber: Joi.string().required()
})

const customerSaveByDepartmentSchema = Joi.object({
  name: Joi.string().allow(''),
  email: Joi.string().email().trim().allow(''),
  mobileNumber: Joi.string().allow(''),
  departmentCode: Joi.string().uppercase().required(),
  channelCode: Joi.string().trim().required()
})

const departmentSaveSchema = Joi.object({
  code: Joi.string().trim().required(),
  channelCode: Joi.string().trim().required()
})

const getChatHistorySchema = Joi.object({
  customerId: Joi.string().trim().required(),
  pageNo: Joi.number().required(),
  departmentCode: Joi.string().required().trim()
})

const getChatHistoryByAgentSchema = Joi.object({
  customerId: Joi.string().trim().required(),
  // agentId: Joi.string()
  //   .trim()
  //   .required(),
  lastObjectId: Joi.string().allow(['', null]),
  departmentCode: Joi.string().allow(['', null]),
  chatId: Joi.string().allow(['', null]),
  isAgent: Joi.boolean()
})

const getCustomerChatHistoryByAgentSchema = Joi.object({
  customerId: Joi.string().trim().required(),
  chatId: Joi.string().trim().required(),
  lastObjectId: Joi.string().allow(['', null])
})

const getCustomerListByAgentSchema = Joi.object({
  agentId: Joi.string().trim().required(),
  searchKey: Joi.string().allow(['', null]),
  pageNo: Joi.number().required()
})

const saveChatSchema = Joi.object({
  agentId: Joi.string().trim().required(),
  agentSessionId: Joi.string().trim().required(),
  customerId: Joi.string().trim().required(),
  customerSessionId: Joi.string().trim().required(),
  startTime: Joi.date().required(),
  requestIP: Joi.string().required(),
  channelCode: Joi.string().uppercase().required().trim(),
  departmentCode: Joi.string().required().trim()
})

const updateChatSchema = Joi.object({
  chatId: Joi.string().required(),
  endTime: Joi.date().required(),
  status: Joi.string().required(),
  rating: Joi.number().integer()
})

const rateChatSchema = Joi.object({
  chatId: Joi.string().required(),
  rating: Joi.number().integer().required()
})

const chatHistorySchema = Joi.object({
  messageId: Joi.string().trim().required(),
  timeStamp: Joi.date().required(),
  message: Joi.string().required().trim(),
  isAgentChat: Joi.boolean().required(),
  status: Joi.string().required().uppercase().trim(),
  isChatNote: Joi.boolean().required(),
  isFile: Joi.boolean().default(false),
  originalFileName: Joi.string().allow(['', null])
})

const saveBulkChatHistorySchema = Joi.object({
  chatId: Joi.string().trim().required(),
  messages: Joi.array().items(chatHistorySchema).min(1).required()
})

const saveChatHistorySchema = Joi.object({
  chatId: Joi.string().trim().required(),
  messageId: Joi.string().trim().required(),
  timeStamp: Joi.date().required(),
  message: Joi.string().required().trim(),
  isAgentChat: Joi.boolean().required(),
  status: Joi.string().required().uppercase().trim(),
  isChatNote: Joi.boolean().required(),
  isFile: Joi.boolean().default(false),
  originalFileName: Joi.string().allow(['', null])
})

const offlineMessageSchema = Joi.object({
  customerName: Joi.string().trim().allow(['', null]),
  customerEmail: Joi.string().trim().required(),
  customerMobileNumber: Joi.string().allow(['', null]),
  message: Joi.string().required(),
  departmentCode: Joi.string().required().trim()
})
const userCreateSchema = Joi.object({
  name: Joi.string().trim().required(),
  staffId: Joi.string().uppercase().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().strict(),
  icNumber: Joi.string().trim().required(),
  type: Joi.string().required(),
  chatThreshold: Joi.number().allow(['', null]),
  departments: Joi.array(),
  customerImage: Joi.string().allow(['', null]),
  displayName: Joi.string().allow(['', null])
})
const userUpdateSchema = Joi.object({
  id: Joi.string().trim().required(),
  name: Joi.string().trim().required(),
  staffId: Joi.string().uppercase().required(),
  email: Joi.string().email().required(),
  icNumber: Joi.string().trim().required(),
  type: Joi.string().required(),
  chatThreshold: Joi.number().required(),
  departments: Joi.array(),
  customerImage: Joi.string().allow(['', null]),
  displayName: Joi.string().allow(['', null])
})
const departmentIdSchema = Joi.object({
  departmentId: Joi.string().uppercase().required()
})

const markChatAsDoneSchema = Joi.object({
  chatId: Joi.string().trim().required()
})

const channelSchema = Joi.object({
  code: Joi.string().uppercase().required()
})
const preChatFormSchema = Joi.object({
  isRequired: Joi.boolean().required(),
  name: Joi.boolean().required(),
  email: Joi.boolean().required(),
  mobile: Joi.boolean().required(),
  isNameRequired: Joi.boolean().required(),
  isEmailRequired: Joi.boolean().required(),
  isMobileNumberRequired: Joi.boolean().required()
})

const chatSettingSchema = Joi.object({
  closeTime: Joi.number().required(),
  uniqueIdentifier: Joi.string().required()
})

const openingHoursSchema = Joi.object({
  day: Joi.string().required(),
  openingTime: Joi.number().when('isActive', {
    is: true,
    then: Joi.required(),
    otherwise: Joi.allow(null, '').optional()
  }),
  closingTime: Joi.number().when('isActive', {
    is: true,
    then: Joi.required(),
    otherwise: Joi.allow(null, '').optional()
  }),
  isActive: Joi.boolean().required()
})

const departmentCreateSchema = Joi.object({
  name: Joi.string().trim().uppercase().required(),
  displayName: Joi.string().trim().uppercase().required(),
  channels: Joi.array()
    .items(channelSchema)
    .min(1)
    .required()
    .error(() => {
      return 'Please select at lease one channel'
    }),
  preChatForm: preChatFormSchema.required(),
  offlineForm: preChatFormSchema.required(),
  offlineFormMessage: Joi.string().trim().required(),
  offlineFormEmail: Joi.string().trim().email().required(),
  chatSetting: chatSettingSchema.required(),
  openingDetails: Joi.array().items(openingHoursSchema).min(1).required(),
  announcementBanner: Joi.string().required().trim()
})

const departmentUpdateSchema = Joi.object({
  id: Joi.string().trim().required(),
  name: Joi.string().trim().uppercase().required(),
  displayName: Joi.string().trim().uppercase().required(),
  channels: Joi.array().items(channelSchema).min(1).required(),
  preChatForm: preChatFormSchema.required(),
  offlineForm: preChatFormSchema.required(),
  offlineFormMessage: Joi.string().trim().required(),
  offlineFormEmail: Joi.string().trim().email().required(),
  chatSetting: chatSettingSchema.required(),
  openingDetails: Joi.array().items(openingHoursSchema).min(1).required(),
  announcementBanner: Joi.string().required().trim()
})

// export the schemas
module.exports = {
  '/api/login': authDataSchema,
  '/api/resetpassword': resetPasswordSchema,
  '/api/changePassword': changePasswordSchema,
  '/api/forcechangepassword': changePasswordSchema,
  '/api/agents/findbyemail': agentByEmailSchema,
  '/api/agents/findbyid': agentByIdSchema,
  '/api/customer/save': customerSaveSchema,
  '/api/customer/addupdate': customerSaveSchema,
  '/api/customer/departmentsave': customerSaveByDepartmentSchema,
  '/api/department/findbydepartmentcode': departmentSaveSchema,
  '/api/department/findactivebydepartmentcode': departmentSaveSchema,
  '/api/chat/chathistorybycustomer': getChatHistorySchema,
  '/api/chat/chathistorybyagent': getChatHistoryByAgentSchema,
  '/api/chat/customerchathistorybyagent': getCustomerChatHistoryByAgentSchema,
  '/api/chat/customerListByAgent': getCustomerListByAgentSchema,
  '/api/chat/saveChat': saveChatSchema,
  '/api/chat/updateChat': updateChatSchema,
  '/api/chat/rateChat': rateChatSchema,
  '/api/chat/saveBulkChatHistory': saveBulkChatHistorySchema,
  '/api/chat/saveChatHistory': saveChatHistorySchema,
  '/api/chat/markChatAsDone': markChatAsDoneSchema,
  '/api/email/offline': offlineMessageSchema,
  '/api/users/block': userIdSchema,
  '/api/users/unblock': userIdSchema,
  '/api/users/approveuser': userIdSchema,
  '/api/users/createuser': userCreateSchema,
  '/api/users/updateuser': userUpdateSchema,
  '/api/department/block': departmentIdSchema,
  '/api/department/unblock': departmentIdSchema,
  '/api/department/create': departmentCreateSchema,
  '/api/department/update': departmentUpdateSchema
}
