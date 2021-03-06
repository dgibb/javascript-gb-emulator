//David Gibb

display = {

mode:2,
tCount:0,

scrollY:0, 	//MEMORY[0xFF42]
scrollX:0,	//MEMORY[0xFF43]
line:0,		//MEMORY[0xFF44]
windowX:0,
windowY:0,
windowOn:0,
windowMap:0,
vBIntcalled:0,
spriteSize:1,
graphicsDebug:0,

step: function(){
	
	display.tCount+=cpu.t;
	
	
	if ((display.line===MEMORY[0xFF45])&&((MEMORY[0xFF41]&0x40)===0x40)){
		MEMORY[0xFF0F]|=0x02;
	}else{
		MEMORY[0xFF0F]&=0xFD;
	}
	
	
	switch(display.mode){
		
		case 0:
			if(display.tCount>=204){
				display.tCount=0;
				display.mode=2;
				if (display.line>143){
				//if (display.windowOn){display.drawWindow();}
				display.drawSprites();
				display.mode=1;
				screen.putImageData(pixData,0,0);
				}
			}
				break;
			
		case 1:
			if (display.vBIntCalled===0){
				MEMORY[0xFF0F]|=0x01;
				display.vBIntCalled=1;
				}
			if(display.tCount>=456){
				display.tCount=0;
				display.line++;
				if (display.line>153){
					display.mode=2;
					display.line=0;
				}
			}
				break;
			
		case 2:
			display.vBIntCalled=0;
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
console.log('LYC: (FF45)', MEMORY[0xFF45].toString(16));
console.log('BG Pal(FF47): ', MEMORY[0xFF47].toString(16));
},

drawScanline: function(){
	var dataOffset=display.line*640
	var offsetY =((display.scrollY+display.line)%8)*2
	if (display.windowOn&&(display.line>=display.windowY)){
		display.drawWindowLine(dataOffset,offsetY);
	}else{
		display.drawBgLine(dataOffset,offsetY);
	}

},


drawBgLine: function(dataOffset,offsetY){
	
	for(var i=0;i<160;i++){
		
		var offsetX=(display.scrollX+i)%8;
		var tileY=(Math.floor((display.scrollY+display.line)/8))%32;
		var tileX=(Math.floor((display.scrollX+i)/8))%32;
		var tile = ((MEMORY[0xFF40]&0x08)===0x80)?tileMap1[tileY][tileX]:tileMap0[tileY][tileX];
		if ((MEMORY[0xFF40]&0x10)===0){tile=cpu.signDecode(tile)+128;}
		tile=16*tile;
		var bit0=((MEMORY[0xFF40]&0x10)===0x10)?tileSet1[tile+offsetY]:tileSet0[tile+offsetY];
		var bit1=((MEMORY[0xFF40]&0x10)===0x10)?tileSet1[tile+offsetY+1]:tileSet0[tile+offsetY+1];
		var pix=((bit1>>(7-offsetX))&0x01)?2:0;
		pix+=((bit0>>(7-offsetX))&0x01)?1:0;
		pixData.data[dataOffset]=paletteRef[pix];
		pixData.data[dataOffset+1]=paletteRef[pix];
		pixData.data[dataOffset+2]=paletteRef[pix];
		dataOffset+=4;
	}	
},

drawWindowLine: function(dataOffset,offsetY){
	
	for(var i=0;i<160;i++){
		
		var offsetX=(display.windowX+i-7)%8;
		var tileY=(Math.floor((display.line-display.windowY)/8))%32;
		var tileX=(Math.floor((display.windowX+i-7)/8))%32;
		var tile = (display.windowMap)?tileMap1[tileY][tileX]:tileMap0[tileY][tileX];
		tile=16*tile;
		var bit0=tileSet1[tile+offsetY];
		var bit1=tileSet1[tile+offsetY+1];
		var pix=((bit1>>(7-offsetX))&0x01)?2:0;
		pix+=((bit0>>(7-offsetX))&0x01)?1:0;
		pixData.data[dataOffset]=paletteRef[pix];
		pixData.data[dataOffset+1]=paletteRef[pix];
		pixData.data[dataOffset+2]=paletteRef[pix];
		dataOffset+=4;
	}	
},

drawSprites:function(){
	var addr= 0xFE9C;
	for (var i=0; i<40; i++){		//for each sprite
	if (display.graphicsDebug){console.log('sprite', 40-i);}
		var orientation = MEMORY[addr+3];
		orientation=(orientation>>5)&0x3;
		switch (orientation){
		
			case 0:
				display.drawSprite(addr);
				break;
			case 1:
				display.drawXFlipSprite(addr);
				break;
			case 2:
				display.drawYFlipSprite(addr);
				break;
			case 3:
				display.drawXYFlipSprite(addr);
				break;
		}
		addr-=4;
		
	}//endforeachprite
	
},//endfunc

drawSprite: function(addr){			
	
		if ((MEMORY[addr]||MEMORY[addr+1])!==0){			//if sprite not hidden

			var tile = tileSet1.slice((MEMORY[addr+2]*16),(MEMORY[addr+2]*16)+(16*display.spriteSize));
			var bgLine=MEMORY[addr]-16;
			var objPalette=(MEMORY[addr+3]>>4)&0x01;
			
			for (var j=0; j<(8*display.spriteSize); j++){						//for each line in sprite
				
				if (display.lineOnScreen(MEMORY[addr]-16,j)){					//if on screen
					
					var spriteLine= tile.slice(j*2, (j*2)+2);
					var lineOffset=bgLine*640;
					
					for (var k=0; k<8; k++){					//for each pixel in line
						
						if (display.pixOnScreen(MEMORY[addr+1]-8,k)){		//if pix on screen
							
							var pixOffset=(MEMORY[addr+1]-8+k)*4;
							var pixel=((spriteLine[1]>>(7-k))&0x01)?2:0;
							pixel+=((spriteLine[0]>>(7-k))&0x01)?1:0;
							
							if(pixel===0){
							 //Do nothing
							}else{
								//if((MEMORY[addr+3]>>4)&0x01){ 				//the sprite has priority
									pixData.data[lineOffset+pixOffset]=objPalettes[objPalette][pixel];
									pixData.data[lineOffset+pixOffset+1]=objPalettes[objPalette][pixel];
									pixData.data[lineOffset+pixOffset+2]=objPalettes[objPalette][pixel];
								//}else if(pixel===0){			// pixel in the background is 0
								//	pixData.data[lineOffset+pixOffset]=objPalettes[objPalette][pixel];
								//pixData.data[lineOffset+pixOffset+1]=objPalettes[objPalette][pixel];
								//	pixData.data[lineOffset+pixOffset+2]=objPalettes[objPalette][pixel];
								//}else{
									//Do nothing
								//}
							
							} //endelse
						
						}//end if pix on screen
		
					}//end for each pixel in line
					
				}//endifonscreen
				
				bgLine++;
				
			}//endforeachlineinsprite
		
		}//endifspritenothidden
},

drawXFlipSprite: function(addr){
		
		if ((MEMORY[addr]||MEMORY[addr+1])!==0){			//if sprite not hidden
			
			var tile = tileSet1.slice((MEMORY[addr+2]*16),(MEMORY[addr+2]*16)+(16*display.spriteSize));
			var bgLine=MEMORY[addr]-16;
			var objPalette=(MEMORY[addr+3]>>4)&0x01;
			
			for (var j=0; j<(8*display.spriteSize); j++){						//for each line in sprite
				
				if (display.lineOnScreen(MEMORY[addr]-16,j)){					//if on screen
					
					var spriteLine= tile.slice(j*2, (j*2)+2);
					var lineOffset=bgLine*640;
					
					for (var k=0; k<8; k++){					//for each pixel in line
						
						if (display.pixOnScreen(MEMORY[addr+1]-8,k)){		//if pix on screen
							
							var pixOffset=(MEMORY[addr+1]-8+k)*4;
							var pixel=((spriteLine[1]>>(k))&0x01)?2:0;
							pixel+=((spriteLine[0]>>(k))&0x01)?1:0;
							
							if(pixel===0){
							 //Do nothing
							}else{
								//if((MEMORY[addr+3]>>4)&0x01){ 				//the sprite has priority
									pixData.data[lineOffset+pixOffset]=objPalettes[objPalette][pixel];
									pixData.data[lineOffset+pixOffset+1]=objPalettes[objPalette][pixel];
									pixData.data[lineOffset+pixOffset+2]=objPalettes[objPalette][pixel];
								//}else if(pixel===0){			// pixel in the background is 0
								//	pixData.data[lineOffset+pixOffset]=objPalettes[objPalette][pixel];
								//pixData.data[lineOffset+pixOffset+1]=objPalettes[objPalette][pixel];
								//	pixData.data[lineOffset+pixOffset+2]=objPalettes[objPalette][pixel];
								//}else{
									//Do nothing
								//}
							
							} //endelse
						
						}//end if pix on screen
		
					}//end for each pixel in line
					
				}//endifonscreen
				
				bgLine++;
				
			}//endforeachlineinsprite
		
		}//endifspritenothidden
},

drawYFlipSprite: function(addr){
		
		if ((MEMORY[addr]||MEMORY[addr+1])!==0){			//if sprite not hidden
			
			var tile = tileSet1.slice((MEMORY[addr+2]*16),(MEMORY[addr+2]*16)+(16*display.spriteSize));
			var bgLine=MEMORY[addr]-16;
			var objPalette=(MEMORY[addr+3]>>4)&0x01;
			
			for (var j=0; j<(8*display.spriteSize); j++){						//for each line in sprite
				
				if (display.lineOnScreen(MEMORY[addr]-16,j)){					//if on screen
					
					var spriteLine= tile.slice((16*display.spriteSize)-(j*2), (16*display.spriteSize)-(j*2)+2);
					var lineOffset=bgLine*640;
					
					for (var k=0; k<8; k++){					//for each pixel in line
						
						if (display.pixOnScreen(MEMORY[addr+1]-8,k)){		//if pix on screen
							
							var pixOffset=(MEMORY[addr+1]-8+k-display.scrollX)*4;
							var pixel=((spriteLine[1]>>(7-k))&0x01)?2:0;
							pixel+=((spriteLine[0]>>(7-k))&0x01)?1:0;
							
							if(pixel===0){
							 //Do nothing
							}else{
								//if((MEMORY[addr+3]>>4)&0x01){ 				//the sprite has priority
									pixData.data[lineOffset+pixOffset]=objPalettes[objPalette][pixel];
									pixData.data[lineOffset+pixOffset+1]=objPalettes[objPalette][pixel];
									pixData.data[lineOffset+pixOffset+2]=objPalettes[objPalette][pixel];
								//}else if(pixel===0){			// pixel in the background is 0
								//	pixData.data[lineOffset+pixOffset]=objPalettes[objPalette][pixel];
								//pixData.data[lineOffset+pixOffset+1]=objPalettes[objPalette][pixel];
								//	pixData.data[lineOffset+pixOffset+2]=objPalettes[objPalette][pixel];
								//}else{
									//Do nothing
								//}
							
							} //endelse
						
						}//end if pix on screen
		
					}//end for each pixel in line
					
				}//endifonscreen
				
				bgLine++;
				
			}//endforeachlineinsprite
		
		}//endifspritenothidden
},

drawXYFlipSprite: function(addr){
		
		if ((MEMORY[addr]||MEMORY[addr+1])!==0){			//if sprite not hidden
			
			var tile = tileSet1.slice((MEMORY[addr+2]*16),(MEMORY[addr+2]*16)+(16*display.spriteSize));
			var bgLine=MEMORY[addr]-16;
			var objPalette=(MEMORY[addr+3]>>4)&0x01;
			
			for (var j=0; j<(8*display.spriteSize); j++){						//for each line in sprite
				
				if (display.lineOnScreen(MEMORY[addr]-16,j)){					//if on screen
					
					var spriteLine= tile.slice((16*display.spriteSize)-(j*2), (16*display.spriteSize)-(j*2)+2);
					var lineOffset=bgLine*640;
					
					for (var k=0; k<8; k++){					//for each pixel in line
						
						if (display.pixOnScreen(MEMORY[addr+1]-8,k)){		//if pix on screen
							
							var pixOffset=(MEMORY[addr+1]-8+k)*4;
							var pixel=((spriteLine[1]>>(k))&0x01)?2:0;
							pixel+=((spriteLine[0]>>(k))&0x01)?1:0;
							
							if(pixel===0){
							 //Do nothing
							}else{
								//if((MEMORY[addr+3]>>4)&0x01){ 				//the sprite has priority
									pixData.data[lineOffset+pixOffset]=objPalettes[objPalette][pixel];
									pixData.data[lineOffset+pixOffset+1]=objPalettes[objPalette][pixel];
									pixData.data[lineOffset+pixOffset+2]=objPalettes[objPalette][pixel];
								//}else if(pixel===0){			// pixel in the background is 0
								//	pixData.data[lineOffset+pixOffset]=objPalettes[objPalette][pixel];
								//pixData.data[lineOffset+pixOffset+1]=objPalettes[objPalette][pixel];
								//	pixData.data[lineOffset+pixOffset+2]=objPalettes[objPalette][pixel];
								//}else{
									//Do nothing
								//}
							
							} //endelse
						
						}//end if pix on screen
		
					}//end for each pixel in line
					
				}//endifonscreen
				
				bgLine++;
				
			}//endforeachlineinsprite
		
		}//endifspritenothidden
},

drawWindow:function(){
	
	var winY = display.windowY;
	var lineOffset= winY*640;
	while (winY<143){}
	
	
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

lineOnScreen: function(bgLine, spriteline){
	var line = bgLine+spriteline;
	//if (display.graphicsDebug){console.log('pixonscreen', bgLine.toString(16), display.scrollX.toString(16), endline.toString(16));}
	if (line<144){return true;} else {return false;}
},

pixOnScreen: function(bgLine, spriteline){
	var line = bgLine+spriteline;
	//if (display.graphicsDebug){console.log('pixonscreen', bgLine.toString(16), display.scrollX.toString(16), endline.toString(16));}
	if (line<160){return true;} else {return false;}
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
objPalettes=[[],[]];