//David Gibb

cpu = {

//registers (8 bit)
var a;
var b;
var c;
var d;
var e;
var h;
var l;
var f; //flags

//program counter and stack pointer (16 bit)
var pc;
var sp;

//clocks
var m;
var t;

//interupts
var i;

//instruction arrays
var oneByteInstructions = [nop(), //0x00
	ld_bc,
	ld_bc_a,
	inc_bc,
	inc_b,
	dec_b,
	ld_b_n,
	rlc_a,
	ld_nn_sp,
	add_hl_sp,
	add_hl_bc,
	ld_a_bc,
	dec_bc,
	inc_c,
	dec_c,
	ld_c_n,
	rrc_a,
	stop,		//0x10
	ld_de_nn,
	ld_de_a,
	inc_de,
	inc_d,
	dec_d,
	ld_d_n,
	rl_a,
	jr_n,
	add_hl_de,
	ld_a_de,
	dec_de,
	inc_e,
	dec_e,
	ld_e_n,
	rr_a,
	jr_nz_n,	//0x20
	ld_hl_nn,
	ldi_hl_a,
	inc_hl,
	inc_h,
	dec_h,
	ld_h_n,
	daa,
	jr_z_n,
	add_hl_hl,
	ldi_a_hl,
	dec_hl,
	inc_l,
	dec_l,
	ld_l_n,
	cpl,
	jr_nc_n,	//0x30
	ld_sp_nn,
	ldd_hl_a,
	inc_sp,
	inc_hl,
	dec_hl,
	ld_hl_n,
	scf,
	jr_c_n,
	add_hl_sp,
	ldd_a_hl,
	dec_sp,
	inc_a,
	dec_a,
	ld_a_n,
	ccf,
	ld_b_b,		//0x40
	ld_b_c,
	ld_b_d,
	ld_b_e,
	ld_b_h,
	ld_b_l,
	ld_b_hl,
	ld_b_a,
	ld_c_b,
	ld_c_c,
	ld_c_d,
	ld_c_e,
	ld_c_h,
	ld_c_l,
	ld_c_hl,
	ld_c_a,
	ld_d_b,		//0x50
	ld_d_c,
	ld_d_d,
	ld_d_e,
	ld_d_h,
	ld_d_l
	ld_d_hl
	ld_d_a
	ld_e_b,
	ld_e_c,
	ld_e_d,
	ld_e_e,
	ld_e_h,
	ld_e_l,
	ld_e_hl,
	ld_e_a,
	ld_h_b,		//0x60
	ld_h_c,
	ld_h_d,
	ld_h_e,
	ld_h_h,
	ld_h_l,
	ld_h_hl,
	ld_h_a,
	ld_l_b,b<<8 + c
	ld_l_c,
	ld_l_d,
	ld_l_e,
	ld_l_h,
	ld_l_l,
	ld_l_hl,
	ld_l_a,
	ld_hl_b,	//0x70
	ld_hl_c,
	ld_hl_d,
	ld_hl_e,
	ld_hl_h,
	ld_hl_l,
	halt,
	ld_hl_a,
	ld_a_b,
	ld_a_c,
	ld_a_d,
	ld_a_e,
	ld_a_h,
	ld_a_l,
	ld_a_hl,
	ld_a_a,
	add_a_b,	//0x80
	add_a_c,
	add_a_d,
	add_a_e,
	add_a_h,
	add_a_l,
	add_a_hl,
	add_a_a,
	adc_a_b,
	adc_a_c,
	adc_a_d,
	adc_a_e,
	adc_a_h,
	adc_a_l,
	adc_a_hl,
	adc_a_a,
	sub_a_b,	//0x90
	sub_a_c,
	sub_a_d,
	sub_a_e,
	sub_a_h,
	sub_a_l,
	sub_a_hl,
	sub_a_a,
	sbc_a_b,
	sbc_a_c,
	sbc_a_d,
	sbc_a_e,
	sbc_a_h,
	sbc_a_l,
	sbc_a_hl,
	sbc_a_a,
	and_b,		//0xA0
	and_c,
	and_d,
	and_e,
	and_h,
	and_l,
	and_hl,
	and_a,
	xor_b,
	xor_c,
	xor_d,
	xor_e,
	xor_h,
	xor_l,
	xor_hl,
	xor_a,
	or_b,		//0xB0
	or_c,
	or_d,
	or_e,
	or_h,
	or_l,
	or_hl,
	or_a,
	cp_b,
	cp_c,
	cp_d,
	cp_e,
	cp_h,
	cp_l,
	cp_hl,
	cp_a,
	ret_nz,		//0xC0
	pop_bc,
	jp_nz_nn,
	jp_nn,
	call_nz_nn,
	push_bc,
	add_a_n,
	rst_0,
	ret_z,
	ret,
	jp_z_nn,
	ext_ops,
	call_z_nn,
	call_nn,
	adc_a_n,
	rst_8,
	ret_nc,		//0xd0
	pop_de,
	jp_nc_nn,
	unused,
	call_nc_nn,
	push_de,
	sub_a_n,
	rst_10,
	ret_c,
	reti,
	jp_c_nn,
	unused,
	call_c_nn,
	unused
	sbc_a_n,
	rst_18,
	ldh_n_a,	//0xE0
	pop_hl
	ldh_c_a,
	unused,
	unused,
	push_hl,
	and_n,
	rst_20,
	add_sp_d,
	jp_hl,
	ld_nn_a,
	unused,
	unused,
	unused,
	xor_n,
	rst_28,
	ldh_a_n,	//0xF0
	pop_af
	unused,
	di,
	unused,
	push_af,
	or_n,
	rst_30,
	ldhl_sp_d,
	ld_sp_hl,
	ld_a_nn,
	ei,
	unused,
	unused,
	cp_n,
	rst_38,]
	
var twoByteInstructions = [
]

//instructions

//0x00
var nop = function(){
m=1
t=4
}

//0x01
var ld_bc_nn = function(){
	b=memory.readByte(pc);
	c=memory.readByte(pc+1);
	pc+=2;
	m=3;
	t=12;
}

//0x02
var ld_bc_a = function(){
	var addr = b;
	addr<<8;
	addr+=cpu.c;
	memory.writeByte(addr, a);
	m=1;
	t=8;
}

//0x03
var inc_bc = function(){
	c++;
	c&=0xFF;
	if(c===0){
		b++;
		b&=0xFF;
	}
	m=1;
	t=8;
}

//0x04
var inc_b = function(){
	b++;
	b&=0xFF;
	if (b===0){b=0; setZeroFlag();} else {resetZeroFlag();}
	if(b===0x10){setHalfFlag();} else {resetHalfFlag();}
	resetSubFlag();	
	m=1;
	t=4;
}

//0x05
var dec_b = function(){
	b--;
	b&=0xFF;
	if (b===0){setZeroFlag();} else {resetZeroFlag();}
	if(b===0x0F){setHalfFlag();} else {resetHalfFlag();}
	setSubFlag();	
	m=1;
	t=4;
}

//0x06
var ld_b_n = function(){
	b=memory.readByte(pc+1);
	m=2;
	t=8;
}

//0x07
var rlca = function(){
	var carrybit= (a>>7)&0x01;
	if (carrybit===1){setCarryFlag();} else {resetCarryFlag();}
	a<<1;
	a+=carrybit;
	resetZeroFlag();
	resetHalfFlag();
	resetSubFlag();
}


//0x08
var ld_nn_sp = function(){
	memory.writeByte(sp, memory.readWord(pc+1));
	m=3;
	t=20;
}

//0x09
var add_hl_bc = function(){
	var x = b<<8 + c;
	var y= h<<8 +l;
	var z=x+y;
	l= z&0x00FF;
	h=z&0xFF00>>8;
	if ((x&0x0F00 + y&0x0F00)&0x1000){setHalfFlag();} else {resetHalfFlag();}
	if (z>65535){setCarryFlag();} else {resetCarryFlag();}
	resetSubFlag();
	m=1;
	t=8
}

//0x0A
var ld_a_bc = function(){
	a=memory.readByte(getAddr(b,c));
	m=1;
	t=8;
}

//0x0B
var dec_bc = function(){
	var x= getAddr(b,c);
	x--;
	b=x&0xFF00;
	b>>8;
	c=x&0x00FF;
	m=1;
	t=8;
}

//0x0C
var inc_c = function(){
	c++;
	c&=0xFF;
	if (c===0){setZeroFlag();} else {resetZeroFlag();}
	if (c===0x10){setHalfFlag();} else {resetHalfFlag();}
	resetSubFlag();
	m=1;
	t=4;
}

//0x0D
var dec_c = function(){
	c--;
	c&=0xFF;
	if (c===0){setZeroFlag();} else {resetZeroFlag();}
	if (c===0x0F){setHalfFlag();} else {resetHalfFlag();}
	setSubFlag();
	m=1;
	t=4;
}

//0x0E
var ld_c_n = function(){
	c=memory.readByte(pc+1);
	m=2;
	t=8;
}

//0x0F
var rrca = function(){
	var carrybit = (a<<7)&0x80;
	if (carrybit){setCarryFlag();} else {resetCarryFlag();}
	a>>1;
	a+=carrybit;
	if(a===0){setZeroFlag();} else {resetZeroFlag();}
	resetSubFlag();
	resetHalfFlag();
	m=1;
	t=4
}		

//0x10
var stop = function(){
	m=2;
	t=4;
}

//0x11
var ld_de_nn = function(){
	d=memory.readByte(pc);
	e=memory.readByte(pc+1);
	pc+=2;
	m=3;
	t=12;
};

//0x12
var ld_de_a = function(){
	var addr = getAddr(d,e);
	memory.writeByte(addr, a);
	m=1;
	t=8;
};

//0x13
var inc_de = function(){
	e++;
	e&=0xFF;
	if(e===0){
		d++;
		d&=0xFF;
	}
	m=1;
	t=8;
}

//0x14
var inc_d = function{
	d++;
	d&=0xFF;
	if (d===0){setZeroFlag();}else{resetZeroFlag();}
	if(d===0x10){setHalfFlag();}else {resetHalfFlag();}
	resetSubFlag();
	m=1;
	t=4;	
}

//0x15
var dec_d =function(){
	d--;
	d&=0xFF;
	if (d===0){setZeroFlag();}else{resetZeroFlag();}
	if(d===0x0F){setHalfFlag();}else {resetHalfFlag();}
	setSubFlag();	
	m=1;
	t=4;
}

//0x16
var ld_d_n = function(){
	h=memory.readByte(pc+1);
	m=2;
	t=8;
}

//0x17
var rla = function(){
	var carry = carryFlag()?1:0;
	if (a&0x80===0x80){setCarryFlag();} else {resetCarryFlag();}
	a<<1;
	a+=carry;
	a&=0xFF;
	resetZeroFlag();
	resetHalfFlag();
	resetSubFlag();
	m=1;
	t=4;
}

//0x18
var jr_n = function(){
	var jump=readByte(pc+1);
	pc+=jump;
	t=12;
}

//0x19
var add_hl_bc = function(){
	var x = d<<8 + e;
	var y= h<<8 +l;
	var z=x+y;
	l= z&0x00FF;
	h=z&0xFF00>>8;
	if ((x&0x0F00 + y&0x0F00)&0x1000){setHalfFlag();} else {resetHalfFlag();}
	if (z>65535){setCarryFlag();} else {resetCarryFlag();}
	resetSubFlag();
	m=1;
	t=8
}

//0x1A
var ld_a_de = function(){
	a=memory.readByte(getAddr(d,e));
	m=1;
	t=8;
}

//0x1B
var dec_de = function(){
	var x= getAddr(d,e);
	x--;
	d=x&0xFF00;
	d>>8;
	e=x&0x00FF;
	m=1;
	t=8;
}

//0x1C
var inc_e = function{
	e++;
	e&=0xFF;
	if (e===0){setZeroFlag();}else{resetZeroFlag();}
	if(e===0x10){setHalfFlag();}else {resetHalfFlag();}
	resetSubFlag();
	m=1;
	t=4;	
}

//0x1D
var dec_e = function(){
	e--;
	e&=0xFF;
	if (e===0){setZeroFlag();} else {resetZeroFlag();}
	if (e===0x0F){setHalfFlag();} else {resetHalfFlag();}
	setSubFlag();
	m=1;
	t=4;
}

//0x1E
var ld_e_n = function(){
	e=memory.readByte(pc+1);
	m=2;
	t=8;
}

//0x1F
var rra = function(){
	var carry = carryFlag()?0x80:0;
	if (a&0x01){setCarryFlag();} else {resetCarryFlag();}
	a>>1;
	a+=carry;
	a&=0xFF;
	resetZeroFlag();
	resetHalfFlag();
	resetSubFlag();
	m=1;
	t=4;
}


//0x20
var jr_nz_n = function() {
	if (!zeroFlag()){
		pc+=memory.readByte(pc+1);
		t=12;
		m=0
		}
	else{
		pc++;
		t=8;
		m=2;
		}
}

//0x21
var ld_hl_nn = function() {
	h=memory.readByte(pc+1);
	l=memory.readByte(pc+2);
	pc+=2;
	m=1;
	t=8;
};

//0x22
var ldi_hl_a = function() {
	var addr = getAddr(h,l);
	memory.writeByte(addr, a);
	l++;
	if(l>255){
		l&=0xFF00;
		h++;
	}
	m=1;
	t=8;
}

//0x23
var inc_hl = function() 
	l++;
	l&=0xFF
	if(l===0){
		h++;
		h&=0xFF
	}
	m=1;
	t=8;
}

