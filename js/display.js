//David Gibb

display = {

mode:2,
tCount:0,

scrollY:0, 	//MEMORY[FF42]
scrollX:0,	//MEMORY[FF43]
line:0,		//MEMORY[FF44]

step: function(){
	
	switch(display.mode){
		
		case 0:
			if(display.tCount>=204){
				display.tCount=0;
				display.mode=2;
				if (display.line>=143){
				display.mode=1
				screen.putImageData(pixData,0,0);
				}
			}
				break;
			
		case 1:
			if(display.tCount>=456){
				display.tCount=0;
				display.line++;
				if (display.line>153){
					display.mode=2;
					display.line=0
				}
			}
				break;
			
		case 2:
			if(display.tCount>=80){
				display.tCount=0;
				display.mode=3;
			}
				break;
			
		case 3:
			if(display.tCount>=172){
				display.tCount=0;
				display.mode=0;
				display.drawScanline();
				display.line++;
				
			}
				break;
	}
},

showState: function(){
console.log('gpu mode: ', display.mode);
console.log('tCount: ', display.tCount);
console.log('LCD Control (FF40): ', MEMORY[0xFF40].toString(16));
console.log('LCD STAT (FF41): ', MEMORY[0xFF41].toString(16));
console.log('scrollY: (FF42)', display.scrollY.toString(16));
console.log('scrollX: (FF43)', display.scrollX.toString(16));
console.log('line: (FF44)', display.line.toString(16));
console.log('BG Pal(FF47): ', MEMORY[0xFF47].toString(16));
},

drawScanline: function(){
	
	var dataOffset=display.line*640
	var offsetY =((display.scrollY+display.line)%8)*2
	
	for(var i=0;i<160;i++){
		
		var offsetX=(scrollX+i)%8
		var tileY=(Math.floor((display.scrollY+display.line)/8))%32;
		var tileX=(Math.floor((scrollX+i)/8))%32
		var tile = ((MEMORY[0xFF40]&0x08)===0x80)?tileMap1[tileY][tileX]:tileMap0[tileY][tileX];
		if (MEMORY[0xFF40]&0x10===0){tile=cpu.signDecode(tile)+128;}
		tile=16*tile;
		var bit0=((MEMORY[0xFF40]&0x10)===0x10)?tileSet1[tile+offsetY]:tileSet0[tile+offsetY];
		var bit1=((MEMORY[0xFF40]&0x10)===0x10)?tileSet1[tile+offsetY+1]:tileSet0[tile+offsetY+1];
		var pix=(bit1>>(7-offsetX)&0x01)?2:0;
		pix+=(bit0>>(7-offsetX)&0x01)?1:0;
		pixData.data[dataOffset]=paletteRef[pix];
		pixData.data[dataOffset+1]=paletteRef[pix];
		pixData.data[dataOffset+2]=paletteRef[pix];
		dataOffset+=4;
	}
},

canvasInit: function(){
	var canvas = document.getElementById('screen');
	screen = canvas.getContext('2d');
	pixData = screen.createImageData(160,144);
	for(var i=0;i<pixData.data.length;i++){
		pixData.data[i]=255;
	}
	screen.putImageData(pixData,0,0);
},
		
};

tileMap0=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
tileMap1=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
screen={};
pixData={};
spriteData=[];
tileSet0=[];
tileSet1=[];
paletteRef=[255,192,96,0];