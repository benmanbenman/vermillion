const dark = () => {
    document.getElementById("body").classList.toggle("dark");

    localStorage.setItem("theme", document.getElementById("body").className == "dark")
}

// Google sign-in
function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    sessionStorage.setItem("name", profile.getName())

    var pfp_text = document.createElement("p");
    var text = document.createTextNode(profile.getName());

    var pfp = document.createElement("img");

    pfp.id = "pfp";
    pfp_text.id = "pfp_text";

    pfp.onclick = dark

    pfp.classList.add("pfp")
    pfp_text.classList.add("pfp_text")

    pfp_text.appendChild(text);

    var element = document.getElementById("header");

    element.appendChild(pfp_text);
    element.appendChild(pfp);

    document.getElementById("pfp").src = profile.getImageUrl();
    document.getElementById("signin").style = "display: none";

    // Let people who signed in talk

    var message_input = document.createElement('input');
    var button = document.createElement('button')

    message_input.id = "input";
    message_input.placeholder = "Message everyone in this room";
    message_input.autocomplete = "off";

    f = document.getElementById("form");

    f.appendChild(message_input);
    f.appendChild(button);
}