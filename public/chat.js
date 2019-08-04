let socket = io.connect('http://localhost:4000');

let message = document.getElementById('message'),
handle = document.getElementById('handle'),
btn = document.getElementById('send'),
output = document.getElementById('output'),
chat = document.getElementById('chat-window'),
feedback = document.getElementById('feedback');


function sendMessage() {
    if(message.value && handle.value) {
        socket.emit('chat', {
            message: message.value,
            handle: handle.value
        });
        message.value = "";
        message.focus(); 
    }
}

btn.addEventListener('click', sendMessage);

message.addEventListener('input', (e) => {
    if(handle.value){
        socket.emit('typing', {
            message: message.value,
            handle: handle.value
        });
    };
});

socket.on('chat', (data)=>{
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handle+ ':</strong> ' + data.message + '</p>';
    chat.scrollTop = chat.scrollHeight;
});

document.addEventListener('keypress', (e)=>{
    if(e.keyCode == 13) {
        sendMessage();
    }
});

socket.on('typing', (data)=>{  
    feedback.innerHTML = data;
    chat.scrollTop = chat.scrollHeight;
});