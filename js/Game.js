if(typeof(YoreSoftware) == "undefined") {
    var YoreSoftware = {};
};

if(typeof(YoreSoftware.JSGE) == "undefined") {
    YoreSoftware.JSGE = {};
};

/*---------------------------------------------------------------------------*/
/* Class Game */
/*---------------------------------------------------------------------------*/

YoreSoftware.JSGE.Game = function() {
	this.__class_extends(params);
};

//Atributos obligatorios
YoreSoftware.JSGE.Game.prototype.__class_extends = YoreSoftware.JSGE.__class_extends;
YoreSoftware.JSGE.Game.prototype.__classname = "Game";
YoreSoftware.JSGE.Game.prototype.__super = YoreSoftware.JSGE.Object;

//Atributos ESTÁTICOS de la clase

/* Estados en que se puede encontrar el hilo del juego */
/* Jugando normalmente */
YoreSoftware.JSGE.Game._PLAYING = 1;
/* En estado de pausa */
YoreSoftware.JSGE.Game._PAUSE = 2;
/* Estado actual del juego */
YoreSoftware.JSGE.Game._gameState = PLAYING;
/* guarda la referencia al estado que se está ejecutando al entrar
 * en el estado de pausa.
 */
YoreSoftware.JSGE.Game._restoreState;
/* Estado actual en ejecución */
YoreSoftware.JSGE.Game._currentState;
/* Referencia única del canvas del juego */
YoreSoftware.JSGE.Game._canvas;
/* Estado inicial */
YoreSoftware.JSGE.Game.__initState;
/* Ancla de pintado. Se debe tener en cuenta que el ancla de pintado
 * puede ser diferente al de referencia del sistema
 */ 
YoreSoftware.JSGE.Game._anchorX;
YoreSoftware.JSGE.Game._anchorY;
/**
 * <p>Valor que especifica la duración (expresada en milisegundos)
 * de fotograma deseada.</p>
 * <p>El motor de ejecución de esta clase intentará en la medida de lo
 * posible que se respete esta duración ajustando el tiempo de espera
 * en aquellas iteraciones de juego en las que después de realizar todas
 * las operaciones de representación y actualización del estado de juego
 * actual, aun sobre tiempo de fotograma.</p>
 */
YoreSoftware.JSGE.Game.frameDuration;

/**
 * <p>Instancia única del juego.</p>
 */
YoreSoftware.JSGE.Game.instance;
/* Indica cuando la aplicación está activa */
YoreSoftware.JSGE.Game.active = true;

YoreSoftware.JSGE.Game.prototype.__init = function(__self, params) {
	
};

/**
 * <p>Método que el desarrollador debe implementar con la secuencia
 * de inicialización del juego.</p>
 * <p>El desarrollador es libre de implementar la inicialización del
 * juego del modo que estime oportuno, pero como última acción deberá
 * devolver una referencia a la instancia del estado donde se iniciará
 * el juego.</p>
 * <p>Se recomienda crear las instancias de todos los estados del juego
 * dentro de este método.</p>
 * @return estado inicial del juego
 */
YoreSoftware.JSGE.Game.prototype.initialize = function() {
	
};

/* Método de inicialización de cualquier clase del motor
 * que necesite inicialización estática, definiendo para ello
 * métodos init() específicos
 */
YoreSoftware.JSGE.Game._init = function() {
	
};



/**
 * <p>Método que el desarrollador debe implementar con la secuencia
 * de inicialización del juego.</p>
 * <p>El desarrollador es libre de implementar la inicialización del
 * juego del modo que estime oportuno, pero como última acción deberá
 * devolver una referencia a la instancia del estado donde se iniciará
 * el juego.</p>
 * <p>Se recomienda crear las instancias de todos los estados del juego
 * dentro de este método.</p>
 * @return estado inicial del juego
 */
YoreSoftware.JSGE.Game.prototype.initialize = function() {
	
};

/* Punto de entrada del ciclo de vida del juego. El juego se inicia
 * ejecutando este método, que se encargará de inicializar el área
 * de pintado (canvas) y crear los elementos iniciales del motor
 * de juegos.
 */
YoreSoftware.JSGE.Game.prototype._startGame = function() {
	if(instance != null) {
		return;
	}
    YoreSoftware.JSGE.Game.instance = this;
    try {
        /* inicialización sistema */
        YoreSoftware.JSGE.Game._init();
        
		var canvasID = YoreSoftware.JSGE.canvas.id;
		//var div = document.getElementById("hola");
		var canvas = document.getElementById(canvasID);
		var ctx = canvas.getContext(YoreSoftware.JSGE.canvas.context);
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(0,0,150,75);
        
        /* Inicializamos los tests. */
		//YoreSoftware.JSGE.Test.startTest();
        YoreSoftware.JSGE.Game.__initState = this.initialize();
        this.__gameLoop();
    } catch (err) {
    	alert(err);
    }
};

