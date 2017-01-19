
var numPiezas;

function Puzzle(numeroPiezas) {
    numPiezas = numeroPiezas;
    this.estadoPosicion = [];
    this.reset();
    

}

Puzzle.prototype.isResuleto = function () {
    var resuelto = true;
    for (var i = 0; i < this.estadoPosicion.length; i++) {
        if (this.estadoPosicion[i] !== i + 1) {
            resuelto = false;
            break;
        }
    }
    return resuelto;
};

Puzzle.prototype.getNumPosicionEnCaja = function (idPieza) {
    if (this.isQuitadaPieza(idPieza) === true) {
        return this.estadoPosicion[idPieza - 1];
    } else {
        throw "La pieza no esta en la caja";
    }
};

Puzzle.prototype.getNumPosicionEnTablero = function (idPieza) {
    if (this.isColocadaPieza(idPieza) === true) {
        return this.estadoPosicion[idPieza - 1];
    } else {
        throw "La pieza no esta en el tablero";
    }
};

Puzzle.prototype.getNumPiezas = function () {
    return numPiezas;
};

Puzzle.prototype.isLibreHuecoTablero = function (idHuecoTablero) {
    var isLibre = true;
    for (var i = 0; i < this.estadoPosicion.length; i++) {
        if (this.estadoPosicion[i] === idHuecoTablero) {
            isLibre = false;
            break;
        }
    }
    return isLibre;


};

Puzzle.prototype.isPermitidoColocarPieza = function (idPieza, idHuecoTablero) {
    if (this.isColocadaPieza(idPieza)) {
        return false;
    }
    if (this.isLibreHuecoTablero(idHuecoTablero)) {
        return true;
    } else {
        return false;
    }
};

Puzzle.prototype.isPermitidoQuitarPieza = function (idPieza) {
    return this.isColocadaPieza(idPieza);
};

Puzzle.prototype.isColocadaPieza = function (idPieza) {
    var isColocada = true;
    if (this.estadoPosicion[idPieza - 1] < 0) {
        isColocada = false;
    }
    return isColocada;
};

Puzzle.prototype.isQuitadaPieza = function (idPieza) {
    var isQuitada = true;
    if (this.estadoPosicion[idPieza - 1] > 0) {
        isQuitada = false;
    }
    return isQuitada;
};

Puzzle.prototype.colocarPieza = function (idPieza, idHuecoTablero) {
    if (this.isPermitidoColocarPieza(idPieza, idHuecoTablero)) {
        this.estadoPosicion[idPieza - 1] = idHuecoTablero;
    } else {
        throw "No se puede colocar";
    }
};

Puzzle.prototype.quitarPieza = function (idPieza) {
    if (this.isPermitidoQuitarPieza(idPieza) === true) {
        this.estadoPosicion[idPieza - 1] = idPieza;

    } else {
        throw "No se puede quitar";
    }
};

Puzzle.prototype.reset = function () {
    for (var i = 0; i <= numPiezas; i++) {
        this.estadoPosicion.push(-(i + 1));
    }
};
var puzzle = new Puzzle(4);

function onDragStartPieza(event) {
    event.dataTransfer.setData("text", getIdPiezaFromElemntPieza(event.target));
}
;

