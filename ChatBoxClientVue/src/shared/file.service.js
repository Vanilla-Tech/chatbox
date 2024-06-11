var files = []
export default {
    getFiles() {

    },
    getDataUri(messageId){
        const file = files.filter(s => {
            return s.messageId === messageId
          })[0]
      
          if (file) {
            return file.dataUrl
          }
          return ''
    },
    addFile(file) {
        files.push(file);
    },
    deleteFile(messageId) {
        const file = files.filter(s => {
            return s.messageId === messageId
        })[0]
        files.splice(file)
    },
    getFile(messageId) {
        const file = files.filter(s => {
            return s.messageId === messageId
        })[0]
        return file;
    },
    getBase64iMage(data) {
        return new Promise(res => {
            var reader = new FileReader()
            reader.readAsDataURL(data)
            reader.onload = function () {
                res(reader.result)
            }
        })
    },
    validateFileData(fileName, fileSize) {
        var sFileExtension = fileName.split('.')[fileName.split('.').length - 1].toLowerCase()
        if (
            sFileExtension != 'jpeg' &&
            sFileExtension != 'jpg' &&
            sFileExtension != 'png' &&
            sFileExtension != 'pdf'
        )
            return 'Invalid File Type(Supported File Types : JPEG, JPG, PNG, PDF)'
        if (fileSize > 4194304) return 'Invalid File Size(Max Size: 3 MB)'
        return null
    }

}