/*
This is a early version of the background.js file.
In this file, we attempted to parse the links with JS instead of with Python.
We ended up going with Python for multiple reasons:
	1. For very large directory/file lists, the JS method was getting tied up and creating browser slowness
	2. We wanted one central location for all configuration
	3. During benchmarks, Python was slightly faster at parsing HTML
	4. This allows for a "Fire and Forget" configuration on the client side

*/
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
	  var DirDepth = localStorage["DirDepth"] - 1;
    
    //Checking to see if settings have been set
    if (typeof FileExt === "undefined"||FileExt === ""||typeof ServerURL === "undefined"||ServerURL === ""||typeof APIKey === "undefined"||APIKey === ""){
      alert("Please verify Server, API Key, and File Extentions are set in the Options for this extention.");
    }
    else{
      
      console.log("ServerURL: "+ServerURL);
      if (typeof ServerURL === "undefined"){
        alert("Please Set your Python Server Location via Settings");
      }
      else{
        //Creating arrays to hold data
        var FilesList = new Array();
        var DirectoriesList0= new Array();
        
        //Setting variables
        var TotalFiles = 0;
        var SiteRootHTML = $.ajax({type: "GET", url: baseURL, async: false}).responseText;
        
        //Looping through all anchor tags
        $(SiteRootHTML).find('a').each(function(){
          var link = $(this).attr('href');
          if (link != "../"||link.indexOf(baseURL) < 0){
            if(CheckFilename(link,FileExt,KeywordsIgn)){
              console.log("File Found: "+link);
              FilesList.push(baseURL+"/"+link);
              TotalFiles++;
            }
            else if(link.match(/(\..*|javascript:void.*|http:\/\/www\.directorylister\.com\/)/i)){
              console.log("Invalid file found");
            }
            else{
              console.log("Directory Found: "+link);
              DirectoriesList0.push(link);
            }
          }
        });
        
        if (DirDepth > 0){
          for ( CurDirDepth = 0; CurDirDepth < DirDepth; CurDirDepth++) {
            if(CurDirDepth != 0){
              window['DirectoriesList' + CurDirDepth ] = new Array();
            }
            //console.log("Length: "+window['DirectoriesList' + CurDirDepth ].lenth);
            if(window['DirectoriesList' + CurDirDepth ] != null){
              $.each(window['DirectoriesList'+CurDirDepth] ,function(key,val){
                var SiteHTML = $.ajax({type: "GET", url: baseURL+"/"+val, async: false}).responseText;
                $(SiteHTML).find('a').each(function(){
                  var link = $(this).attr('href');
                  console.log("Link: "+link);
                  if (link != "../"||link.indexOf(baseURL) < 0){
                    if(CheckFilename(link,FileExt,KeywordsIgn)){
                      console.log("File Found: "+link);
                      FilesList.push(baseURL+"/"+link);
                      TotalFiles ++;
                      
                    }
                    else if(link.match(/(\..*|javascript:void.*|http:\/\/www\.directorylister\.com\/)/i)){
                      console.log("Invalid file found");
                    }
                    else{
                      console.log("Directory Found: "+link);
                      window['DirectoriesList' + CurDirDepth ].push(link);
                    }
                  }
                });
              });
            }
          }
        }

        alert("Added "+TotalFiles+" media files.");
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
