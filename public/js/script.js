/* Author: Vance Dubberly 


*/

var canvas;
var ctx;
var socket;

$(document).ready(function(){
    // set up canvas instance
    canvas = $("canvas")[0]
    ctx = canvas.getContext('2d');
	
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
       send({"x":e.clientX,"y":e.clientY });
    });
});


$("canvas").mouseup( function (e) {
    $("canvas").unbind('mousemove');
});

// when mouse leaves canvas unbind the move event
$("canvas").mouseout( function (e) {
    $("canvas").unbind('mousemove');

});




function send(data){
    socket.send(JSON.stringify(data));
}

