//0x24
var inc_h = function(){
	h++;
	if (h===0){setZeroFlag();}else{resetZeroFlag();}
	if(h===0x10){setHalfFlag();}else {resetHalfFlag();}
	resetSubFlag();	
	m=1;
	t=4;
}

//0x25
var dec_h = function(){
	h--;
	if (h===0){setZeroFlag();}else{resetZeroFlag();}
	if(h===0x0F){setHalfFlag();}else {resetHalfFlag();}
	setSubFlag();	
	m=1;
	t=4;
}

//0x26
var ld_h_n = function(){
	h=memory.readByte(pc+1);
	pc++;
	m=2;
	t=8;
}

//0x27
var daa = function(){
	if (a&0x0F>9||halfFlag()){a+=6;}
	if ((a>>4&0x0F)>9||carryFlag()){a+=96; setCarryFlag();}
	if (a===0){setZeroFlag();}
	resetHalfFlag();
}

//0x28
var jr_z_n = function(){
	if (zeroFlag()){
		pc+=memory.readByte(pc+1);
		t=12;
		m=0
		}
	else{
		pc++;
		t=8;
		m=2;
		}
}

//0x29
var add_hl_hl = function(){
	var x = h<<8 + l;
	var z=x+x;
	l= z&0x00FF;
	h=z&0xFF00>>8;
	if ((x&0x0F00 + x&0x0F00)&0x1000){setHalfFlag();} else {resetHalfFlag();}
	if (z>65535){setCarryFlag();} else {resetCarryFlag();}
	resetSubFlag();
	m=1;
	t=8
}

//0x2A
var ldi_hl = function(){
	a=readByte(getAddr(h,l));
	l++;
	l&=0xFF;
	if (l===0){
		h++;
		h&=0xFF;
		}
	m=1;
	t=8;
}

//0x2B
var dec_bc = function(){
	var x= getAddr(h,l);
	x--;
	h=x&0xFF00;
	h>>8;
	l=x&0x00FF;
	m=1;
	t=8;
}

//0x2C
var inc_l = function{
	l++;
	l&=0xFF;
	if (l===0){setZeroFlag();}else{resetZeroFlag();}
	if(l===0x10){setHalfFlag();}else {resetHalfFlag();}
	resetSubFlag();
	m=1;
	t=4;	
}

//0x2D
var dec_l = function(){
	l--;
	if (l===0){setZeroFlag();}else{resetZeroFlag();}
	if(l===0x0F){setHalfFlag();}else {resetHalfFlag();}
	setSubFlag();	
	m=1;
	t=4;
}

//0x2E
var ld_l_n = function(){
	l=memory.readByte(pc+1);
	m=2;
	t=8;
}

//0x2F
var cpl = function(){
	a=~a;
	a&=0xFF;
	m=1;
	t=4;
	setHalfFlag();
	setSubFlag();
}

//0x30
var jr_nc_n = function(){
	if (f&0x10!=0x10){
		pc+=readByte(pc+1);
		pc++;
		m=2;
		t=12;
		}
	else{
		pc++;
		t=8;
	}
		m=2;
}

//0x31
var ld_sp_nn = function(){
	sp=memory.readByte(pc);
	sp<<8;
	sp+=memory.readByte(pc+1);
	pc+=2;
	m=3;
	t=12;
}

