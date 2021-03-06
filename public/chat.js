// Import socket.io
const socket = io();

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
/a [link] - displays a clickable hyperlink.
<br>
/tts [message] - sends a text to speech message.
<br>
<br>
You can display any HTML you would like in your message using tags.
<br>
Automatic links and image links are used, but some protocols won't be detected <br>
and non-direct links to images won't be detected automatically. <br>
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
    temp = emojify(msg)
msg = temp

    // Commands
    // temp is used when msg is needed for its data
    // TODO: YouTube video command
    // TODO: Upload file
    if (msg.split('𐤟')[1].substring(1, 2) == '/') {
        // Images ( /i [link to image] )
        if (msg.split('𐤟')[1].substring(2, 3) == 'i' && msg.split('𐤟')[1].substring(3, 4) == ' ') {
            temp = msg.split(' 𐤟 ')[0] +' 𐤟 '+ '<img width=\"200\" height=\"auto\" src=\"'+msg.split('𐤟')[1].substring(4, msg.length)+'\">'
            msg = temp
        }
            
        // Help ( /help )
        else if (msg.split('𐤟')[1].substring(2, 6) == 'help') {
            msg = msg.split(' 𐤟 ')[0] + help
        }

        // Links ( /a [link] )
        else if (msg.split('𐤟')[1].substring(2, 3) == 'a' && msg.split('𐤟')[1].substring(3, 4) == ' ') {
            temp = msg.split(' 𐤟 ')[0] +' 𐤟 '+'<a href=\"'+msg.split('𐤟')[1].substring(4, msg.length)+'\" target=\"_blank\" >Link to '+msg.split('𐤟')[1].substring(4, msg.length)+'</a>'
            msg = temp
        }

        // TTS ( /tts [message] )
	else if (msg.split('𐤟')[1].substring(2, 5) == 'tts') {
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(msg.split(" 𐤟 ")[0] + ' said ' + msg.split("tts")[1]));
        }

        else {
            temp = msg.split(' 𐤟 ')[0] + ' 𐤟 ' + ' tried to use an unrecognised command.'
            msg = temp
        }
    }
    // Dynamic links and images
    else if (msg.split(' 𐤟 ')[1].substring(1, 8) == 'http://' || msg.split('𐤟')[1].substring(1, 9) == 'https://' || msg.split('𐤟')[1].substring(1, 7) == 'ftp://') {
        // Only recognises direct links ( ends in an image extension )
        // TODO: Find a better way of detecting a link to an image
        if (/(jpg|gif|png)$/.test(msg.split('𐤟')[1]) == true) {
            temp = msg.split(' 𐤟 ')[0] +' 𐤟 '+'<img width=\"200\" height=\"auto\" src=\"'+msg.split('𐤟')[1]+'\">'
            msg = temp 
        }
        else {
            temp = msg.split(' 𐤟 ')[0] +' 𐤟 ' + '<a href=\"'+msg.split('𐤟')[1]+'\" target=\"_blank\" >Link to '+msg.split('𐤟')[1]+'</a>'
            msg = temp
        }
    }

    // Item is the actual message
    var item = document.createElement('li');

    // Add the message to the message list
    item.innerHTML = msg;
    messages.appendChild(item);

    // Scrolls to the bottom of the document when a lot of messages are sent
    document.getElementById("messages").scrollTo(0, document.getElementById("messages").scrollHeight);

    // Removes " no messages " h1
    if (document.getElementById("no_messages") == null) {

    }
    else {
        const node = document.getElementById("no_messages");
        node.innerHTML = '';
        document.getElementById("no_messages").remove();

        document.getElementById("messages").style = "width: 100vw; height: 80vh;";
    }
});
