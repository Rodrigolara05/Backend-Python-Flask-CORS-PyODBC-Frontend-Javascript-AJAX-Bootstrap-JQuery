function IniciarSesion(){
	var result = false;
	var msg = "";

	var correo = $("#inputEmail").val().toString();
	var contrasenia = $("#inputPassword").val().toString();

	json = {
			correo:correo,
			contrasenia:contrasenia
		};

	data = JSON.stringify(json);
	console.log(data)
	$.ajax({
		url: 'http://localhost:7070/usuario/login',
		type:"POST",
    	contentType: 'application/json',
    	dataType: 'json',
   		data: data,
   		async: false,
		success: function(respuesta){
			msg = respuesta.mensaje;
			obj = JSON.parse(respuesta.data);
			//console.log(obj.id);
			result = true;
		},
		error: function(e){
			console.log(e);
		}
	});
	alert(msg)

	return result;
}
