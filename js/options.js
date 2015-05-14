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
}

function saveOptions() {
	localStorage["ServerURL"] = $("#ServerURL").val();
	localStorage["APIKey"] = $("#APIKey").val();

	SetAlert('success','Successfully saved settings');
}

function eraseOptions() {
	localStorage.removeItem("ServerURL");
	localStorage.removeItem("APIKey");

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