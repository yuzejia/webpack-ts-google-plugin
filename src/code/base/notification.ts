 
/**
 * 桌面通知
 */
 export default class NotificationClass {


       // 桌面通知 测试 请访问 www.baidu.com
       checkNotification() {
        if (!("Notification" in window)) {
            // 此浏览器不支持桌面通知
            alert("This browser does not support desktop notification")
        }

        // 检查是否已授予通知权限
        // check whether notification permissions have alredy been granted
        else if (Notification.permission === "granted") {

            // 如果已经授权创建通知
            // If it's okay let's create a notification
            new Notification("", {
                body: "欢迎使用百度~",
                data: "这里会显示什么---"
            })
        }

        // 否则，请向用户请求权限
        // Otherwise, ask the user for permission
        else if (Notification.permission !== "denied") {
            Notification.requestPermission(function (permission) {
                // 如果用户同意了授权 创建通知
                // If the user accepts, let's create a notification
                if (permission === "granted") {
                    new Notification("Request granted!")
                }
            })
        }
    }
}