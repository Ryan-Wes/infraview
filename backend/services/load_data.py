import pandas as pd
from sqlalchemy import create_engine

# caminhos
input_file = "../../data/processed/operacoes_tratadas.csv"

# criar conexão com banco SQLite
engine = create_engine("sqlite:///../../database/infraview.db")

# ler dados tratados
df = pd.read_csv(input_file)

# salvar no banco
df.to_sql("operacoes", con=engine, if_exists="replace", index=False)

print("Dados carregados no banco com sucesso!")