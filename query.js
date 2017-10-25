function query(){
	var url="http://www.guangeryi.com/admin2/navigation/list";
	console.log("my plugins query");
	console.log("chrome cookies:"+chrome.cookies);
		
	chrome.extension.onMessage.addListener(
     function(request, sender, sendResponse) {
     		console.log("this is cotent.js receive msg");
     		console.log("type of cookie="+typeof(request.cookie));
         console.log(request.cookie);
         }
  );
  chrome.extension.sendMessage({cmd: "greet",'msg':["from content:hello"],'arrCookie':""},function(response) {  
    });  
	var params={
			"pageIndex":1
		};
	$.getJSON(url,function(result){
		
		console.log(result);
	})
}

query();