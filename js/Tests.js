if(typeof(YoreSoftware) == "undefined") {
    var YoreSoftware = {};
};

if(typeof(YoreSoftware.JSGE) == "undefined") {
    YoreSoftware.JSGE = {};
};

if(typeof(YoreSoftware.JSGE.Test) == "undefined") {
    YoreSoftware.JSGE.Test = {};
};

YoreSoftware.JSGE.Test.startTest = function(params) {
	var perla = new YoreSoftware.JSGE.Perro({
		numeroPatas : 4,
		especie : "Perro",
		raza : "chucho",
		pedigri : false,
		edad : 8
	});
	
	alert(perla.getEspecie()); //Perro
	alert(perla.getPedigri()); //false
};

YoreSoftware.JSGE.Animal = function(params) {
	this.__class_extends(params);
};



//Atributos obligatorios
YoreSoftware.JSGE.Animal.prototype.__class_extends = YoreSoftware.JSGE.__class_extends;
YoreSoftware.JSGE.Animal.prototype.__classname = "Animal";
YoreSoftware.JSGE.Animal.prototype.__super = Object;

YoreSoftware.JSGE.Animal.prototype.numeroPatas = 2;
YoreSoftware.JSGE.Animal.prototype.especie = "Animal";

YoreSoftware.JSGE.Animal.prototype.__init = function(__self, params) {
	__self.numeroPatas = params.numeroPatas;
	__self.especie = params.especie;
};

YoreSoftware.JSGE.Animal.prototype.getEspecie = function() {
	return this.especie;
};



YoreSoftware.JSGE.Perro = function(params) {
	this.__class_extends(params);
};

//Atributos obligatorios
YoreSoftware.JSGE.Perro.prototype.__class_extends = YoreSoftware.JSGE.__class_extends;
YoreSoftware.JSGE.Perro.prototype.__classname = "Perro";
YoreSoftware.JSGE.Perro.prototype.__super = YoreSoftware.JSGE.Animal;

YoreSoftware.JSGE.Perro.prototype.raza = "Perro";
YoreSoftware.JSGE.Perro.prototype.pedigri = false;
YoreSoftware.JSGE.Perro.prototype.edad = 0;

YoreSoftware.JSGE.Perro.prototype.__init = function(__self, params) {
	__self.raza = params.raza;
	__self.pedigri = params.pedigri;
	__self.edad = params.edad;
};

YoreSoftware.JSGE.Perro.prototype.getPedigri = function() {
	return this.pedigri;
};