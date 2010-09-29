/* Author: Vance Dubberly 


*/

var canvas;
var coords;
var ctx;
var socket;
var events = [];
var draw_position = {x:0,y:0};




function drawPosition(x,y) { return { x: x - coords.l, y: y - coords.t }; }

dojo.addOnLoad( function(e){
    // set up canvas instance
    canvas = dojo.byId('draw-space');
    ctx = canvas.getContext('2d');
    console.log('load');

    coords = dojo.coords(canvas);


dojo.connect(canvas,'mouseover', function (e) {
    console.log("enter canvas");
    console.log(e);
});

dojo.connect(canvas, 'mousedown', function (e) {

    var p =  drawPosition(e.pageX, e.pageY);
    
    ctx.beginPath(); 
    ctx.moveTo(p.x, p.y);

    events['paint'] = dojo.connect(canvas, 'mousemove', function (e) {
       p = drawPosition(e.pageX, e.pageY);
       ctx.lineTo(p.x,p.y);
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

















