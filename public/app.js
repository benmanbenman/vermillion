function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    sessionStorage.setItem("name", profile.getName())

    var pfp_text = document.createElement("p");
    var text = document.createTextNode(profile.getName());

    var pfp = document.createElement("img");
    pfp.id = "pfp";
    pfp_text.id = "pfp_text";
    pfp.classList.add("pfp")
    pfp_text.classList.add("pfp_text")

    pfp_text.appendChild(text);

    var element = document.getElementById("header");

    element.appendChild(pfp_text);
    element.appendChild(pfp);

    document.getElementById("pfp").src = profile.getImageUrl()
    document.getElementById("signin").style = "display: none"
}