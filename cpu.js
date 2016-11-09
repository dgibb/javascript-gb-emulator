//David Gibb

cpu = {

 a:0,
 b:0,
 c:0,
 d:0,
 e:0,
 h:0,
 l:0,
 f:0, //flags
   
//program counter and stack pointer (16 bit)
 pc:0,
 sp:0,

//clocks
 m:0,
 t:0,

//interupts
 i:0,

//instructions

//0x00
 nop: function(){
cpu.m=1
cpu.t=4
},

//0x01
 ld_bc_nn : function(){
	cpu.b=memory.readByte(cpu.pc);
	cpu.c=memory.readByte(cpu.pc+1);
	cpu.pcpu.c+=2;
	cpu.m=3;
	cpu.t=12;
},

//0x02
 ld_bc_a : function(){
	var addr = b;
	addr<<8;
	addr+=cpu.c;
	memory.writeByte(addr, a);
	cpu.m=1;
	cpu.t=8;
},

//0x03
 inc_bc : function(){
	cpu.c++;
	cpu.c&=0xFF;
	if(cpu.c===0){
		cpu.b++;
		cpu.b&=0xFF;
	}
	cpu.m=1;
	cpu.t=8;
},

//0x04
 inc_b : function(){
	cpu.b++;
	cpu.b&=0xFF;
	if (cpu.b===0){cpu.b=0; setZeroFlag();} else {cpu.resetZeroFlag();}
	if(cpu.b===0x10){cpu.setHalfFlag();} else {cpu.resetHalfFlag();}
	cpu.resetSubFlag();
	cpu.m=1;
	cpu.t=4;
},

//0x05
 dec_b : function(){
	cpu.b--;
	cpu.b&=0xFF;
	if (cpu.b===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	if(cpu.b===0x0F){cpu.setHalfFlag();} else {cpu.resetHalfFlag();}
	cpu.setSubFlag();	
	cpu.m=1;
	cpu.t=4;
},

//0x06
 ld_b_n : function(){
	cpu.b=memory.readByte(cpu.pc+1);
	cpu.m=2; cpu.t=8;
},

//0x07
 rlca : function(){
	var carrybit= (cpu.a>>7)&0x01;
	if (carrybit === 1){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.a<<1;
	cpu.a+=carrybit;
	cpu.resetZeroFlag();
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
},


//0x08
 ld_nn_sp : function(){
	memory.writeByte(cpu.sp, memory.readWord(cpu.pc+1));
	cpu.m=3;
	cpu.t=20;
},

//0x09
 add_hl_bc : function(){
	var x = cpu.b<<8 + cpu.c;
	var y = cpu.h<<8 + cpu.l;
	var z = x+y;
	cpu.l= z&0x00FF;
	cpu.h=z&0xFF00>>8;
	if ((x&0x0F00 + y&0x0F00)&0x1000){cpu.setHalfFlag();} else {cpu.resetHalfFlag();}
	if (z>65535){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.resetSubFlag();
	cpu.m=1;
	cpu.t=8
},

//0x0A
 ld_a_bc : function(){
	cpu.a=memory.readByte(getAddr(cpu.b,cpu.c));
	cpu.m=1; cpu.t=8;
},

//0x0B
 dec_bc : function(){
	var x= getAddr(cpu.b,cpu.c);
	x--;
	cpu.b=x&0xFF00;
	cpu.b>>8;
	cpu.c=x&0x00FF;
	cpu.m=1; cpu.t=8;
},

//0x0C
 inc_c : function(){
	cpu.c++;
	cpu.c&=0xFF;
	if (cpu.c===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	if (cpu.c===0x10){cpu.setHalfFlag();} else {cpu.resetHalfFlag();}
	cpu.resetSubFlag();
	cpu.m=1; cpu.t=4;
},

//0x0D
 dec_c : function(){
	cpu.c--;
	cpu.c&=0xFF;
	if (cpu.c===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	if (cpu.c===0x0F){cpu.setHalfFlag();} else {cpu.resetHalfFlag();}
	cpu.setSubFlag();
	cpu.m=1; cpu.t=4;
},

//0x0E
 ld_c_n : function(){
	cpu.c=memory.readByte(cpu.pc+1);
	cpu.m=2; cpu.t=8;
},

//0x0F
 rrca : function(){
	var carrybit = (cpu.a<<7)&0x80;
	if (carrybit){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.a>>1;
	cpu.a+=carrybit;
	if(cpu.a===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetSubFlag();
	cpu.resetHalfFlag();
	cpu.m=1;
	cpu.t=4
},		

//0x10
 stop : function(){
	cpu.m=1; cpu.t=4;
},

//0x11
 ld_de_nn : function(){
	cpu.d=memory.readByte(cpu.pc);
	cpu.e=memory.readByte(cpu.pc+1);
	cpu.m=3; cpu.t=12;
},

//0x12
 ld_de_a : function(){
	var addr = getAddr(cpu.d,cpu.e);
	memory.writeByte(addr, cpu.a);
	cpu.m=1; cpu.t=8;
},

//0x13
 inc_de : function(){
	cpu.e++;
	cpu.e&=0xFF;
	if(cpu.e===0){
		cpu.d++;
		cpu.d&=0xFF;
	}
	cpu.m=1; cpu.t=8;
},

//0x14
 inc_d : function(){
	cpu.d++;
	cpu.d&=0xFF;
	if (cpu.d===0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	if(cpu.d===0x10){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	cpu.resetSubFlag();
	cpu.m=1; cpu.t=4;	
},

//0x15
 dec_d : function(){
	cpu.d--;
	cpu.d&=0xFF;
	if (cpu.d===0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	if(cpu.d===0x0F){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	cpu.setSubFlag();	
	cpu.m=1; cpu.t=4;
},

//0x16
 ld_d_n : function(){
	cpu.h=memory.readByte(cpu.pc+1);
	cpu.m=2; cpu.t=8;
},

//0x17
 rla : function(){
	var carry = carryFlag()?1:0;
	if (a&0x80===0x80){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.a<<1;
	cpu.a+=carry;
	cpu.a&=0xFF;
	cpu.resetZeroFlag();
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=1; cpu.t=4;
},

//0x18
 jr_n : function(){
	var jump =readByte(cpu.pc+1);
	cpu.pcpu.c+=jump;
	cpu.m=0;
	cpu.t=12;
},

//0x19
 add_hl_de : function(){
	 var x = cpu.d<<8 + e;
	 var y = cpu.h<<8 + cpu.l;
	 var z = x+y;
	cpu.l= z&0x00FF;
	cpu.h=z&0xFF00>>8;
	if ((x&0x0F00 + y&0x0F00)&0x1000){cpu.setHalfFlag();} else {cpu.resetHalfFlag();}
	if (z>65535){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.resetSubFlag();
	cpu.m=1; cpu.t=8;
},

//0x1A
 ld_a_de : function(){
	cpu.a=memory.readByte(getAddr(d,e));
	cpu.m=1; cpu.t=8;
},

//0x1B
 dec_de : function(){
	var x= getAddr(cpu.d,cpu.e);
	x--;
	cpu.d=x&0xFF00;
	cpu.d>>8;
	cpu.e=x&0x00FF;
	cpu.m=1; cpu.t=8;
},

//0x1C
 inc_e : function(){
	cpu.e++;
	cpu.e&=0xFF;
	if (cpu.e===0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	if(cpu.e===0x10){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	cpu.resetSubFlag();
	cpu.m=1; cpu.t=4;	
},

//0x1D
 dec_e : function(){
	cpu.e--;
	cpu.e&=0xFF;
	if (cpu.e===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	if (cpu.e===0x0F){cpu.setHalfFlag();} else {cpu.resetHalfFlag();}
	cpu.setSubFlag();
	cpu.m=1; cpu.t=4;
},

//0x1E
 ld_e_n : function(){
	cpu.e=memory.readByte(cpu.pc+1);
	cpu.m=2; cpu.t=8;
},

//0x1F
 rra : function(){
	var carry = carryFlag()?0x80:0;
	if (a&0x01){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.a>>1;
	cpu.a+=carry;
	cpu.a&=0xFF;
	cpu.resetZeroFlag();
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=1; cpu.t=4;
},


//0x20
 jr_nz_n : function() {
	if (!cpu.zeroFlag()){
		cpu.pc+=memory.readByte(cpu.pc+1);
		cpu.t=12; cpu.m=0;
		}
	else{
		cpu.m=0; cpu.t=8;
		}
},

//0x21
 ld_hl_nn : function() {
	cpu.h=memory.readByte(cpu.pc+1);
	cpu.l=memory.readByte(cpu.pc+2);
	cpu.m=3; cpu.t=8;
},

//0x22
 ldi_hl_a : function() {
	var addr = getAddr(cpu.h,cpu.l);
	memory.writeByte(addr, cpu.a);
	cpu.l++;
	if(cpu.l>255){
		cpu.l&=0x00FF;
		cpu.h++;
		cpu.h&=0xFF;
	}
	cpu.m=1; cpu.t=8;
},

//0x23
 inc_hl : function(){
	cpu.l++;
	cpu.l&=0xFF
	if(cpu.l===0){
		cpu.h++;
		cpu.h&=0xFF
	}
	cpu.m=1; cpu.t=8;
},

//0x24
 inc_h : function(){
	cpu.h++;
	if (cpu.h===0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	if(cpu.h===0x10){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	cpu.resetSubFlag();
	cpu.m=1; cpu.t=4;
},

//0x25
 dec_h : function(){
	cpu.h--;
	if (cpu.h===0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	if(cpu.h===0x0F){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	cpu.setSubFlag();	
	cpu.m=1;
	cpu.t=4;
},

//0x26
 ld_h_n : function(){
	cpu.h=memory.readByte(cpu.pc+1);
	cpu.pcpu.c++;
	cpu.m=2; cpu.t=8;
},

//0x27
 daa : function(){
	if (a&0x0F>9||halfFlag()){cpu.a+=6;}
	if ((cpu.a>>4&0x0F)>9||carryFlag()){cpu.a+=96; cpu.setCarryFlag();}
	if (cpu.a===0){cpu.setZeroFlag();}
	cpu.resetHalfFlag();
	cpu.m=1; cpu.t=4
},

//0x28
 jr_z_n : function(){
	if (cpu.zeroFlag()){
		cpu.pcpu.c+=memory.readByte(cpu.pc+1);
		cpu.t=12; cpu.m=0;
		}
	else{
		cpu.m=2; cpu.t=8;
		}
},

//0x29
 add_hl_hl : function(){
	 x = cpu.h<<8 + l;
	 z=x+x;
	cpu.l= z&0x00FF;
	cpu.h=z&0xFF00>>8;
	if ((x&0x0F00 + x&0x0F00)&0x1000){cpu.setHalfFlag();} else {cpu.resetHalfFlag();}
	if (z>65535){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.resetSubFlag();
	cpu.m=1; cpu.t=8;
},

//0x2A
 ldi_hl : function(){
	cpu.a=readByte(getAddr(cpu.h,cpu.l));
	cpu.l++;
	cpu.l&=0xFF;
	if (cpu.l===0){
		cpu.h++;
		cpu.h&=0xFF;
		}
	cpu.m=1; cpu.t=8;
},

//0x2B
 dec_hl : function(){
	var result=cpu. x= getAddr(cpu.h,cpu.l);
	x--;
	cpu.h=x&0xFF00;
	cpu.h>>8;
	cpu.l=x&0x00FF;
	cpu.m=1; cpu.t=8;
},

//0x2C
 inc_l : function(){
	cpu.l++;
	cpu.l&=0xFF;
	if (cpu.l===0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	if(cpu.l===0x10){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	cpu.resetSubFlag();
	cpu.m=1; cpu.t=4;	
},

//0x2D
 dec_l : function(){
	cpu.l--;
	if (cpu.l===0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	if(cpu.l===0x0F){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	cpu.setSubFlag();	
	cpu.m=1; cpu.t=4;
},

//0x2E
 ld_l_n : function(){
	cpu.l=memory.readByte(cpu.pc+1);
	cpu.m=2; cpu.t=8;
},

//0x2F
 cpl : function(){
	cpu.a=~a;
	cpu.a&=0xFF;
	cpu.setHalfFlag();
	cpu.setSubFlag();
	cpu.m=1; cpu.t=4;
},

//0x30
 jr_nc_n : function(){
	if (!carryFlag()){
		cpu.pcpu.c+=readByte(cpu.pc+1);
		cpu.t=12; cpu.m=0;
		}
	else{
		cpu.m=2; cpu.t=8;
	}
},

//0x31
 ld_sp_nn : function(){
	sp=memory.readByte(cpu.pc);
	sp<<8;
	cpu.sp+=memory.readByte(cpu.pc+1);
	cpu.m=3; cpu.t=12;
},

//0x32
 ldd_hl_a : function(){
	 addr = getAddr(cpu.h,cpu.l);
	memory.writeByte(addr, a);
	cpu.l--;
	if(cpu.l===255){
		cpu.h--;
	}
	cpu.m=2; cpu.t=8;
},

//0x33
 inc_sp : function(){
	cpu.sp++;
	cpu.m=1; cpu.t=8;
},

//0x34
 inc_hl_ : function(){
	 data = memory.readByte(getAddr(cpu.h,cpu.l));
	datcpu.a++;
	memory.writeByte(data, addr);
	if (datcpu.a===0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	if(datcpu.a===0x10){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	cpu.resetSubFlag();
	cpu.m=1; cpu.t=12;
},

//0x35
 dec_hl_ : function(){
	 data = readByte(getAddr(cpu.h,cpu.l))
	datcpu.a--;
	memory.writeByte(data, addr);
	if (datcpu.a===0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	if(datcpu.a===0x0F){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	cpu.setSubFlag();	
	cpu.m=1; cpu.t=12;
},

//0x36
 ld_hl_n : function(){
	writeByte(getAddr(cpu.h,cpu.l), memory.readByte(cpu.pc+1) );
	cpu.m=2; cpu.t=12;
},

//0x37
 scf : function(){
	cpu.setCarryFlag();
	cpu.resetSubFlag();
	cpu.resetHalfFlag();
	cpu.m=1; cpu.t=4;
},

//0x38
jr_c_n : function(){
	if (carryFlag()){
		cpu.pcpu.c+=readByte(cpu.pc+1);
		cpu.t=12; cpu.m=0;
		}
	else{
		cpu.m=2; cpu.t=8;
	}
},


//0x39
 add_hl_sp : function(){
	 x = cpu.h<<8 + l;
	 y= cpu.sp;
	 z=x+y;
	cpu.l= z&0x00FF;
	cpu.h=z&0xFF00>>8;
	if ((x&0x0F00 + y&0x0F00)&0x1000){cpu.setHalfFlag();} else {cpu.resetHalfFlag();}
	if (z>65535){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.resetSubFlag();
	cpu.m=1; cpu.t=8;
},

//0x3A
 ldd_hl : function(){
	var x =getAddr(cpu.h,cpu.l);
	cpu.a=memory.readByte(x)
	x--;
	cpu.h=x&0xFF00;
	cpu.h>>8;
	cpu.l=x&0x00FF;
	cpu.m=1; cpu.t=8;
},

//0x3B
 dec_sp : function(){
	cpu.sp--;
	cpu.sp&=0xFFFF;
	cpu.m=1; cpu.t=8;
},

//0x3C
 inc_a : function(){
	cpu.a++;
	cpu.a&=0xFF;
	if (cpu.a===0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	if(cpu.a===0x10){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	cpu.resetSubFlag();
	cpu.m=1; cpu.t=4;	
},

//0x3D
 dec_a : function(){
	cpu.a--;
	if (cpu.a===0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	if(cpu.a===0x0F){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	cpu.setSubFlag();	
	cpu.m=1; cpu.t=4;
},

//0x3E
 ld_a_n : function(){
	cpu.a=memory.readByte(cpu.pc+1);
	cpu.m=2; cpu.t=8;
},

//0x3F
 ccf : function(){
	if (carryFlag()){cpu.resetCarryFlag();} else {cpu.setCarryFlag();}
	cpu.m=1; cpu.t=4;
},

//0x40
 ld_b_b: function(){
	cpu.b=cpu.b;
	cpu.m=1; cpu.t=4;
},

//0x41
 ld_b_c: function(){
	cpu.b=cpu.c;
	cpu.m=1; cpu.t=4;
},

//0x42
 ld_b_d: function(){
	cpu.b=cpu.d;
	cpu.m=1; cpu.t=4;
},

//0x43
 ld_b_e: function(){
	cpu.b=cpu.e;
	cpu.m=1; cpu.t=4;
},

//0x44
 ld_b_h: function(){
	cpu.b=cpu.h;
	cpu.m=1; cpu.t=4;
},

//0x45
 ld_b_l: function(){
	cpu.b=cpu.l;
	cpu.m=1; cpu.t=4;
},

//0x46
 ld_b_hl: function(){
	cpu.b=memory.readByte(getAddr(cpu.h,cpu.l));
	cpu.m=1; cpu.t=4;
},

//0x47
 ld_b_a: function(){
	cpu.b=cpu.a;
	cpu.m=1; cpu.t=4;
},

//0x48
 ld_c_b: function(){
	cpu.c=cpu.b;
	cpu.m=1; cpu.t=4;
},

//0x49
 ld_c_c: function(){
	cpu.c=cpu.c;
	cpu.m=1; cpu.t=4;
},

//0x4A
 ld_c_d: function(){
	cpu.c=cpu.d;
	cpu.m=1; cpu.t=4;
},

//0x4B
 ld_c_e: function(){
	cpu.c=cpu.e;
	cpu.m=1; cpu.t=4;
},

//0x4C
 ld_c_h: function(){
	cpu.c=cpu.h;
	cpu.m=1; cpu.t=4;
},

//0x4D
 ld_c_l: function(){
	cpu.c=cpu.l;
	cpu.m=1; cpu.t=4;
},

//0x4E
 ld_c_hl: function(){
	cpu.c=memory.readByte(getAddr(cpu.h,cpu.l));
	cpu.m=1; cpu.t=4;
},

//0x4F
 ld_c_a: function(){
	cpu.c=cpu.a;
	cpu.m=1; cpu.t=4;
},

//0x50
 ld_d_b: function(){
	cpu.d=cpu.b;
	cpu.m=1; cpu.t=4;
},

//0x51
 ld_d_c: function(){
	cpu.d=cpu.c;
	cpu.m=1; cpu.t=4;
},

//0x52
 ld_d_d: function(){
	cpu.d=cpu.d;
	cpu.m=1; cpu.t=4;
},

//0x53
 ld_d_e: function(){
	cpu.d=cpu.e;
	cpu.m=1; cpu.t=4;
},

//0x54
 ld_d_h: function(){
	cpu.d=cpu.h;
	cpu.m=1; cpu.t=4;
},

//0x55
 ld_d_l: function(){
	cpu.d=cpu.l;
	cpu.m=1; cpu.t=4;
},

//0x56
 ld_d_hl: function(){
	cpu.d=memory.readByte(getAddr(cpu.h,cpu.l));
	cpu.m=1; cpu.t=4;
},

//0x57
 ld_d_a: function(){
	cpu.d=cpu.a;
	cpu.m=1; cpu.t=4;
},

//0x58
 ld_e_b: function(){
	cpu.e=cpu.b;
	cpu.m=1; cpu.t=4;
},

//0x59
 ld_e_c: function(){
	cpu.e=cpu.c;
	cpu.m=1; cpu.t=4;
},

//0x5A
 ld_e_d: function(){
	cpu.e=cpu.d;
	cpu.m=1; cpu.t=4;
},

//0x5B
 ld_e_e: function(){
	cpu.e=cpu.e;
	cpu.m=1; cpu.t=4;
},

//0x5C
 ld_e_h: function(){
	cpu.e=cpu.h;
	cpu.m=1; cpu.t=4;
},

//0x5D
 ld_e_l: function(){
	cpu.e=cpu.l;
	cpu.m=1; cpu.t=4;
},

//0x5E
 ld_e_hl: function(){
	cpu.e=memory.readByte(getAddr(cpu.h,cpu.l));
	cpu.m=1; cpu.t=4;
},

//0x5F
 ld_e_a: function(){
	cpu.e=cpu.a;
	cpu.m=1; cpu.t=4;
},

//0x60
 ld_h_b: function(){
	cpu.h=cpu.b;
	cpu.m=1; cpu.t=4;
},

//0x61
 ld_h_c: function(){
	cpu.h=cpu.c;
	cpu.m=1; cpu.t=4;
},

//0x62
 ld_h_d: function(){
	cpu.h=cpu.d;
	cpu.m=1; cpu.t=4;
},

//0x63
 ld_h_e: function(){
	cpu.h=cpu.e;
	cpu.m=1; cpu.t=4;
},

//0x64
 ld_h_h: function(){
	cpu.h=cpu.h;
	cpu.m=1; cpu.t=4;
},

//0x65
 ld_h_l: function(){
	cpu.h=cpu.l;
	cpu.m=1; cpu.t=4;
},

//0x66
 ld_h_hl: function(){
	cpu.h=memory.readByte(getAddr(cpu.h,cpu.l));
	cpu.m=1; cpu.t=4;
},

//0x67
 ld_h_a: function(){
	cpu.h=cpu.a;
	cpu.m=1; cpu.t=4;
},

//0x68
 ld_l_b: function(){
	cpu.l=cpu.b;
	cpu.m=1; cpu.t=4;
},

//0x69
 ld_l_c: function(){
	cpu.l=cpu.c;
	cpu.m=1; cpu.t=4;
},

//0x6A
 ld_l_d: function(){
	cpu.l=cpu.d;
	cpu.m=1; cpu.t=4;
},

//0x6B
 ld_l_e: function(){
	cpu.l=cpu.e;
	cpu.m=1; cpu.t=4;
},

//0x6C
 ld_l_h: function(){
	cpu.l=cpu.h;
	cpu.m=1; cpu.t=4;
},

//0x6D
 ld_l_l: function(){
	cpu.l=cpu.l;
	cpu.m=1; cpu.t=4;
},

//0x6E
 ld_l_hl: function(){
	cpu.l=memory.readByte(getAddr(cpu.h,cpu.l));
	cpu.m=1; cpu.t=4;
},

//0x6F
 ld_l_a: function(){
	cpu.l=cpu.a;
	cpu.m=1; cpu.t=4;
},

//0x70
 ld_hl_b: function(){
	memory.writeByte(getAddr(cpu.h,cpu.l),b);
	cpu.m=1; cpu.t=4;
},

//0x71
 ld_hl_c: function(){
	memory.writeByte(getAddr(cpu.h,cpu.l),cpu.c);
	cpu.m=1; cpu.t=4;
},

//0x72
 ld_hl_d: function(){
	memory.writeByte(getAddr(cpu.h,cpu.l),d);
	cpu.m=1; cpu.t=4;
},

//0x73
 ld_hl_e: function(){
	memory.writeByte(getAddr(cpu.h,cpu.l),e);
	cpu.m=1; cpu.t=4;
},

//0x74
 ld_hl_h: function(){
	memory.writeByte(getAddr(cpu.h,cpu.l),h);
	cpu.m=1; cpu.t=4;
},

//0x45
 ld_hl_l: function(){
	memory.writeByte(getAddr(cpu.h,cpu.l),b);
	cpu.m=1; cpu.t=4;
},

//0x76
 halt: function(){
	//
},

//0x77
 ld_hl_a: function(){
	memory.writeByte(getAddr(hl),a);
	cpu.m=1; cpu.t=4;
},

//0x78
 ld_a_b: function(){
	cpu.a=cpu.b;
	cpu.m=1; cpu.t=4;
},

//0x79
 ld_a_c: function(){
	cpu.a=cpu.c;
	cpu.m=1; cpu.t=4;
},

//0x7A
 ld_a_d: function(){
	cpu.a=cpu.d;
	cpu.m=1; cpu.t=4;
},

//0x7B
 ld_a_e: function(){
	cpu.a=cpu.e;
	cpu.m=1; cpu.t=4;
},

//0x7C
 ld_a_h: function(){
	cpu.a=cpu.h;
	cpu.m=1; cpu.t=4;
},

//0x7D
 ld_a_l: function(){
	cpu.a=cpu.l;
	cpu.m=1; cpu.t=4;
},

//7E
 ld_a_hl: function(){
	cpu.a=memory.readByte(getAddr(cpu.h,cpu.l));
	cpu.m=1; cpu.t=4;
},

//0x7F
 ld_a_a: function(){
	cpu.a=cpu.a;
	cpu.m=1; cpu.t=4;
},

//0x80
 add_b_a : function(){
	var result=cpu. var result=cpu. result=cpu.a+b;
	if (result > 255){cpu.setCarryFlag();}
	if(((a&0x0F) + (b&0x0F))&0x10){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.a=(result&0x00ff);
	cpu.resetSubFlag();
	cpu.m=1; cpu.t=4;
	
},

//0x81
  add_c_a : function(){
	var result=cpu. var result=cpu. result=cpu.a+c;
	if (result > 255){cpu.setCarryFlag();}
	if(((a&0x0F) + (c&0x0F))&0x10){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.a=(result&0x00ff);
	cpu.resetSubFlag();
	cpu.m=1; cpu.t=4;
	
},

//0x82
 add_d_a : function(){
	var result=cpu. var result=cpu. result=cpu.a+d;
	if (result > 255){cpu.setCarryFlag();}
	if(((a&0x0F) + (d&0x0F))&0x10){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.a=(result&0x00ff);
	cpu.resetSubFlag();
	cpu.m=1; cpu.t=4;
},
	
//0x83
 add_e_a : function(){
	var result=cpu. var result=cpu. result=cpu.a+e;
	if (result & 0xff00){cpu.setCarryFlag();}
	if(((a&0x0F) + (e&0x0F))&0x10){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.a=(result&0x00ff);
	cpu.resetSubFlag();
	cpu.m=1; cpu.t=4;
},

//0x84
 add_h_a : function(){
	 var result=cpu. result=cpu.a+h;
	if (result > 255){cpu.setCarryFlag();}
	if(((a&0x0F) + (h&0x0F))&0x10){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.a=(result&0x00ff);
	cpu.resetSubFlag();
	cpu.m=1; cpu.t=4;
},

//0x85
 add_l_a : function(){
	 var result=cpu. result=cpu.a+ cpu.l;
	if (result > 255){cpu.setCarryFlag();}
	if(((a&0x0F) + (l&0x0F))&0x10){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.a=(result&0x00ff);
	cpu.resetSubFlag();
	cpu.m=1; cpu.t=4;
	
},

//0x86
 add_hl_a : function(){
	 value = readByte(getAddr(cpu.h,cpu.l));
	 result = a+value;
	if (result & 0xff00){cpu.setCarryFlag();}
	if(((a&0x0F) + (value&0x0F))&0x10){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.a=(result&0x00ff);
	cpu.resetSubFlag();
	cpu.m=1; cpu.t=8;
	
},

//0x87
 add_a_a : function(){
	 var result=cpu. result=cpu.a+a;
	if (result & 0xff00){cpu.setCarryFlag();}
	if(((a&0x0F) + (a&0x0F))&0x10){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.a=(result&0x00ff);
	cpu.resetSubFlag();
	cpu.m=1; cpu.t=4;

},

//0x88
 adc_b_a : function(){
	 var result=cpu. result=cpu.a+b;
	if(CarryFlag()){result+=1;}
	if (result & 0xff00){cpu.setCarryFlag();}
	if(((a&0x0F) + (b&0x0F))&0x10){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.a=(result&0x00ff);
	cpu.resetSubFlag();
	cpu.m=1; cpu.t=8;
},

//0x89
 adc_c_a : function(){
	 var result=cpu. result=cpu.a+e;
	if(CarryFlag()){result+=1;}
	if (result & 0xff00){cpu.setCarryFlag();}
	if(((a&0x0F) + (c&0x0F))&0x10){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.a=(result&0x00ff);
	cpu.resetSubFlag();
	cpu.m=1; cpu.t=4;
},

//0x8A
 adc_d_a : function(){
	 var result=cpu. result=cpu.a+e;
	if (result & 0xff00){cpu.setCarryFlag();}
	if(((a&0x0F) + (d&0x0F))&0x10){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.a=(result&0x00ff);
	cpu.resetSubFlag();
	cpu.m=1; cpu.t=4;
},

//0x8B
 adc_e_a : function(){
	 var result=cpu. result=cpu.a+e;
	if(CarryFlag()){result+=1;}
	if (result & 0xff00){cpu.setCarryFlag();}
	if(((a&0x0F) + (e&0x0F))&0x10){cpu.setHalfFlag();} else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.a=(result&0x00ff);
	cpu.resetSubFlag();
	cpu.m=1; cpu.t=4;
},

//0x8C
 adc_h_a : function(){
	 var result=cpu. result=cpu.a+e;
	if(CarryFlag()){result+=1;}
	if (result & 0xff00){cpu.setCarryFlag();}
	if(((a&0x0F) + (h&0x0F))&0x10){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.a=(result&0x00ff);
	cpu.resetSubFlag();
	cpu.m=1; cpu.t=4;
},

//0x8D
 adc_l_a : function(){
	 var result=cpu. result=cpu.a+e;
	if(CarryFlag()){result+=1;}
	if (result & 0xff00){cpu.setCarryFlag();}
	if(((a&0x0F) + (0&0x0F))&0x10){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.a=(result&0x00ff);
	cpu.resetSubFlag();
	cpu.m=1; cpu.t=4;
},

//0x8E
 adc_hl_a : function(){
	 value =readByte(getAddr(cpu.h,cpu.l));
	 var result=cpu. result=cpu.a+value;
	if(CarryFlag()){result+=1;}
	if (result & 0xff00){cpu.setCarryFlag();}
	if(((a&0x0F) + (value&0x0F))&0x10){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.a=(result&0x00ff);
	cpu.resetSubFlag();
	cpu.m=1; cpu.t=8;
},

//0x8F
 adc_a_a : function(){
	 var result=cpu. result=cpu.a+a;
	if(CarryFlag()){result+=1;}
	if (result & 0xff00){cpu.setCarryFlag();}
	if(((a&0x0F) + (a&0x0F))&0x10){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.a=(result&0x00ff);
	cpu.resetSubFlag();
	cpu.m=1; cpu.t=4;
},

//0x90
 sub_b_a : function(){
	 var result=cpu. result=cpu.a-b;
	if (result < 0){cpu.setCarryFlag();}
	if(a&0x0F < d&0x0F){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.a=(result&0x00ff);
	cpu.setSubFlag();
	cpu.m=1; cpu.t=4;
},

//0x91
 sub_c_a : function(){
	 var result=cpu. result=cpu.a-c;
	if (result < 0){cpu.setCarryFlag();}
	if(a&0x0F < d&0x0F){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.a=(result&0x00ff);
	cpu.setSubFlag();
	cpu.m=1; cpu.t=4;
},

//0x92
 sub_d_a : function(){
	 var result=cpu. result=cpu.a-d;
	if (result < 0){cpu.setCarryFlag();}
	if(a&0x0F < d&0x0F){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.a=(result&0x00ff);
	cpu.setSubFlag();
	cpu.m=1; cpu.t=4;
},

//0x93
 sub_e_a : function(){
	 var result=cpu. result=cpu.a-e;
	if (result < 0){cpu.setCarryFlag();}
	if(a&0x0F < d&0x0F){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.a=(result&0x00ff);
	cpu.setSubFlag();
	cpu.m=1; cpu.t=4;
},

//0x94
 sub_h_a : function(){
	 var result=cpu. result=cpu.a-h;
	if (result < 0){cpu.setCarryFlag();}
	if(a&0x0F < d&0x0F){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.a=(result&0x00ff);
	cpu.setSubFlag();
	cpu.m=1; cpu.t=4;
},

//0x95
 sub_l_a : function(){
	 result = a-l;
	if (result < 0){cpu.setCarryFlag();}
	if(a&0x0F < d&0x0F){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.a=(result&0x00ff);
	cpu.setSubFlag();
	cpu.m=1; cpu.t=4;
},

//0x96
 sub_hl_a : function(){
	 var result=cpu. result=cpu.a-memory.readByte(getAddr(cpu.h,cpu.l));
	if (result < 0){cpu.setCarryFlag();}
	if(a&0x0F < d&0x0F){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.cpu.a=(result&0x00ff);
	cpu.setSubFlag();
	cpu.m=1; cpu.t=8;
},

//0x97
 sub_a_a : function(){
	 var result=cpu. result=cpu.a-a;
	if (result < 0){cpu.setCarryFlag();}
	if(a&0x0F < d&0x0F){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.a=(result&0x00ff);
	cpu.setSubFlag();
	cpu.m=1; cpu.t=4;
},

//0x98
 sbc_b_a : function(){
	 var result=cpu. result=cpu.a-b;
	if(CarryFlag()){result-=1;}
	if (result < 0){cpu.setCarryFlag();}
	if(a&0x0F < d&0x0F){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.a=(result&0x00ff);
	cpu.setSubFlag();
	cpu.m=1; cpu.t=4;
},

//0x99
 sbc_c_a : function(){
	 var result=cpu. result=cpu.a-c;
	if(CarryFlag()){result-=1;}
	if (result < 0){cpu.setCarryFlag();}
	if(a&0x0F < d&0x0F){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.a=(result&0x00ff);
	cpu.setSubFlag();
	cpu.m=1; cpu.t=4;
},

//0x9A
 sbc_d_a : function(){
	 var result=cpu. result=cpu.a-d;
	if(CarryFlag()){result-=1;}
	if (result < 0){cpu.setCarryFlag();}
	if(a&0x0F < d&0x0F){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.a=(result&0x00ff);
	cpu.setSubFlag();
	cpu.m=1; cpu.t=4;
},

//0x9B
 sbc_e_a : function(){
	 var result=cpu. result=cpu.a-e;
	if(CarryFlag()){result-=1;}
	if (result < 0){cpu.setCarryFlag();}
	if(a&0x0F < d&0x0F){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.a=(result&0x00ff);
	cpu.setSubFlag();	
	cpu.m=1; cpu.t=4;
},

//0x9C
 sbc_h_a : function(){
	 var result=cpu. result=cpu.a-h;
	if(CarryFlag()){result-=1;}
	if (result < 0){cpu.setCarryFlag();}
	if(a&0x0F < d&0x0F){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.a=(result&0x00ff);
	cpu.setSubFlag();
	cpu.m=1; cpu.t=4;
},

//0x9D
 sbc_l_a : function(){
	 var result=cpu. result=cpu.a-l;
	if(CarryFlag()){result-=1;}
	if (result < 0){cpu.setCarryFlag();}
	if(a&0x0F < d&0x0F){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.a=(result&0x00ff);
	cpu.setSubFlag();
	cpu.m=1; cpu.t=4;
},

//0x9E
 sbc_hl_a : function(){
	 var result=cpu. result=cpu.a-memory.readByte(getAddr(cpu.h,cpu.l));
	if(CarryFlag()){result-=1;}
	if (result < 0){cpu.setCarryFlag();}
	if(a&0x0F < d&0x0F){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.a=(result&0x00ff);
	cpu.setSubFlag();
	cpu.m=1; cpu.t=8;
},

//0x9F
 sbc_a_a : function(){
	 var result=cpu. result=cpu.a-a;
	if(CarryFlag()){result-=1;}
	if (result < 0){cpu.setCarryFlag();}
	if(a&0x0F < d&0x0F){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.a=(result&0x00ff);
	cpu.setSubFlag();
	cpu.m=1; cpu.t=4;
},

//0xA0
 and_b : function(){
	cpu.a&=cpu.b;
	if (cpu.a===0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.resetCarryFlag();
	cpu.m=1; cpu.t=4;
},

//0xA1
 and_c : function(){
	cpu.a&=cpu.c;
	if (cpu.a===0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.resetCarryFlag();
	cpu.m=1; cpu.t=4;
},

//0xA2
 and_d : function(){
	cpu.a&=cpu.d;
	if (cpu.a===0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.resetCarryFlag();
	cpu.m=1; cpu.t=4;
},

//0xA3
 and_e : function(){
	cpu.a&=cpu.e;
	if (cpu.a===0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.resetCarryFlag();
	cpu.m=1; cpu.t=4;
},

//0xA4
 and_h : function(){
	cpu.a&=cpu.h;
	if (cpu.a===0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.resetCarryFlag();
	cpu.m=1; cpu.t=4;
},

//0xA5
 and_l : function(){
	cpu.a&=cpu.l;
	if (cpu.a===0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.resetCarryFlag();
	cpu.m=1; cpu.t=4;
},

//0xA6
 and_hl : function(){
	cpu.a&=readByte(getAddr(cpu.h,cpu.l));
	if (cpu.a===0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.resetCarryFlag();
	cpu.m=1; cpu.t=8;
},

//0xA7
 and_a : function(){
	cpu.a&=cpu.a;
	if (cpu.a===0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.resetCarryFlag();
	cpu.m=1; cpu.t=4;
},

//0xA8
 xor_b : function(){
	a^=cpu.b;
	if (cpu.a===0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.resetSubFlag();
	cpu.resetHalfFlag();
	cpu.resetCarryFlag();
	cpu.m=1; cpu.t=4;
},

//0xA9
 xor_c : function(){
	a^=cpu.c;
	if (cpu.a===0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.resetSubFlag();
	cpu.resetHalfFlag();
	cpu.resetCarryFlag();
	cpu.m=1; cpu.t=4;
},

//0xAA
 xor_d : function(){
	a^=cpu.d;
	if (cpu.a===0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.resetSubFlag();
	cpu.resetHalfFlag();
	cpu.resetCarryFlag();
	cpu.m=1; cpu.t=4;
},

//0xAB
 xor_e : function(){
	a^=cpu.e;
	if (cpu.a===0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.resetSubFlag();
	cpu.resetHalfFlag();
	resetCarryFlag()
	cpu.m=1; cpu.t=4;;
},

//0xAC
 xor_h : function(){
	a^=cpu.h;
	if (cpu.a===0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.resetSubFlag();
	cpu.resetHalfFlag();
	cpu.resetCarryFlag();
	cpu.m=1; cpu.t=4;
},

//0xAD
 xor_l : function(){
	a^=cpu.l;
	if (cpu.a===0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.resetSubFlag();
	cpu.resetHalfFlag();
	cpu.resetCarryFlag();
	cpu.m=1; cpu.t=4;
},

//0xAE
 xor_hl : function(){
	a^=readByte(getAddr(cpu.h,cpu.l));
	if (cpu.a===0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.resetSubFlag();
	cpu.resetHalfFlag();
	cpu.resetCarryFlag();
	cpu.m=1; cpu.t=8;
},

//0xAF
 xor_a : function(){
	a^=cpu.a;
	if (cpu.a===0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.resetSubFlag();
	cpu.resetHalfFlag();
	cpu.resetCarryFlag();
	cpu.m=1; cpu.t=4;
},

//0xB0
 or_b : function(){
	a|=cpu.b;
	if (cpu.a===0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.resetSubFlag();
	cpu.resetHalfFlag();
	cpu.resetCarryFlag();
	cpu.m=1; cpu.t=4;
},

//0xB1
 or_c : function(){
	a|=cpu.c;
	if (cpu.a===0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.resetSubFlag();
	cpu.resetHalfFlag();
	cpu.resetCarryFlag();
	cpu.m=1; cpu.t=4;
},

//0xB2
 or_d : function(){
	a|=cpu.d;
	if (cpu.a===0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.resetSubFlag();
	cpu.resetHalfFlag();
	cpu.resetCarryFlag();
	cpu.m=1; cpu.t=4;
},

//0xB3
 or_e : function(){
	a|=cpu.e;
	if (cpu.a===0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.resetSubFlag();
	cpu.resetHalfFlag();
	cpu.resetCarryFlag();
	cpu.m=1; cpu.t=4;
},

//0xB4
 or_h : function(){
	a|=cpu.h;
	if (cpu.a===0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.resetSubFlag();
	cpu.resetHalfFlag();
	cpu.resetCarryFlag();
	cpu.m=1; cpu.t=4;
},

//0xB5
 or_l : function(){
	a|=cpu.l;
	if (cpu.a===0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.resetSubFlag();
	cpu.resetHalfFlag();
	cpu.resetCarryFlag();
	cpu.m=1; cpu.t=4;
},

//0xB6
 or_hl : function(){
	a|=readByte(getAddr(cpu.h,cpu.l));;
	if (cpu.a===0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.resetSubFlag();
	cpu.resetHalfFlag();
	cpu.resetCarryFlag();
	cpu.m=1; cpu.t=4;
},

//0xB7
 or_a : function(){
	a^=cpu.a;
	if (cpu.a===0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.resetSubFlag();
	cpu.resetHalfFlag();
	cpu.resetCarryFlag();
	cpu.m=1; cpu.t=4;
},

//0xB8
 cp_b : function(){
	 result= a-b;
	if (result < 0){cpu.setCarryFlag();}
	if(a&0x0F < b&0x0F){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.setSubFlag();
	cpu.m=1; cpu.t=4;
},
//0xB9
 cp_c : function(){
	 result= a-c;
	if (result < 0){cpu.setCarryFlag();}
	if(a&0x0F < c&0x0F){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.setSubFlag();
	cpu.m=1; cpu.t=4;
},

//0xBA
 cp_d : function(){
	 result= a-d;
	if (result < 0){cpu.setCarryFlag();}
	if(a&0x0F < d&0x0F){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.setSubFlag();
	cpu.m=1; cpu.t=4;
},

//0xBB
 cp_e : function(){
	 result= a-e;
	if (result < 0){cpu.setCarryFlag();}
	if(a&0x0F < e&0x0F){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.setSubFlag();
	cpu.m=1; cpu.t=4;
},

//0xBC
 cp_h : function(){
	 result= a-h;
	if (result < 0){cpu.setCarryFlag();}
	if(a&0x0F < h&0x0F){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.setSubFlag();
	cpu.m=1; cpu.t=4;
},

//0xBD
 cp_l : function(){
	 result= a-l;
	if (result < 0){cpu.setCarryFlag();}
	if(a&0x0F < l&0x0F){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.setSubFlag();
	cpu.m=1; cpu.t=4;
},

//0xBE
 cp_hl : function(){
	 value=readbyte(getAddr(cpu.h,cpu.l));
	 result= a-value;
	if (result < 0){cpu.setCarryFlag();}
	if(a&0x0F < value&0x0F){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.setSubFlag();
	cpu.m=1; cpu.t=4;
},

//0xBF
 cp_a : function(){
	 result= a-a;
	if (result < 0){cpu.setCarryFlag();}
	if(a&0x0F < a&0x0F){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.setSubFlag();
	cpu.m=1; cpu.t=4;
},

//0xC0
 ret_nz : function(){
	cpu.m=1;
	if (!cpu.zeroFlag()){
	pc=memory.readWord(sp);
	cpu.t=20;
	cpu.sp+=2;
	} else { 
	cpu.t=8;
	}
},

//0xC1
 pop_bc : function(){
	cpu.c=memory.readByte(cpu.sp+1);
	cpu.b=memory.readByte(cpu.sp+2);
	cpu.sp+=2;
	cpu.m=1; cpu.t=12;
},

//0xC2
 jp_nz_nn : function(){
	if(!cpu.zeroFlag()){
	pcpu.c=memory.readWord(cpu.pc+1);
	cpu.t=16; cpu.m=1;
	}else{
	cpu.t=12; cpu.m=3;
	}
},

//0xC3
 jp_nn : function(){
	pcpu.c=memory.readWord(cpu.pc+1);
	cpu.m=3; cpu.t=16;
},

//0xC4
 call_nz_nn : function(){
	cpu.m=3;
	if(!cpu.zeroFlag()){
	memory.writeWord(cpu.pc+3,sp);
	pcpu.c=memory.readWord(cpu.pc+1);
	cpu.t=24;
	}else{
	cpu.t=12;
	}
},

//0xC5
 push_bc : function(){
	memory.writeByte(b, sp);
	memory.writeByte(b,sp-1);
	sp-=2;
	cpu.m=1; cpu.t=16;
},

//0xC6
 add_a_n : function(){
	 value =readByte(cpu.pc+1);
	 var result=cpu. result=cpu.a+value;
	if (result > 255){cpu.setCarryFlag();}
	if(((a&0x0F) + (value&0x0F))&0x10){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.a=(result&0x00ff);
	cpu.resetSubFlag();
	cpu.m=1; cpu.t=4;
},

//0xC7
 rst_0 : function(){
	memory.writeWord(cpu.pc+1, sp);
	sp-=2;
	pcpu.c=0x0000;
	cpu.m=1; cpu.t=16;
},

//0xC8
 ret_z : function(){
	if(zeroFlag){
     addr=memory.readbyte(sp);
	addr << 8;
	addr+= readByte(cpu.sp+1);
	cpu.sp+=2;
	pcpu.c=cpu.addr;
	cpu.t=20; cpu.m=0;
	}else{
	cpu.t=8;
	cpu.m=1;
	}
},

//0xC9
 ret : function(){
	 addr=memory.readbyte(sp);
	addr << 8;
	addr+= readByte(cpu.sp+1);
	cpu.sp+=2;
	pcpu.c=cpu.addr;
	cpu.m=1; cpu.t=16;
},

//0xCA
 jp_z_nn : function(){
	if(cpu.zeroFlag()){
	pcpu.c=memory.readWord(cpu.pc+1);
	cpu.t=16; cpu.m=1;
	}else{
	cpu.t=12; cpu.m=3;
	}
},

//0xCB
 ext_ops : function(){
	twoByteInstructions[memory.readByte(cpu.pc+1)]();
},

//0xCC
 call_z_nn : function(){
	if(cpu.zeroFlag()){
	memory.writeWord(cpu.pc+3,sp);
	pcpu.c=memory.readWord(cpu.pc+1);
	cpu.t=24;
	cpu.m=0;
	}else{
	cpu.t=12;
	cpu.m=3;
	}
},

//0xCD
 call_nn : function(){
	memory.writeWord(cpu.pc+3,sp);
	pcpu.c=memory.readWord(cpu.pc+1);
	cpu.t=24; cpu.m=3;
},

//0xCE
 adc_a_n : function(){
	 value=memory.readByte(cpu.pc+1);
	 result= a+value;
	if(CarryFlag()){result+=1;}
	if (result & 0xff00){cpu.setCarryFlag();}
	if(((a&0x0F) + (value&0x0F))&0x10){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.a=(result&0x00ff);
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0xCF
 rst_8 : function(){
	memory.writeWord(cpu.pc+1, sp);
	sp-=2;
	pcpu.c=0x0008;
	cpu.m=1; cpu.t=16;
},

//0xD0
 ret_nc : function(){
	if (!carryFlag()){
	pcpu.c=memory.readWord(sp);
	cpu.m=0; cpu.t=20;
	cpu.sp+=2;
	}else{
	cpu.t=8;
	cpu.m=1;
	}
},

//0xD1
 pop_de : function(){
	cpu.e=memory.readByte(cpu.sp+1);
	cpu.d=memory.readByte(cpu.sp+2);
	cpu.sp+=2;
	cpu.m=1; cpu.t=12;
},

//0xD2
 jp_nc_nn : function(){
	if(!carryFlag()){
	pcpu.c=memory.readWord(cpu.pc+1);
	cpu.t=16; cpu.m=1;
	}else{
	cpu.t=12; cpu.m=3;
	}
},

//0xD3, 0XDB, 0xDD, 0xE3, 0xE4, 0xEB, 0xEC, 0xED, 0xF, 0xFC, 0xFD
 unused : function(){
	 iv = memory.readByte(cpu.pc);
	console.log("invalid opcode ", iv, "at ", pc);
},

//0xD4
call_nc_nn : function(){
	if(!carryFlag()){
	memory.writeWord(cpu.pc+3,sp);
	pcpu.c=memory.readWord(cpu.pc+1);
	cpu.t=24; cpu.m=0;
	}else{
	cpu.t=12; cpu.m=3;
	}
},

//0xD5
 push_de : function(){
	memory.writeByte(d, sp);
	memory.writeByte(e,sp-1);
	sp-=2;
	cpu.m=1; cpu.t=16;
},

//0xD6
 sub_a_n : function(){
	 value = readByte(cpu.pc+1);
	 var result=cpu. result=cpu.a-value;
	if (result < 0){cpu.setCarryFlag();}
	if(a&0x0F < value&0x0F){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.a=(result&0x00ff);
	cpu.setSubFlag();
	cpu.m=1; cpu.t=4;
	},

//0xD7
 rst_10 : function(){
	memory.writeWord(cpu.pc+1, sp);
	sp-=2;
	pcpu.c=0x0010;
	cpu.m=1; cpu.t=16;
},

//0xD8
 ret_c : function(){
	if(carryFlag){
     addr=memory.readbyte(sp);
	addr << 8;
	addr+= readByte(cpu.sp+1);
	cpu.sp+=2;
	pcpu.c=cpu.addr;
	cpu.t=20; cpu.m=0;
	}else{
	cpu.t=8; cpu.m=1;
	}
},

//0xD9
 reti : function(){
	i=true;
	 addr=memory.readbyte(sp);
	addr << 8;
	addr+= readByte(cpu.sp+1);
	cpu.sp+=2;
	pcpu.c=cpu.addr;
	cpu.m=1; cpu.t=16;
},

//0xDA
 jp_c_nn : function(){
	if(carryFlag()){
	pcpu.c=memory.readWord(cpu.pc+1);
	cpu.t=16; cpu.m=1;
	}else{
	cpu.t=12; cpu.m=3;
	}
},

//0xDB
//unused

//0xDC
 call_c_nn : function(){
	if(carryFlag()){
	memory.writeWord(cpu.pc+3,sp);
	pcpu.c=memory.readWord(cpu.pc+1);
	cpu.t=24; cpu.m=0;
	}else{
	cpu.t=12; cpu.m=3;
	}
},

//0xDD
//unused

//0xDE
 sbc_a_n : function(){
	 value=memory.readByte(cpu.pc+1);
	 var result=cpu. result=cpu.a - value;
	if(CarryFlag()){result-=1;}
	if (result < 0){cpu.setCarryFlag();}
	if(a&0x0F < value&0x0F){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.a=(result&0x00ff);
	cpu.setSubFlag();
	cpu.m=1; cpu.t=4;
},

//0xDF
 rst_18 : function(){
	memory.writeWord(cpu.pc+1, sp);
	sp-=2;
	pcpu.c=0x0018;
	cpu.m=1; cpu.t=16;
},

//0xE0
 ldh_n_a : function(){
	cpu.a=memory.readByte(cpu.pc+1);
	cpu.m=2; cpu.t=8;
	cpu.t=12;
},
	
//0xE1
 pop_hl : function(){
	cpu.l=memory.readByte(cpu.sp+1);
	cpu.h=memory.readByte(cpu.sp+2);
	cpu.sp+=2;
	cpu.m=1; cpu.t=12;
},

//0xE2
 ldh_c_a : function(){
	 addr = 0xFF00 + cpu.c;
	memory.writebye(a, addr);
	cpu.m=2; cpu.t=8;
},

//0xE3, 0xE4
//unused

//0xE5
 push_hl : function(){
	memory.writeByte(h, sp);
	memory.writeByte(l,sp-1);
	sp-=2;
	cpu.m=1; cpu.t=16;
},

//0xE6
 and_n : function(){
	value=readByte(cpu.pc+1)
	cpu.a&=value;
	if (cpu.a===0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.resetCarryFlag();
	cpu.m=2; cpu.t=8;
},

//0xE7
 rst_20 : function(){
	memory.writeWord(cpu.pc+1, sp);
	sp-=2;
	pcpu.c=0x0020;
	cpu.m=1; cpu.t=16;
},

//0xE8
 add_sp_d : function(){
	value = readByte(cpu.pc+1);
	cpu.sp+=value;
	cpu.resetZeroFlag();
	cpu.resetSubFlag();
	if(((sp&0x0F) + (value&0x0F))&0x10){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (sp>65535){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.m=2; cpu.t=16;
},

//0xE9
 jp_hl : function(){
	pcpu.c=memory.readByte(getAddr(cpu.h,cpu.l));
	cpu.m=1; cpu.t=4;
},

//0xEA
 ld_nn_a : function(){
	writeByte(a, readWord(cpu.pc+1));
	cpu.m=3; cpu.t=16;
},

//0xEE
 xor_n : function(){
	 value=readByte(cpu.pc+1);
	a^=value;
	if (cpu.a===0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.resetSubFlag();
	cpu.resetHalfFlag();
	cpu.resetCarryFlag();
	cpu.m=2; cpu.t=8;
},

//0xEF
 rst_28 : function(){
	memory.writeWord(cpu.pc+1, sp);
	sp-=2;
	pcpu.c=0x0028;
	cpu.m=1; cpu.t=16;
},

//0xF0
 ldh_a_n : function(){
	 addr=0xFF00+memory.readByte(cpu.pc+1);
	cpu.a=memory.readByte(addr);
	cpu.m=2; cpu.t=12;
	},

//0xF1
 pop_af : function(){
	f=memory.readByte(cpu.sp+1);
	cpu.a=memory.readByte(cpu.sp+2);
	cpu.sp+=2;
	cpu.m=1; cpu.t=12;	
},
	
//0xF2
 ld_a_c : function(){
	 addr=0xFF00+c;
	cpu.a=memory.readByte(addr);
	cpu.m=1; cpu.t=8;
},

//0xF3
 di : function(){
	i=false;
	cpu.m=1; cpu.t=4;
},

//0xF5
 push_af : function(){
	memory.writeByte(a, sp);
	memory.writeByte(f,sp-1);
	sp-=2;
	cpu.m=1; cpu.t=16;
},

//0xF7
 or_n : function(){
	a|=memory.readByte(cpu.pc+1);
	if (cpu.a===0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.resetSubFlag();
	cpu.resetHalfFlag();
	cpu.resetCarryFlag();
	cpu.m=1; cpu.t=4;
},

//0xF8
 rst_30 : function(){
	memory.writeWord(cpu.pc+1, sp);
	sp-=2;
	pcpu.c=0x0030;
	cpu.m=1; cpu.t=16;
},

//0xF9
 ldhl_sp_d : function(){
	var result=cpu. value = cpu.sp+memory.readByte(cpu.pc+1);
	cpu.h=(value>>8)&0x00FF;
	cpu.l=value&0x00FF;
	if (value>65535){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	if(((sp&0x0F00) + (value&0x0F00))&0x1000){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	cpu.resetZeroFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=12;
},

//0xFA
 ld_sp_hl : function(){
	sp=cpu.h<<8;
	cpu.sp+=cpu.l;
	cpu.m=1; cpu.t=8;
},
	
//0xFB
 ld_a_nn : function(){
	cpu.a=readWord(cpu.pc+1);
	cpu.m=3; cpu.t=16;
},

//0xFC
 ei: function(){
	i=true;
	cpu.m=1; cpu.t=4;
},

//0xFE
 cp_n : function(){
	 value=memory.readByte(cpu.pc+1);
	 result= a-value;
	if (result < 0){cpu.setCarryFlag();}
	if(a&0x0F < value&0x0F){cpu.setHalfFlag();}else {cpu.resetHalfFlag();}
	if (result === 0){cpu.setZeroFlag();}else{cpu.resetZeroFlag();}
	cpu.setSubFlag();
	cpu.m=2; cpu.t=8;
},

//0xFF
 rst_38 : function(){
	memory.writeWord(cpu.pc+1, sp);
	sp-=2;
	pcpu.c=0x0038;
	cpu.m=1; cpu.t=16;
},

//---------------------//
//-2 byte Instructions-//
//---------------------//

//0x00
 rlc_b : function(){
	var result=cpu. carrybit= (cpu.b>>7)&0x01;
	if (carrybit === 1){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.b<<1;
	cpu.b+=carrybit;
	if (cpu.b===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x01
 rlc_c : function(){
	var result=cpu. carrybit= (cpu.c>>7)&0x01;
	if (carrybit === 1){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.c<<1;
	cpu.c+=carrybit;
	if (cpu.c===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x02
 rlc_d : function(){
	var result=cpu. carrybit= (cpu.d>>7)&0x01;
	if (carrybit === 1){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.d<<1;
	cpu.d+=carrybit;
	if (cpu.d===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x03
 rlc_e : function(){
	var result=cpu. carrybit= (cpu.e>>7)&0x01;
	if (carrybit === 1){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.e<<1;
	cpu.e+=carrybit;
	if (cpu.e===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x04
 rlc_h : function(){
	var result=cpu. carrybit= (cpu.h>>7)&0x01;
	if (carrybit === 1){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.h<<1;
	cpu.h+=carrybit;
	if (cpu.h===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x05
 rlc_l : function(){
	var result=cpu. carrybit= (cpu.l>>7)&0x01;
	if (carrybit===1){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.l<<1;
	cpu.l+=carrybit;
	if (cpu.l===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x06
 rlc_hl : function(){
	var result=cpu. value=memory.readByte(getAddr(cpu.h,cpu.l));
	var result=cpu. carrybit= (value>>7)&0x01;
	if (carrybit === 1){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	value<<1;
	value+=carrybit;
	memory.writeByte(value,getAddr(cpu.h,cpu.l));
	if (value===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=16;
},

//0x07
 rlc_a : function(){
	var result=cpu. carrybit= (cpu.a>>7)&0x01;
	if (carrybit === 1){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.a<<1;
	cpu.a+=carrybit;
	if (cpu.a===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x08
 rrc_b : function(){
	var carrybit = (cpu.b<<7)&0x80;
	if (carrybit){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.b>>1;
	cpu.b+=carrybit;
	if(cpu.b===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetSubFlag();
	cpu.resetHalfFlag();
	cpu.m=2; cpu.t=8;
},		

//0x09
 rrc_c : function(){
	var carrybit = (cpu.c<<7)&0x80;
	if (carrybit){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.c>>1;
	cpu.c+=carrybit;
	if(cpu.c===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetSubFlag();
	cpu.resetHalfFlag();
	cpu.m=2; cpu.t=8;
},		

//0x0A
 rrc_d : function(){
	var carrybit = (cpu.d<<7)&0x80;
	if (carrybit){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.d>>1;
	cpu.d+=carrybit;
	if(cpu.d===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetSubFlag();
	cpu.resetHalfFlag();
	cpu.m=2; cpu.t=8;
},	

//0x0B	
 rrc_e : function(){
	var carrybit = (cpu.e<<7)&0x80;
	if (carrybit){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.e>>1;
	cpu.e+=carrybit;
	if(cpu.e===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetSubFlag();
	cpu.resetHalfFlag();
	cpu.m=2; cpu.t=8;
},		


//0x0C
 rrc_h : function(){
	var carrybit = (cpu.h<<7)&0x80;
	if (carrybit){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.h>>1;
	cpu.h+=carrybit;
	if(cpu.h===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetSubFlag();
	cpu.resetHalfFlag();
	cpu.m=2; cpu.t=8;
},		

//0x0D
 rrc_l : function(){
	var carrybit = (cpu.l<<7)&0x80;
	if (carrybit){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.l>>1;
	cpu.l+=carrybit;
	if(cpu.l===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetSubFlag();
	cpu.resetHalfFlag();
	cpu.m=2; cpu.t=8;
},		

//0x0E
 rrc_hl : function(){
	var result=cpu. value=memory.readByte(getAddr(cpu.h,cpu.l));
	carrybit = (value<<7)&0x80;
	if (carrybit){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	value>>1;
	value+=carrybit;
	memory.writeByte(value, getAddr(cpu.h,cpu.l));
	if(cpu.b===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetSubFlag();
	cpu.resetHalfFlag();
	cpu.m=2; cpu.t=16;
},		

//0x0F
 rrc_a : function(){
	var carrybit = (cpu.a<<7)&0x80;
	if (carrybit){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.a>>1;
	cpu.a+=carrybit;
	if(cpu.a===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetSubFlag();
	cpu.resetHalfFlag();
	cpu.m=2; cpu.t=8;
},		

//0x10
 rl_b : function(){
	var result=cpu. carry = carryFlag()?1:0;
	if (b&0x80===0x80){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.b<<1;
	cpu.b+=carry;
	cpu.b&=0xFF;
	if(cpu.b===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x11
 rl_c : function(){
	var result=cpu. carry = carryFlag()?1:0;
	if (c&0x80===0x80){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.c<<1;
	cpu.c+=carry;
	cpu.c&=0xFF;
	if(cpu.c===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x12
 rl_d : function(){
	var result=cpu. carry = carryFlag()?1:0;
	if (d&0x80===0x80){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.d<<1;
	cpu.d+=carry;
	cpu.d&=0xFF;
	if(cpu.d===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x13
 rl_e : function(){
	var result=cpu. carry = carryFlag()?1:0;
	if (e&0x80===0x80){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.e<<1;
	cpu.e+=carry;
	cpu.e&=0xFF;
	if(cpu.e===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x14
 rl_h : function(){
	var result=cpu. carry = carryFlag()?1:0;
	if (h&0x80===0x80){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.h<<1;
	cpu.h+=carry;
	cpu.h&=0xFF;
	if(cpu.h===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x15
 rl_l : function(){
	var result=cpu. carry = carryFlag()?1:0;
	if (l&0x80===0x80){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.l<<1;
	cpu.l+=carry;
	cpu.l&=0xFF;
	if(cpu.l===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x16
 rl_hl : function(){
	 value=memory.readByte(getAddr(cpu.h,cpu.l));
	 carry = carryFlag()?1:0;
	if (value&0x80===0x80){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	value<<1;
	value+=carry;
	value&=0xFF;
	memory.writeByte(value, getAddr(cpu.h,cpu.l));
	if(value===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=16;
},

//0x17
 rl_a : function(){
	 carry = carryFlag()?1:0;
	if (a&0x80===0x80){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.a<<1;
	cpu.a+=carry;
	cpu.a&=0xFF;
	if(cpu.a===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x18
 rr_b : function(){
	 carry = carryFlag()?0x80:0;
	if (b&0x01){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.b>>1;
	cpu.b+=carry;
	cpu.b&=0xFF;
	if(cpu.a===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x19
 rr_c : function(){
	 carry = carryFlag()?0x80:0;
	if (c&0x01){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.c>>1;
	cpu.c+=carry;
	cpu.c&=0xFF;
	if(cpu.c===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x1A
 rr_d : function(){
	 carry = carryFlag()?0x80:0;
	if (d&0x01){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.d>>1;
	cpu.d+=carry;
	cpu.d&=0xFF;
	if(cpu.d===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},


//0x1B
 rr_e : function(){
	 carry = carryFlag()?0x80:0;
	if (c&0x01){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.e>>1;
	cpu.e+=carry;
	cpu.e&=0xFF;
	if(cpu.e===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x1C
 rr_h : function(){
	 carry = carryFlag()?0x80:0;
	if (h&0x01){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.h>>1;
	cpu.c+=carry;
	cpu.c&=0xFF;
	if(cpu.c===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x1D
 rr_l : function(){
	 carry = carryFlag()?0x80:0;
	if (l&0x01){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.l>>1;
	cpu.l+=carry;
	cpu.l&=0xFF;
	if(cpu.l===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x1E
 rr_hl : function(){
	 value=memory.readByte(getAddr(cpu.h,cpu.l));
	 carry = carryFlag()?0x80:0;
	if (value&0x01){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	value>>1;
	value+=carry;
	value&=0xFF;
	memory.writeByte(value, getAddr(cpu.h,cpu.l));
	if(cpu.l===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=16;
},

//0x1F
 rr_a : function(){
	 carry = carryFlag()?0x80:0;
	if (a&0x01){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.a>>1;
	cpu.a+=carry;
	cpu.a&=0xFF;
	if(cpu.a===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8; 
},

//0x20
 sla_b : function(){
	if(b&0x80){setCarryBit();} else {resetCarryBit();}
	cpu.b<<1;
	cpu.b&=0xFF;
	if(cpu.b===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8; 
},

//0x21
 sla_c : function(){
	if(c&0x80){setCarryBit();} else {resetCarryBit();}
	cpu.c<<1;
	cpu.c&=0xFF;
	if(cpu.c===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x22
 sla_d : function(){
	if(d&0x80){setCarryBit();} else {resetCarryBit();}
	cpu.d<<1;
	cpu.d&=0xFF;
	if(cpu.d===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x23
 sla_e : function(){
	if(e&0x80){setCarryBit();} else {resetCarryBit();}
	cpu.e<<1;
	cpu.e&=0xFF;
	if(cpu.e===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x24
 sla_h : function(){
	if(e&0x80){setCarryBit();} else {resetCarryBit();}
	cpu.h<<1;
	cpu.h&=0xFF;
	if(cpu.h===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x25
 sla_l : function(){
	if(h&0x80){setCarryBit();} else {resetCarryBit();}
	cpu.l<<1;
	cpu.l&=0xFF;
	if(cpu.l===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x26
 sla_hl : function(){
	 value=memory.readByte(getAddr(cpu.h,cpu.l));
	if(value&0x80){setCarryBit();} else {resetCarryBit();}
	value<<1;
	value&=0xFF;
	memory.writeByte(value, getAddr(cpu.h,cpu.l));
	if(value===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=16;
},

//0x27
 sla_a : function(){
	if(a&0x80){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.a<<1;
	cpu.a&=0xFF;
	if(cpu.a===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x28
 sra_b : function(){
	if (b&0x01){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	 mscpu.b=(b&0x80);
	cpu.b>>1;
	b|=msb;
	if(cpu.b===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x29
 sra_c : function(){
	if (c&0x01){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	 mscpu.b=(c&0x80);
	cpu.c>>1;
	c|=msb;
	if(cpu.c===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x2A
 sra_d : function(){
	if (d&0x01){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	 mscpu.b=(d&0x80);
	cpu.d>>1;
	d|=msb;
	if(cpu.d===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x2B
 sra_e : function(){
	if (e&0x01){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	 mscpu.b=(e&0x80);
	cpu.e>>1;
	e|=msb;
	if(cpu.e===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x2C
 sra_h : function(){
	if (h&0x01){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	 mscpu.b=(h&0x80);
	cpu.h>>1;
	h|=msb;
	if(cpu.h===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x2D
 sra_l : function(){
	if (l&0x01){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	 mscpu.b=(l&0x80);
	cpu.l>>1;
	l|=msb;
	if(cpu.l===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x2E
 sra_hl : function(){
	 value=memory.readByte(getAddr(cpu.h,cpu.l));
	if (value&0x01){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	 mscpu.b=(value&0x80);
	value>>1;
	value|=msb;
	memory.writeByte(value, getAddr(cpu.h,cpu.l));
	if(value===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=16;
},

//0x2F
 sra_a : function(){
	if (a&0x01){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	 mscpu.b=(a&0x80);
	cpu.a>>1;
	a|=msb;
	if(cpu.a===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x30
 swap_b : function(){
	if (cpu.b===0){cpu.setZeroFlag();}
	else {
	 temp = b&0x0F;
	cpu.b>>4;
	temp<<4;
	cpu.b&=temp;
	cpu.resetZeroFlag();
	}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.resetCarryFlag();
	cpu.m=2; cpu.t=8;
},

//0x31
 swap_c : function(){
	if (cpu.c===0){cpu.setZeroFlag();}
	else {
	 temp = c&0x0F;
	cpu.c>>4;
	temp<<4;
	cpu.c&=temp;
	cpu.resetZeroFlag();
	}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.resetCarryFlag();
	cpu.m=2; cpu.t=8;
},

//0x32
 swap_d : function(){
	if (cpu.d===0){cpu.setZeroFlag();}
	else {
	 temp = d&0x0F;
	cpu.d>>4;
	temp<<4;
	cpu.d&=temp;
	cpu.resetZeroFlag();
	}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.resetCarryFlag();
	cpu.m=2; cpu.t=8;
},

//0x33
 swap_e : function(){
	if (cpu.e===0){cpu.setZeroFlag();}
	else {
	 temp = e&0x0F;
	cpu.e>>4;
	temp<<4;
	cpu.e&=temp;
	cpu.resetZeroFlag();
	}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.resetCarryFlag();
	cpu.m=2; cpu.t=8;
},

//0x34
 swap_h : function(){
	if (cpu.h===0){cpu.setZeroFlag();}
	else {
	 temp = h&0x0F;
	cpu.h>>4;
	temp<<4;
	cpu.h&=temp;
	cpu.resetZeroFlag();
	}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.resetCarryFlag();
	cpu.m=2; cpu.t=8;
},

//0x35
 swap_l : function(){
	if (cpu.l===0){cpu.setZeroFlag();}
	else {
	 temp = l&0x0F;
	cpu.l>>4;
	temp<<4;
	cpu.l&=temp;
	cpu.resetZeroFlag();
	}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.resetCarryFlag();
	cpu.m=2; cpu.t=8;
},

//0x36
 swap_hl : function(){
	 value=memory.readByte(cpu.pc+1);
	if (value===0){cpu.setZeroFlag();}
	else {
	 temp = value&0x0F;
	value>>4;
	temp<<4;
	value&=temp;
	cpu.resetZeroFlag();
	memory.writeByte(value, getAddr(cpu.h,cpu.l));
	}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.resetCarryFlag();
	cpu.m=2; cpu.t=16;
},

//0x37
 swap_a : function(){
	if (cpu.a===0){cpu.setZeroFlag();}
	else {
	 temp = a&0x0F;
	cpu.a>>4;
	temp<<4;
	cpu.a&=temp;
	cpu.resetZeroFlag();
	}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.resetCarryFlag();
	cpu.m=2; cpu.t=8;
},

//0x38
 srl_b : function(){
	if (b&0x01){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.b>>1;
	if (cpu.b===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x39
 srl_c : function(){
	if (c&0x01){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.c>>1;
	if (cpu.c===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x3A
 srl_d : function(){
	if (d&0x01){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.d>>1;
	if (cpu.d===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x3B
 srl_e : function(){
	if (e&0x01){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.e>>1;
	if (cpu.e===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x3C
 srl_h : function(){
	if (h&0x01){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.h>>1;
	if (cpu.h===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x3D
 srl_l : function(){
	if (l&0x01){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.l>>1;
	if (cpu.l===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x3E
 srl_hl : function(){
	 value=memory.readByte(cpu.pc+1);
	if (value&0x01){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	value>>1;
	memory.writeByte(value, getAddr(cpu.h,cpu.l));
	if (value===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=16;
},

//0x3F
 srl_a : function(){
	if (a&0x01){cpu.setCarryFlag();} else {cpu.resetCarryFlag();}
	cpu.a>>1;
	if (cpu.a===0){cpu.setZeroFlag();} else {cpu.resetZeroFlag();}
	cpu.resetHalfFlag();
	cpu.resetSubFlag();
	cpu.m=2; cpu.t=8;
},

//0x40
 bit_0_b : function(){
	if(b&0x01){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x41
 bit_0_c : function(){
	if(c&0x01){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x42
 bit_0_d : function(){
	if(d&0x01){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x43
 bit_0_e : function(){
	if(e&0x01){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x44
 bit_0_h : function() {
	if(h&0x01){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x45
 bit_0_l : function() {
	if(l&0x01){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x46
 bit_0_hl : function() {
	 value=memory.readByte(getAddr(cpu.h,cpu.l));
	if(value&0x01){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=16;
}, 

//0x47
 bit_0_a : function() {
	if(a&0x01){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x48
 bit_1_b : function() {
	if(b&0x02){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x49
 bit_1_c : function() {
	if(c&0x02){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x4A
 bit_1_d : function() {
	if(d&0x02){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x4B
 bit_1_e : function() {
	if(e&0x02){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x4C
 bit_1_h : function() {
	if(h&0x02){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x4D
 bit_1_l : function() {
	if(l&0x02){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x4E
 bit_1_hl : function() {
	 value=memory.readByte(getAddr(cpu.h,cpu.l));
	if(value&0x02){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=16;
}, 

//0x4F
 bit_1_a : function() {
	if(a&0x02){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x50
 bit_2_b : function() {
	if(b&0x04){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x51
 bit_2_c : function() {
	if(c&0x04){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x52
 bit_2_d : function() {
	if(d&0x04){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x53
 bit_2_e : function() {
	if(e&0x04){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x54
 bit_2_h : function() {
	if(h&0x04){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x55
 bit_2_l : function() {
	if(l&0x04){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x55
 bit_2_hl : function() {
	 value=memory.readByte(getAddr(cpu.h,cpu.l));
	if(value&0x04){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=16;
}, 

//0x57
 bit_2_a : function() {
	if(a&0x04){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x58
 bit_3_b : function() {
	if(b&0x08){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x59
 bit_3_c : function() {
	if(c&0x08){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x5A
 bit_3_d : function() {
	if(d&0x08){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x5B
 bit_3_e : function() {
	if(e&0x08){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x5C
 bit_3_h : function() {
	if(h&0x08){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x5D
 bit_3_l : function() {
	if(l&0x08){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x5E
 bit_3_hl : function() {
	 value=memory.readByte(getAddr(cpu.h,cpu.l));
	if(value&0x08){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=16;
}, 

//0x5F
 bit_3_a : function() {
	if(a&0x08){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x60
 bit_4_b : function() {
	if(b&0x10){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x61
 bit_4_c : function() {
	if(c&0x10){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x62
 bit_4_d : function() {
	if(d&0x10){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x63
 bit_4_e : function() {
	if(e&0x10){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x64
 bit_4_h : function() {
	if(h&0x10){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x65
 bit_4_l : function() {
	if(l&0x10){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x66
 bit_4_hl : function() {
	 value=memory.readByte(getAddr(cpu.h,cpu.l));
	if(value&0x10){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=16;
}, 


//0x67
 bit_4_a : function() {
	if(a&0x10){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x68
 bit_5_b : function() {
	if(b&0x20){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x69
 bit_5_c : function() {
	if(c&0x20){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x6A
 bit_5_d : function() {
	if(d&0x20){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x6B
 bit_5_e : function() {
	if(e&0x20){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x6C
 bit_5_h : function() {
	if(h&0x20){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x6D
 bit_5_l : function() {
	if(l&0x20){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x6E
 bit_5_hl : function() {
	 value=memory.readByte(getAddr(cpu.h,cpu.l));
	if(value&0x20){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=16;
}, 

//0x6F
 bit_5_a : function() {
	if(a&0x20){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x70
 bit_6_b : function() {
	if(b&0x40){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x71
 bit_6_c : function() {
	if(c&0x40){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x72
 bit_6_d : function() {
	if(d&0x40){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x73
 bit_6_e : function() {
	if(e&0x40){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x74
 bit_6_h : function() {
	if(h&0x40){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x75
 bit_6_l : function() {
	if(l&0x40){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x76
 bit_6_hl : function() {
	 value=memory.readByte(getAddr(cpu.h,cpu.l));
	if(value&0x40){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=16;
}, 

//0x77
 bit_6_a : function() {
	if(a&0x40){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x78
 bit_7_b : function() {
	if(b&0x80){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x79
 bit_7_c : function() {
	if(c&0x80){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x7A
 bit_7_d : function() {
	if(d&0x80){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x7B
 bit_7_e : function() {
	if(e&0x80){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x7C
 bit_7_h : function() {
	if(h&0x80){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x7D
 bit_4_l : function() {
	if(l&0x80){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x7E
 bit_7_hl : function() {
	 value=memory.readByte(getAddr(cpu.h,cpu.l));
	if(value&0x80){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=16;
}, 

//0x7F
 bit_7_a : function() {
	if(a&0x80){cpu.resetZeroFlag();} else {cpu.setZeroFlag();}
	cpu.resetSubFlag();
	cpu.setHalfFlag();
	cpu.m=2; cpu.t=8;
}, 

//0x80
 res_0_b : function(){
	cpu.b&=0xFE;
	cpu.m=2; cpu.t=8;
},

//0x81
 res_0_c : function(){
	cpu.c&=0xFE;
	cpu.m=2; cpu.t=8;
},

//0x82
 res_0_d : function(){
	cpu.d&=0xFE;
	cpu.m=2; cpu.t=8;
},

//0x83
 res_0_e : function(){
	cpu.e&=0xFE;
	cpu.m=2; cpu.t=8;
},

//0x84
 res_0_h : function(){
	cpu.h&=0xFE;
	cpu.m=2; cpu.t=8;
},

//0x85
 res_0_l : function(){
	cpu.l&=0xFE;
	cpu.m=2; cpu.t=8;
},

//0x86
 res_0_hl : function(){
	 value=memory.readByte(getAddr(cpu.h,cpu.l));
	value&=0xFE;
	memory.writeByte(value, getAddr(cpu.h,cpu.l));
	cpu.m=2; cpu.t=8;
},

//0x87
 res_0_a : function(){
	cpu.a&=0xFE;
	cpu.m=2; cpu.t=8;
},

//0x88
 res_1_b : function(){
	cpu.b&=0xFD;
	cpu.m=2; cpu.t=8;
},

//0x89
 res_1_c : function(){
	cpu.c&=0xFD;
	cpu.m=2; cpu.t=8;
},

//0x8A
 res_1_d : function(){
	cpu.d&=0xFD;
	cpu.m=2; cpu.t=8;
},

//0x8B
 res_1_e : function(){
	cpu.e&=0xFD;
	cpu.m=2; cpu.t=8;
},

//0x8C
 res_1_h : function(){
	cpu.h&=0xFD;
	cpu.m=2; cpu.t=8;
},

//0x8D
 res_1_l : function(){
	cpu.l&=0xFD;
	cpu.m=2; cpu.t=8;
},

//0x8E
 res_1_hl : function(){
	 value=memory.readByte(getAddr(cpu.h,cpu.l));
	value&=0xFD;
	memory.writeByte(value, getAddr(cpu.h,cpu.l));
	cpu.m=2; cpu.t=8;
},

//0x8F
 res_1_a : function(){
	cpu.a&=0xFD;
	cpu.m=2; cpu.t=8;
},

//0x90
 res_2_b : function(){
	cpu.b&=0xFB;
	cpu.m=2; cpu.t=8;
},

//0x91
 res_2_c : function(){
	cpu.c&=0xFB;
	cpu.m=2; cpu.t=8;
},

//0x92
 res_2_d : function(){
	cpu.d&=0xFB;
	cpu.m=2; cpu.t=8;
},

//0x93
 res_2_e : function(){
	cpu.e&=0xFB;
	cpu.m=2; cpu.t=8;
},

//0x94
 res_2_h : function(){
	cpu.h&=0xFB;
	cpu.m=2; cpu.t=8;
},

//0x95
 res_2_l : function(){
	cpu.l&=0xFB;
	cpu.m=2; cpu.t=8;
},

//0x96
 res_2_hl : function(){
	 value=memory.readByte(getAddr(cpu.h,cpu.l));
	value&=0xFB;
	memory.writeByte(value, getAddr(cpu.h,cpu.l));
	cpu.m=2; cpu.t=8;
},

//0x97
 res_2_a : function(){
	cpu.a&=0xFB;
	cpu.m=2; cpu.t=8;
},

//0x98
 res_3_b : function(){
	cpu.b&=0xF7;
	cpu.m=2; cpu.t=8;
},

//0x99
 res_3_c : function(){
	cpu.c&=0xF7;
	cpu.m=2; cpu.t=8;
},

//0x9A
 res_3_d : function(){
	cpu.d&=0xF7;
	cpu.m=2; cpu.t=8;
},

//0x9B
 res_3_e : function(){
	cpu.e&=0xF7;
	cpu.m=2; cpu.t=8;
},

//0x9C
 res_3_h : function(){
	cpu.h&=0xF7;
	cpu.m=2; cpu.t=8;
},

//0x9D
 res_3_l : function(){
	cpu.l&=0xF7;
	cpu.m=2; cpu.t=8;
},

//0x9E
 res_3_hl : function(){
	 value=memory.readByte(getAddr(cpu.h,cpu.l));
	value&=0xF7;
	memory.writeByte(value, getAddr(cpu.h,cpu.l));
	cpu.m=2; cpu.t=8;
},

//0x9F
 res_3_a : function(){
	cpu.a&=0xF7;
	cpu.m=2; cpu.t=8;
},

//0xA0
 res_4_b : function(){
	cpu.b&=0xEF;
	cpu.m=2; cpu.t=8;
},

//0xA1
 res_4_c : function(){
	cpu.c&=0xEF;
	cpu.m=2; cpu.t=8;
},

//0xA2
 res_4_d : function(){
	cpu.d&=0xEF;
	cpu.m=2; cpu.t=8;
},

//0xA3
 res_4_e : function(){
	cpu.e&=0xEF;
	cpu.m=2; cpu.t=8;
},

//0xA4
 res_4_h : function(){
	cpu.h&=0xEF;
	cpu.m=2; cpu.t=8;
},

//0xA5
 res_4_l : function(){
	cpu.l&=0xEF;
	cpu.m=2; cpu.t=8;
},

//0xA6
 res_4_hl : function(){
	 value=memory.readByte(getAddr(cpu.h,cpu.l));
	value&=0xEF;
	memory.writeByte(value, getAddr(cpu.h,cpu.l));
	cpu.m=2; cpu.t=8;
},

//0xA7
 res_4_a : function(){
	cpu.a&=0xEF;
	cpu.m=2; cpu.t=8;
},

//0xA8
 res_5_b : function(){
	cpu.b&=0xDF;
	cpu.m=2; cpu.t=8;
},

//0xA9
 res_5_c : function(){
	cpu.c&=0xDF;
	cpu.m=2; cpu.t=8;
},

//0xAA
 res_5_d : function(){
	cpu.d&=0xDF;
	cpu.m=2; cpu.t=8;
},

//0xAB
 res_5_e : function(){
	cpu.e&=0xDF;
	cpu.m=2; cpu.t=8;
},

//0xAC
 res_5_h : function(){
	cpu.h&=0xDF;
	cpu.m=2; cpu.t=8;
},

//0xAD
 res_5_l : function(){
	cpu.l&=0xDF;
	cpu.m=2; cpu.t=8;
},

//0xAE
 res_5_hl : function(){
	 value=memory.readByte(getAddr(cpu.h,cpu.l));
	value&=0xDF;
	memory.writeByte(value, getAddr(cpu.h,cpu.l));
	cpu.m=2; cpu.t=8;
},

//0xAF
 res_5_a : function(){
	cpu.a&=0xDF;
	cpu.m=2; cpu.t=8;
},

//0xB0
 res_6_b : function(){
	cpu.b&=0xBF;
	cpu.m=2; cpu.t=8;
},

//0xB1
 res_6_c : function(){
	cpu.c&=0xBF;
	cpu.m=2; cpu.t=8;
},

//0xB2
 res_6_d : function(){
	cpu.d&=0xBF;
	cpu.m=2; cpu.t=8;
},

//0xB3
 res_6_e : function(){
	cpu.e&=0xBF;
	cpu.m=2; cpu.t=8;
},

//0xB4
 res_6_h : function(){
	cpu.h&=0xBF;
	cpu.m=2; cpu.t=8;
},

//0xB5
 res_6_l : function(){
	cpu.l&=0xBF;
	cpu.m=2; cpu.t=8;
},

//0xB6
 res_6_hl : function(){
	 value=memory.readByte(getAddr(cpu.h,cpu.l));
	value&=0xBF;
	memory.writeByte(value, getAddr(cpu.h,cpu.l));
	cpu.m=2; cpu.t=8;
},

//0xB7
 res_6_a : function(){
	cpu.a&=0xBF;
	cpu.m=2; cpu.t=8;
},

//0xB8
 res_7_b : function(){
	cpu.b&=0x7F;
	cpu.m=2; cpu.t=8;
},

//0xB9
 res_7_c : function(){
	cpu.c&=0x7F;
	cpu.m=2; cpu.t=8;
},

//0xBA
 res_7_d : function(){
	cpu.d&=0x7F;
	cpu.m=2; cpu.t=8;
},

//0xBB
 res_7_e : function(){
	cpu.e&=0x7F;
	cpu.m=2; cpu.t=8;
},

//0xBC
 res_7_h : function(){
	cpu.h&=0x7F;
	cpu.m=2; cpu.t=8;
},

//0xBD
 res_7_l : function(){
	cpu.l&=0x7F;
	cpu.m=2; cpu.t=8;
},

//0xBE
 res_7_hl : function(){
	 value=memory.readByte(getAddr(cpu.h,cpu.l));
	value&=0x7F;
	memory.writeByte(value, getAddr(cpu.h,cpu.l));
	cpu.m=2; cpu.t=8;
},

//0xBF
 res_7_a : function(){
	cpu.a&=0x7F;
	cpu.m=2; cpu.t=8;
},

//0xC0
 set_0_b : function(){
	b|=0x01;
	cpu.m=2; cpu.t=8;
},

//0xC1
 res_0_c : function(){
	c|=0x01;
	cpu.m=2; cpu.t=8;
},

//0xC2
 res_0_d : function(){
	d|=0x01;
	cpu.m=2; cpu.t=8;
},

//0xC3
 res_0_e : function(){
	e|=0x01;
	cpu.m=2; cpu.t=8;
},

//0xC4
 res_0_h : function(){
	h|=0x01;
	cpu.m=2; cpu.t=8;
},

//0xC5
 res_0_l : function(){
	l|=0x01;
	cpu.m=2; cpu.t=8;
},

//0xC6
 res_0_hl : function(){
	 value=memory.readByte(getAddr(cpu.h,cpu.l));
	value|=0x01;
	memory.writeByte(value, getAddr(cpu.h,cpu.l));
	cpu.m=2; cpu.t=8;
},

//0xC7
 res_0_a : function(){
	a|=0x01;
	cpu.m=2; cpu.t=8;
},

//0xC8
 res_1_b : function(){
	b|=0x02;
	cpu.m=2; cpu.t=8;
},

//0xC9
 res_1_c : function(){
	c|=0x02;
	cpu.m=2; cpu.t=8;
},

//0xCA
 res_1_d : function(){
	d|=0x02;
	cpu.m=2; cpu.t=8;
},

//0xCB
 res_1_e : function(){
	e|=0x02;
	cpu.m=2; cpu.t=8;
},

//0xCC
 res_1_h : function(){
	h|=0x02;
	cpu.m=2; cpu.t=8;
},

//0xCD
 res_1_l : function(){
	l|=0x02;
	cpu.m=2; cpu.t=8;
},

//0xCE
 res_1_hl : function(){
	 value=memory.readByte(getAddr(cpu.h,cpu.l));
	value|=0x02;
	memory.writeByte(value, getAddr(cpu.h,cpu.l));
	cpu.m=2; cpu.t=8;
},

//0xCF
 res_1_a : function(){
	a|=0x02;
	cpu.m=2; cpu.t=8;
},

//0xD0
 res_2_b : function(){
	b|=04;
	cpu.m=2; cpu.t=8;
},

//0xD1
 res_2_c : function(){
	c|=04;
	cpu.m=2; cpu.t=8;
},

//0xD2
 res_2_d : function(){
	d|=04;
	cpu.m=2; cpu.t=8;
},

//0xD3
 res_2_e : function(){
	e|=04;
	cpu.m=2; cpu.t=8;
},

//0xD4
 res_2_h : function(){
	h|=04;
	cpu.m=2; cpu.t=8;
},

//0xD5
 res_2_l : function(){
	l|=04;
	cpu.m=2; cpu.t=8;
},

//0xD6
 res_2_hl : function(){
	 value=memory.readByte(getAddr(cpu.h,cpu.l));
	value|=04;
	memory.writeByte(value, getAddr(cpu.h,cpu.l));
	cpu.m=2; cpu.t=8;
},

//0xD7
 res_2_a : function(){
	a|=04;
	cpu.m=2; cpu.t=8;
},

//0xD8
 res_3_b : function(){
	b|=0x08;
	cpu.m=2; cpu.t=8;
},

//0xD9
 res_3_c : function(){
	c|=0x08;
	cpu.m=2; cpu.t=8;
},

//0xDA
 res_3_d : function(){
	d|=0x08;
	cpu.m=2; cpu.t=8;
},

//0xDB
 res_3_e : function(){
	e|=0x08;
	cpu.m=2; cpu.t=8;
},

//0xDC
 res_3_h : function(){
	h|=0x08;
	cpu.m=2; cpu.t=8;
},

//0xDD
 res_3_l : function(){
	l|=0x08;
	cpu.m=2; cpu.t=8;
},

//0xDE
 res_3_hl : function(){
	 value=memory.readByte(getAddr(cpu.h,cpu.l));
	value|=0x08;
	memory.writeByte(value, getAddr(cpu.h,cpu.l));
	cpu.m=2; cpu.t=8;
},

//0xDF
 res_3_a : function(){
	a|=0x08;
	cpu.m=2; cpu.t=8;
},

//0xE0
 res_4_b : function(){
	b|=0x10;
	cpu.m=2; cpu.t=8;
},

//0xE1
 res_4_c : function(){
	c|=0x10;
	cpu.m=2; cpu.t=8;
},

//0xE2
 res_4_d : function(){
	d|=0x10;
	cpu.m=2; cpu.t=8;
},

//0xE3
 res_4_e : function(){
	e|=0x10;
	cpu.m=2; cpu.t=8;
},

//0xE4
 res_4_h : function(){
	h|=0x10;
	cpu.m=2; cpu.t=8;
},

//0xE5
 res_4_l : function(){
	l|=0x10;
	cpu.m=2; cpu.t=8;
},

//0xE6
 res_4_hl : function(){
	 value=memory.readByte(getAddr(cpu.h,cpu.l));
	value|=0x10;
	memory.writeByte(value, getAddr(cpu.h,cpu.l));
	cpu.m=2; cpu.t=8;
},

//0xE7
 res_4_a : function(){
	a|=0x10;
	cpu.m=2; cpu.t=8;
},

//0xE8
 res_5_b : function(){
	b|=0x20;
	cpu.m=2; cpu.t=8;
},

//0xE9
 res_5_c : function(){
	c|=0x20;
	cpu.m=2; cpu.t=8;
},

//0xEA
 res_5_d : function(){
	d|=0x20;
	cpu.m=2; cpu.t=8;
},

//0xEB
 res_5_e : function(){
	e|=0x20;
	cpu.m=2; cpu.t=8;
},

//0xEC
 res_5_h : function(){
	h|=0x20;
	cpu.m=2; cpu.t=8;
},

//0xED
 res_5_l : function(){
	l|=0x20;
	cpu.m=2; cpu.t=8;
},

//0xEE
 res_5_hl : function(){
	 value=memory.readByte(getAddr(cpu.h,cpu.l));
	value|=0x20;
	memory.writeByte(value, getAddr(cpu.h,cpu.l));
	cpu.m=2; cpu.t=8;
},

//0xEF
 res_5_a : function(){
	a|=0x20;
	cpu.m=2; cpu.t=8;
},

//0xF0
 res_6_b : function(){
	b|=0x40;
	cpu.m=2; cpu.t=8;
},

//0xF1
 res_6_c : function(){
	c|=0x40;
	cpu.m=2; cpu.t=8;
},

//0xF2
 res_6_d : function(){
	d|=0x40;
	cpu.m=2; cpu.t=8;
},

//0xF3
 res_6_e : function(){
	e|=0x40;
	cpu.m=2; cpu.t=8;
},

//0xF4
 res_6_h : function(){
	h|=0x40;
	cpu.m=2; cpu.t=8;
},

//0xF5
 res_6_l : function(){
	l|=0x40;
	cpu.m=2; cpu.t=8;
},

//0xF6
 res_6_hl : function(){
	var value=memory.readByte(getAddr(cpu.h,cpu.l));
	value|=0x40;
	memory.writeByte(value, getAddr(cpu.h,cpu.l));
	cpu.m=2; cpu.t=8;
},

//0xF7
 res_6_a : function(){
	a|=0x40;
	cpu.m=2; cpu.t=8;
},

//0xF8
 res_7_b : function(){
	b|=0x80;
	cpu.m=2; cpu.t=8;
},

//0xF9
 res_7_c : function(){
	c|=0x80;
	cpu.m=2; cpu.t=8;
},

//0xFA
 res_7_d : function(){
	d|=0x80;
	cpu.m=2; cpu.t=8;
},

//0xFB
 res_7_e : function(){
	e|=0x80;
	cpu.m=2; cpu.t=8;
},

//0xFC
 res_7_h : function(){
	h|=0x80;
	cpu.m=2; cpu.t=8;
},

//0xFD
 res_7_l : function(){
	l|=0x80;
	cpu.m=2; cpu.t=8;
},

//0xFE
 res_7_hl : function(){
	var value=memory.readByte(getAddr(cpu.h,cpu.l));
	value|=0x80;
	memory.writeByte(value, getAddr(cpu.h,cpu.l));
	cpu.m=2; cpu.t=8;
},

//0xFF
 res_7_a : function(){
	a|=0x80;
	cpu.m=2; cpu.t=8;
},

//------------------//
//-helper functions-//
//------------------//


 zeroFlag : function(){
	if(cpu.f&0x80){return true;}
	return false;
	},

 setZeroFlag : function(){
	cpu.f|=0x80;
},

 resetZeroFlag : function(){
	cpu.f&=0x70;
},

 subFlag : function(){
	if(cpu.f&0x40){return true;}
	return false;
	},

 setSubFlag : function(){
	cpu.f|=0x40;
},

 resetSubFlag : function(){
	cpu.f&=0xB0;
},

 halfFlag : function(){
	if(cpu.f&0x20){return true;}
	return false;
	},

 setHalfFlag: function(){
	cpu.f|=0x20;
},

 resetHalfFlag : function(){
	cpu.f&=0xD0;
},

 carryFlag : function(){
	if(cpu.f&0x10){return true;}
	return false;
	},

 setCarryFlag : function(){
	cpu.f|=0x10;
},

 resetCarryFlag : function(){
	cpu.f&=0xE0;
},

 getAddr : function(a,b){ //finds and returns combined address of two 8bit registers
	var addr = a;
	addr<<8;
	addr+=cpu.b;
	return addr;
},

 ex : function(opcode){
	oneByteInstructions[opcode]();
	cpu.pc+=cpu.m&0xFFFF;
	cpu.showState();
},

showState: function(){
	console.log('a: ', cpu.a);
	console.log('b: ', cpu.b);
	console.log('c: ', cpu.c);
	console.log('d: ', cpu.d);
	console.log('e: ', cpu.e);
	console.log('h: ', cpu.h);
	console.log('l: ', cpu.l);
	console.log('a: ', cpu.a);
	console.log('f: ', cpu.f);
	console.log('sp: ', cpu.sp);
	console.log('pc: ', cpu.pc);
	console.log('i: ', cpu.i);
	console.log('m: ', cpu.m);
	console.log('t: ', cpu.t);
};

//instruction arrays
	oneByteInstructions = [
	cpu.nop, //0x00
	cpu.ld_bc_nn,
	cpu.ld_bc_a,
	cpu.inc_bc,
	cpu.inc_b,
	cpu.dec_b,
	cpu.ld_b_n,
	cpu.rlc_a,
	cpu.ld_nn_sp,
	cpu.add_hl_bc,
	cpu.ld_a_bc,
	cpu.dec_bc,
	cpu.inc_c,
	cpu.dec_c,
	cpu.ld_c_n,
	cpu.rrc_a,
	cpu.stop,		//0x10
	cpu.ld_de_nn,
	cpu.ld_de_a,
	cpu.inc_de,
	cpu.inc_d,
	cpu.dec_d,
	cpu.ld_d_n,
	cpu.rl_a,
	cpu.jr_n,
	cpu.add_hl_de,
	cpu.ld_a_de,
	cpu.dec_de,
	cpu.inc_e,
	cpu.dec_e,
	cpu.ld_e_n,
	cpu.rr_a,
	cpu.jr_nz_n,	//0x20
	cpu.ld_hl_nn,
	cpu.ldi_hl_a,
	cpu.inc_hl,
	cpu.inc_h,
	cpu.dec_h,
	cpu.ld_h_n,
	cpu.daa,
	cpu.jr_z_n,
	cpu.add_hl_hl,
	cpu.ldi_a_hl,
	cpu.dec_hl,
	cpu.inc_l,
	cpu.dec_l,
	cpu.ld_l_n,
	cpu.cpl,
	cpu.jr_nc_n,	//0x30
	cpu.ld_sp_nn,
	cpu.ldd_hl_a,
	cpu.inc_sp,
	cpu.inc_hl_,
	cpu.dec_hl_,
	cpu.ld_hl_n,
	cpu.scf,
	cpu.jr_c_n,
	cpu.add_hl_sp,
	cpu.ldd_a_hl,
	cpu.dec_sp,
	cpu.inc_a,
	cpu.dec_a,
	cpu.ld_a_n,
	cpu.ccf,
	cpu.ld_b_b,		//0x40
	cpu.ld_b_c,
	cpu.ld_b_d,
	cpu.ld_b_e,
	cpu.ld_b_h,
	cpu.ld_b_l,
	cpu.ld_b_hl,
	cpu.ld_b_a,
	cpu.ld_c_b,
	cpu.ld_c_c,
	cpu.ld_c_d,
	cpu.ld_c_e,
	cpu.ld_c_h,
	cpu.ld_c_l,
	cpu.ld_c_hl,
	cpu.ld_c_a,
	cpu.ld_d_b,		//0x50
	cpu.ld_d_c,
	cpu.ld_d_d,
	cpu.ld_d_e,
	cpu.ld_d_h,
	cpu.ld_d_l,
	cpu.ld_d_hl,
	cpu.ld_d_a,
	cpu.ld_e_b,
	cpu.ld_e_c,
	cpu.ld_e_d,
	cpu.ld_e_e,
	cpu.ld_e_h,
	cpu.ld_e_l,
	cpu.ld_e_hl,
	cpu.ld_e_a,
	cpu.ld_h_b,		//0x60
	cpu.ld_h_c,
	cpu.ld_h_d,
	cpu.ld_h_e,
	cpu.ld_h_h,
	cpu.ld_h_l,
	cpu.ld_h_hl,
	cpu.ld_h_a,
	cpu.ld_l_b,
	cpu.ld_l_c,
	cpu.ld_l_d,
	cpu.ld_l_e,
	cpu.ld_l_h,
	cpu.ld_l_l,
	cpu.ld_l_hl,
	cpu.ld_l_a,
	cpu.ld_hl_b,	//0x70
	cpu.ld_hl_c,
	cpu.ld_hl_d,
	cpu.ld_hl_e,
	cpu.ld_hl_h,
	cpu.ld_hl_l,
	cpu.halt,
	cpu.ld_hl_a,
	cpu.ld_a_b,
	cpu.ld_a_c,
	cpu.ld_a_d,
	cpu.ld_a_e,
	cpu.ld_a_h,
	cpu.ld_a_l,
	cpu.ld_a_hl,
	cpu.ld_a_a,
	cpu.add_a_b,	//0x80
	cpu.add_a_c,
	cpu.add_a_d,
	cpu.add_a_e,
	cpu.add_a_h,
	cpu.res_7_a,
	cpu.add_a_l,
	cpu.add_a_hl,
	cpu.add_a_a,
	cpu.adc_a_b,
	cpu.adc_a_c,
	cpu.adc_a_d,
	cpu.adc_a_e,
	cpu.adc_a_h,
	cpu.adc_a_l,
	cpu.adc_a_hl,
	cpu.adc_a_a,
	cpu.sub_a_b,	//0x90
	cpu.sub_a_c,
	cpu.sub_a_d,
	cpu.sub_a_e,
	cpu.sub_a_h,
	cpu.sub_a_l,
	cpu.sub_a_hl,
	cpu.sub_a_a,
	cpu.sbc_a_b,
	cpu.sbc_a_c,
	cpu.sbc_a_d,
	cpu.sbc_a_e,
	cpu.sbc_a_h,
	cpu.sbc_a_l,
	cpu.sbc_a_hl,
	cpu.sbc_a_a,
	cpu.and_b,		//0xA0
	cpu.and_c,
	cpu.and_d,
	cpu.and_e,
	cpu.and_h,
	cpu.and_l,
	cpu.and_hl,
	cpu.and_a,
	cpu.xor_b,
	cpu.xor_c,
	cpu.xor_d,
	cpu.xor_e,
	cpu.xor_h,
	cpu.xor_l,
	cpu.xor_hl,
	cpu.xor_a,
	cpu.or_b,		//0xB0
	cpu.or_c,
	cpu.or_d,
	cpu.or_e,
	cpu.or_h,
	cpu.or_l,
	cpu.or_hl,
	cpu.or_a,
	cpu.cp_b,
	cpu.cp_c,
	cpu.cp_d,
	cpu.cp_e,
	cpu.cp_h,
	cpu.cp_l,
	cpu.cp_hl,
	cpu.cp_a,
	cpu.ret_nz,		//0xC0
	cpu.pop_bc,
	cpu.jp_nz_nn,
	cpu.jp_nn,
	cpu.call_nz_nn,
	cpu.push_bc,
	cpu.add_a_n,
	cpu.rst_0,
	cpu.ret_z,
	cpu.ret,
	cpu.jp_z_nn,
	cpu.ext_ops,
	cpu.call_z_nn,
	cpu.call_nn,
	cpu.adc_a_n,
	cpu.rst_8,
	cpu.ret_nc,		//0xd0
	cpu.pop_de,
	cpu.jp_nc_nn,
	cpu.unused,
	cpu.call_nc_nn,
	cpu.push_de,
	cpu.sub_a_n,
	cpu.rst_10,
	cpu.ret_c,
	cpu.reti,
	cpu.jp_c_nn,
	cpu.unused,
	cpu.call_c_nn,
	cpu.unused,
	cpu.sbc_a_n,
	cpu.rst_18,
	cpu.ldh_n_a,	//0xE0
	cpu.pop_hl,
	cpu.ldh_c_a,
	cpu.unused,
	cpu.unused,
	cpu.push_hl,
	cpu.and_n,
	cpu.rst_20,
	cpu.add_sp_d,
	cpu.jp_hl,
	cpu.ld_nn_a,
	cpu.unused,
	cpu.unused,
	cpu.unused,
	cpu.xor_n,
	cpu.rst_28,
	cpu.ldh_a_n,	//0xF0
	cpu.pop_af,
	cpu.unused,
	cpu.di,
	cpu.unused,
	cpu.push_af,
	cpu.or_n,
	cpu.rst_30,
	cpu.ldhl_sp_d,
	cpu.ld_sp_hl,
	cpu.ld_a_nn,
	cpu.ei,
	cpu.unused,
	cpu.unused,
	cpu.cp_n,
	cpu.rst_38,];
	
	twoByteInstructions = [
	cpu.rlc_b,		//0x00
	cpu.rlc_c,
	cpu.rlc_d,
	cpu.rlc_e,
	cpu.rlc_h,
	cpu.rlc_l,
	cpu.rlc_hl,
	cpu.rlc_a,
	cpu.rrc_b,		
	cpu.rrc_c,
	cpu.rrc_d,
	cpu.rrc_e,
	cpu.rrc_h,
	cpu.rrc_l,
	cpu.rrc_hl,
	cpu.rrc_a,
	cpu.rl_b,		//0x10
	cpu.rl_c,
	cpu.rl_d,
	cpu.rl_e,
	cpu.rl_h,
	cpu.rl_l,
	cpu.rl_hl,
	cpu.rl_a,
	cpu.rr_b,		
	cpu.rr_c,
	cpu.rr_d,
	cpu.rr_e,
	cpu.rr_h,
	cpu.rr_l,
	cpu.rr_hl,
	cpu.rr_a,
	cpu.sla_b,		//0x20
	cpu.sla_c,
	cpu.sla_d,
	cpu.sla_e,
	cpu.sla_h,
	cpu.sla_l,
	cpu.sla_hl,
	cpu.sla_a,
	cpu.sra_b,		
	cpu.sra_c,
	cpu.sra_d,
	cpu.sra_e,
	cpu.sra_h,
	cpu.sra_l,
	cpu.sra_hl,
	cpu.sra_a,
	cpu.swap_b,		//0x30
	cpu.swap_c,
	cpu.swap_d,
	cpu.swap_e,
	cpu.swap_h,
	cpu.swap_l,
	cpu.swap_hl,
	cpu.swap_a,
	cpu.srl_b,		
	cpu.srl_c,
	cpu.srl_d,
	cpu.srl_e,
	cpu.srl_h,
	cpu.srl_l,
	cpu.srl_hl,
	cpu.srl_a,
	cpu.bit_0_b,		//0x40
	cpu.bit_0_c,
	cpu.bit_0_d,
	cpu.bit_0_e,
	cpu.bit_0_h,
	cpu.bit_0_l,
	cpu.bit_0_hl,
	cpu.bit_0_a,
	cpu.bit_1_b,		
	cpu.bit_1_c,
	cpu.bit_1_d,
	cpu.bit_1_e,
	cpu.bit_1_h,
	cpu.bit_1_l,
	cpu.bit_1_hl,
	cpu.bit_1_a,
	cpu.bit_2_b,		//0x50
	cpu.bit_2_c,
	cpu.bit_2_d,
	cpu.bit_2_e,
	cpu.bit_2_h,
	cpu.bit_2_l,
	cpu.bit_2_hl,
	cpu.bit_2_a,
	cpu.bit_3_b,		
	cpu.bit_3_c,
	cpu.bit_3_d,
	cpu.bit_3_e,
	cpu.bit_3_h,
	cpu.bit_3_l,
	cpu.bit_3_hl,
	cpu.bit_3_a,
	cpu.bit_4_b,		//0x60
	cpu.bit_4_c,
	cpu.bit_4_d,
	cpu.bit_4_e,
	cpu.bit_4_h,
	cpu.bit_4_l,
	cpu.bit_4_hl,
	cpu.bit_4_a,
	cpu.bit_5_b,		
	cpu.bit_5_c,
	cpu.bit_5_d,
	cpu.bit_5_e,
	cpu.bit_5_h,
	cpu.bit_5_l,
	cpu.bit_5_hl,
	cpu.bit_5_a,
	cpu.bit_6_b,		//0x70
	cpu.bit_6_c,
	cpu.bit_6_d,
	cpu.bit_6_e,
	cpu.bit_6_h,
	cpu.bit_6_l,
	cpu.bit_6_hl,
	cpu.bit_6_a,
	cpu.bit_7_b,		
	cpu.bit_7_c,
	cpu.bit_7_d,
	cpu.bit_7_e,
	cpu.bit_7_h,
	cpu.bit_7_l,
	cpu.bit_7_hl,
	cpu.bit_7_a,
	cpu.res_0_b,		//0x80
	cpu.res_0_c,
	cpu.res_0_d,
	cpu.res_0_e,
	cpu.res_0_h,
	cpu.res_0_l,
	cpu.res_0_hl,
	cpu.res_0_a,
	cpu.res_1_b,		
	cpu.res_1_c,
	cpu.res_1_d,
	cpu.res_1_e,
	cpu.res_1_h,
	cpu.res_1_l,
	cpu.res_1_hl,
	cpu.res_1_a,
	cpu.res_2_b,		//0x90
	cpu.res_2_c,
	cpu.res_2_d,
	cpu.res_2_e,
	cpu.res_2_h,
	cpu.res_2_l,
	cpu.res_2_hl,
	cpu.res_2_a,
	cpu.res_3_b,		
	cpu.res_3_c,
	cpu.res_3_d,
	cpu.res_3_e,
	cpu.res_3_h,
	cpu.res_3_l,
	cpu.res_3_hl,
	cpu.res_3_a,
	cpu.res_4_b,		//0xA0
	cpu.res_4_c,
	cpu.res_4_d,
	cpu.res_4_e,
	cpu.res_4_h,
	cpu.res_4_l,
	cpu.res_4_hl,
	cpu.res_4_a,
	cpu.res_5_b,		
	cpu.res_5_c,
	cpu.res_5_d,
	cpu.res_5_e,
	cpu.res_5_h,
	cpu.res_5_l,
	cpu.res_5_hl,
	cpu.res_5_a,
	cpu.res_6_b,		//0xB0
	cpu.res_6_c,
	cpu.res_6_d,
	cpu.res_6_e,
	cpu.res_6_h,
	cpu.res_6_l,
	cpu.res_6_hl,
	cpu.res_6_a,
	cpu.res_7_b,		
	cpu.res_7_c,
	cpu.res_7_d,
	cpu.res_7_e,
	cpu.res_7_h,
	cpu.res_7_l,
	cpu.res_7_hl,
	cpu.res_7_a,
	cpu.set_0_b,		//0xC0
	cpu.set_0_c,
	cpu.set_0_d,
	cpu.set_0_e,
	cpu.set_0_h,
	cpu.set_0_l,
	cpu.set_0_hl,
	cpu.set_0_a,
	cpu.set_1_b,		
	cpu.set_1_c,
	cpu.set_1_d,
	cpu.set_1_e,
	cpu.set_1_h,
	cpu.set_1_l,
	cpu.set_1_hl,
	cpu.set_1_a,
	cpu.set_2_b,		//0xD0
	cpu.set_2_c,
	cpu.set_2_d,
	cpu.set_2_e,
	cpu.set_2_h,
	cpu.set_2_l,
	cpu.set_2_hl,
	cpu.set_2_a,
	cpu.set_3_b,		
	cpu.set_3_c,
	cpu.set_3_d,
	cpu.set_3_e,
	cpu.set_3_h,
	cpu.set_3_l,
	cpu.set_3_hl,
	cpu.set_3_a,
	cpu.set_4_b,		//0xE0
	cpu.set_4_c,
	cpu.set_4_d,
	cpu.set_4_e,
	cpu.set_4_h,
	cpu.set_4_l,
	cpu.set_4_hl,
	cpu.set_4_a,
	cpu.set_5_b,		
	cpu.set_5_c,
	cpu.set_5_d,
	cpu.set_5_e,
	cpu.set_5_h,
	cpu.set_5_l,
	cpu.set_5_hl,
	cpu.set_5_a,
	cpu.set_6_b,		//0xF0
	cpu.set_6_c,
	cpu.set_6_d,
	cpu.set_6_e,
	cpu.set_6_h,
	cpu.set_6_l,
	cpu.set_6_hl,
	cpu.set_6_a,
	cpu.set_7_b,		
	cpu.set_7_c,
	cpu.set_7_d,
	cpu.set_7_e,
	cpu.set_7_h,
	cpu.set_7_l,
	cpu.set_7_hl,
	cpu.set_7_a,];