YoreSoftware.JSGE.Game.prototype.__gameLoop = function() {
	this.__runInit();
	this.__emulatedGameLoop();
    Game.instance.destroyApp(false);
};

YoreSoftware.JSGE.Game.prototype.__emulatedGameLoop = function() {
    if(YoreSoftware.JSGE.Game.active) {
        try {
            var start = YoreSoftware.JSGE.Util.date.getTime();
            /* Posibles estados del juego */
        	switch(YoreSoftware.JSGE.Game._gameState) {
        	case PLAYING:
        		this.__runPlaying();
        		break;
        	case PAUSE:
        		this.runInPauseState();
        		break;
        	}
            var elapsed = YoreSoftware.JSGE.Util.date.getTime() - start;
            if (elapsed < YoreSoftware.JSGE.Game.frameDuration) {
                var timeDifference = YoreSoftware.JSGE.Game.frameDuration - elapsed;
                if (timeDifference > 0) {
                    window.setTimeout(YoreSoftware.JSGE.Game.prototype.__emulatedGameLoop, timeDifference);
                }
            }
        } catch (err) {
        	alert(err);
        }
    }
};


YoreSoftware.JSGE.Game.prototype.__runInit = function() {
	try {
		YoreSoftware.JSGE.Game.currentState = YoreSoftware.JSGE.Game.initState;
        if (currentState != null) {
            /* Se establece el tiempo correcto del time provider */
            YoreSoftware.JSGE.TimeProvider.lastCorrectTime = YoreSoftware.JSGE.Util.date.getTime();
            YoreSoftware.JSGE.Game.currentState.entry();
        }
    } catch (err) {
    	alert(err);
    }
};
    
YoreSoftware.JSGE.Game.prototype.__runPlaying = function() {
    var nextState = null;
    if (YoreSoftware.JSGE.Game.currentState != null) {
        nextState = YoreSoftware.JSGE.Game.currentState.update();
    }
    //TODO: VER CÓMO IMPLEMENTAR EL MÉTODO EQUALS PARA ESTADOS EN JAVASCRIPT
    if (!nextState.equals(YoreSoftware.JSGE.Game.currentState)) {
        YoreSoftware.JSGE.Game.currentState.exit();
        if (nextState != null){
        	nextState.entry();
        }else {
        	YoreSoftware.JSGE.Game.active = false;
        }
        YoreSoftware.JSGE.Game.currentState = nextState;
    }
};
    
YoreSoftware.JSGE.Game.prototype.__runInPauseState = function() {
    var nextState = null;
    if (YoreSoftware.JSGE.Game.currentState != null) {
        nextState = YoreSoftware.JSGE.Game.currentState.update();
    }
    if (YoreSoftware.JSGE.Game.currentState != nextState) {
        YoreSoftware.JSGE.Game.currentState.exit();
        if (nextState != null){
        	/* El siguiente estado no es de pausa (se vuelve al juego */
        	if(!nextState.isPauseState) {
                /* Se actualiza el tiempo acumulado con el tiempo
                 * auxiliar acumulado.
                 */
                YoreSoftware.JSGE.TimeProvider.acumTime = YoreSoftware.JSGE.TimeProvider.auxAcumTime;
                /* Se actualiza el tiempo que lleva ejecutándose el
                 * juego.
                 */
                YoreSoftware.JSGE.TimeProvider.lastCorrectTime = YoreSoftware.JSGE.Util.date.getTime();
                YoreSoftware.JSGE.Game.gameState = YoreSoftware.JSGE.Game.PLAYING;
                /* En caso de que no se vuelva al estado de restauración
                 * de la pausa, se debe ejecutar su método de salida
                 * (entre otras cosas para que no se dé por ejecutado
                 * su método entry -> "executedEntry" (de "State") = false)
                 */
                
    //TODO: VOY POR AQUÍ REVISANDO
                if(!nextState.equals(YoreSoftware.JSGE.Game.restoreState)) {
                	YoreSoftware.JSGE.Game.restoreState.exit();
                }
        	}
        	/* Es el estado restaurable y no se terminó de ejecutar
        	 * el entry o no es el estado restaurable
        	 */
    		if((nextState.equals(restoreState) && //
    				!nextState.executedEntry) || //
    				!nextState.equals(restoreState)) {
            	nextState.entry();
    		}
        }else {
        	Game.active = false;
        }
        currentState = nextState;
    }
};



