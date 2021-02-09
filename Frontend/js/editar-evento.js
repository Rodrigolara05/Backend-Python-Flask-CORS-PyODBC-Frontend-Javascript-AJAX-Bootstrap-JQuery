var eventInformation = [];

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');

function EditarEvento()
{
	var result = false;
	var id = myParam;
	var titulo = $("#inputTitulo").val().toString();
	var descripcion = $("#inputDescription").val().toString();
	var tiempo = $("#inputTiempo").val().toString();
	var imagenUrl = $("#inputImagen").val().toString();
	
	json = {
			id:id,
			titulo:titulo,
			descripcion:descripcion,
			tiempo:tiempo,
			imagenUrl:imagenUrl,
			usuarioId: 3
		};

	data = JSON.stringify(json);
	console.log(data)
	$.ajax({
		url: 'http://localhost:7070/evento/update',
		type:"POST",
    	contentType: 'application/json',
    	dataType: 'json',
   		data: data,
   		async: false,
		success: function(respuesta){
			console.log(respuesta);
			result = (respuesta.data.toString() == 'true');
		},
		error: function(e){
			console.log(e);
		}
	});

	return result;
}

function CompleteForm(myParam){
	let objEvent = null
	$.ajax({
		url: 'http://localhost:7070/evento/' + myParam,
		success: function(respuesta){
			for(var item of respuesta.data){
				console.log(item);
				obj = JSON.parse(item);
				objEvent = new Evento(obj.id,obj.imagenUrl,obj.titulo,	obj.descripcion, obj.tiempo);
			}
			$("#inputTitulo").val(objEvent.titulo);
			$("#inputDescription").val(objEvent.descripcion);
			$("#inputTiempo").val(objEvent.tiempo);
			$("#inputImagen").val(objEvent.imagenUrl);
		},
		error: function(e){
			console.log(e);
		}
	});
}
CompleteForm(myParam);
