import pandas as pd

# caminhos
input_file = "../../data/raw/operacoes.csv"
output_file = "../../data/processed/operacoes_tratadas.csv"

# ler dados
df = pd.read_csv(input_file)

# padronizar nomes das colunas
df.columns = df.columns.str.strip().str.lower()

# remover espaços extras em colunas de texto
text_columns = df.select_dtypes(include="object").columns
for col in text_columns:
    df[col] = df[col].str.strip()

# converter datas
df["data_prevista"] = pd.to_datetime(df["data_prevista"])
df["data_entrega"] = pd.to_datetime(df["data_entrega"])

# padronizar texto de algumas colunas
df["status_entrega"] = df["status_entrega"].str.title()
df["status_pendencia"] = df["status_pendencia"].str.title()
df["prioridade_pendencia"] = df["prioridade_pendencia"].str.title()

# checar valores nulos
print("\n=== VALORES NULOS ===")
print(df.isnull().sum())

# checar tipos
print("\n=== TIPOS DE DADOS ===")
print(df.dtypes)

# salvar arquivo tratado
df.to_csv(output_file, index=False)

print("\nArquivo tratado salvo com sucesso em:")
print(output_file)