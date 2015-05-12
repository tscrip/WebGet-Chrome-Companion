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
    var FileExt = localStorage["FileExt"];
	  var KeywordsIgn = localStorage["KeywordsIgn"];
    
    //Checking to see if settings have been set
    if (typeof FileExt === "undefined"||FileExt === ""||typeof ServerURL === "undefined"||ServerURL === ""||typeof APIKey === "undefined"||APIKey === ""){
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

function CheckFilename(filename,fileext,keywordsignore){
  //Converting filename to lower case
  var LowerFilename = filename.toLowerCase();
  
  //Setting variables
  this.GoodFilename = false;
  
  //Building arrays
	var FileExtArr = fileext.split(",");
	var KeywordsIgnArr = keywordsignore.split(",");
	
	//Looking for extention in filename
	$.each(FileExtArr, function(index, value){
	    if (LowerFilename.indexOf(value.toLowerCase()) > -1 ){
  	    //Approved extention has been found
  	    self.GoodFilename = true;
  	    return false;
  	  }
	});
	
	//Checking result of extention check
	if (self.GoodFilename === false){
	  return false;
	}
	//Checking to see if ignore keywords are set
	if (keywordsignore !== ""){
	  
	  //Checking filename for ignored keywords
  	$.each(KeywordsIgnArr, function(index, value){
    	if (LowerFilename.indexOf(value.toLowerCase()) > -1 ){
  	    //Invalid Keyword has been found
  	    self.GoodFilename = false;
  	    return false;
    	}
  	});
	}
	
	//Checking result of keyword check
	if (this.GoodFilename === false){
    //Either extention not found or contained invalid keyword
	  return false;
	}
	else{
	  //Proper extention found or contained no invalid keywords
	  return true;
	}
}

function SendLink(link,server,apikey){
  $.ajax({
  	type: "POST",
  	url: server,
  	data: { apikey: apikey, url: link },
  	contentType: "application/x-www-form-urlencoded",
  	async: false
  });
}
