from flask import Flask, render_template

# Inicialización de la aplicación Flask
app = Flask(__name__)

# Definición de la ruta principal (raíz)
@app.route('/')
def index():
    # Renderiza la plantilla HTML ubicada en el directorio 'templates'
    return render_template('index.html')

# Ejecución del servidor de desarrollo
if __name__ == '__main__':
    # debug=True permite que el servidor se reinicie automáticamente 
    # si detecta cambios en el código y muestra errores detallados.
    app.run(debug=True)