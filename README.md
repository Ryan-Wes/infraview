# <div align="center">📊 InfraView</div>

<div align="center">
Dashboard full stack para análise de dados operacionais de obras, materiais, fornecedores, entregas e pendências, com pipeline de tratamento em Python, armazenamento em SQLite e visualização em dashboard web interativo.
</div>

<br>

## 🚀 Visão geral

O **InfraView** é um projeto de portfólio focado em **Python, SQL, análise de dados, visualização e contexto de negócio**.

A proposta do sistema é simular um cenário real de operação em obras de infraestrutura, onde os dados costumam vir de planilhas e precisam ser tratados, organizados e transformados em informações úteis para acompanhamento e tomada de decisão.

O projeto recebe dados operacionais, realiza limpeza e padronização com Python, carrega essas informações em banco SQL e disponibiliza métricas e gráficos em um dashboard web.

---

## 🎯 Objetivos do projeto

- Demonstrar tratamento e análise de dados com **Python**
- Demonstrar consultas analíticas com **SQL**
- Mostrar um fluxo completo de dados, da origem bruta até a visualização
- Simular um contexto real de obras, materiais e fornecedores
- Construir um dashboard com visual profissional e foco em clareza

---

## 🧩 Problema que o projeto resolve

Em operações de obras e suprimentos, os dados muitas vezes ficam espalhados em planilhas, com pouca padronização e baixa visibilidade sobre atrasos, custos, fornecedores e pendências.

O **InfraView** centraliza esse fluxo em um pipeline simples:

**planilha / CSV → tratamento com Python → banco SQL → consultas analíticas → dashboard web**

---

## 🛠️ Tecnologias utilizadas

### Back-end e dados
- Python
- Pandas
- SQLAlchemy
- Flask
- Flask-CORS
- SQLite

### Front-end
- HTML
- CSS
- JavaScript
- Chart.js

---

## 📁 Estrutura do projeto

```bash
infraview/
│
├── backend/
│   ├── services/
│   └── app.py
│
├── frontend/
│   ├── index.html
│   └── src/
│       ├── css/
│       │   └── style.css
│       └── js/
│           └── dashboard.js
│
├── data/
│   ├── raw/
│   └── processed/
│
├── database/
│   └── infraview.db
│
├── notebooks/
├── requirements.txt
├── README.md
└── .gitignore
```

---

## ⚙️ Funcionalidades atuais

- **Leitura de dados via CSV**
- **Tratamento e padronização com Pandas**
  - Conversão e limpeza de colunas
- **Carga dos dados em banco SQLite**
- **API em Flask para exposição de KPIs**
- **Dashboard com:**
  - Cards de indicadores
  - Gráfico de custo por obra
  - Gráfico de status das entregas
  - Gráfico de atrasos por fornecedor
  - Resumo operacional
- **Visual com tema dark e microinterações**

---

## 📈 KPIs e visualizações

O dashboard atualmente exibe:

- Total de atrasos
- Total de obras monitoradas
- Custo total
- Total de fornecedores
- Custo por obra
- Status das entregas
- Atrasos por fornecedor
- Resumo operacional consolidado

---

## ▶️ Como executar o projeto

1. **Clonar o repositório**

```bash
git clone https://github.com/Ryan-Wes/infraview.git
cd infraview
```

2. **Criar e ativar o ambiente virtual**

```bash
python -m venv venv
```

- **Windows**

```bash
venv\Scripts\activate
```

3. **Instalar as dependências**

```bash
pip install -r requirements.txt
```

4. **Rodar o back-end**

```bash
cd backend
python app.py
```

A API ficará disponível em:

```
http://127.0.0.1:5000
```

5. **Rodar o front-end**

Abra o arquivo `frontend/index.html` com Live Server no VS Code.

---

## 🔌 Rotas da API

- **Home**
  - `/`
- **KPI - atrasos por fornecedor**
  - `/kpi/atrasos`
- **KPI - custo por obra**
  - `/kpi/custos`
- **KPI - status das entregas**
  - `/kpi/status`

---

## 🧠 Aprendizados aplicados

Durante o desenvolvimento deste projeto, foram trabalhados conceitos como:

- Tratamento e limpeza de dados
- Manipulação de CSV com Pandas
- Carregamento em banco relacional
- Consultas analíticas
- Criação de API com Flask
- Consumo de API com JavaScript
- Construção de dashboard com Chart.js
- Refinamento visual e experiência de interface

---

## 📌 Próximos passos

- Leitura de arquivos Excel (.xlsx)
- Filtros interativos no dashboard
- Insights automáticos com base nos dados
- Possibilidade de upload de arquivos pela interface
- Expansão do banco para PostgreSQL
- Evolução da experiência analítica do dashboard

---

## 👨‍💻 Autor

**Ryan Lopes**

- [LinkedIn](https://www.linkedin.com/in/wryan-lopes)
- [Portfólio](https://ryan-wes.github.io/portfolio/)