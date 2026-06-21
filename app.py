from flask import Flask, render_template, jsonify
import os
from supabase import create_client, Client

app = Flask(__name__)

# Configurações do Supabase (Substitua com as suas credenciais reais depois)
SUPABASE_URL = os.environ.get("SUPABASE_URL", "https://seu-supabase-url.supabase.co")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY", "sua-chave-anon-public-aqui")

try:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
except Exception as e:
    print(f"Erro ao conectar no Supabase: {e}")
    supabase = None

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/increment-visit', methods=['POST'])
def increment_visit():
    """Rota opcional caso queira fazer o incremento de visitas pelo backend"""
    if supabase:
        try:
            # Exemplo básico: incrementando uma linha em uma tabela chamada 'analytics'
            # Certifique-se de configurar essa tabela no seu painel do Supabase
            data, count = supabase.table('analytics').select('visits').eq('id', 1).execute()
            if data[1]:
                current_visits = data[1][0]['visits']
                new_visits = current_visits + 1
                supabase.table('analytics').update({'visits': new_visits}).eq('id', 1).execute()
                return jsonify({"status": "success", "visits": new_visits})
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500
    return jsonify({"status": "disabled", "visits": 0})

if __name__ == '__main__':
    app.run(debug=True)