//0x32
var ldd_hl_a = function(){
	var addr = getAddr(h,l);
	memory.writeByte(addr, a);
	l--;
	if(l===255){
		h--;
	}
	m=2;
	t=8;
}

//0x33
var inc_sp = function(){
	sp++;
	m=1;
	t=8;
}

//0x34
var inc_hl = function(){
	var data = memory.readByte(getAddr(h,l));
	data++;
	memory.writeByte(data, addr);
	if (data===0){setZeroFlag();}else{resetZeroFlag();}
	if(data===0x10){setHalfFlag();}else {resetHalfFlag();}
	resetSubFlag();	
	m=1;
	t=12;
}

//0x35
var dec_hl = function(){
	var data = readByte(getAddr(h,l))
	data--;
	memory.writeByte(data, addr);
	if (data===0){setZeroFlag();}else{resetZeroFlag();}
	if(data===0x0F){setHalfFlag();}else {resetHalfFlag();}
	setSubFlag();	
	m=1;
	t=12;
}

//0x36
var ld_hl_n = function(){
	writeByte(getAddr(h,l), memory.readByte(pc+1) );
	pc++;
	m=2;
	t=12;
}

//0x37
var scf = function(){
	setCarryFlag();
	resetSubFlag();
	resetHalfFlag();
	m=1;
	t=4;
}

//0x38
var jr_c_n = function()
	if (carryFlag()){
		pc+=memory.readByte(pc+1);
		t=12;
		m=0
		}
	else{
		pc++;
		t=8;
		m=2;
		}
}

//0x39
var add_hl_sp = function(){
	var x = h<<8 + l;
	var y= sp;
	var z=x+y;
	l= z&0x00FF;
	h=z&0xFF00>>8;
	if ((x&0x0F00 + y&0x0F00)&0x1000){setHalfFlag();} else {resetHalfFlag();}
	if (z>65535){setCarryFlag();} else {resetCarryFlag();}
	resetSubFlag();
	m=1;
	t=8
}

//0x3A
var ldd_hl = function(){
	var x =getAddr(h,l);
	a=readByte(x)
	x--;
	h=x&0xFF00;
	h>>8;
	l=x&0x00FF;
	m=1;
	t=8;
}

//0x3B
var dec_sp = function(){
	sp--;
	sp&=0xFFFF;
	m=1;
	t=8;
}

//0x3C
var inc_a = function(){
	a++;
	a&=0xFF;
	if (a===0){setZeroFlag();}else{resetZeroFlag();}
	if(a===0x10){setHalfFlag();}else {resetHalfFlag();}
	resetSubFlag();
	m=1;
	t=4;	
}

//0x3D
var dec_a = function(){
	a--;
	if (a===0){setZeroFlag();}else{resetZeroFlag();}
	if(a===0x0F){setHalfFlag();}else {resetHalfFlag();}
	setSubFlag();	
	m=1;
	t=4;
}

//0x3E
var ld_a_n = function(){
	a=memory.readByte(pc+1);
	m=2;
	t=8;
}

//0x3F
var ccf = function(){
	if (carryFlag()){resetCarryFlag();} else {setCarryFlag();}
	m=1;
	t=4;
}

//0x40
var ld_b_b= function(){
	b=b;
	m=1;
	t=4;
}

//0x41
var ld_b_c= function(){
	b=c;
	m=1;
	t=4;
}

//0x42
var ld_b_d= function(){
	b=d;
	m=1;
	t=4;
}

//0x43
var ld_b_e= function(){
	b=e;
	m=1;
	t=4;
}

//0x44
var ld_b_h= function(){
	b=h;
	m=1;
	t=4;
}

//0x45
var ld_b_l= function(){
	b=l;
	m=1;
	t=4;
}

