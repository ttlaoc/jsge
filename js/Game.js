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

//Atributos EST�TICOS de la clase

/* Estados en que se puede encontrar el hilo del juego */
/* Jugando normalmente */
YoreSoftware.JSGE.Game._PLAYING = 1;
/* En estado de pausa */
YoreSoftware.JSGE.Game._PAUSE = 2;
/* Estado actual del juego */
YoreSoftware.JSGE.Game._gameState = PLAYING;
/* guarda la referencia al estado que se est� ejecutando al entrar
 * en el estado de pausa.
 */
YoreSoftware.JSGE.Game._restoreState;
/* Estado actual en ejecuci�n */
YoreSoftware.JSGE.Game._currentState;
/* Referencia �nica del canvas del juego */
YoreSoftware.JSGE.Game._canvas;
/* Estado inicial */
YoreSoftware.JSGE.Game.__initState;
/* Ancla de pintado. Se debe tener en cuenta que el ancla de pintado
 * puede ser diferente al de referencia del sistema
 */ 
YoreSoftware.JSGE.Game._anchorX;
YoreSoftware.JSGE.Game._anchorY;
/**
 * <p>Valor que especifica la duraci�n (expresada en milisegundos)
 * de fotograma deseada.</p>
 * <p>El motor de ejecuci�n de esta clase intentar� en la medida de lo
 * posible que se respete esta duraci�n ajustando el tiempo de espera
 * en aquellas iteraciones de juego en las que despu�s de realizar todas
 * las operaciones de representaci�n y actualizaci�n del estado de juego
 * actual, aun sobre tiempo de fotograma.</p>
 */
YoreSoftware.JSGE.Game.frameDuration;

/**
 * <p>Instancia �nica del juego.</p>
 */
YoreSoftware.JSGE.Game.instance;
/* Indica cuando la aplicaci�n est� activa */
YoreSoftware.JSGE.Game.active = true;

YoreSoftware.JSGE.Game.prototype.__init = function(__self, params) {
	
};

/**
 * <p>M�todo que el desarrollador debe implementar con la secuencia
 * de inicializaci�n del juego.</p>
 * <p>El desarrollador es libre de implementar la inicializaci�n del
 * juego del modo que estime oportuno, pero como �ltima acci�n deber�
 * devolver una referencia a la instancia del estado donde se iniciar�
 * el juego.</p>
 * <p>Se recomienda crear las instancias de todos los estados del juego
 * dentro de este m�todo.</p>
 * @return estado inicial del juego
 */
YoreSoftware.JSGE.Game.prototype.initialize = function() {
	
};

/* M�todo de inicializaci�n de cualquier clase del motor
 * que necesite inicializaci�n est�tica, definiendo para ello
 * m�todos init() espec�ficos
 */
YoreSoftware.JSGE.Game._init = function() {
	
};



/**
 * <p>M�todo que el desarrollador debe implementar con la secuencia
 * de inicializaci�n del juego.</p>
 * <p>El desarrollador es libre de implementar la inicializaci�n del
 * juego del modo que estime oportuno, pero como �ltima acci�n deber�
 * devolver una referencia a la instancia del estado donde se iniciar�
 * el juego.</p>
 * <p>Se recomienda crear las instancias de todos los estados del juego
 * dentro de este m�todo.</p>
 * @return estado inicial del juego
 */
YoreSoftware.JSGE.Game.prototype.initialize = function() {
	
};

/* Punto de entrada del ciclo de vida del juego. El juego se inicia
 * ejecutando este m�todo, que se encargar� de inicializar el �rea
 * de pintado (canvas) y crear los elementos iniciales del motor
 * de juegos.
 */
YoreSoftware.JSGE.Game.prototype._startGame = function() {
	if(instance != null) {
		return;
	}
    YoreSoftware.JSGE.Game.instance = this;
    try {
        /* inicializaci�n sistema */
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
    //TODO: VER C�MO IMPLEMENTAR EL M�TODO EQUALS PARA ESTADOS EN JAVASCRIPT
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
                /* Se actualiza el tiempo que lleva ejecut�ndose el
                 * juego.
                 */
                YoreSoftware.JSGE.TimeProvider.lastCorrectTime = YoreSoftware.JSGE.Util.date.getTime();
                YoreSoftware.JSGE.Game.gameState = YoreSoftware.JSGE.Game.PLAYING;
                /* En caso de que no se vuelva al estado de restauraci�n
                 * de la pausa, se debe ejecutar su m�todo de salida
                 * (entre otras cosas para que no se d� por ejecutado
                 * su m�todo entry -> "executedEntry" (de "State") = false)
                 */
                
    //TODO: VOY POR AQU� REVISANDO
                if(!nextState.equals(YoreSoftware.JSGE.Game.restoreState)) {
                	YoreSoftware.JSGE.Game.restoreState.exit();
                }
        	}
        	/* Es el estado restaurable y no se termin� de ejecutar
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



