function networkInfo() {
		var networkState = navigator.connection.type;

		var states = {};
		states[Connection.UNKNOWN]  = 'Unknown connection';
		states[Connection.ETHERNET] = 'Ethernet connection';
		states[Connection.WIFI]     = 'WiFi connection';
		states[Connection.CELL_2G]  = 'Cell 2G connection';
		states[Connection.CELL_3G]  = 'Cell 3G connection';
		states[Connection.CELL_4G]  = 'Cell 4G connection';
		states[Connection.CELL]     = 'Cell generic connection';
		states[Connection.NONE]     = 'No network connection';

		alert('Connection type: ' + states[networkState]);
}
	
function onOffline() {
	   alert('You are now offline!');
}
	
function onOnline() {
	   alert('You are now online!');
} 

function checkLanguage() {
	var langue="oui";
    navigator.globalization.getPreferredLanguage(
        function (language) {    
            alert(language.value+"\n"+device.model+"\n"+device.uuid+"\n"+device.version+"\n"+device.platform);
        },
        function () {
            alert('Error getting language\n');
        }
		
    );
	return langue;
	
}

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady(){
	
	networkInfo();
	checkLanguage();
	findContacts();
	
	window.addEventListener("batterystatus", onBatteryStatus, false);

	function onBatteryStatus(status) {
		alert("Level: " + status.level + " branché: " + status.isPlugged);
	}

	window.addEventListener("batterycritical", onBatteryCritical, false);

	function onBatteryCritical(status) {
		alert("Niveau de Batterie critique " + status.level + "%\nRechargez!");
	}
	
}

function findContacts() {
	var options = new ContactFindOptions();
	options.filter = "";
	options.multiple = true;
	options.hasPhoneNumber = true;
	fields = ["displayName"];
	navigator.contacts.find(fields, contactfindSuccess, contactfindError, options);
    
	function contactfindSuccess(contacts) {
		for (var i = 0; i < contacts.length; i++) {
			$('.contacts').append("<p>"+contacts[i].displayName+'<button id="supp">SUPP</button>');
		}
	}
	
	function contactfindError(message) {
		alert('Failed because: ' + message);
	}
	
}

document.getElementById("supp").addEventListener("click", deleteContact, false);
function deleteContact() {
	var options = new ContactFindOptions();
	options.filter = "Test";
	options.multiple = false;
	fields = ["displayName"];
	navigator.contacts.find(fields, contactfindSuccess, contactfindError, options);

	function contactfindSuccess(contacts) {
		var contact = contacts[0];
		contact.remove(contactRemoveSuccess, contactRemoveError);

		function contactRemoveSuccess(contact) {
			alert("Contact Deleted");
		}

		function contactRemoveError(message) {
			alert('Failed because: ' + message);
		}
	}

	function contactfindError(message) {
		alert('Failed because: ' + message);
	}
	
}

function hamburger_click()
{
	var menuElement = document.getElementById("menu");
	if(menuElement.style.visibility!="visible"){
		menuElement.style.visibility = "visible";
		menuElement.style.display = "table-column";
	}
	else{
		menuElement.style.visibility = "hidden";
		menuElement.style.display = "none";
	}
}