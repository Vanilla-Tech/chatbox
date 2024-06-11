
var notificationHelper=(function(){

    var trimNotifcation=function(message){
        return (message.length > 20) ? message.substr(0, 19) + '...' : message;
    }
    var showNotification = function (title, message,image) {
        if (!("Notification" in window)) {
            return;
        }
        else if (Notification.permission !== "granted") {
            return;
        }
        var options = {
            body: trimNotifcation(message),
            dir: "ltr",
            icon: process.env.VUE_APP_API_URL+"/images/notiIcon.png",
            image:image?image:null//""
        };
        var notification = new Notification(title, options);
    return notification;
    }
    var askNotificationPermission = function () {
        if (!("Notification" in window)) {
            alert("Your browser doesnot support desktop Notification");
        }
        else if (Notification.permission === "granted") {
          ////  showNotification('Notification Enabled',"NotificationEnabled");
            return;
        }
        else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
                // Whatever the user answers, we make sure we store the information
                if (!('permission' in Notification)) {
                    Notification.permission = permission;
                }
                // If the user is okay, let's create a notification
                if (permission === "granted") {
                   // alert("Notification Enabled");
                  //  showNotification('Notification Enabled',"NotificationEnabled");
                }
            });
        }
    }
    return {
        showNotification:showNotification,
        askNotificationPermission:askNotificationPermission
    }

})();
export default notificationHelper=notificationHelper