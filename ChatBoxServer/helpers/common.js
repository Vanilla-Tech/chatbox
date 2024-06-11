function getCurrentTimeInMinutes() {
    var currentDate = new Date();
    return currentDate.getHours() * 60 + currentDate.getMinutes();
}
function getCurrentDay() {
    var date = new Date();
    var dateString=date.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    return dateString.split(',')[0];
}

function getCurrentUtcDate(){
    return new Date(new Date.toUTCString);
}

var getFormattedUtcDate=function(date) {

    var d = date.getUTCDate();
    var M = date.getUTCMonth() + 1;
    var y = date.getUTCFullYear();
    var h=date.getUTCHours();
    var m=date.getUTCMinutes();
    var s=date.getUTCSeconds();
    return (y+'-'+M.toString().padStart(2, "0")+'-'+d.toString().padStart(2, "0")+' '+h.toString().padStart(2, "0")+':'+m.toString().padStart(2, "0")+':'+s.toString().padStart(2, "0"));
}


module.exports = {
    getCurrentTimeInMinutes,
    getFormattedUtcDate,
    getCurrentDay,
    getCurrentUtcDate
}