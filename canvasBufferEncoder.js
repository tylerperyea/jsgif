var CanvasBufferEncoder={
	canvas:undefined,
	context:function(){
		return this.canvas;
	},
	setCanvas:function (c){
		this.canvas=c;
	},
	frameStripCanvas:undefined,
	frameStripBufferCanvas:undefined,
	delay:300,
	document:undefined,
	stream:undefined,
    getBase64:function(){
        return encode64(this.stream.getData());
    },
	getBase64Src:function(){
		return 'data:image/gif;base64,'+encode64(this.stream.getData());
	},
	encode:function encodeSprite(){
		var canvas=this.frameStripCanvas;
		var width=this.canvas.width;

		var encoder = new GIFEncoder();
		encoder.setRepeat(0); //auto-loop
		encoder.setDelay(this.delay);
		encoder.setSize(width,canvas.height);
		console.log(encoder.start());
		for(var i=0;i<canvas.width/width;i++){
			var h = canvas.height;
			var can=this.document.createElement("CANVAS");
			can.height=h;
			can.width=width;
			can.getContext('2d').drawImage(canvas,-i*width,0);
			encoder.addFrame(can.getContext('2d'));
		}

		encoder.setDelay(this.delay);
		encoder.finish();
		this.stream = encoder.stream();
	},
	scount:0,
	addFrame: function (){

		var incWidth=this.canvas.width;
		var ctx = this.context();

		//increase size:
		this.frameStripCanvas.width+=incWidth;

		//repaint old:
		var spritectx = this.frameStripCanvas.getContext('2d');
		if(this.frameStripBufferCanvas.width>0){
			spritectx.drawImage(this.frameStripBufferCanvas,0,0);	
		}
		//paint new:
		spritectx.drawImage(this.canvas,this.scount*incWidth,0);

		//increase size:
		this.frameStripBufferCanvas.width=this.frameStripCanvas.width;
		//paint buffer:
		this.frameStripBufferCanvas.getContext('2d').drawImage(this.frameStripCanvas,0,0);
		this.scount++;
	},
	remFrame: function(){
		if(this.scount==0)return;
		var incWidth=this.canvas.width;
		var ctx = this.context();
		//encoder.addFrame(ctx);
		//document.getElementById('sprite').width+=100;

		//decrease size:
		this.frameStripCanvas.width-=incWidth;

		//repaint old:
		var spritectx = this.frameStripCanvas.getContext('2d');
		spritectx.drawImage(this.frameStripBufferCanvas,0,0);	
		//paint new:
		//spritectx.drawImage(canvas,scount*incWidth,0);

		//increase size:
		this.frameStripBufferCanvas.width=this.frameStripCanvas.width;
		//paint buffer:
		//console.log(this.frameStripBufferCanvas.width);
		if(this.frameStripBufferCanvas.width>0)
			this.frameStripBufferCanvas.getContext('2d').drawImage(this.frameStripCanvas,0,0);
		this.scount--;
	},
	init:function(watchCanvas, stripCanvas, bufferCanvas, previewCanvas){
		this.canvas = watchCanvas;
        if(stripCanvas==undefined){
            stripCanvas=document.createElement("CANVAS");   
        }
        if(bufferCanvas==undefined){
            bufferCanvas=document.createElement("CANVAS");   
        }
		this.frameStripCanvas = stripCanvas;
		this.frameStripBufferCanvas = bufferCanvas;
        this.frameStripCanvas.height=this.canvas.height;
       this.frameStripCanvas.width=0;
       this.frameStripBufferCanvas.width=0;//this.canvas.width;
        this.frameStripBufferCanvas.height=this.canvas.height;
       		this.previewCanvas=previewCanvas;
		this.document=document;
	},
	inst:0,
	previewCanvas:undefined,
	setPreview : function(bol){
		console.log("called");
		this.inst++;
		if(bol){
			var canvas = this.frameStripCanvas;
			var parent = this;
			var cur =parent.inst;
			var can = this.previewCanvas;
			var h = this.canvas.height;
			can.height=h;
			can.width=this.canvas.width;
			var i=0;
			var drawFrame=function(){
				console.log("draw" + cur + " ?= " + parent.inst);
				if(cur==parent.inst){
					if(canvas.width>0){
						can.getContext('2d').drawImage(canvas,-i*can.width,0);
						i++;
						if(i>=canvas.width/can.width){
							i=0;
						}
					}
					setTimeout(arguments.callee,parent.delay);
				}
		
			}; 
			drawFrame();
		}
	}
};
