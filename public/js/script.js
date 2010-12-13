/* Author: Vance Dubberly 


*/


var canvas;
var coords;
var ctx;
var socket;
var events = [];
var client;
var myId;

MOUNT_POINT = 'http://192.168.1.102:8000/drawer';


function drawPosition(x,y) { return { x: x - coords.l, y: y - coords.t }; }

dojo.addOnLoad( function(e){
    // set up canvas instance
    canvas = dojo.byId('draw-space');
    ctx = canvas.getContext('2d');

    coords = dojo.coords(canvas);

    myId = Math.floor(Math.random()*11)
    console.log(myId);

    //client = new Faye.Client(MOUNT_POINT, {timeout:240});

    console.log(client);

    //var subscription = client.subscribe('/draw', function(m) {
    //    if ( m.user != myId ) {
    //        ctx.lineTo(m.x,m.y);
    ////        ctx.stroke();

    //    }
    //});

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
       //client.publish('/draw', {user:myId,x:p.x,y:p.y});
       //dojox.cometd.publish('/draw', {user:myId,x:p.x,y:p.y});
    });
});


dojo.connect(canvas,'mouseup', function (e) {
    dojo.disconnect(events['paint']);
});

// when mouse leaves canvas unbind the move event
dojo.connect(canvas,'mouseout', function (e) {
    dojo.disconnect(events['paint']);

});


});

dojo.declare("Color", null, {
    constructor : function(r,g,b,a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    },
    toString : function() {
        return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
    },
});


/* Stroke Functions */

// simple line

function lineStroke(points,ctx) {
    ctx.lineTo(p.x,p.y);
    ctx.stroke();
}

/** 
 * Object used in Paper for determining stroke on canvas.
 * The most imporant part will be pattern function.
 */

dojo.declare("Brush", null, {
    size: null,
    color: null,
    // a function that controls how the brush strokes if not defined just solid line 
    stroke: 'solid',
    constructor : function(args) {
        this.size = (args.size != undefined) ? args.size : 5;
        this.color = (args.color != undefined) ? args.color : 'rgba(0,0,0,1)';
        this.stroke = (args.stroke != undefined) ? args.stroke : lineStroke;
    }
});


dojo.declare("Paper", null, {
    stroke : null,
    constructor : function(args) {
        
    }
});
