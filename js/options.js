$(document).ready(function() {
	loadOptions()
	
	//Event Listenters
	$('#save').click(function(event){
	  saveOptions();
	  event.preventDefault();
	});
	$('#erase').click(function(event){
	  eraseOptions();
	  event.preventDafault();
	});
	$('#exit').click(function(event){
	  CloseOptions()
	  event.preventDefault();
	});

});

function loadOptions() {
	$("#ServerURL").val(localStorage["ServerURL"]);
	$("#APIKey").val(localStorage["APIKey"]);
	/* Early build of Chrome Extension.. Settings have now been relocated to Python config file
	$("#FileExt").val(localStorage["FileExt"]);
	$("#KeywordsIgn").val(localStorage["KeywordsIgn"]);
	$("#DirDepth").val(localStorage["DirDepth"]);
	*/
	
}

function saveOptions() {
  /*if($("#FileExt").val().substr(-1) === ","||$("#FileExt").val().charAt(0) === ","){
    SetAlert('danger','File Extention List cannot start or end with a comma');
    return false;
  }
  else if ($("#KeywordsIgn").val().substr(-1) === ","||$("#KeywordsIgn").val().charAt(0) === ","){
    SetAlert('danger','Keyword list cannot start or end with a comma');
    return false;
  }
  */
	localStorage["ServerURL"] = $("#ServerURL").val();
	localStorage["APIKey"] = $("#APIKey").val();
	/*
	localStorage["FileExt"] = $("#FileExt").val();
	localStorage["KeywordsIgn"] = $("#KeywordsIgn").val();
	localStorage["DirDepth"] = $("#DirDepth :selected").val();
	*/
	SetAlert('success','Successfully saved settings');
}

function eraseOptions() {
	localStorage.removeItem("ServerURL");
	localStorage.removeItem("APIKey");
	/*
	localStorage.removeItem("FileExt");
	localStorage.removeItem("KeywordsIgn");
	localStorage.removeItem("DirDepth"); 
	*/
	location.reload();
}

function CloseOptions() {
	self.close()
}

function SetAlert(alerttype,alertstring){
  $('.alert').removeClass('alert-danger');
  $('.alert').removeClass('alert-success');
  $('.alert').addClass('alert-'+alerttype);
  $('.alert').text(alertstring);
  $('.alert').removeClass('hide');
}