// Import socket.io
var socket = io();

// Headers
var headers = new Headers();

headers.append('Bypass-Tunnel-Reminder', 'asdasd');

// Help message
const help = 
`
asked for help.

<br>
<br>

/help - displays this message.
<br>
/i [link to an image] - displays an image.
<br>
/a [link] - displays a clickable hyperlink. (Automatic links are still used, but certain protocols won't be detected)
<br>
/tts [message] - sends a text to speech message.
<br>
<br>
Planned commands:
<br>
/v [link to video] - embed a YouTube video.
<br>
[drag and drop file] - embed a downloadable file.
<br>
/f [method] - format your message in a number of ways.

Click your profile picture at the top to switch themes.
`

// Get values
var messages = document.getElementById("messages");
var form = document.getElementById("form");
var input = document.getElementById("input");

// Basic messaging
form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (document.getElementById("input").value) {
        d = new Date()
        socket.emit('chat message', sessionStorage.getItem("name") + ' 𐤟 ' + document.getElementById("input").value);

        var time = document.createElement('li');
        time.innerHTML = d.getHours() + ':' + d.getMinutes();
        time.style = 'position: absolute; right: 2vw; z-index: 500';
        messages.appendChild(time);

        document.getElementById("input").value = ""
    }
});

socket.on('chat message', function(msg) {
// Commands
// temp is used when msg is needed for its data
// TODO: YouTube video command
// TODO: Upload file & (display appropriate element)
if (msg.split('𐤟')[1].substring(1, 2) == '/') {
    // Images ( /i [link to image] )
    if (msg.split('𐤟')[1].substring(2, 3) == 'i' && msg.split('𐤟')[1].substring(3, 4) == ' ') {
        temp = sessionStorage.getItem("name")+' 𐤟 '+'<img width=\"200\" height=\"auto\" src=\"'+msg.split('𐤟')[1].substring(4, msg.length)+'\">'
        msg = temp
    }
        
    // Help ( /help )
    else if (msg.split('𐤟')[1].substring(2, 6) == 'help') {
        msg = sessionStorage.getItem("name")+help
    }

    // Links ( /a [link] )
    else if (msg.split('𐤟')[1].substring(2, 3) == 'a' && msg.split('𐤟')[1].substring(3, 4) == ' ') {
        temp = sessionStorage.getItem("name") + ' 𐤟 ' + '<a href=\"'+msg.split('𐤟')[1].substring(4, msg.length)+'\" target=\"_blank\" >Link to '+msg.split('𐤟')[1].substring(4, msg.length)+'</a>'
        msg = temp
    }

    // TTS ( /tts [message] )
    else if (msg.split('𐤟')[1].substring(2, 5) == 'tts') {
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(msg.split("𐤟")[0] + ' said ' + msg.split("tts")[1]));
    }
    
    // If they use a command not implemented
    else {
        temp = sessionStorage.getItem("name") + ' tried to use an unrecognised command.'
        msg = temp;
    }
}
// Dynamic links and images
// TODO: Check for other popular protocols
else if (msg.split('𐤟')[1].substring(1, 8) == 'http://' || msg.split('𐤟')[1].substring(1, 9) == 'https://' || msg.split('𐤟')[1].substring(1, 7) == 'ftp://') {
    // Only recognises direct links ( ends in an image extension )
    // TODO: Find a better way of detecting a link to an image
    if (/(jpg|gif|png)$/.test(msg.split('𐤟')[1]) == true) {
        temp = sessionStorage.getItem("name")+' 𐤟 '+'<img width=\"200\" height=\"auto\" src=\"'+msg.split('𐤟')[1]+'\">'
        msg = temp 
    }
    else {
        temp = sessionStorage.getItem("name") + ' 𐤟 ' + '<a href=\"'+msg.split('𐤟')[1]+'\" target=\"_blank\" >Link to '+msg.split('𐤟')[1]+'</a>'
        msg = temp
    }
}

// Item is the actual message
var item = document.createElement('li');

// Add the message to the message list
item.innerHTML = msg;
messages.appendChild(item);

// Scrolls to the bottom of the document when a lot of messages are sent
window.scrollTo(0, document.body.scrollHeight);

// Removes " no messages " h1
if (document.getElementById("no_messages").innerHTML) {
    const node = document.getElementById("no_messages");
    node.innerHTML = '';
    document.getElementById("no_messages").remove()
}
});
 