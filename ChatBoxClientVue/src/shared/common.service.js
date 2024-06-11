export default {
    getUtcFormattedDate(date) {
        if (!date)
            date = new Date();

        var d = date.getUTCDate();
        var M = date.getUTCMonth() + 1;
        var y = date.getUTCFullYear();
        var h = date.getUTCHours();
        var m = date.getUTCMinutes();
        var s = date.getUTCSeconds();
        return (y + '-' + M.toString().padStart(2,'0') + '-' + d.toString().padStart(2,'0') + ' ' + h.toString().padStart(2,'0') + ':' + m.toString().padStart(2,'0') + ':' + s.toString().padStart(2,'0'));
    },

    getUtcToLocalTime(utcTimeStamp) {
        return new Date(utcTimeStamp.replace(' ', 'T') + 'Z')
    },
    
    formatTime(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    },
    formatDate(dateVal) {
        var newDate = dateVal;
        var sMonth = this.padValue(newDate.getMonth() + 1);
        var sDay = this.padValue(newDate.getDate());
        var sYear = newDate.getFullYear();
        return sDay + "/" + sMonth + "/" + sYear;
    },
    formatUTCDateString(dateVal) {
        var newDate = new Date(dateVal);
        var sMonth = this.padValue(newDate.getMonth() + 1);
        var sDay = this.padValue(newDate.getDate());
        var sYear = newDate.getFullYear();
        return sDay + "/" + sMonth + "/" + sYear;
    },
    padValue(value) {
        return value < 10 ? '0' + value : value;
    },
    consoleError(msg) {
        console.log("\x1b[31m%s\x1b[0m", msg);
    },
    getUniqueIdentifier() {
        return Math.round(new Date().getTime() + (Math.random() * 100));
    },
    setStorage(key, value) {
        window.sessionStorage.setItem(key, value);
    },
    getStorage(key) {
        return window.sessionStorage.getItem(key);
    },
    clearStorage() {
        window.sessionStorage.clear();
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