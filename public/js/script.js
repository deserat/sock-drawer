/* Author: Vance Dubberly 


*/

var canvas;
var ctx;
var socket;
var events = [];

dojo.addOnLoad( function(e){
    // set up canvas instance
    canvas = dojo.byId('draw-space');
    ctx = canvas.getContext('2d');
    console.log('load');


dojo.connect(canvas,'mouseover', function (e) {
    console.log("enter canvas");
    console.log(e);
});

dojo.connect(canvas, 'mousedown', function (e) {
    ctx.beginPath();  
    ctx.moveTo(e.clientX,e.clientY);
    events['paint'] = dojo.connect(canvas, 'mousemove', function (e) {
       ctx.lineTo(e.pageX,e.pageY);
       ctx.stroke(); 
       //send({"x":e.clientX,"y":e.clientY });
    });
    console.log(events);
});


dojo.connect(canvas,'mouseup', function (e) {
    dojo.disconnect(events['paint']);
});

// when mouse leaves canvas unbind the move event
dojo.connect(canvas,'mouseout', function (e) {
    dojo.disconnect(events['paint']);

});


});


function send(data){
    socket.send(JSON.stringify(data));
}

















