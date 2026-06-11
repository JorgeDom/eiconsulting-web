from flask import Flask, render_template, request, jsonify
import json
import os

app = Flask(__name__)

LANG_DIR = os.path.join(os.path.dirname(__file__), 'static', 'i18n')

def load_translations(lang='es'):
    lang = lang if lang in ('es', 'en') else 'es'
    path = os.path.join(LANG_DIR, f'{lang}.json')
    with open(path, encoding='utf-8') as f:
        return json.load(f)

@app.route('/')
def index():
    lang = request.args.get('lang', 'es')
    t = load_translations(lang)
    return render_template('index.html', t=t, lang=lang)

@app.route('/api/lang/<lang>')
def get_lang(lang):
    t = load_translations(lang)
    return jsonify(t)

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.get_json()
    name    = data.get('name', '').strip()
    email   = data.get('email', '').strip()
    message = data.get('message', '').strip()

    if not all([name, email, message]):
        return jsonify({'ok': False, 'error': 'Todos los campos son requeridos.'}), 400

    # Aquí se puede integrar Flask-Mail u otro servicio
    print(f"[CONTACT] {name} <{email}>: {message}")
    return jsonify({'ok': True})

if __name__ == '__main__':
    app.run(debug=True)
