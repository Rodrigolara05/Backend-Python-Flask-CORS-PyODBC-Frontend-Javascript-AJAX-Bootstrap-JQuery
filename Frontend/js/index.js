var eventInformation = [];

function getEventsAPI(){
	$.ajax({
		url: 'http://localhost:7070/eventos',
		success: function(respuesta){
			for(var item of respuesta.data){
				//console.log(item);
				obj = JSON.parse(item);
				let objEvent = new Evento(obj.id,obj.imagenUrl,obj.titulo,	obj.descripcion, obj.tiempo);
				eventInformation.push(objEvent);
			}
			MostrarEventos(eventInformation);
		},
		error: function(e){
			console.log(e);
		}
	});
}

function MostrarEventos(data){
	var eventListHTML = [];
	for (let evento of data) {
		console.log(evento);
		var eventHTML = CrearEvento(evento);
		eventListHTML.push(eventHTML);	
	}
	$("#Events-Container").html(eventListHTML);
}

function CrearEvento(evento) {
	console.log(evento);
	var btnDetail = document.createElement('button');
	btnDetail.className = "btn btn-sm btn-outline-secondary";
	btnDetail.textContent = "Detalle";

	var btnComments = document.createElement('button');
	btnComments.className = "btn btn-sm btn-outline-secondary";
	btnComments.textContent = "Comentarios";

	var btnGroup = document.createElement('div');
	btnGroup.className = "btn-group";
	btnGroup.appendChild(btnDetail);
	btnGroup.appendChild(btnComments);

	var time = document.createElement('small');
	time.className = "text-muted";
	time.textContent = evento.tiempo;

	var containerBottom = document.createElement('div');
	containerBottom.className = "d-flex justify-content-between align-items-center";
	containerBottom.appendChild(btnGroup);
	containerBottom.appendChild(time);


	var title = document.createElement('h5');
	title.className = "card-title";
	title.textContent = evento.titulo;

	var description = document.createElement('p');
	description.className = "card-text";
	description.textContent = evento.descripcion;
	
	var body = document.createElement('div');
	body.className = "card-body";
	body.appendChild(title);
	body.appendChild(description);
	body.appendChild(containerBottom);

	var img = document.createElement('img');
	img.className = "card-img-top";
	img.style.cssText = "height: 250px; width: 100%; display: block;";
	img.src = evento.imagenUrl;
	img.alt = "Imagen del Evento";

	var card = document.createElement('div');
	card.className = "card mb-4 box-shadow";
	card.appendChild(img);
	card.appendChild(body);

	var col = document.createElement('div');
	col.className = "col-md-4";
	col.appendChild(card);

	return col;
}

getEventsAPI();