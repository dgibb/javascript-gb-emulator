//David Gibb

display = {

mode:0,
tCount:0,

step: function(){
	
	switch(display.mode){
		
		case 0:
			if(display.tCount>=204){
				display.tCount=0;
				display.mode=1;
			}
				break;
			
		case 1:
			if(display.tCount>=4560){
				display.tCount=0;
				display.mode=2;
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
				display.drawFrame();
			}
				break;
	}
},

showState: function(){
console.log('gpu mode: ', display.mode);
console.log('tCount: ', display.tCount);
},


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

pixDataInit: function(){
	for(var i = 0; i<92160;i++){
		pixData.push(255);
	}
}

		
};

pixData=[];
paletteRef=[[255,255,255,255],[192,192,192,255],[96,96,96,255],[0,0,0,255]];
