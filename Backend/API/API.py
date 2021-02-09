from flask import Flask, jsonify, request
from flask_cors import CORS
import sys
sys.path.append("..")
from Services.UsuarioService import UsuarioService
from Services.EventoService import EventoService

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def Home():
    return "<h1>LA API DE EVENT SOFT ESTA FUNCIONANDO</h1>"

#USUARIOS
@app.route('/usuarios', methods=['GET'])
def GetUsuarios():
    data = UsuarioService.GetAll()
    result = {"mensaje": "Se obtuvo todos los datos correctamente",
              "data": data,
              "code": 200}
    return jsonify(result)

@app.route('/usuario/login', methods=['POST'])
def Login():
    msg = ""
    data = UsuarioService.Login(request.json)
    if len(data)>0:
        msg = "Exito al Iniciar Sesion"
    else:
        msg = "Error al Iniciar Sesion"
        
    result = {"mensaje": msg,
              "data": data,
              "code": 200}
    return jsonify(result)

@app.route('/usuario/save', methods=['POST'])
def SaveUsuario():
    msg = ""
    data = UsuarioService.Save(request.json)
    if data:
        msg = "Se registró al usuario correctamente"
    else:
        msg = "No se registró al usuario correctamente"
        
    result = {"mensaje": msg,
              "data": data,
              "code": 200}
    return jsonify(result)

#EVENTO
@app.route('/eventos', methods=['GET'])
def GetEventos():
    msg = ""
    data = EventoService.GetAll()
    if len(data)>0:
        msg = "Se obtuvo los eventos correctamente"
    else:
        msg = "No hay eventos para mostrar"
    result = {"mensaje": msg,
              "data": data,
              "code": 200}
    return jsonify(result)

@app.route('/evento/save', methods=['POST'])
def SaveEvento():
    msg = ""
    print(request)
    print(request.json)
    data = EventoService.Save(request.json)
    if data:
        msg = "Se registró el evento correctamente"
    else:
        msg = "No se registró el evento correctamente"
        
    result = {"mensaje": msg,
              "data": data,
              "code": 200}
    return jsonify(result)

@app.route('/evento/delete/<int:id>', methods=['GET'])
def DeleteEvento(id):
    msg = ""
    data = EventoService.Delete(id)
    if data:
        msg = "Se eliminó el evento correctamente"
    else:
        msg = "No se eliminó el evento correctamente"
        
    result = {"mensaje": msg,
              "data": data,
              "code": 200}
    return jsonify(result)

@app.route('/evento/<int:id>', methods=['GET'])
def GetEvento(id):
    msg = ""
    data = EventoService.GetById(id)
    if len(data)>0:
        msg = "Se obtuvo el evento correctamente"
    else:
        msg = "No se obtuvo el evento"
    result = {"mensaje": msg,
              "data": data,
              "code": 200}
    return jsonify(result)

@app.route('/evento/update', methods=['POST'])
def UpdateEvento():
    msg = ""
    data = EventoService.Update(request.json)
    if data:
        msg = "Se actualizó el evento correctamente"
    else:
        msg = "No se actualizó el evento correctamente"
        
    result = {"mensaje": msg,
              "data": data,
              "code": 200}
    return jsonify(result)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port='7070', debug= False)
