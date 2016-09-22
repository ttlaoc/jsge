if(typeof(YoreSoftware) == "undefined") {
    var YoreSoftware = {};
};

if(typeof(YoreSoftware.JSGE) == "undefined") {
    YoreSoftware.JSGE = {};
};

/*---------------------------------------------------------------------------*/
/* Class Object */
/*---------------------------------------------------------------------------*/

YoreSoftware.JSGE.Object = function(params) {
	//Primera línea obligatoria en todos los constructores
	this.__class_extends(params);
};

YoreSoftware.JSGE.Object.prototype.__classname = "Object";
YoreSoftware.JSGE.Object.prototype.__inheritance_tree = null;

/* Método de extensión de Object. Todas las clases deben tener un atributo
 * al que se le asigne este método. Para hacerlo deben asignarle al atributo
 * de la clase, el valor de la variable "YoreSoftware.JSGE.__class_extends".
 * 
 * Supongamos que creamos una clase "Student" que está en el
 * espacio de nombres "YoreSoftware.HighSchoolGame". La asignación debería
 * tener la forma:
 * "YoreSofware.HighSchoolGame.Student = YoreSoftware.JSGE.__class_extends"
 */
YoreSoftware.JSGE.Object.prototype.__class_extends = function(params) {
	if (!params) {
        params = {};
    }
    var myInit = this.__init;
    //Almacena todos los padres
    var parents = [];
    var parent = this.__super;
	var classname = this.__classname;
    this.__inheritance_tree = classname;
    while (parent != null) {
        this.__inheritance_tree = parent.prototype.__classname + ":" + //
        this.__inheritance_tree;
        parents.push(parent);
        //Copia los prototype de los padres
        for (var elem in parent.prototype) {
            if (!this[elem]) {
                this[elem] = parent.prototype[elem];
            }
        }
        parent = parent.prototype.__super;
    }
    //Inicializa los padres primero
    var numParents = parents.length;
    for (var i = numParents - 1; i >= 0; i--) {
        parent = parents[i];
        if (parent.prototype.__init) {
            parent.prototype.__init(this, params);
        }
    }
    //Inicializa el objeto "this"
    if (myInit) {
        myInit(this, params);
    }
	YoreSoftware.JSGE.Object.__postCreate(this);
};

/* Qué hace una clase después de aplicarle el mecanismo de la herencia
 * y de crearse.
 */
YoreSoftware.JSGE.Object.__postCreate = function(object) {
	//YoreSoftware.JSGE.Object.__exeEventCallbacks(KObject.__POST_CREATE, object);
};

/* Se almacena el método de extensión en una variable global dentro del
 * espacio de nombres del proyecto, para que pueda ser accedida desde
 * cualquier clase del proyecto. Todas las clases del proyecto deben
 * tener un atributo llamado "__class_extends" al que se le asigne
 * este método.
 * 
 * Supongamos que creamos una clase "Student" que está en el
 * espacio de nombres "YoreSoftware.HighSchoolGame". La asignación debería
 * tener la forma:
 * "YoreSofware.HighSchoolGame.Student = YoreSoftware.JSGE.__class_extends"
 */
YoreSoftware.JSGE.__class_extends = YoreSoftware.JSGE.Object.prototype.__class_extends;



/*---------------------------------------------------------------------------*/
/* Class Util */
/*---------------------------------------------------------------------------*/
/**
 * Clase de utilidad que recoge un conjunto de métodos estáticos y públicos
 * que están pensados para facilitar el trabajo con el motor gráfico
 */

//Constructor obligatorio
YoreSoftware.JSGE.Util = function(params) {
	this.__class_extends(params);
};

//Atributos obligatorios
YoreSoftware.JSGE.Util.prototype.__class_extends = YoreSoftware.JSGE.__class_extends;
YoreSoftware.JSGE.Util.prototype.__classname = "[nombre_clase]";
YoreSoftware.JSGE.Util.prototype.__super = YoreSoftware.JSGE.Object;

//---------------------------- Atributos de la clase --------------------------
//Creación e inicialización de los atributos de la clase

YoreSoftware.JSGE.Util.date = new Date();


YoreSoftware.JSGE.initialize = function() {
	var game = new YoreSoftware.JSGE.Game();
	game._startGame();
};

window.onload = function() {
	YoreSoftware.JSGE.initialize();
};