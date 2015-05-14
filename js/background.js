chrome.browserAction.onClicked.addListener(function (tab) {
	
  //Getting Current URL
  chrome.tabs.getSelected(null, function(tab) {
  		
    //Getting tab URL
    tabUrl = tab.url;
    
    //Getting Base URL
    var URLRegEX = /(.*\....)/;
    var baseURL = URLRegEX.exec(tabUrl)[0];
    
    //Getting Settings from LocalStorage
    var ServerURL = localStorage["ServerURL"];
    var APIKey = localStorage["APIKey"];
    
    //Checking to see if settings have been set
    if (typeof ServerURL === "undefined"||ServerURL === ""||typeof APIKey === "undefined"||APIKey === ""){
      alert("Please verify Server, API Key, and File Extentions are set in the Options for this extention.")
    }
    else{
      
      //Setting Variables
      var TotalFiles = 0;
      
      console.log("ServerURL: "+ServerURL);
      if (typeof ServerURL === "undefined"){
        alert("Please Set your Python Server Location via Settings");
      }
      else{
        SendLink(tabUrl,ServerURL,APIKey);
        console.log(tabUrl);
      } 
    }
  });
});

function SendLink(link,server,apikey){
  $.ajax({
  	type: "POST",
  	url: server,
  	data: { apikey: apikey, url: link },
  	contentType: "application/x-www-form-urlencoded",
  	async: false
  });
}