function onDropHuecoCaja(event) {
    var idPieza = event.dataTransfer.getData("text");
    var idHuecoCaja = getIdHuecoCajaFromElementHuecoCaja(event.currentTarget);
    var elementoPieza = getElementPiezaFromIdPieza(idPieza);
    var elementoCaja = getElementHuecoCajaFromHuecoCaja(idHuecoCaja);

    if (puzzle.isPermitidoQuitarPieza(idPieza) === true) {
        puzzle.quitarPieza(idPieza);
        elementoCaja.appendChild(elementoPieza);
    }
    this.verEstados();

}
;
function onDropHuecoTablero(event) {
    var idPieza = event.dataTransfer.getData("text");
    var idHuecoTablero = getIdHuecoTableroFromElementHuecoTablero(event.currentTarget);
    var elementoPieza = getElementPiezaFromIdPieza(idPieza);
    var elementoTablero = getElementHuecoTableroFromHuecoTabler(idHuecoTablero);
    console.log(idPieza);
    console.log(idHuecoTablero);
    console.log(elementoPieza);
    console.log(elementoTablero);

    if (puzzle.isPermitidoColocarPieza(idPieza) === true) {
        puzzle.colocarPieza(idPieza, idHuecoTablero);
        elementoTablero.appendChild(elementoPieza);
    }
    verEstados();


}
;
function onDragOverHuecoCaja(event) {
    event.preventDefault();
}
;
function onDragOverHuecoTablero(event) {
    event.preventDefault();
}
;
function swapImages(img1, img2) {
    var destSrc = img1.src;
    var origSrc = img2.src;
    img1.src = origSrc;
    img2.src = destSrc;
}

function getIdPiezaFromElemntPieza(elementPieza) {
    var value = $(elementPieza).attr("id-pieza");
    if (typeof (value) === typeof (undefined) || value === false) {
        throw "no existe el atributo 'id-pieza'";
    }
    var numericValue = value * 1;
    if (isNaN(numericValue) === true) {
        throw "El valor de 'id-pieza' no es un numero";
    }
    return numericValue;
}
function getIdHuecoTableroFromElementHuecoTablero(elementHuecoTablero) {
    var value = $(elementHuecoTablero).attr("id-hueco-tablero");
    if (typeof (value) === typeof (undefined) || value === false) {
        throw "no existe el atributo 'id-hueco-tablero'";
    }
    var numericValue = value * 1;
    if (isNaN(numericValue) === true) {
        throw "El valor de 'id-hueco-tablero' no es un numero";
    }
    return numericValue;
}
function getIdHuecoCajaFromElementHuecoCaja(elementHuecoCaja) {
    var value = $(elementHuecoCaja).attr("id-hueco-caja");
    if (typeof (value) === typeof (undefined) || value === false) {
        throw "no existe el atributo 'id-hueco-caja'";
    }
    var numericValue = value * 1;
    if (isNaN(numericValue) === true) {
        throw "El valor de 'id-hueco-caja' no es un numero";
    }
    return numericValue;
}

function getElementPiezaFromIdPieza(idPieza) {
    var elements = $("[id-pieza='" + idPieza + "']")[0];

    if (elements.length === 0) {
        throw "No existe el elemnto con id pieza" + idPieza;
    }
    if (elements.length > 1) {
        throw "Existe mas de un elemento con el id de pieza " + idPieza;
    }
    return elements;

}
function getElementHuecoTableroFromHuecoTabler(idHuecoTablero) {
    var elements = $("[id-hueco-tablero='" + idHuecoTablero + "']")[0];
    if (elements.length === 0) {
        throw "No existe el elemnto con id pieza" + idHuecoTablero;
    }
    if (elements.length > 1) {
        throw "Existe mas de un elemento con el id de pieza " + idHuecoTablero;
    }
    return elements;
}
function getElementHuecoCajaFromHuecoCaja(idHuecoCaja) {
    var elements = $("[id-hueco-caja='" + idHuecoCaja + "']")[0];
    if (elements.length === 0) {
        throw "No existe el elemnto con id pieza" + idHuecoCaja;
    }
    if (elements.length > 1) {
        throw "Existe mas de un elemento con el id de pieza " + idHuecoCaja;
    }
    return elements;
}



function verEstados() {
    var tablaEstados0 = $('#0');
    tablaEstados0.text(puzzle.estadoPosicion[0]);
    var tablaEstados1 = $('#1');
    tablaEstados1.text(puzzle.estadoPosicion[1]);
    var tablaEstados2 = $('#2');
    tablaEstados2.text(puzzle.estadoPosicion[2]);
    var tablaEstados3 = $('#3');
    tablaEstados3.text(puzzle.estadoPosicion[3]);
}

verEstados();


