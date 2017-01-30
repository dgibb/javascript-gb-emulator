emulator ={

init: function(){
	memory.memoryInit();
	display.canvasInit();
},

runGame:function(){
	cpu.timer = window.setInterval(emulator.runFrame,17);
},

runFrame: function(){
	while(display.line!==144){
	cpu.ex(memory.readByte(cpu.pc));
	}
	while(display.line!==0){
	cpu.ex(memory.readByte(cpu.pc));
	}
},

};