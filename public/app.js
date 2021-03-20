function addDarkmodeWidget() {
    const options = {
        bottom: '94vh', // default: '32px'
        right: 'unset', // default: '32px'
        left: '48.5vw', // default: 'unset'
        time: '.75s', // default: '0.3s'
        mixColor: '#fff', // default: '#fff'
        backgroundColor: '#fff',  // default: '#fff'
        buttonColorDark: '#100f2c',  // default: '#100f2c'
        buttonColorLight: '#fff', // default: '#fff'
        saveInCookies: true, // default: true,
        label: '', // default: ''
        autoMatchOsTheme: true // default: true
    }

    const darkmode = new Darkmode(options);
    darkmode.showWidget();
}

window.addEventListener('load', addDarkmodeWidget);

function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    sessionStorage.setItem("name", profile.getName())

    var pfp_text = document.createElement("p");
    var text = document.createTextNode(profile.getName());

    var pfp = document.createElement("img");
    pfp.id = "pfp";

    pfp_text.style = "position: fixed; top: 1.5vh; left: 5vw"
    pfp_text.appendChild(text);
    pfp.style = "position: fixed; top: 1vh; left: 1vw; width: 60.5px; height: auto"

    var element = document.getElementById("top");

    element.appendChild(pfp_text);
    element.appendChild(pfp);

    document.getElementById("pfp").src = profile.getImageUrl()
}