//0x46
var ld_b_hl= function(){
	b=memory.readByte(getAddr(h,l);
	m=1;
	t=4;
}

//0x47
var ld_b_a= function(){
	b=a;
	m=1;
	t=4;
}

//0x48
var ld_c_b= function(){
	c=b;
	m=1;
	t=4;
}

//0x49
var ld_c_c= function(){
	c=c;
	m=1;
	t=4;
}

//0x4A
var ld_c_d= function(){
	c=d;
	m=1;
	t=4;
}

//0x4B
var ld_c_e= function(){
	c=e;
	m=1;
	t=4;
}

//0x4C
var ld_c_h= function(){
	c=h;
	m=1;
	t=4;
}

//0x4D
var ld_c_l= function(){
	c=l;
	m=1;
	t=4;
}

//0x4E
var ld_c_hl= function(){
	c=memory.readByte(getAddr(h,l);
	m=1;
	t=4;
}

//0x4F
var ld_c_a= function(){
	c=a;
	m=1;
	t=4;
}

//0x50
var ld_d_b= function(){
	d=b;
	m=1;
	t=4;
}

//0x51
var ld_d_c= function(){
	d=c;
	m=1;
	t=4;
}

//0x52
var ld_d_d= function(){
	d=d;
	m=1;
	t=4;
}

//0x53
var ld_d_e= function(){
	d=e;
	m=1;
	t=4;
}

//0x54
var ld_d_h= function(){
	d=h;
	m=1;
	t=4;
}

//0x55
var ld_d_l= function(){
	d=l;
	m=1;
	t=4;
}

//0x56
var ld_d_hl= function(){
	d=memory.readByte(getAddr(h,l);
	m=1;
	t=4;
}

//0x57
var ld_d_a= function(){
	d=a;
	m=1;
	t=4;
}

//0x58
var ld_e_b= function(){
	e=b;
	m=1;
	t=4;
}

//0x59
var ld_e_c= function(){
	e=c;
	m=1;
	t=4;
}

//0x5A
var ld_e_d= function(){
	e=d;
	m=1;
	t=4;
}

//0x5B
var ld_e_e= function(){
	e=e;
	m=1;
	t=4;
}

//0x5C
var ld_e_h= function(){
	e=h
	m=1;
	t=4;
}

//0x5D
var ld_e_l= function(){
	e=l;
	m=1;
	t=4;
}

//0x5E
var ld_e_hl= function(){
	e=memory.readByte(getAddr(h,l);
	m=1;
	t=4;
}

//0x5F
var ld_e_a= function(){
	e=a;
	m=1;
	t=4;
}

//0x60
var ld_h_b= function(){
	h=b;
	m=1;
	t=4;
}

//0x61
var ld_h_c= function(){
	h=c;
	m=1;
	t=4;
}

//0x62
var ld_h_d= function(){
	h=d;
	m=1;
	t=4;
}

//0x63
var ld_h_e= function(){
	h=e;
	m=1;
	t=4;
}

//0x64
var ld_h_h= function(){
	h=h;
	m=1;
	t=4;
}

//0x65
var ld_h_l= function(){
	h=l;
	m=1;
	t=4;
}

//0x66
var ld_h_hl= function(){
	h=memory.readByte(getAddr(h,l);
	m=1;
	t=4;
}

//0x67
var ld_h_a= function(){
	h=a;
	m=1;
	t=4;
}

//0x68
var ld_l_b= function(){
	l=b;
	m=1;
	t=4;
}

//0x69
var ld_l_c= function(){
	l=c;
	m=1;
	t=4;
}

//0x6A
var ld_l_d= function(){
	l=d;
	m=1;
	t=4;
}

//0x6B
var ld_l_e= function(){
	l=e;
	m=1;
	t=4;
}

//0x6C
var ld_l_h= function(){
	l=h;
	m=1;
	t=4;
}

//0x6D
var ld_l_l= function(){
	l=l;
	m=1;
	t=4;
}

//0x6E
var ld_l_hl= function(){
	l=memory.readByte(getAddr(h,l);
	m=1;
	t=4;
}

//0x6F
var ld_l_a= function(){
	l=a;
	m=1;
	t=4;
}

//0x70
var ld_hl_b= function(){
	memory.writeByte(getAddr(h,l),b);
	m=1;
	t=4;
}

//0x71
var ld_hl_c= function(){
	memory.writeByte(getAddr(h,l),c);
	m=1;
	t=4;
}

//0x72
var ld_hl_d= function(){
	memory.writeByte(getAddr(h,l),d);
	m=1;
	t=4;
}

//0x73
var ld_hl_e= function(){
	memory.writeByte(getAddr(h,l),e);
	m=1;
	t=4;
}

//0x74
var ld_hl_h= function(){
	memory.writeByte(getAddr(h,l),h);
	m=1;
	t=4;
}

//0x45
var ld_hl_l= function(){
	memory.writeByte(getAddr(h,l),b);
	m=1;
	t=4;
}

//0x76
var halt= function(){
	//
}

//0x77
var ld_hl_a= function(){
	memory.writeByte(getAddr(hl),a);
	m=1;
	t=4;
}

//0x78
var ld_a_b= function(){
	a=b;
	m=1;
	t=4;
}

//0x79
var ld_a_c= function(){
	a=c;
	m=1;
	t=4;
}

//0x7A
var ld_a_d= function(){
	a=d;
	m=1;
	t=4;
}

//0x7B
var ld_a_e= function(){
	a=e;
	m=1;
	t=4;
}

//0x7C
var ld_a_h= function(){
	a=h;
	m=1;
	t=4;
}

//0x7D
var ld_a_l= function(){
	a=l;
	m=1;
	t=4;
}

//7E
var ld_a_hl= function(){
	a=memory.readByte(getAddr(h,l);
	m=1;
	t=4;
}

//0x7F
var ld_a_a= function(){
	a=a;
	m=1;
	t=4;
}

//0x80
var add_b_a = function(){
	var result=a+b;
	if (result > 255){setCarryFlag();}
	if(((a&0x0F) + (b&0x0F))&0x10){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	a=(result&0x00ff);
	m=1;
	t=4;
	resetSubFlag();
}

//0x81
var  add_c_a = function(){
	var result=a+c;
	if (result > 255){setCarryFlag();}
	if(((a&0x0F) + (c&0x0F))&0x10){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	a=(result&0x00ff);
	m=1;
	t=4;
	resetSubFlag();
}

//0x82
var add_d_a = function(){
	var result=a+d;
	if (result > 255){setCarryFlag();}
	if(((a&0x0F) + (d&0x0F))&0x10){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	a=(result&0x00ff);
	m=1;
	t=4;
	resetSubFlag();
}
	
//0x83
var add_e_a = function(){
	var result=a+e;
	if (result & 0xff00){setCarryFlag();}
	if(((a&0x0F) + (e&0x0F))&0x10){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	a=(result&0x00ff);
	m=1;
	t=4;
	resetSubFlag();
}

//0x84
var add_h_a = function(){
	var result=a+h;
	if (result > 255){setCarryFlag();}
	if(((a&0x0F) + (h&0x0F))&0x10){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	a=(result&0x00ff);
	m=1;
	t=4;
	resetSubFlag();
}

//0x85
var add_l_a = function(){
	var result=a+l;
	if (result > 255){setCarryFlag();}
	if(((a&0x0F) + (l&0x0F))&0x10){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	a=(result&0x00ff);
	m=1;
	t=4;
	resetSubFlag();
}

//0x86
var add_hl_a = function(){
	var value = readByte(getAddr(h,l));
	var result = a+value;
	if (result & 0xff00){setCarryFlag();}
	if(((a&0x0F) + (value&0x0F))&0x10){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	a=(result&0x00ff);
	m=1;
	t=8;
	resetSubFlag();
}

//0x87
var add_a_a = function(){
	var result=a+a;
	if (result & 0xff00){setCarryFlag();}
	if(((a&0x0F) + (a&0x0F))&0x10){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	a=(result&0x00ff);
	m=1;
	t=4;
	resetSubFlag();
}

//0x88
var adc_b_a = function(){
	var result=a+b;
	if(CarryFlag()){result+=1;}
	if (result & 0xff00){setCarryFlag();}
	if(((a&0x0F) + (b&0x0F))&0x10){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	a=(result&0x00ff);
	m=1;
	t=8;
	resetSubFlag();
}

//0x89
var adc_c_a = function(){
	var result=a+e;
	if(CarryFlag()){result+=1;}
	if (result & 0xff00){setCarryFlag();}
	if(((a&0x0F) + (c&0x0F))&0x10){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	a=(result&0x00ff);
	m=1;
	t=4;
	resetSubFlag();
}

//0x8A
var adc_d_a = function(){
	var result=a+e;
	if (result & 0xff00){setCarryFlag();}
	if(((a&0x0F) + (d&0x0F))&0x10){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	a=(result&0x00ff);
	m=1;
	t=4;
	resetSubFlag();
}

//0x8B
var adc_e_a = function(){
	var result=a+e;
	if(CarryFlag()){result+=1;}
	if (result & 0xff00){setCarryFlag();}
	if(((a&0x0F) + (e&0x0F))&0x10){setHalfFlag();}else {resetHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	a=(result&0x00ff);
	m=1;
	t=4;
	resetSubFlag();
}

//0x8C
var adc_h_a = function(){
	var result=a+e;
	if(CarryFlag()){result+=1;}
	if (result & 0xff00){setCarryFlag();}
	if(((a&0x0F) + (h&0x0F))&0x10){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	a=(result&0x00ff);
	m=1;
	t=4;
	resetSubFlag();
}

//0x8D
var adc_l_a = function(){
	var result=a+e;
	if(CarryFlag()){result+=1;}
	if (result & 0xff00){setCarryFlag();}
	if(((a&0x0F) + (0&0x0F))&0x10){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	a=(result&0x00ff);
	m=1;
	t=4;
	resetSubFlag();
}

//0x8E
var adc_hl_a = function(){
	var value =readByte(getAddr(h,l));
	var result=a+value;
	if(CarryFlag()){result+=1;}
	if (result & 0xff00){setCarryFlag();}
	if(((a&0x0F) + (value&0x0F))&0x10){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	a=(result&0x00ff);
	m=1;
	t=8;
	resetSubFlag();
}

//0x8F
var adc_a_a = function(){
	var result=a+a;
	if(CarryFlag()){result+=1;}
	if (result & 0xff00){setCarryFlag();}
	if(((a&0x0F) + (a&0x0F))&0x10){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	a=(result&0x00ff);
	m=1;
	t=4;
	resetSubFlag();
}

//0x90
var sub_b_a = function(){
	var result=a-b;
	if (result < 0){setCarryFlag();}
	if(a&0x0F < d&0x0F){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	a=(result&0x00ff);
	m=1;
	t=4;
	setSubFlag();
}

//0x91
var sub_c_a = function(){
	var result=a-c;
	if (result < 0){setCarryFlag();}
	if(a&0x0F < d&0x0F){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	a=(result&0x00ff);
	m=1;
	t=4;
	setSubFlag();
}

//0x92
var sub_d_a = function(){
	var result=a-d;
	if (result < 0){setCarryFlag();}
	if(a&0x0F < d&0x0F){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	a=(result&0x00ff);
	m=1;
	t=4;
	setSubFlag();
}

//0x93
var sub_e_a = function(){
	var result=a-e;
	if (result < 0){setCarryFlag();}
	if(a&0x0F < d&0x0F){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	a=(result&0x00ff);
	m=1;
	t=4;
	setSubFlag();
}

//0x94
var sub_h_a = function(){
	var result=a-h;
	if (result < 0){setCarryFlag();}
	if(a&0x0F < d&0x0F){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	a=(result&0x00ff);
	m=1;
	t=4;
	setSubFlag();
}

//0x95
var sub_l_a = function(){
	var result = a-l;
	if (result < 0){setCarryFlag();}
	if(a&0x0F < d&0x0F){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	a=(result&0x00ff);
	m=1;
	t=4;
	setSubFlag();
}

//0x96
var sub_hl_a = function(){
	var result=a-memory.readByte(getAddr(h,l));
	if (result < 0){setCarryFlag();}
	if(a&0x0F < d&0x0F){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	cpu.a=(result&0x00ff);
	m=1;
	t=8;
	setSubFlag();
}

//0x97
var sub_a_a = function(){
	var result=a-a;
	if (result < 0){setCarryFlag();}
	if(a&0x0F < d&0x0F){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	a=(result&0x00ff);
	m=1;
	t=4;
	setSubFlag();
}

//0x98
var sbc_b_a = function(){
	var result=a-b;
	if(CarryFlag()){result-=1;}
	if (result < 0){setCarryFlag();}
	if(a&0x0F < d&0x0F){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	a=(result&0x00ff);
	m=1;
	t=4;
	setSubFlag();
}

//0x99
var sbc_c_a = function(){
	var result=a-c;
	if(CarryFlag()){result-=1;}
	if (result < 0){setCarryFlag();}
	if(a&0x0F < d&0x0F){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	a=(result&0x00ff);
	m=1;
	t=4;
	setSubFlag();
}

//0x9A
var sbc_d_a = function(){
	var result=a-d;
	if(CarryFlag()){result-=1;}
	if (result < 0){setCarryFlag();}
	if(a&0x0F < d&0x0F){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	a=(result&0x00ff);
	m=1;
	t=4;
	setSubFlag();
}

//0x9B
var sbc_e_a = function(){
	var result=a-e;
	if(CarryFlag()){result-=1;}
	if (result < 0){setCarryFlag();}
	if(a&0x0F < d&0x0F){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	a=(result&0x00ff);
	m=1;
	t=4;
	setSubFlag();
}

//0x9C
var sbc_h_a = function(){
	var result=a-h;
	if(CarryFlag()){result-=1;}
	if (result < 0){setCarryFlag();}
	if(a&0x0F < d&0x0F){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	a=(result&0x00ff);
	m=1;
	t=4;
	setSubFlag();
}

//0x9D
var sbc_l_a = function(){
	var result=a-l;
	if(CarryFlag()){result-=1;}
	if (result < 0){setCarryFlag();}
	if(a&0x0F < d&0x0F){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	a=(result&0x00ff);
	m=1;
	t=4;
	setSubFlag();
}

//0x9E
var sbc_hl_a = function(){
	var result=a-memory.readByte(getAddr(h,l));
	if(CarryFlag()){result-=1;}
	if (result < 0){setCarryFlag();}
	if(a&0x0F < d&0x0F){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	a=(result&0x00ff);
	m=1;
	t=8;
	setSubFlag();
}

//0x9F
var sbc_a_a = function(){
	var result=a-a;
	if(CarryFlag()){result-=1;}
	if (result < 0){setCarryFlag();}
	if(a&0x0F < d&0x0F){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	a=(result&0x00ff);
	m=1;
	t=4;
	setSubFlag();
}

//0xA0
var and_b = function(){
	a&=b;
	if (a===0){setZeroFlag();}else{resetZeroFlag();}
	resetSubFlag();
	setHalfFlag();
	resetCarryFlag();
	m=1;
	t=4;
}

//0xA1
var and_c = function(){
	a&=c;
	if (a===0){setZeroFlag();}else{resetZeroFlag();}
	resetSubFlag();
	setHalfFlag();
	resetCarryFlag();
	m=1;
	t=4;
}

//0xA2
var and_d = function(){
	a&=d;
	if (a===0){setZeroFlag();}else{resetZeroFlag();}
	resetSubFlag();
	setHalfFlag();
	resetCarryFlag();
	m=1;
	t=4;
}

//0xA3
var and_e = function(){
	a&=e;
	if (a===0){setZeroFlag();}else{resetZeroFlag();}
	resetSubFlag();
	setHalfFlag();
	resetCarryFlag();
	m=1;
	t=4;
}

//0xA4
var and_h = function(){
	a&=h;
	if (a===0){setZeroFlag();}else{resetZeroFlag();}
	resetSubFlag();
	setHalfFlag();
	resetCarryFlag();
	m=1;
	t=4;
}

//0xA5
var and_l = function(){
	a&=l;
	if (a===0){setZeroFlag();}else{resetZeroFlag();}
	resetSubFlag();
	setHalfFlag();
	resetCarryFlag();
	m=1;
	t=4;
}

//0xA6
var and_hl = function(){
	a&=readByte(getAddr(h,l));
	if (a===0){setZeroFlag();}else{resetZeroFlag();}
	resetSubFlag();
	setHalfFlag();
	resetCarryFlag();
	m=1;
	t=8;
}

//0xA7
var and_a = function(){
	a&=a;
	if (a===0){setZeroFlag();}else{resetZeroFlag();}
	resetSubFlag();
	setHalfFlag();
	resetCarryFlag();
	m=1;
	t=4;
}

//0xA8
var xor_b = function(){
	a^=b;
	if (a===0){setZeroFlag();}else{resetZeroFlag();}
	resetSubFlag();
	resetHalfFlag();
	resetCarryFlag();
	m=1;
	t=4;
}

//0xA9
var xor_c = function(){
	a^=c;
	if (a===0){setZeroFlag();}else{resetZeroFlag();}
	resetSubFlag();
	resetHalfFlag();
	resetCarryFlag();
	m=1;
	t=4;
}

//0xAA
var xor_d = function(){
	a^=d;
	if (a===0){setZeroFlag();}else{resetZeroFlag();}
	resetSubFlag();
	resetHalfFlag();
	resetCarryFlag();
	m=1;
	t=4;
}

//0xAB
var xor_e = function(){
	a^=e;
	if (a===0){setZeroFlag();}else{resetZeroFlag();}
	resetSubFlag();
	resetHalfFlag();
	resetCarryFlag()
	m=1;
	t=4;;
}

//0xAC
var xor_h = function(){
	a^=h;
	if (a===0){setZeroFlag();}else{resetZeroFlag();}
	resetSubFlag();
	resetHalfFlag();
	resetCarryFlag();
	m=1;
	t=4;
}

//0xAD
var xor_l = function(){
	a^=l;
	if (a===0){setZeroFlag();}else{resetZeroFlag();}
	resetSubFlag();
	resetHalfFlag();
	resetCarryFlag();
	m=1;
	t=4;
}

//0xAE
var xor_hl = function(){
	a^=readByte(getAddr(h,l));
	if (a===0){setZeroFlag();}else{resetZeroFlag();}
	resetSubFlag();
	resetHalfFlag();
	resetCarryFlag();
	m=1;
	t=8;
}

//0xAF
var xor_a = function(){
	a^=a;
	if (a===0){setZeroFlag();}else{resetZeroFlag();}
	resetSubFlag();
	resetHalfFlag();
	resetCarryFlag();
	m=1;
	t=4;
}

//0xB0
var or_b = function(){
	a|=b;
	if (a===0){setZeroFlag();}else{resetZeroFlag();}
	resetSubFlag();
	resetHalfFlag();
	resetCarryFlag();
	m=1;
	t=4;
}

//0xB1
var or_c = function(){
	a|=c;
	if (a===0){setZeroFlag();}else{resetZeroFlag();}
	resetSubFlag();
	resetHalfFlag();
	resetCarryFlag();
	m=1;
	t=4;
}

//0xB2
var or_d = function(){
	a|=d;
	if (a===0){setZeroFlag();}else{resetZeroFlag();}
	resetSubFlag();
	resetHalfFlag();
	resetCarryFlag();
	m=1;
	t=4;
}

//0xB3
var or_e = function(){
	a|=e;
	if (a===0){setZeroFlag();}else{resetZeroFlag();}
	resetSubFlag();
	resetHalfFlag();
	resetCarryFlag();
	m=1;
	t=4;
}

//0xB4
var or_h = function(){
	a|=h;
	if (a===0){setZeroFlag();}else{resetZeroFlag();}
	resetSubFlag();
	resetHalfFlag();
	resetCarryFlag();
	m=1;
	t=4;
}

//0xB5
var or_l = function(){
	a|=l;
	if (a===0){setZeroFlag();}else{resetZeroFlag();}
	resetSubFlag();
	resetHalfFlag();
	resetCarryFlag();
	m=1;
	t=4;
}

//0xB6
var or_hl = function(){
	a|=readByte(getAddr(h,l));;
	if (a===0){setZeroFlag();}else{resetZeroFlag();}
	resetSubFlag();
	resetHalfFlag();
	resetCarryFlag();
	m=1;
	t=4;
}

//0xB7
var or_a = function(){
	a^=a;
	if (a===0){setZeroFlag();}else{resetZeroFlag();}
	resetSubFlag();
	resetHalfFlag();
	resetCarryFlag();
	m=1;
	t=4;
}

//0xB8
var cp_b = function(){
	var result= a-b;
	if (result < 0){setCarryFlag();}
	if(a&0x0F < b&0x0F){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	setSubFlag();
	m=1;
	t=4;
}
//0xB9
var cp_c = function(){
	var result= a-c;
	if (result < 0){setCarryFlag();}
	if(a&0x0F < c&0x0F){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	setSubFlag();
	m=1;
	t=4;
}

//0xBA
var cp_d = function(){
	var result= a-d;
	if (result < 0){setCarryFlag();}
	if(a&0x0F < d&0x0F){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	setSubFlag();
	m=1;
	t=4;
}

//0xBB
var cp_e = function(){
	var result= a-e;
	if (result < 0){setCarryFlag();}
	if(a&0x0F < e&0x0F){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	setSubFlag();
	m=1;
	t=4;
}

//0xBC
var cp_h = function(){
	var result= a-h;
	if (result < 0){setCarryFlag();}
	if(a&0x0F < h&0x0F){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	setSubFlag();
	m=1;
	t=4;
}

//0xBD
var cp_l = function(){
	var result= a-l;
	if (result < 0){setCarryFlag();}
	if(a&0x0F < l&0x0F){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	setSubFlag();
	m=1;
	t=4;
}

//0xBE
var cp_hl = function(){
	var value=readbyte(getAddr(h,l));
	var result= a-value;
	if (result < 0){setCarryFlag();}
	if(a&0x0F < value&0x0F){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	setSubFlag();
	m=1;
	t=4;
}

//0xBF
var cp_a = function(){
	var result= a-a;
	if (result < 0){setCarryFlag();}
	if(a&0x0F < a&0x0F){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	setSubFlag();
	m=1;
	t=4;
}

//0xC0
var ret_nz = function(){
	m=1;
	if (!zeroFlag()){
	pc=memory.readWord(sp);
	t=20;
	sp+=2;
	}else{
	t=8;
	}
}

//0xC1
var pop_bc = function{
	c=memory.readByte(sp+1);
	b=memory.readByte(sp+2);
	sp+=2;
	m=1;
	t=12;
}

//0xC2
var jp_nz_nn = function(){
	if(!zeroFlag()){
	pc=memory.readWord(pc+1);
	t=16;
	m=1;
	}else{
	t=12;
	m=3;
	}
}

//0xC3
var jp_nn = function(){
	pc=memory.readWord(pc+1);
	m=3;
	t=16;
}

//0xC4
var call_nz_nn = function(){
	m=3;
	if(!zeroFlag()){
	memory.writeWord(pc+3,sp);
	pc=memory.readWord(pc+1);
	t=24;
	}else{
	t=12;
	pc+=2
}

//0xC5
var push_bc = function(){
	memory.writeByte(b, sp);
	memory.writeByte(b,sp-1);
	sp-=2;
	m=1;
	t=16;
}

//0xC6
var add_a_n = function(){
	var value =readByte(pc+1);
	var result=a+value;
	if (result > 255){setCarryFlag();}
	if(((a&0x0F) + (value&0x0F))&0x10){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	a=(result&0x00ff);
	m=1;
	t=4;
	resetSubFlag();
}

//0xC7
var rst_0 = function(){
	memory.writeWord(pc+1, sp);
	sp-=2;
	pc=0x0000
	m=1;
	t=16;
}

//0xC8
var ret_z = function(){
	m=1;
	if(zeroFlag){
    var addr=memory.readbyte(sp);
	addr << 8;
	addr+= readByte(sp+1);
	sp+=2;
	pc=addr;
	t=20
	}
	t=8;
}

//0xC9
var ret = function(){
	var addr=memory.readbyte(sp);
	addr << 8;
	addr+= readByte(sp+1);
	sp+=2;
	pc=addr;
	m=1;
	t=16;
}

//0xCA
var jp_z_nn = function(){
	if(zeroFlag()){
	pc=memory.readWord(pc+1);
	t=16;
	m=1;
	}else{
	t=12;
	m=3;
	}
}

//0xCB
var ext_ops = function(){
	twoByteInstructions[memory.readByte(pc+1)]();
	m+=1;
	t+=4;
}

//0xCC
var call_z_nn = function(){
	m=3;
	if(zeroFlag()){
	memory.writeWord(pc+3,sp);
	pc=memory.readWord(pc+1);
	t=24;
	}else{
	t=12;
	pc+=2
}

//0xCD
var call_nn = function(){
	memory.writeWord(pc+3,sp);
	pc=memory.readWord(pc+1);
	t=24;
	m=3;
}

//0xCE
var adc_a_n = function
	var value=memory.readByte(pc+1);
	var result= a+value;
	if(CarryFlag()){result+=1;}
	if (result & 0xff00){setCarryFlag();}
	if(((a&0x0F) + (value&0x0F))&0x10){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	a=(result&0x00ff);
	m=2;
	t=8;
	resetSubFlag();
}

//0xCF
var rst_8 =  function(){
	memory.writeWord(pc+1, sp);
	sp-=2;
	pc=0x0008
	m=1;
	t=16;
}

//0xD0
var ret_nc = function(){
	m=1;
	if (!carryFlag()){
	pc=memory.readWord(sp);
	t=20;
	sp+=2;
	}else{
	t=8;
	}
}

//0xD1
var pop_de = function{
	e=memory.readByte(sp+1);
	d=memory.readByte(sp+2);
	sp+=2;
	m=1;
	t=12;
}

//0xD2
var jp_nc_nn = function(){
	if(!carryFlag()){
	pc=memory.readWord(pc+1);
	t=16;
	m=1;
	}else{
	t=12;
	m=3;
	}
}

//0xD3, 0XDB, 0xDD, 0xE3, 0xE4, 0xEB, 0xEC, 0xED, 0xF, 0xFC, 0xFD
var unused = function(){
	var iv = memory.readByte(pc);
	console.log("invalid opcode ", iv);
}

//0xD4
ar call_nc_nn = function(){
	m=3;
	if(!carryFlag()){
	memory.writeWord(pc+3,sp);
	pc=memory.readWord(pc+1);
	t=24;
	}else{
	t=12;
	pc+=2
}

//0xD5
var push_de = function(){
	memory.writeByte(d, sp);
	memory.writeByte(e,sp-1);
	sp-=2;
	m=1;
	t=16;
}

//0xD6
var sub_a_n = function(){
	var value = readByte(pc+1);
	var result=a-value;
	if (result < 0){setCarryFlag();}
	if(a&0x0F < value&0x0F){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	a=(result&0x00ff);
	m=1;
	t=4;
	setSubFlag();
}

//0xD7
var rst_10 = function(){
	memory.writeWord(pc+1, sp);
	sp-=2;
	pc=0x0010
	m=1;
	t=16;
}

//0xD8
var ret_c = function(){
	m=1;
	if(carryFlag){
    var addr=memory.readbyte(sp);
	addr << 8;
	addr+= readByte(sp+1);
	sp+=2;
	pc=addr;
	t=20
	}
	t=8;
}

//0xD9
var reti = function(){
	i=true;
	var addr=memory.readbyte(sp);
	addr << 8;
	addr+= readByte(sp+1);
	sp+=2;
	pc=addr;
	m=1;
	t=16;
}

//0xDA
var jp_c_nn = function(){
	if(carryFlag()){
	pc=memory.readWord(pc+1);
	t=16;
	m=1;
	}else{
	t=12;
	m=3;
	}
}

//0xDB
//unused

//0xDC
var call_c_nn = function(){
	m=3;
	if(carryFlag()){
	memory.writeWord(pc+3,sp);
	pc=memory.readWord(pc+1);
	t=24;
	}else{
	t=12;
	pc+=2
}

//0xDD
//unused

//0xDE
var sbc_a_n = function(){
	var value=memory.readByte(pc+1);
	var result=a - value;
	if(CarryFlag()){result-=1;}
	if (result < 0){setCarryFlag();}
	if(a&0x0F < value&0x0F){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	a=(result&0x00ff);
	m=1;
	t=4;
	setSubFlag();
}

//0xDF
var rst_18 =  function(){
	memory.writeWord(pc+1, sp);
	sp-=2;
	pc=0x0018
	m=1;
	t=16;
}

//0xE0
var ldh_n_a = function(){
	a=memory.readByte(pc+1);
	m=2;
	t=12;
}
	
//0xE1
var pop_hl = function{
	l=memory.readByte(sp+1);
	h=memory.readByte(sp+2);
	sp+=2;
	m=1;
	t=12;
}

//0xE2
var ldh_c_a = function(){
	var addr = 0xFF00 + c;
	memory.writebye(a, addr);
	m=2;
	t=8
}

//0xE3, 0xE4
//unused

//0xE5
var push_hl = function(){
	memory.writeByte(h, sp);
	memory.writeByte(l,sp-1);
	sp-=2;
	m=1;
	t=16;
}

//0xE6
var and_n = function(){
	value=readByte(pc+1)
	a&=value;
	if (a===0){setZeroFlag();}else{resetZeroFlag();}
	resetSubFlag();
	setHalfFlag();
	resetCarryFlag();
	m=2;
	t=8;
}

//0xE7
var rst_20 = function(){
	memory.writeWord(pc+1, sp);
	sp-=2;
	pc=0x0020
	m=1;
	t=16;
}

//0xE8
var add_sp_d = function(){
	value = readByte(pc+1);
	sp+=value;
	resetZeroFlag();
	resetSubFlag();
	if(((sp&0x0F) + (value&0x0F))&0x10){setHalfFlag();}else {resetHalfFlag();}
	if (sp>65535){setCarryFlag();} else {resetCarryFlag();}
	m=2;
	t=16;
}

//0xE9
var jp_hl = function(){
	pc=memory.readByte(getAddr(h,l));
	m=1;
	t=4;
}

//0xEA
var ld_nn_a = function();
	writeByte(a, readWord(pc+1));
	m=3;
	t=16;
}

//0xEE
var xor_n = function(){
	var value=readByte(pc+1);
	a^=value;
	if (a===0){setZeroFlag();}else{resetZeroFlag();}
	resetSubFlag();
	resetHalfFlag();
	resetCarryFlag();
	m=2;
	t=8;
}

//0xEF
var rst_28 =  function(){
	memory.writeWord(pc+1, sp);
	sp-=2;
	pc=0x0028
	m=1;
	t=16;
}

//0xF0
var ldh_a_n = function(){
	var addr=0xFF00+memory.readByte(pc+1);
	a=memory.readByte(addr);
	m=2;
	t=12;
	}

//0xF1
var pop_af = function(){
	f=memory.readByte(sp+1);
	a=memory.readByte(sp+2);
	sp+=2;
	m=1;
	t=12;	
}
	
//0xF2
var ld_a_c = function(){
	var addr=0xFF00+c;
	a=memory.readByte(addr);
	m=1;
	t=8;
}

//0xF3
var di = function(){
	i=false;
	m=1;
	t=4;
}

//0xF5
var push_af = function(){
	memory.writeByte(a, sp);
	memory.writeByte(f,sp-1);
	sp-=2;
	m=1;
	t=16;
}

//0xF7
var or_n = function(){
	a|=memory.readByte(pc+1);
	if (a===0){setZeroFlag();}else{resetZeroFlag();}
	resetSubFlag();
	resetHalfFlag();
	resetCarryFlag();
	m=1;
	t=4;
}

//0xF8
var rst_30 = function(){
	memory.writeWord(pc+1, sp);
	sp-=2;
	pc=0x0030
	m=1;
	t=16;
}

//0xF9
var ldhl_sp_d = function(){
	var value = sp+memory.readByte(pc+1);
	h=(value>>8)&0x00FF;
	l=value&0x00FF;
	if (value>65535){setCarryFlag();} else {resetCarryFlag();}
	if(((sp&0x0F00) + (value&0x0F00))&0x1000){setHalfFlag();}else {resetHalfFlag();}
	m=2;
	t=12;
	resetZeroFlag();
	resetSubFlag();
}

//0xFA
var ld_sp_hl = function(){
	sp=h<<8;
	sp+=l;
	m=1;
	t=8;
}
	
//0xFB
var ld_a_nn = function(){
	a=readWord(pc+1);
	m=3;
	t=16;
}

//0xFC
var ei= function(){
	i=true;
	m=1;
	t=4;
}

//0xFE
var cp_n = function 
	var value=memory.readByte(pc+1);
	var result= a-value;
	if (result < 0){setCarryFlag();}
	if(a&0x0F < value&0x0F){setHalfFlag();}else {resetHalfFlag();}
	if (result === 0){setZeroFlag();}else{resetZeroFlag();}
	setSubFlag();
	m=2;
	t=8;
}

//0xFF
var rst_38 =  function(){
	memory.writeWord(pc+1, sp);
	sp-=2;
	pc=0x0038
	m=1;
	t=16;
}

//---------------------//
//-2 byte Instructions-//
//---------------------//

//0x00
var rlc_b = function(){
	var carrybit= (b>>7)&0x01;
	if (carrybit===1){setCarryFlag();} else {resetCarryFlag();}
	b<<1;
	b+=carrybit;
	if (b===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}

//0x01
var rlc_c = function(){
	var carrybit= (c>>7)&0x01;
	if (carrybit===1){setCarryFlag();} else {resetCarryFlag();}
	c<<1;
	c+=carrybit;
	if (c===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}

//0x02
var rlc_d = function(){
	var carrybit= (d>>7)&0x01;
	if (carrybit===1){setCarryFlag();} else {resetCarryFlag();}
	d<<1;
	d+=carrybit;
	if (d===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}

//0x03
var rlc_e = function(){
	var carrybit= (e>>7)&0x01;
	if (carrybit===1){setCarryFlag();} else {resetCarryFlag();}
	e<<1;
	e+=carrybit;
	if (e===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}

//0x04
var rlc_h = function(){
	var carrybit= (h>>7)&0x01;
	if (carrybit===1){setCarryFlag();} else {resetCarryFlag();}
	h<<1;
	h+=carrybit;
	if (h===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}

//0x05
var rlc_l = function(){
	var carrybit= (l>>7)&0x01;
	if (carrybit===1){setCarryFlag();} else {resetCarryFlag();}
	l<<1;
	l+=carrybit;
	if (l===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}

//0x06
var rlc_hl = function(){
	var value=memory.readByte(getAddr(h,l));
	var carrybit= (value>>7)&0x01;
	if (carrybit===1){setCarryFlag();} else {resetCarryFlag();}
	value<<1;
	value+=carrybit;
	memory.writeByte(value,getAddr(h,l));
	if (value===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}

//0x07
var rlc_a = function(){
	var carrybit= (a>>7)&0x01;
	if (carrybit===1){setCarryFlag();} else {resetCarryFlag();}
	a<<1;
	a+=carrybit;
	if (a===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}

//0x08
var rrc_b = function(){
	var carrybit = (b<<7)&0x80;
	if (carrybit){setCarryFlag();} else {resetCarryFlag();}
	b>>1;
	b+=carrybit;
	if(b===0){setZeroFlag();} else {resetZeroFlag();}
	resetSubFlag();
	resetHalfFlag();
	m=2;
	t=8;
}		

//0x09
var rrc_c = function(){
	var carrybit = (c<<7)&0x80;
	if (carrybit){setCarryFlag();} else {resetCarryFlag();}
	c>>1;
	c+=carrybit;
	if(c===0){setZeroFlag();} else {resetZeroFlag();}
	resetSubFlag();
	resetHalfFlag();
	m=2;
	t=8;
}		

//0x0A
var rrc_d = function(){
	var carrybit = (d<<7)&0x80;
	if (carrybit){setCarryFlag();} else {resetCarryFlag();}
	d>>1;
	d+=carrybit;
	if(d===0){setZeroFlag();} else {resetZeroFlag();}
	resetSubFlag();
	resetHalfFlag();
	m=2;
	t=8;
}	

//0x0B	
var rrc_e = function(){
	var carrybit = (e<<7)&0x80;
	if (carrybit){setCarryFlag();} else {resetCarryFlag();}
	e>>1;
	e+=carrybit;
	if(e===0){setZeroFlag();} else {resetZeroFlag();}
	resetSubFlag();
	resetHalfFlag();
	m=2;
	t=8;
}		


//0x0C
var rrc_h = function(){
	var carrybit = (h<<7)&0x80;
	if (carrybit){setCarryFlag();} else {resetCarryFlag();}
	h>>1;
	h+=carrybit;
	if(h===0){setZeroFlag();} else {resetZeroFlag();}
	resetSubFlag();
	resetHalfFlag();
	m=2;
	t=8;
}		

//0x0D
var rrc_l = function(){
	var carrybit = (l<<7)&0x80;
	if (carrybit){setCarryFlag();} else {resetCarryFlag();}
	l>>1;
	l+=carrybit;
	if(l===0){setZeroFlag();} else {resetZeroFlag();}
	resetSubFlag();
	resetHalfFlag();
	m=2;
	t=8;
}		

//0x0E
var rrc_hl = function(){
	var value=memory.readByte(getAddr(h,l));
	var carrybit = (value<<7)&0x80;
	if (carrybit){setCarryFlag();} else {resetCarryFlag();}
	value>>1;
	value+=carrybit;
	memory.writeByte(value, getAddr(h,l));
	if(b===0){setZeroFlag();} else {resetZeroFlag();}
	resetSubFlag();
	resetHalfFlag();
	m=2;
	t=8;
}		

//0x0F
var rrc_a = function(){
	var carrybit = (a<<7)&0x80;
	if (carrybit){setCarryFlag();} else {resetCarryFlag();}
	a>>1;
	a+=carrybit;
	if(a===0){setZeroFlag();} else {resetZeroFlag();}
	resetSubFlag();
	resetHalfFlag();
	m=2;
	t=8;
}		

//0x10
var rl_b = function(){
	var carry = carryFlag()?1:0;
	if (b&0x80===0x80){setCarryFlag();} else {resetCarryFlag();}
	b<<1;
	b+=carry;
	b&=0xFF;
	if(b===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}

//0x11
var rl_c = function(){
	var carry = carryFlag()?1:0;
	if (c&0x80===0x80){setCarryFlag();} else {resetCarryFlag();}
	c<<1;
	c+=carry;
	c&=0xFF;
	if(c===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}

//0x12
var rl_d = function(){
	var carry = carryFlag()?1:0;
	if (d&0x80===0x80){setCarryFlag();} else {resetCarryFlag();}
	d<<1;
	d+=carry;
	d&=0xFF;
	if(d===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}

//0x13
var rl_e = function(){
	var carry = carryFlag()?1:0;
	if (e&0x80===0x80){setCarryFlag();} else {resetCarryFlag();}
	e<<1;
	e+=carry;
	e&=0xFF;
	if(e===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}

//0x14
var rl_h = function(){
	var carry = carryFlag()?1:0;
	if (h&0x80===0x80){setCarryFlag();} else {resetCarryFlag();}
	h<<1;
	h+=carry;
	h&=0xFF;
	if(h===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}

//0x15
var rl_l = function(){
	var carry = carryFlag()?1:0;
	if (l&0x80===0x80){setCarryFlag();} else {resetCarryFlag();}
	l<<1;
	l+=carry;
	l&=0xFF;
	if(l===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}

//0x16
var rl_hl = function(){
	var value=memory.readByte(getAddr(h,l));
	var carry = carryFlag()?1:0;
	if (value&0x80===0x80){setCarryFlag();} else {resetCarryFlag();}
	value<<1;
	value+=carry;
	value&=0xFF;
	memory.writeByte(value, getAddr(h,l));
	if(value===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}

//0x17
var rl_a = function(){
	var carry = carryFlag()?1:0;
	if (a&0x80===0x80){setCarryFlag();} else {resetCarryFlag();}
	a<<1;
	a+=carry;
	a&=0xFF;
	if(a===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}

//0x18
var rr_b = function(){
	var carry = carryFlag()?0x80:0;
	if (b&0x01){setCarryFlag();} else {resetCarryFlag();}
	b>>1;
	b+=carry;
	b&=0xFF;
	if(a===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}

//0x19
var rr_c = function(){
	var carry = carryFlag()?0x80:0;
	if (c&0x01){setCarryFlag();} else {resetCarryFlag();}
	c>>1;
	c+=carry;
	c&=0xFF;
	if(c===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}

}

//0x1A
var rr_d = function(){
	var carry = carryFlag()?0x80:0;
	if (d&0x01){setCarryFlag();} else {resetCarryFlag();}
	d>>1;
	d+=carry;
	d&=0xFF;
	if(d===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}


//0x1B
var rr_e = function(){
	var carry = carryFlag()?0x80:0;
	if (c&0x01){setCarryFlag();} else {resetCarryFlag();}
	e>>1;
	e+=carry;
	e&=0xFF;
	if(e===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}

//0x1C
var rr_h = function(){
	var carry = carryFlag()?0x80:0;
	if (h&0x01){setCarryFlag();} else {resetCarryFlag();}
	h>>1;
	c+=carry;
	c&=0xFF;
	if(c===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}

//0x1D
var rr_l = function(){
	var carry = carryFlag()?0x80:0;
	if (l&0x01){setCarryFlag();} else {resetCarryFlag();}
	l>>1;
	l+=carry;
	l&=0xFF;
	if(l===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}

//0x1E
var rr_hl = function(){
	var value=memory.readByte(getAddr(h,l));
	var carry = carryFlag()?0x80:0;
	if (value&0x01){setCarryFlag();} else {resetCarryFlag();}
	value>>1;
	value+=carry;
	value&=0xFF;
	memory.writeByte(value, getAddr(h,l));
	if(l===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}

//0x1F
var rr_a = function(){
	var carry = carryFlag()?0x80:0;
	if (a&0x01){setCarryFlag();} else {resetCarryFlag();}
	a>>1;
	a+=carry;
	a&=0xFF;
	if(a===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}

//0x20
var sla_b = function(){
	if(b&0x80){setCarryBit();} else {resetCarryBit();}
	b<<1;
	b&=0xFF;
	if(b===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}

//0x21
var sla_c = function(){
	if(c&0x80){setCarryBit();} else {resetCarryBit();}
	c<<1;
	c&=0xFF;
	if(c===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}

//0x22
var sla_d = function(){
	if(d&0x80){setCarryBit();} else {resetCarryBit();}
	d<<1;
	d&=0xFF;
	if(d===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}

//0x23
var sla_e = function(){
	if(e&0x80){setCarryBit();} else {resetCarryBit();}
	e<<1;
	e&=0xFF;
	if(e===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}

//0x24
var sla_h = function(){
	if(e&0x80){setCarryBit();} else {resetCarryBit();}
	h<<1;
	h&=0xFF;
	if(h===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}

//0x25
var sla_l = function(){
	if(h&0x80){setCarryBit();} else {resetCarryBit();}
	l<<1;
	l&=0xFF;
	if(l===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}

//0x26
var sla_hl = function(){
	var value=memory.readByte(getAddr(h,l));
	if(value&0x80){setCarryBit();} else {resetCarryBit();}
	value<<1;
	value&=0xFF;
	memory.writeByte(value, getAddr(h,l));
	if(value===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}

//0x27
var sla_a = function(){
	if(a&0x80){setCarryFlag();} else {resetCarryFlag();}
	a<<1;
	a&=0xFF;
	if(a===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}

//0x28
var sra_b =function(){
	if (b&0x01){setCarryFlag();} else {resetCarryFlag();}
	var msb=(b&0x80);
	b>>1;
	b|=msb;
	if(b===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}

//0x29
var sra_c =function(){
	if (c&0x01){setCarryFlag();} else {resetCarryFlag();}
	var msb=(c&0x80);
	c>>1;
	c|=msb;
	if(c===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}

//0x2A
var sra_d =function(){
	if (d&0x01){setCarryFlag();} else {resetCarryFlag();}
	var msb=(d&0x80);
	d>>1;
	d|=msb;
	if(d===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}

//0x2B
var sra_e =function(){
	if (e&0x01){setCarryFlag();} else {resetCarryFlag();}
	var msb=(e&0x80);
	e>>1;
	e|=msb;
	if(e===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}

//0x2C
var sra_h =function(){
	if (h&0x01){setCarryFlag();} else {resetCarryFlag();}
	var msb=(h&0x80);
	h>>1;
	h|=msb;
	if(h===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}

//0x2D
var sra_l =function(){
	if (l&0x01){setCarryFlag();} else {resetCarryFlag();}
	var msb=(l&0x80);
	l>>1;
	l|=msb;
	if(l===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}

//0x2E
var sra_hl =function(){
	var value=memory.readByte(getAddr(h,l));
	if (value&0x01){setCarryFlag();} else {resetCarryFlag();}
	var msb=(value&0x80);
	value>>1;
	value|=msb;
	memory.writeByte(value, getAddr(h,l));
	if(value===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}

//0x2F
var sra_a =function(){
	if (a&0x01){setCarryFlag();} else {resetCarryFlag();}
	var msb=(a&0x80);
	a>>1;
	a|=msb;
	if(a===0){setZeroFlag();} else {resetZeroFlag();}
	resetHalfFlag();
	resetSubFlag();
	m=2;
	t=8;
}




//------------------//
//-helper functions-//
//------------------//


var zeroFlag = function(){
	if(f&0x80){return true;}
	return false;
	}

var setZeroFlag = function(){
	f|=0x80;
}

var resetZeroFlag = function(){
	f&=0x70;
}

var subFlag = function(){
	if(f&0x40){return true;}
	return false;
	}

var setSubFlag = function(){
	f|=0x40;
}

var resetSubFlag = function(){
	f&=0xB0;
}

var halfFlag = function(){
	if(f&0x20){return true;}
	return false;
	}

var setHalfFlag= function(){
	f|=0x20;
}

var resetHalfFlag = function(){
	f&=0xD0;
}

var carryFlag = function(){
	if(f&0x10){return true;}
	return false;
	}

var setCarryFlag = function(){
	f|=0x10;
}

var resetCarryFlag = function(){
	f&=0xE0;
}

var getAddr = function(a,b){ //finds and returns combined address of two 8bit registers
	var addr = a;
	addr<<8;
	addr+=b;
	return addr;
}
