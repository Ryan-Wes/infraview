import pandas as pd

# caminho do arquivo
file_path = "../../data/raw/operacoes.csv"

# leitura do CSV
df = pd.read_csv(file_path)

# visualizar primeiras linhas
print("\n=== HEAD ===")
print(df.head())

# info geral
print("\n=== INFO ===")
print(df.info())

# estatísticas básicas
print("\n=== DESCRIBE ===")
print(df.describe())