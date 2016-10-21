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

//instruction array
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
	ld_l_b,
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

//instructions

//0x00
var nop = function(){
m=1
t=4
};

//0x01
var ld_bc_nn = function(){
	b=memory.readByte(pc);
	c=memory.readByte(pc+1);
	pc+=2;
	m=3;
	t=12;
};

//0x02
var ld_bc_a = function(){
	var addr = b;
	addr<<8;
	addr+=cpu.c;
	memory.writeByte(addr, a);
	m=1;
	t=8;
};

//0x03
var inc_bc = function(){
	c++;
	if(c>255){
		c=0
		b++;
	}
	m=1;
	t=4;
};

//0x04
var inc_b = function(){
	b++;
	if (b===0){setZeroFlag();}else{resetZeroFlag();}
	if(b===0x10){setHalfFlag();}else {resetHalfFlag();}
	resetSubFlag();	
	m=1;
	t=4;
};

//0x05
var dec_b = function(){
	b--;
	if (b===0){setZeroFlag();}else{resetZeroFlag();}
	if(b===0x0F){setHalfFlag();}else {resetHalfFlag();}
	setSubFlag();	
	m=1;
	t=4;
};

//0x06
var ld_b_n = function(){
	b=memory.readByte(pc+1);
	pc++;
	m=2;
	t=8;
};

//0x07
var rlca = function(){
	var carrybit= a>>7;
	if (carrybit===1){setCarryFlag();}else {resetCarryFlag();}
	a<<1;
	a+=carrybit;
	resetZeroFlag();
	resetHalfFlag();
	resetSubFlag();
};
		

//0x10
var stop = function(){
	m=2;
	t=4;
};

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
	if(e===0){
		d++;
	}
	m=1;
	t=8;
}

//0x14
varinc_d{
	d++;
	if (d===0){setZeroFlag();}else{resetZeroFlag();}
	if(d===0x10){setHalfFlag();}else {resetHalfFlag();}
	resetSubFlag();
	m=1;
	t=4;	
}

//0x15
vardec_d{
	d--;
	if (d===0){setZeroFlag();}else{resetZeroFlag();}
	if(d===0x0F){setHalfFlag();}else {resetHalfFlag();}
	setSubFlag();	
	m=1;
	t=4;
}

//0x16
var ld_d_n = function(){
	h=memory.readByte(pc+1);
	pc++;
	m=2;
	t=8;
}

//0x17
var rla = function(){
	var carrybit;
	if (f&0x80====0x80){carrybit=1;}else{carrybit=0;}
	if (carrybit====1){setCarryFlag();}else {resetCarryFlag();}
	a<<1;
	a+=carrybit;
	resetZeroFlag();
	resetHalfFlag();
	resetSubFlag();
	}

}

//0x20
var jr_nz_n = function() {
	if (!zeroFlag()){
		pc+=memory.readByte(pc+1);
		pc++;
		t=12;
		}
	else{
		pc++;
		t=8;
		}
	m=2;
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
	if(l===0){
		h++;
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

//0x30
var jr_nc_im = function(){
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
var cp_e = function(){
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
	}else{
	t=8;
	}
}

//0xC1
var pop_bc = function{
	b=memory.readWord(sp);
	sp+=2;
	m=1;
	t=12;
}

//0xC2
var jp_nz_nn = function(){
	if(!zeroFlag()){
	pc=memory.readWord(pc+1);
	t=16;
	}else{
	t=12;
	m=3;
	}
}

//0xC3
var jp_nn =function90{
	pc=memory.readWord(pc+1);
	m=3;
	t=16;
}

//0xC4
var call_nz_nn = function(){
}


//helper functions

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

