// Initialize the variables
var submitBtn = null;


// Get the Submit Button and the div that we'll make an aria live region
submitBtn = document.getElementById("submitBtn");


// Some error handling
if (submitBtn) {
        // Listen for the "click" event on the button; when someone clicks it, run function sendComments(e)
        submitBtn.addEventListener("click", sendComments, false);
} else {
        console.error ("Did not get the submit button for some reason.");
}

// provides the code for setting a message to the aria live region
function setStatus(msg, status) {
	var statusDiv = document.getElementById("status");
	statusDiv.innerHTML = "<p class=\""+status+"\">"+msg+"</p>";
}

function getReadableName(id) {
	switch (id) {
		case 'name':
			return 'your name';
		case 'emailaddy':
			return 'your email';
		case 'comments':
			return 'your comments';
		default:
			return null;
	}
}

function printReadableList(list) {
	var printableList = "";
	let c = ", ";
	for (let i = 0; i < list.length; i++) {
		if (i != 0) {
			printableList += c;
		}
		printableList += list[i];
	}
	return printableList;
}

function validateForm() {
	var form = {
		name: document.getElementById('name'),
		email: document.getElementById('emailaddy'),
		comments: document.getElementById('comments')
	};
	var isValid = false;
	var list = [];
	for (let x of form) {
		if (x == null || x.value == "") {
			isValid = false;
			list.push(getReadableName(x.id))
		} else {
			isValid = true;
		}
	}
	if (!isValid) {
		setStatus('Error. Please enter a value for the following form fields:'+printReadableList(list),'error');
		return false;
	} else {
		return true;
	}
}

function sendComments (e) {
	e.preventDefault();  // When uncommented, this will prevent the form from submitting when the button is clicked

	// This is the message we want added to the aria live region
	let msg = "Thank you for sending your comments. Your comments have already been thrown into the dustbin of the Interwebs, and will be ignored at once!"	;

	// Now, add the code to insert the msg into the aria live region
	if (validateForm()) {
		setStatus(msg, 'success');
	}

	
} // End of sendComments
