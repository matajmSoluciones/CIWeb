describe('Convolution',function(){
	it('aplicar filtro blur',function(){
		var previews=[];
		var img=Colors.Convolution(image,Colors.RGB.Effects.Filters.BLUR,64,1,0);
		for(var i=0,n=img.length;i<n;i++){
			expect(img[i]).toBe(Blur1[i]);
		}
	});
})
describe('RGB Parse',function(){
	it('parseToHSV',function(){
		var color=Colors.RGB.parseToHSV(25,35,75);
		expect(color.h).toBe(192);
		expect(color.s).toBe(0.6666666666666667);
		expect(color.v).toBe(45);
	});
	it('parseToHSL',function(){
		var color=Colors.RGB.parseToHSL(25,35,75);
		expect(color.h).toBe(192);
		expect(color.s).toBe(0.5102040816326531);
		expect(color.l).toBe(50);
	});
	it('parseToNormalized',function(){
		var color=Colors.RGB.parseToNormalized(25,35,75);
		expect(color.r).toBe(0.18518518518518517);
		expect(color.g).toBe(0.25925925925925924);
		expect(color.b).toBe(0.5555555555555556);
	});
	it('parseToYCrCb',function(){
		var color=Colors.RGB.parseToYCrCb(25,35,75);
		expect(color.y).toBe(47);
		expect(color.Cr).toBe(147);
		expect(color.Cb).toBe(121);
	});
	it('parseToTLS',function(){
		var color=Colors.RGB.parseToTLS(25,35,75);
		expect(color.t).toBe(0.9262081911747834);
		expect(color.l).toBe(-0.06244444444444442);
		expect(color.s).toBe(0.2222222222222222);
	});
	it('parseToLux',function(){
		var color=Colors.RGB.parseToLux(25,35,75);
		expect(color).toBe(299.0957133530846);
	});
	it('isHuman True',function(){
		var color=Colors.RGB.isHuman(159,96,86);
		expect(color).toBe(true);
	});
	it('isHuman False',function(){
		var color=Colors.RGB.isHuman(238,238,238);
		expect(color).toBe(false);
	});
})