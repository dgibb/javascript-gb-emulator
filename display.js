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
console.log('scrollY: (FF42)', display.scrollY);
console.log('scrollX: (FF43)', display.scrollX);
console.log('line: (FF43)', display.line.toString(16));
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
	for(var i=3;i<pixData.data.length;i+=4){
		pixData.data[i]=255;
	}
	screen.putImageData(pixData,0,0);
},
 

/*
drawFrame: function(){
	if(MEMORY[0xFF40]&0x01){
	var tilemap=(MEMORY[0xFF40]&0x02===0x02)?0x9800 : 0x9C00;
	var Start=tilemap+MEMORY[0xFF42]+MEMORY[0xFF43];
	console.log('scrollX: ', MEMORY[0xFF43], 'scrollY: ', MEMORY[0xFF42] );
	console.log('tilemap: ', tilemap.toString(16));
	console.log('Start: ', Start.toString(16));
	console.log(MEMORY[Start], MEMORY[Start+1], MEMORY[Start+2], MEMORY[Start+3], MEMORY[Start+4], MEMORY[Start+5], MEMORY[Start+6], MEMORY[Start+7], MEMORY[Start+8], MEMORY[Start+9], MEMORY[Start+10], MEMORY[Start+11], MEMORY[Start+12], MEMORY[Start+13], MEMORY[Start+14], MEMORY[Start+15], MEMORY[Start+16], MEMORY[Start+17], MEMORY[Start+18]);
	Start+=32;
	console.log(MEMORY[Start], MEMORY[Start+1], MEMORY[Start+2], MEMORY[Start+3], MEMORY[Start+4], MEMORY[Start+5], MEMORY[Start+6], MEMORY[Start+7], MEMORY[Start+8], MEMORY[Start+9], MEMORY[Start+10], MEMORY[Start+11], MEMORY[Start+12], MEMORY[Start+13], MEMORY[Start+14], MEMORY[Start+15], MEMORY[Start+16], MEMORY[Start+17], MEMORY[Start+18]);
	Start+=32;
	console.log(MEMORY[Start], MEMORY[Start+1], MEMORY[Start+2], MEMORY[Start+3], MEMORY[Start+4], MEMORY[Start+5], MEMORY[Start+6], MEMORY[Start+7], MEMORY[Start+8], MEMORY[Start+9], MEMORY[Start+10], MEMORY[Start+11], MEMORY[Start+12], MEMORY[Start+13], MEMORY[Start+14], MEMORY[Start+15], MEMORY[Start+16], MEMORY[Start+17], MEMORY[Start+18]);
	Start+=32;
	console.log(MEMORY[Start], MEMORY[Start+1], MEMORY[Start+2], MEMORY[Start+3], MEMORY[Start+4], MEMORY[Start+5], MEMORY[Start+6], MEMORY[Start+7], MEMORY[Start+8], MEMORY[Start+9], MEMORY[Start+10], MEMORY[Start+11], MEMORY[Start+12], MEMORY[Start+13], MEMORY[Start+14], MEMORY[Start+15], MEMORY[Start+16], MEMORY[Start+17], MEMORY[Start+18]);
	Start+=32;
	console.log(MEMORY[Start], MEMORY[Start+1], MEMORY[Start+2], MEMORY[Start+3], MEMORY[Start+4], MEMORY[Start+5], MEMORY[Start+6], MEMORY[Start+7], MEMORY[Start+8], MEMORY[Start+9], MEMORY[Start+10], MEMORY[Start+11], MEMORY[Start+12], MEMORY[Start+13], MEMORY[Start+14], MEMORY[Start+15], MEMORY[Start+16], MEMORY[Start+17], MEMORY[Start+18]);
	Start+=32;
	console.log(MEMORY[Start], MEMORY[Start+1], MEMORY[Start+2], MEMORY[Start+3], MEMORY[Start+4], MEMORY[Start+5], MEMORY[Start+6], MEMORY[Start+7], MEMORY[Start+8], MEMORY[Start+9], MEMORY[Start+10], MEMORY[Start+11], MEMORY[Start+12], MEMORY[Start+13], MEMORY[Start+14], MEMORY[Start+15], MEMORY[Start+16], MEMORY[Start+17], MEMORY[Start+18]);
	Start+=32;
	console.log(MEMORY[Start], MEMORY[Start+1], MEMORY[Start+2], MEMORY[Start+3], MEMORY[Start+4], MEMORY[Start+5], MEMORY[Start+6], MEMORY[Start+7], MEMORY[Start+8], MEMORY[Start+9], MEMORY[Start+10], MEMORY[Start+11], MEMORY[Start+12], MEMORY[Start+13], MEMORY[Start+14], MEMORY[Start+15], MEMORY[Start+16], MEMORY[Start+17], MEMORY[Start+18]);
	Start+=32;
	console.log(MEMORY[Start], MEMORY[Start+1], MEMORY[Start+2], MEMORY[Start+3], MEMORY[Start+4], MEMORY[Start+5], MEMORY[Start+6], MEMORY[Start+7], MEMORY[Start+8], MEMORY[Start+9], MEMORY[Start+10], MEMORY[Start+11], MEMORY[Start+12], MEMORY[Start+13], MEMORY[Start+14], MEMORY[Start+15], MEMORY[Start+16], MEMORY[Start+17], MEMORY[Start+18]);
	Start+=32;
	console.log(MEMORY[Start], MEMORY[Start+1], MEMORY[Start+2], MEMORY[Start+3], MEMORY[Start+4], MEMORY[Start+5], MEMORY[Start+6], MEMORY[Start+7], MEMORY[Start+8], MEMORY[Start+9], MEMORY[Start+10], MEMORY[Start+11], MEMORY[Start+12], MEMORY[Start+13], MEMORY[Start+14], MEMORY[Start+15], MEMORY[Start+16], MEMORY[Start+17], MEMORY[Start+18]);
	Start+=32;
	console.log(MEMORY[Start], MEMORY[Start+1], MEMORY[Start+2], MEMORY[Start+3], MEMORY[Start+4], MEMORY[Start+5], MEMORY[Start+6], MEMORY[Start+7], MEMORY[Start+8], MEMORY[Start+9], MEMORY[Start+10], MEMORY[Start+11], MEMORY[Start+12], MEMORY[Start+13], MEMORY[Start+14], MEMORY[Start+15], MEMORY[Start+16], MEMORY[Start+17], MEMORY[Start+18]);
	Start+=32;
	console.log(MEMORY[Start], MEMORY[Start+1], MEMORY[Start+2], MEMORY[Start+3], MEMORY[Start+4], MEMORY[Start+5], MEMORY[Start+6], MEMORY[Start+7], MEMORY[Start+8], MEMORY[Start+9], MEMORY[Start+10], MEMORY[Start+11], MEMORY[Start+12], MEMORY[Start+13], MEMORY[Start+14], MEMORY[Start+15], MEMORY[Start+16], MEMORY[Start+17], MEMORY[Start+18]);
	Start+=32;
	console.log(MEMORY[Start], MEMORY[Start+1], MEMORY[Start+2], MEMORY[Start+3], MEMORY[Start+4], MEMORY[Start+5], MEMORY[Start+6], MEMORY[Start+7], MEMORY[Start+8], MEMORY[Start+9], MEMORY[Start+10], MEMORY[Start+11], MEMORY[Start+12], MEMORY[Start+13], MEMORY[Start+14], MEMORY[Start+15], MEMORY[Start+16], MEMORY[Start+17], MEMORY[Start+18]);
	Start+=32;
	console.log(MEMORY[Start], MEMORY[Start+1], MEMORY[Start+2], MEMORY[Start+3], MEMORY[Start+4], MEMORY[Start+5], MEMORY[Start+6], MEMORY[Start+7], MEMORY[Start+8], MEMORY[Start+9], MEMORY[Start+10], MEMORY[Start+11], MEMORY[Start+12], MEMORY[Start+13], MEMORY[Start+14], MEMORY[Start+15], MEMORY[Start+16], MEMORY[Start+17], MEMORY[Start+18]);
	Start+=32;
	console.log(MEMORY[Start], MEMORY[Start+1], MEMORY[Start+2], MEMORY[Start+3], MEMORY[Start+4], MEMORY[Start+5], MEMORY[Start+6], MEMORY[Start+7], MEMORY[Start+8], MEMORY[Start+9], MEMORY[Start+10], MEMORY[Start+11], MEMORY[Start+12], MEMORY[Start+13], MEMORY[Start+14], MEMORY[Start+15], MEMORY[Start+16], MEMORY[Start+17], MEMORY[Start+18]);
	Start+=32;
	console.log(MEMORY[Start], MEMORY[Start+1], MEMORY[Start+2], MEMORY[Start+3], MEMORY[Start+4], MEMORY[Start+5], MEMORY[Start+6], MEMORY[Start+7], MEMORY[Start+8], MEMORY[Start+9], MEMORY[Start+10], MEMORY[Start+11], MEMORY[Start+12], MEMORY[Start+13], MEMORY[Start+14], MEMORY[Start+15], MEMORY[Start+16], MEMORY[Start+17], MEMORY[Start+18]);
	Start+=32;
	console.log(MEMORY[Start], MEMORY[Start+1], MEMORY[Start+2], MEMORY[Start+3], MEMORY[Start+4], MEMORY[Start+5], MEMORY[Start+6], MEMORY[Start+7], MEMORY[Start+8], MEMORY[Start+9], MEMORY[Start+10], MEMORY[Start+11], MEMORY[Start+12], MEMORY[Start+13], MEMORY[Start+14], MEMORY[Start+15], MEMORY[Start+16], MEMORY[Start+17], MEMORY[Start+18]);
	Start+=32;
	console.log(MEMORY[Start], MEMORY[Start+1], MEMORY[Start+2], MEMORY[Start+3], MEMORY[Start+4], MEMORY[Start+5], MEMORY[Start+6], MEMORY[Start+7], MEMORY[Start+8], MEMORY[Start+9], MEMORY[Start+10], MEMORY[Start+11], MEMORY[Start+12], MEMORY[Start+13], MEMORY[Start+14], MEMORY[Start+15], MEMORY[Start+16], MEMORY[Start+17], MEMORY[Start+18]);
	Start+=32;
	console.log(MEMORY[Start], MEMORY[Start+1], MEMORY[Start+2], MEMORY[Start+3], MEMORY[Start+4], MEMORY[Start+5], MEMORY[Start+6], MEMORY[Start+7], MEMORY[Start+8], MEMORY[Start+9], MEMORY[Start+10], MEMORY[Start+11], MEMORY[Start+12], MEMORY[Start+13], MEMORY[Start+14], MEMORY[Start+15], MEMORY[Start+16], MEMORY[Start+17], MEMORY[Start+18]);
	Start+=32;
	console.log(MEMORY[Start], MEMORY[Start+1], MEMORY[Start+2], MEMORY[Start+3], MEMORY[Start+4], MEMORY[Start+5], MEMORY[Start+6], MEMORY[Start+7], MEMORY[Start+8], MEMORY[Start+9], MEMORY[Start+10], MEMORY[Start+11], MEMORY[Start+12], MEMORY[Start+13], MEMORY[Start+14], MEMORY[Start+15], MEMORY[Start+16], MEMORY[Start+17], MEMORY[Start+18]);
	Start+=32;
	console.log(MEMORY[Start], MEMORY[Start+1], MEMORY[Start+2], MEMORY[Start+3], MEMORY[Start+4], MEMORY[Start+5], MEMORY[Start+6], MEMORY[Start+7], MEMORY[Start+8], MEMORY[Start+9], MEMORY[Start+10], MEMORY[Start+11], MEMORY[Start+12], MEMORY[Start+13], MEMORY[Start+14], MEMORY[Start+15], MEMORY[Start+16], MEMORY[Start+17], MEMORY[Start+18]);
	}
},
*/

pixDataInit: function(){
	for(var i = 0; i<pixData.data.length;i++){
		pixData.data[i]=255;
	}
}

		
};

tileMap0=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
tileMap1=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
screen={};
pixData={};
spriteData=[];
tileSet0=[];
tileSet1=[];
paletteRef=[255,192,96,0];
