import pandas as pd
from sqlalchemy import create_engine

engine = create_engine("sqlite:///../../database/infraview.db")

query = """
SELECT
    nome_obra,
    COUNT(*) AS pendencias_abertas
FROM operacoes
WHERE status_pendencia = 'Aberta'
GROUP BY nome_obra
ORDER BY pendencias_abertas DESC;
"""

df = pd.read_sql(query, con=engine)

print("\n=== PENDÊNCIAS ABERTAS POR OBRA ===")
print(df)