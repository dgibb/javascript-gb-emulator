//David Gibb

input={
	
 keyDown: function(e){
		console.log(e.keyCode);
    	switch(e.keyCode)
	{
            case 65:  MEMORY[0xFF00] &= 0xE; break;//A
            case 83:  MEMORY[0xFF00] &= 0xD; break;//B
            case 38:  MEMORY[0xFF00] &= 0xB; break;//up
            case 40:  MEMORY[0xFF00] &= 0x7; break;//down
            case 37:  MEMORY[0xFF00] &= 0xE; break;//left
            case 39:  MEMORY[0xFF00] &= 0xD; break;//right
            case 13:  MEMORY[0xFF00] &= 0xB; break;//Start
            case 16:  MEMORY[0xFF00] &= 0x7; break;//Select
			case 114: cpu.runInstruction();  break;
	}
},

    keyUp: function(e){
		console.log(e.keyCode);
    	switch(e.keyCode){
            case 65: MEMORY[0xFF00] |= 0x1; break;//A
            case 83: MEMORY[0xFF00] |= 0x2; break;//B
            case 38: MEMORY[0xFF00] |= 0x4; break;//up
            case 40: MEMORY[0xFF00] |= 0x8; break;//Down
            case 37: MEMORY[0xFF00] |= 0x1; break;//Left
            case 39: MEMORY[0xFF00] |= 0x2; break;//Right
            case 13: MEMORY[0xFF00] |= 0x4; break;//Start
            case 16: MEMORY[0xFF00] |= 0x8; break;//Select
		}
    },

};

