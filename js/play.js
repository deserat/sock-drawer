var canvas;
var ctx;

$(document).ready(function(){
    
    // set up canvas instance
    canvas = $("canvas")[0]
    ctx = canvas.getContext('2d');
    
    io.setPath('/js/to/socket.io/');
    socket = new io.Socket('localhost');
    socket.connect();
    socket.send('some data');
    socket.addEvent('message', function(data){
        alert('got some data' + data);
    });
});


$("canvas").mouseover( function (e) {
    console.log("enter canvas");
    console.log(e);
});

$("canvas").mousedown( function (e) {
    ctx.beginPath();  
    ctx.moveTo(e.clientX,e.clientY);
    $("canvas").mousemove(function (e) {
       ctx.lineTo(e.clientX,e.clientY);
       ctx.stroke(); 
       send()
    });
});


$("canvas").mouseup( function (e) {
    $("canvas").unbind('mousemove');
});

// when mouse leaves canvas unbind the move event
$("canvas").mouseout( function (e) {
    $("canvas").unbind('mousemove');

});

io.setPath('/js/socket.io/');
var socket = new io.Socket('10.0.1.32', { port: 8080 });





socket.connect();


function send(){
    console.log('hello')
    socket.send('hello again');
//    message({ message: ['you', val] });
}

socket.on('message', function(data){
    console.log(data);
    alert(data);
    var obj = JSON.parse(data);



/*
if ('buffer' in obj){
  document.getElementById('form').style.display='block';
  document.getElementById('chat').innerHTML = '';

  for (var i in obj.buffer) message(obj.buffer[i]);
} else message(obj);
*/
});




