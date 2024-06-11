// import axios from 'axios'
// import moment from 'moment'
// import Vue from 'vue'

const state = {
  files: []
}

// getters
const getters = {
  getImageDataUrl: state => messageId => {
    const file = state.files.filter(s => {
      return s.messageId === messageId
    })[0]

    if (file) {
      return file.dataUrl
    }
    return ''
  }
}

// actions
const actions = {
  sendChunkFile({ commit, state }, { data }) {
    var selectedFileData = state.files.filter(s => {
      return s.messageId === data.messageId
    })[0]
    if (selectedFileData) {
      var Place = data['place'] * 409600 //The Next Blocks Starting Position
      var NewFile //The Variable that will hold the new Block of Data
      //var selectedFileData = _.find(filesToUpload, function (x) { return x.messageId == data.messageId; });

      const regex = /data:.+?,/
      var selectedFile = selectedFileData.dataUrl.replace(regex, '')

      if (selectedFile.webkitSlice)
        NewFile = selectedFile.webkitSlice(
          Place,
          Place + Math.min(409600, selectedFile.length - Place)
        )
      else if (selectedFile.mozSlice)
        NewFile = selectedFile.mozSlice(
          Place,
          Place + Math.min(409600, selectedFile.length - Place)
        )
      else
        NewFile = selectedFile.slice(Place, Place + Math.min(409600, selectedFile.length - Place))
      commit('SEND_CHUNK_FILE', {
        name: selectedFileData.originalName,
        isAgent: true,
        data: NewFile,
        messageId: selectedFileData.messageId,
        customerSessionId: selectedFileData.customerSessionId
      })
      //this.$socket.emit('upload', )

      // var Place = data['place'] * 524288 //The Next Blocks Starting Position
      // var NewFile //The Variable that will hold the new Block of Data
      // var selectedFile = selectedFileData.file
      // if (selectedFile.webkitSlice)
      //   NewFile = selectedFile.webkitSlice(
      //     Place,
      //     Place + Math.min(524288, selectedFile.size - Place)
      //   )
      // else if (selectedFile.mozSlice)
      //   NewFile = selectedFile.mozSlice(Place, Place + Math.min(524288, selectedFile.size - Place))
      // else NewFile = selectedFile.slice(Place, Place + Math.min(524288, selectedFile.size - Place))
      // selectedFileData.reader.readAsBinaryString(NewFile)
    }
  }
}

// mutations
const mutations = {
  RESET(state) {
    state.files = []
  },
  ADD_FILES(state, files) {
    state.files.push(files)
  },
  DELETE_FILES(state, messageId) {
    const file = state.files.filter(s => {
      return s.messageId === messageId
    })[0]
    state.files.splice(state.file.indexOf(file), 1)
  },
  GET_DATA_URL(state, messageId) {
    const file = state.files.filter(s => {
      return s.messageId === messageId
    })[0]

    if (file) {
      return file.dataUrl
    }
    return ''
  },
  SEND_CHUNK_FILE(state, data) {
    // var selectedFileData = state.files.filter(s => {
    //   return s.messageId === data.messageId
    // })[0]
    // if (selectedFileData) {
    //   var Place = data['place'] * 409600; //The Next Blocks Starting Position
    //   var NewFile; //The Variable that will hold the new Block of Data
    //   //var selectedFileData = _.find(filesToUpload, function (x) { return x.messageId == data.messageId; });
    //     const regex = /data:.+?,/;
    //    var selectedFile= selectedFileData.dataUrl.replace(regex, "");
    //   if (selectedFile.webkitSlice)
    //     NewFile = selectedFile.webkitSlice(Place, Place + Math.min(409600, (selectedFile.length - Place)));
    //   else if (selectedFile.mozSlice)
    //     NewFile = selectedFile.mozSlice(Place, Place + Math.min(409600, (selectedFile.length - Place)));
    //   else
    //     NewFile = selectedFile.slice(Place, Place + Math.min(409600, (selectedFile.length - Place)));
    //     this.$socket.emit('upload', {
    //           name: selectedFileData.originalName,
    //           isAgent: true,
    //           data: evnt.target.result,
    //           messageId: file.messageId,
    //           customerSessionId: selectedFileData.customerSessionId
    //         })
    // var Place = data['place'] * 524288 //The Next Blocks Starting Position
    // var NewFile //The Variable that will hold the new Block of Data
    // var selectedFile = selectedFileData.file
    // if (selectedFile.webkitSlice)
    //   NewFile = selectedFile.webkitSlice(
    //     Place,
    //     Place + Math.min(524288, selectedFile.size - Place)
    //   )
    // else if (selectedFile.mozSlice)
    //   NewFile = selectedFile.mozSlice(Place, Place + Math.min(524288, selectedFile.size - Place))
    // else NewFile = selectedFile.slice(Place, Place + Math.min(524288, selectedFile.size - Place))
    // selectedFileData.reader.readAsBinaryString(NewFile)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
