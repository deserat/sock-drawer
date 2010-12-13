/* Author: Vance Dubberly 


*/


var canvas;
var coords;
var ctx;
var socket;
var events = [];
var client;
var myId;
var brush;

MOUNT_POINT = 'http://192.168.1.102:8000/drawer';

function drawPosition(x,y) { return { x: x - coords.l, y: y - coords.t }; }

dojo.addOnLoad( function(e){
    // set up canvas instance
    canvas = dojo.byId('draw-space');
    ctx = canvas.getContext('2d');

    coords = dojo.coords(canvas);

    myId = Math.floor(Math.random()*11)
    console.log(myId);

    brush = new Brush({});

    //client = new Faye.Client(MOUNT_POINT, {timeout:240});

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
        console.log("mousedown");
        var p =  drawPosition(e.pageX, e.pageY);
        ctx.strokeStyle = brush.color.toString();
        ctx.lineWidth = brush.size;
        ctx.lineCap = brush.lineCap;
        ctx.lineJoin = brush.lineJoin;
        ctx.beginPath(); 
        ctx.moveTo(p.x,p.y);

        events['paint'] = dojo.connect(canvas, 'mousemove', function (e) {
            p = drawPosition(e.pageX, e.pageY);
            brush.stroke(p, ctx );
            //ctx.lineTo(p.x,p.y);
            //ctx.stroke(); 
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

    dojo.query('.brush_setter').connect('onchange', function(e) {
        var el = e.currentTarget;
        var id = el.id;
        console.log(el);
        console.log(id);
        if ( id == 'size' || id == 'lineJoin' || id == 'lineCap' ) {  
            console.log(el.options[el.options.selectedIndex].value);
            brush[id] = el.options[el.options.selectedIndex].value;
        } else if ( id == 'color' ) {
            c =  el.options[el.options.selectedIndex].value.split(',');
            brush.color.r = c[0];  
            brush.color.g = c[1]  
            brush.color.b = c[2]  
            console.log(brush.color);
        } else if ( id == 'opacity' ) {
            brush.color.a = el.options[el.options.selectedIndex].value;  
        } else if ( id == 'stroke' ) {
            brush.stroke = getStroke(el.options[el.options.selectedIndex].value);  
        }
    });
});

dojo.declare("Color", null, {
    constructor : function(r,g,b,a) {
        this.r = ( r != undefined ) ? r : 0;
        this.g = ( g != undefined ) ? g : 0;
        this.b = ( b != undefined ) ? b : 0;
        this.a = ( a != undefined ) ? a : 1;
    },
    toString : function() {
        console.log("toString");
        console.log( 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')');
        return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
    },
});


/* Stroke Functions */

// simple line

function getStroke(stroke) {

if (stroke == 'line') {
    return function lineStroke(points,ctx) {
        ctx.lineTo(points.x,points.y);
        ctx.stroke();
    }
} else if ( stroke == 'spines' ) { 
    return function spineStroke(points,ctx) {
        ctx.beginPath(); 
        ctx.moveTo(points.x-10,points.y-10);
        ctx.lineTo(points.x+10,points.y+10);
        ctx.stroke();
    }
} else if ( stroke == 'dots' ) { 
    return function dotStroke(points,ctx) {
        ctx.beginPath(); 
        ctx.moveTo(points.x,points.y);
        ctx.lineTo(points.x,points.y);
        ctx.stroke();

    }

}
}




/** 
 * Object used in Paper for determining stroke on canvas.
 * The most imporant part will be pattern function.
 */

dojo.declare("Brush", null, {
    size: null,
    color: null,
    stroke: null,
    lineCap: null,
    lineJoin: null,

    constructor : function(args) {
        this.size = (args.size != undefined) ? args.size : 5;
        this.color = new Color();
        this.stroke = (args.stroke != undefined) ? args.stroke : getStroke('line');
        this.lineJoin = (args.lineJoin != undefined) ? args.lineJoin : 'round';
        this.lineCap = (args.lineCap != undefined) ? args.lineCap : 'round';
    }
});


dojo.declare("Paper", null, {
    stroke : null,
    constructor : function(args) {
        
    }
});
