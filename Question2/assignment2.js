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

// list of readable names
function getReadableName(id) {
	var readableNames = {
		name: 'your name',
		emailaddy: 'your email',
		comments: 'your comments'
	};
	return (readableNames[id] == null) ? '' : readableNames[id];
}

// prints a readable, comma-delimited list for inclusion in a status message
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

// validates the form. returns false and sets status to error with listed fields, or returns true and continues sending comment
function validateForm() { 
	var form = {
		name: document.getElementById('name'),
		email: document.getElementById('emailaddy'),
		comments: document.getElementById('comments')
	};
	var isValid = []; // keeps track of validation of each form field specified in 'form'
	var list = []; // list of errors, push readable names using getReadableName(id)
	for (let x of Object.values(form)) { // loop through form properties and check for nulls and empties. if empty/null then isValid is false for that field
		console.log('form field: '+x.id+', value: '+x.value);
		if (x == null || x.value == "") {
			isValid.push(false);
			list.push(getReadableName(x.id));
		} else {
			isValid.push(true);
		}
	}
	var check = true; // the final check. true by default
	for (let x of isValid) { // if there are any fields from isValid that are false, then check is false (entire check fails)
		if (x == false) {
			check = false;
		}
	}
	if (!check) {
		setStatus('Error. Please enter a value for the following form fields: '+printReadableList(list),'error');
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
	window.location.href = "#status";
	if (validateForm()) {
		setStatus(msg, 'success');
	}

	
} // End of sendComments
