# Sistema SOS Pets 🐾

O **Sistema SOS Pets** é uma aplicação Full Stack desenvolvida para a gestão de clínicas veterinárias. O sistema facilita o controlo de pacientes (pets), tutores, funcionários, serviços e agendamento de atendimentos.

O projeto é composto por uma API REST robusta no backend e uma interface moderna no frontend.
# https://sospets.onrender.com

## 🚀 Tecnologias Utilizadas

### Backend (API)
* **Java** (Spring Boot Framework)
* **Spring Data JPA** (Persistência de dados)
* **H2 Database** (Base de dados em memória para desenvolvimento)
* **Maven** (Gestão de dependências e build)
* **Docker** (Containerização da aplicação)

### Frontend (Interface)
* **React.js**
* **JavaScript (ES6+)**
* **CSS3**
* **NPM** (Gestor de pacotes)

---

## 📋 Funcionalidades

O sistema permite o registo e gestão (CRUD) das seguintes entidades:

* **Tutores:** Cadastro de proprietários.
* **Animais:** Gestão de pacientes (incluindo porte, espécie, cor).
* **Atendimentos:** Registo de consultas e procedimentos veterinários.
* **Clínicas:** Administração das unidades de atendimento.
* **Funcionários:** Cadastro da equipa (veterinários, rececionistas, etc.).
* **Serviços:** Catálogo de serviços oferecidos pela clínica.
* **Relatórios:** Visualização consolidada das atividades.

---

## 📂 Estrutura do Projeto

```text
sistema-sos-pets/
├── backend/            # API Spring Boot
│   ├── src/            # Código fonte Java (Controllers, Entities, Services)
│   ├── Dockerfile      # Configuração Docker
│   └── pom.xml         # Dependências Maven
│
└── sospets-react/      # Interface React
    ├── public/         # Ficheiros estáticos
    ├── src/            # Componentes e Páginas (Pages)
    └── package.json    # Dependências Node
````

-----

## ⚙️ Como Executar o Projeto

Apenas acesse o link: https://sospets.onrender.com

-----

## 🛠️ Configuração

As configurações da aplicação encontram-se em `backend/src/main/resources/application.properties`.
O projeto possui perfis configurados (`application-local.properties` e `application-prod.properties`) para facilitar a troca entre ambiente de desenvolvimento e produção.

-----

```
```
