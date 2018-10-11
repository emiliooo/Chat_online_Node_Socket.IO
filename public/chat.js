//make connection
var socket = io.connect("localhost:4000");

/////dom

var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback')

///emit event

btn.addEventListener('click', function () {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    })
    feedback.innerHTML = ''
})

/////listen
socket.on('chat', function (data) {
    output.innerHTML += ' <strong>' + data.handle + '</strong>' + ' : ' + data.message + '</p>';

    //clear
    message.value = '';
    feedback.innerHTML = '';
})

socket.on('typing', function (data) {
    feedback.innerHTML = '<p>' + data + '  is typing ... </p>'
})

message.addEventListener('keypress', function (e) {

    if (e.keyCode === 13) {
        feedback.innerHTML = ''
        socket.emit('chat', {
            message: message.value,
            handle: handle.value
        })
    }
});

message.addEventListener('keypress', function () {
    socket.emit('typing', handle.value)
})

