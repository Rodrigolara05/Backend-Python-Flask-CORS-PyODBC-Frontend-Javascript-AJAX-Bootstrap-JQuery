function CrearEvento(){
	var result = false;

	var titulo = $("#inputTitulo").val().toString();
	var descripcion = $("#inputDescription").val().toString();
	var tiempo = $("#inputTiempo").val().toString();
	var imagenUrl = $("#inputImagen").val().toString();
	tiempo+=" horas";

	json = {
			id:0,
			titulo:titulo,
			descripcion:descripcion,
			tiempo:tiempo,
			imagenUrl:imagenUrl,
			usuarioId: 3
		};

	data = JSON.stringify(json);
	console.log(data)
	$.ajax({
		url: 'http://localhost:7070/evento/save',
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
