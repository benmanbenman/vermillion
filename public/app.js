const removeChilds = (parent) => {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
};

removeChilds(document.getElementById("messages"))

switch (localStorage.getItem("darkmode")) {
	case null:
		console.log("none");
		break;
	case "true":
		console.log("true");
		document.getElementById("body").classList.add("dark");
		break;
	case "false":
		console.log("false");
		document.getElementById("body").classList.remove("dark");
		break;
	default:
		console.log("other");
}

// Dark mode
const dark = () => {
	document.getElementById("body").classList.toggle("dark");
	localStorage.setItem(
		"darkmode",
		document.getElementById("body").classList.contains("dark")
	);
};

function onSignIn(googleUser) {
	let profile = googleUser.getBasicProfile();
	sessionStorage.setItem("name", profile.getName());
	sessionStorage.setItem("profile", profile.getImageUrl());

	// Add profile to the header
	var pfp_text = document.createElement("p");
	var text = document.createTextNode(profile.getName());

	var pfp = document.createElement("img");

	pfp.id = "pfp";
	pfp_text.id = "pfp_text";

	// Dark mode
	pfp.onclick = dark;

	pfp.classList.add("pfp");
	pfp_text.classList.add("pfp_text");

	pfp_text.appendChild(text);

	var element = document.getElementById("header");

	element.appendChild(pfp_text);
	element.appendChild(pfp);

	document.getElementById("pfp").src = profile.getImageUrl();
	document.getElementById("signin").style = "display: none";

	// Let people who signed in talk
	var message_input = document.createElement("input");
	var button = document.createElement("button");

	message_input.id = "input";
	message_input.placeholder = "Message everyone in this room";
	message_input.autocomplete = "off";
	message_input.onkeypress = function () {
		message_input.value = emojify(message_input.value);
	};
	f = document.getElementById("form");

	f.appendChild(message_input);

	f.appendChild(button);
}
