//Array de frutas, verduras y monedas
var listaImagenes = ["aubergine", "banana", "carrots", "cherries", "dollar", "lemon", 
					"orange", "peach", "potato", "tomato"];

window.addEventListener('load', function(){

	//Variable para el número total de monedas
	var numCreditos = parseInt(document.getElementById('numCreditos').innerHTML);
	//console.log(numCreditos);	


	//Función para añadir eventos al historial de movimientos
	function actualizaHistorial(texto){
		var historial = document.querySelector('#historial');
		var updateHistorial = document.createElement("li");
		updateHistorial.append(texto);
		historial.append(updateHistorial);
	};

	//Función que calcula el valor de la tirada y suma el premio al total
	function calcularJugada(valor1, valor2, valor3){		
		let monedas = 0;
		let dolares = 0;

		//Array que almacena los valores de la tirada
		let arrayDolares = [valor1, valor2, valor3];

		//Recorremos el array y contamos los dólares
		arrayDolares.forEach(element => {
			if(element == "dollar"){
				dolares += 1;
			}
		});

		//Si aparece 1 dólar por lo menos en una caja
		if(dolares != 0){
			//console.log(dolares);
			if(dolares == 1){
				if((valor1 == valor2) || (valor1 == valor3) || (valor2 == valor3)){
					actualizaHistorial("¡Dos IGUALES y una MONEDA! Ganas 3 monedas.");
					monedas = 3;
				}else{
					actualizaHistorial("¡Una MONEDA! Ganas 1 moneda.");
					monedas = 1;
				} 

			} else if(dolares == 2){
				actualizaHistorial("¡Dos MONEDAS! Ganas 4 monedas.");
					monedas = 4;

			} else if(dolares == 3){
				actualizaHistorial("¡Tres MONEDAS! Ganas 10 monedas.");
					monedas = 10;
			}

		//Si no aparece ningún dólar, comparamos frutas y hortalizas
		} else if((valor1 == valor2) && (valor1 == valor3)){
			actualizaHistorial("¡Tres IGUALES! Ganas 5 monedas.");
			monedas = 5;

		} else if((valor1 == valor2) || (valor1 == valor3) || (valor2 == valor3)){
			actualizaHistorial("¡Dos IGUALES! Ganas 2 monedas.");
			monedas = 2;
		}

		//Sumamos las monedas que ganamos con la tirada al total
		numCreditos += monedas;

		document.getElementById('numCreditos').innerHTML = numCreditos;		

	};

	//Recogemos la monedas que introducimos por la máquina y las sumamos al total
	var introducir = document.querySelector('#introducir');
	introducir.addEventListener('submit', function(){
		var creditos = parseInt(document.querySelector('#creditos').value);
		//console.log(creditos);

		if(creditos == null || creditos <= 0 || isNaN(creditos)){
			alert("Número de monedas no válido.");
			return false;
		}

		numCreditos = numCreditos + creditos;		

		document.getElementById('numCreditos').innerHTML = numCreditos;	

		/*	Si el número de monedas es mayor que 0, deshabilitamos el botón introducir
		 * 	y ponemos a 0 el recuadro	
		 */
		if(numCreditos > 0){
			document.getElementById('creditos').value = "0";
			document.getElementById("submit").disabled = true;
		}
		
		actualizaHistorial("Has introducido monedas.");		

	});
	

	//Para el movimiento de la palanca
	var palanca = document.getElementById('palancaUP');
	palanca.addEventListener('mousedown', function(){
		document.getElementById('palancaUP').src = "img/palancaDOWN.png";
		palanca.addEventListener('mouseup', function(){
			document.getElementById('palancaUP').src = "img/palancaUP.png";
		});

	});

	//Cada vez que tiramos de la palanca
	palanca.addEventListener('click', function(){
		//Si no hay monedas salta un aviso
		if(numCreditos == 0){
			alert("Por favor, introduce monedas.");

		//Si hay monedas	
		}else{
			numCreditos -= 1;

			//Creamos una función que nos devuelve un número aleatorio entre 0 y 9
			function aleatorio(){
				return Math.floor(Math.random()*10);
			}
			//console.log(aleatorio());
			
			//Guardamos 3 números aleatorios en otras tantas variables
			var img1 = aleatorio();
			var img2 = aleatorio();
			var img3 = aleatorio();

			/*	Mostramos las imágenes contanenando el valor en el array listaImagenes
			 *	con la ubicación de las imágenes 
			 */ 	
			var caja1 = document.querySelector('#caja1');
			caja1.src = "img/" + listaImagenes[img1] + ".png";
			var caja2 = document.querySelector('#caja2');
			caja2.src = "img/" + listaImagenes[img2] + ".png";
			var caja3 = document.querySelector('#caja3');
			caja3.src = "img/" + listaImagenes[img3] + ".png";

			//Al tirar de la palanca, actualizamos el historial			
			actualizaHistorial("Gastas una moneda.");

			//Guardamos el nombre de los elementos de la tirada
			var valor1 = listaImagenes[img1];
			var valor2 = listaImagenes[img2];
			var valor3 = listaImagenes[img3];
		
			//Llamamos a la función para calcular el valor de la jugada			
			calcularJugada(valor1, valor2, valor3);			
		}

	});

	//Si pinchamos en salir recogemos las monedas restantes y las ponemos en introducir
	var salir = document.querySelector('#salir');
	salir.addEventListener('click', function(){
		//En caso de que no haya monedas en la máquina
		if(numCreditos == 0){
			alert("No hay monedas en la máquina.");
		}else{
			numCreditos = parseInt(document.getElementById('numCreditos').innerHTML);
			alert("Has conseguido un total de " + numCreditos + " monedas.");
			document.getElementById('creditos').value = numCreditos;
			document.getElementById("submit").disabled = false;

			document.getElementById('numCreditos').innerHTML = "0";
			numCreditos = 0;

			actualizaHistorial("Sacas todas las monedas.");
		}

	});

});