var client = require('./redisConnection').client

let fetchMessages = async chatId => {
  return new Promise((resolve, reject) => {
    client().then(
      res => {
        res.lrangeAsync(chatId, 0, -1).then(
          messages => {
            resolve(JSON.parse(messages))
          },
          err => {
            reject(err)
          }
        )
      },
      err => {
        reject('Redis connection failed: ' + err)
      }
    )
  })
}

let addMessage = async message => {
  return new Promise((resolve, reject) => {
    client().then(
      res => {
        res
          .multi()
          .rpush(message.chat, JSON.stringify(message))
          .execAsync()
          .then(
            res => {
              resolve(res)
            },
            err => {
              reject(err)
            }
          )
      },
      err => {
        reject('Redis connection failed: ' + err)
      }
    )
  })
}

let fetchConnectedCustomers = async () => {
  return new Promise((resolve, reject) => {
    client().then(
      res => {
        res.getAsync('connectedCustomers').then(
          users => {
            resolve(JSON.parse(users))
          },
          err => {
            reject(err)
          }
        )
      },
      err => {
        reject('Redis connection failed: ' + err)
      }
    )
  })
}

let updateConnectedCustomers = async customerArray => {
  return new Promise((resolve, reject) => {
    client().then(
      res => {
        res.setAsync('connectedCustomers', JSON.stringify(customerArray)).then(
          res => {
            resolve('customers updated')
          },
          err => {
            reject(err)
          }
        )
      },
      err => {
        reject('Redis connection failed: ' + err)
      }
    )
  })
}

let fetchConnectedAgents = async () => {
  return new Promise((resolve, reject) => {
    client().then(
      res => {
        res.getAsync('connectedAgents').then(
          users => {
            resolve(JSON.parse(users))
          },
          err => {
            reject(err)
          }
        )
      },
      err => {
        reject('Redis connection failed: ' + err)
      }
    )
  })
}

let updateConnectedAgents = async agentsArray => {
  return new Promise((resolve, reject) => {
    client().then(
      res => {
        res

          .setAsync('connectedAgents', JSON.stringify(agentsArray))

          .then(
            res => {
              resolve('Connected Agents added')
            },
            err => {
              reject(err)
            }
          )
      },
      err => {
        reject('Redis connection failed: ' + err)
      }
    )
  })
}

let fetchInAppMessage = async () => {
  return new Promise((resolve, reject) => {
    client().then(
      res => {
        res.getAsync('inAppMessages').then(
          messages => {
            resolve(JSON.parse(message))
          },
          err => {
            reject(err)
          }
        )
      },
      err => {
        reject('Redis connection failed: ' + err)
      }
    )
  })
}

let addUpdateInAppMessages = async messagesArray => {
  return new Promise((resolve, reject) => {
    client().then(
      res => {
        res.setAsync('inAppMessages', JSON.stringify(chatsArray)).then(
          res => {
            resolve('In AppMessages Added')
          },
          err => {
            reject(err)
          }
        )
      },
      err => {
        reject('Redis connection failed: ' + err)
      }
    )
  })
}

let updateChatPairs = async chatsArray => {
  return new Promise((resolve, reject) => {
    client().then(
      res => {
        res

          .setAsync('chats', JSON.stringify(chatsArray))

          .then(
            res => {
              resolve('Connected Agents added')
            },
            err => {
              reject(err)
            }
          )
      },
      err => {
        reject('Redis connection failed: ' + err)
      }
    )
  })
}

let fetchChats = async () => {
  return new Promise((resolve, reject) => {
    client().then(
      res => {
        res.getAsync('chats').then(
          chats => {
            resolve(JSON.parse(chats))
          },
          err => {
            reject(err)
          }
        )
      },
      err => {
        reject('Redis connection failed: ' + err)
      }
    )
  })
}
module.exports = {
  fetchChats,
  updateChatPairs,
  updateConnectedAgents,
  fetchConnectedAgents,
  updateConnectedCustomers,
  fetchConnectedCustomers,
  addMessage,
  fetchMessages,
  addUpdateInAppMessages,
  fetchInAppMessage
}
