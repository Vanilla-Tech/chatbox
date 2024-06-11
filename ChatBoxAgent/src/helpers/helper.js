
var dateHelper=(function() {
    function getLocalDate(utcDateString) {
        return new Date(utcDateString.replace(' ', 'T') + 'Z');
    }
    return {

        getLocalDate: getLocalDate
    }
})();

export default dateHelper=dateHelper;