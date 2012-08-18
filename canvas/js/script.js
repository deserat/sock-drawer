/* Author: vance.dubberly@ff0000.com

*/


var c; // canvas

var keys;  // keys currently pressed
var dot; // the dot
var ctx;

var CANVAS_HEIGHT = 600;
var CANVAS_WIDTH = 900;

var things = [];


// The all powerful Dot
var Dot = function(ctx, left, top) {
	
	this.ctx = ctx;
	
	var t = top;
	var l = left;
	var ol;
	var ot;
	var tt;
	var tl;
	var tail_distance = 20; 
	
	this.draw = function() {
		var ctx = this.ctx;

		ctx.fillStyle = 'rgba(0,0,0,0.9)';
		ctx.strokeStyle = 'rgba(0,153,255,0)';
		
		this.decidePostion();
		this.tailPosition();
		
		ctx.beginPath();
		ctx.arc(l,t,10,0,Math.PI*2,true);
		ctx.fill();   
		ctx.closePath();
	
		ctx.beginPath();
		ctx.arc(tl,tt,6,0,Math.PI*2,true);
		ctx.fill();   
		ctx.closePath();
		
	}
	
	this.decidePostion = function() {
		var len = keys.length;
		ol = l;
		ot = t;
		for  (var i=0;i<len;i++ ) {
			this.bodyPosition(keys[i]);
		}
	}
	
	this.tailPosition = function() {
		dl = ol - l; // distance moved left aka delta left
		dt = ot - t; // distance moved top aka delta top
		
		distance = Math.sqrt((dl*dl) + (dt*dt));  // absolute distance moved.
		
		ratio = tail_distance / distance;
		
		tl = l + ( dl * ratio ); // tail top postion
		tt = t + ( dt * ratio );  // tail left position
		
		tl = ( isNaN(tl) ) ? l : tl;
		tt = ( isNaN(tt) ) ? t : tt;
	}
	
	this.bodyPosition = function(code) {
		switch (code) {
			case 37:
				l = (l - 2 < 0) ?  0 : l - 2;
				break;
			case 39:
				l = (l + 2 >= CANVAS_WIDTH ) ? CANVAS_WIDTH : l + 2;
				break;
			case 38:
				t = ( t - 2 < 0 ) ? 0 : t - 2 ;
				break;
			case 40:
				t = (t + 2 >= CANVAS_HEIGHT ) ? CANVAS_HEIGHT : t + 2;
				break;
		}
	}
}


var Box = function(ctx,left, top, width, height) {
	var ctx = ctx;
	var l = left;
	var t = top;
	var w = width;
	var h = height;

	this.draw = function() {
		ctx.fillStyle = "rgb(255,0,0)";  
		ctx.fillRect (l, t, w, h); 
	}
}

function addKey(e) {
	console.log('addkey');
	console.log(keys);
	if ( dojo.indexOf(keys, e.keyCode) != -1) {
		console.log('key already tracked');
	} else {
		keys.push(e.keyCode)
	}
}

function removeKey(e) {
	var new_keys = [];
	var code = e.keyCode;
	var len = keys.length; //speed optimization
	for ( var i=0;i<len;i++ ) {
		if ( keys[i] != code ) {
			new_keys.push(keys[i]);
		}
	}
	keys = new_keys;
}


function draw() {
	ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT); 

	var len = things.length;	
	for (var i=0;i<len;i++) {
		things[i].draw();
	}
	
	
}

dojo.addOnLoad(function() { 
	c = dojo.byId("play_thang");
	ctx = c.getContext('2d');
	
	things.push(new Dot(ctx, 150, 150 ));
	things.push(new Dot(ctx, 250, 250 ));
	
	var box = new Box(ctx, 250, 250, 250, 250 )
	things.push(box);
	
	keys = [];
	
	dojo.connect(dojo.byId('play_thing'), 'onkeydown', addKey);
	dojo.connect(dojo.byId('play_thing'), 'onkeyup', removeKey);
	
	setInterval(draw,10);
});
