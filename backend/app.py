from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
from sqlalchemy import create_engine


app = Flask(__name__)
CORS(app)  # Habilitar CORS para todas as rotas

# conexão com banco
engine = create_engine("sqlite:///../database/infraview.db")

@app.route("/")
def home():
    return "InfraView API está rodando 🚀"

@app.route("/kpi/atrasos")
def atrasos_por_fornecedor():
    query = """
    SELECT
        fornecedor,
        COUNT(*) AS total_atrasos
    FROM operacoes
    WHERE status_entrega = 'Atrasada'
    GROUP BY fornecedor
    ORDER BY total_atrasos DESC;
    """

    df = pd.read_sql(query, con=engine)

    return jsonify(df.to_dict(orient="records"))

@app.route("/kpi/custos")
def custo_por_obra():
    query = """
    SELECT
        nome_obra,
        SUM(custo_total) AS custo_total
    FROM operacoes
    GROUP BY nome_obra
    ORDER BY custo_total DESC;
    """

    df = pd.read_sql(query, con=engine)
    return jsonify(df.to_dict(orient="records"))


@app.route("/kpi/status")
def status_entregas():
    query = """
    SELECT
        status_entrega,
        COUNT(*) AS total
    FROM operacoes
    GROUP BY status_entrega;
    """

    df = pd.read_sql(query, con=engine)
    return jsonify(df.to_dict(orient="records"))


if __name__ == "__main__":
    app.run(debug=True)