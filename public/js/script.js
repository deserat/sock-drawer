/* Author: Vance Dubberly 


*/

var canvas;
var coords;
var ctx;
var socket;
var events = [];
var client;
var myId;

MOUNT_POINT = 'http://192.168.1.102/faye';


function drawPosition(x,y) { return { x: x - coords.l, y: y - coords.t }; }

dojo.addOnLoad( function(e){
    // set up canvas instance
    canvas = dojo.byId('draw-space');
    ctx = canvas.getContext('2d');

    coords = dojo.coords(canvas);

    myId = Math.floor(Math.random()*11)
    console.log(myId);

    client = new Faye.Client(MOUNT_POINT, {timeout:240});

    var subscription = client.subscribe('/draw', function(m) {
        if ( m.user != myId ) {
            ctx.lineTo(m.x,m.y);
            ctx.stroke();

        }
    });

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
       client.publish('/draw', {user:myId,x:p.x,y:p.y});
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








