$(document).ready(function(){  
    //getCurIp();  
    try{  
    g_newsArr=JSON.parse(''+localStorage['newsArr']);// background.html 页面的localStorage['newsArr']内容  
        g_newsArrCookie=JSON.parse(''+localStorage['newsArrCookie']);// background.html 页面的localStorage['newsArr']内容  
        g_setclearLocalStorage=localStorage['setclearLocalStorage'];  
    }catch(c){}  
    //添加消息接收处理
    chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {  
    		console.log(request.cmd+request.msg);
        if(request.cmd=='greet'){  
        	
        	//回复content 已收到
        	  chrome.tabs.getSelected(null, function(tab) {
	  					chrome.tabs.sendMessage(tab.id, {greeting: "from bg:hello content"}, function(response) {
	       				console.log("send to content scripts done");
      				});  
      			});
           // console.log(request.arr)  
            //g_newsArr=request.arr;  
           // g_newsArrCookie=request.arrCookie;  
            //g_newsArr+="zpp";//  
           // localStorage['newsArrCookie']=JSON.stringify(g_newsArrCookie);  
  
           // localStorage['newsArr']=JSON.stringify(g_newsArr);  
  
  
  
        }else if(request.cmd=='getNewsArr'){  
            sendResponse({'arr':g_newsArr,'arrCookie':g_newsArrCookie});  
        }  
    })  
		//注册cookies监听器,用于监听cookies的修改
		chrome.cookies.onChanged.addListener(cookieListener);
	 //注册当前页切换,获取当前window与tab
	 chrome.tabs.onActivated.addListener(function(info){
	 		window.info = info;
	 	}
	 
	 );
 //   chrome.tabs.getSelected(null, function(tab) {
 //   chrome.tabs.sendMessage(tab.id, {greeting: "hello"}, function(response) {
   //     console.log("bg send greeting");
     // });  
    //chrome.tabs.query({active:true}, function(tab) {
    //	console.log("query bg send test");
    //	chrome.tabs.sendMessage(tab.id, "bk greeting", function(response) {
    //    console.log("bg send greeting");
    //	});
		//定时获取信息
		var cookieTimer = setInterval(loadAllCookies,20000);
});  

function cookieListener(info){
	window.myinfo=info;
	console.log(info.cookie);
}

function loadAllCookies(){

	//console.log("loadAllCookies");
	chrome.cookies.getAll({},handleCookie);
}

function handleCookie(all){
	//console.log("handleCookie:"+all);
	//send cookie to content scripts
	var msg="";
	
	//construct the cookie msg
	for(var i=0;i<all.length;i++){
		var c=all[i];
		
		if(c.httpOnly){
			//console.log(c);
		}
		msg+=c.name+"="+c.value+";";
	}
	//console.log("handleCookie:"+msg);
	var res=msg.replace(/[\r\n]/g, "");
	//res=res.replace(/\n/g,"<br>");
	sendToFront(res);
}
function sendToFront(o){
    chrome.tabs.sendMessage(window.info.tabId,{
        cookie: o
    }, function(response) {
        console.log(response);
    });	
}
function test(){
	console.log("bg chrome:"+chrome.extension);
}
    	(function(){
        chrome.browserAction.onClicked.addListener(function(tab) {
            // 扩展向内容脚本发送消息
            chrome.tabs.sendMessage(tab.id,{
                greeting: "hello to content script!"
            }, function(response) {
                console.log(response.farewell);
            });
        });
     })();