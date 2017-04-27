/**
 * Created by Administrator on 2017/4/26.
 */
var    webSocketServer=require("ws").Server;
var wss=new  webSocketServer({port:4567});
var clientlength=1;

function fasong(state,obj) {
    wss.clients.forEach(function (client) {
        if (state==1){
            client.send(obj.name+"说了:"+obj.neirong);
        }
        if(state==0){
            client.send(obj.name+"退出了");
        }
    })
}

wss.on("connection",function(ws){
var user;
    console.info("连接成功");
    ws.send("当前连接人数"+clientlength+"人");
    clientlength+=1;
    ws.on("message",function (req,flags) {
        var obj=eval("("+req+")");
        console.info(obj.neirong);
        console.info(obj.name);
        if (obj.name!=""){
            user=obj;
            fasong(1,obj)
        }
    });
    ws.on("close",function (close) {
        clientlength-=1;
        try{
            console.info(user.name);
            fasong(0,user)
        }catch(e){
            console.info("页面刷新了")
        }
    })
});