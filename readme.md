# SmartStock
## Ideia

O SmartStock nasceu como um projeto de estudo voltado para o desenvolvimento de uma aplicação full-stack moderna de gerenciamento de estoque, inspirado nas experiências profissionais de logistica que passei nos ultimos anos.
O objetivo principal foi criar um sistema funcional e organizado capaz de simular situações reais encontradas em softwares administrativos utilizados por empresas e pequenos negócios.

## A proposta do projeto foi unir:

gerenciamento de produtos
autenticação de usuários
proteção de dados
dashboard visual
organização de estoque
experiência moderna de interface

Tudo isso utilizando tecnologias atuais do ecossistema JavaScript.

Além da funcionalidade, o projeto também teve como foco o aprendizado prático de conceitos essenciais do desenvolvimento full-stack, como integração entre frontend e backend, autenticação JWT, manipulação de banco de dados e arquitetura de aplicações.

## Planejamento

O desenvolvimento foi estruturado em módulos independentes para facilitar escalabilidade e manutenção.

A arquitetura do sistema foi dividida em:

### Frontend

Construído com:

React
Vite
Axios

Responsável por:

interface do usuário
formulários
dashboard
renderização dinâmica
comunicação com API
### Backend

Construído com:

Node.js
Express

Responsável por:

regras de negócio
autenticação
middleware de segurança
CRUD de produtos
integração com banco de dados
### Banco de Dados

Utilizando:

PostgreSQL

Responsável pelo armazenamento persistente de:

usuários
produtos
dados de estoque
### Segurança

Implementações realizadas:

autenticação JWT
senhas criptografadas com bcrypt
rotas protegidas
separação de produtos por usuário
middleware de autenticação
### Execução

Durante o desenvolvimento foram implementadas diversas funcionalidades práticas.

### Sistema de autenticação
cadastro de usuários
login
logout
persistência de sessão
proteção de rotas privadas
### Gerenciamento de produtos

Cada usuário possui acesso apenas aos próprios produtos cadastrados.

Funcionalidades:

criar produtos
editar produtos
deletar produtos
listagem dinâmica
atualização em tempo real
### Dashboard inteligente

Foi desenvolvido um painel visual contendo:

quantidade total de produtos
produtos críticos
valor total em estoque
gráfico de barras
gráfico de distribuição de estoque

Utilizando:

Recharts
### Organização e experiência do usuário

Também foram implementados:

busca de produtos
ordenação por nome, preço e estoque
indicadores visuais de criticidade
interface responsiva
integração completa frontend/backend
### Estrutura profissional

O projeto foi organizado em:

componentes reutilizáveis
controllers
routes
middlewares
services
separação entre client e server

Seguindo uma arquitetura próxima à utilizada em aplicações reais.

## Conclusão

O SmartStock representa meu primeiro projeto full-stack voltado para portfólio e estágio na área de desenvolvimento.

Mais do que apenas um CRUD simples, o projeto permitiu aplicar na prática conceitos importantes de:

desenvolvimento frontend
backend
APIs REST
autenticação
banco de dados
arquitetura de software
integração entre sistemas

Durante o desenvolvimento, também foram enfrentados desafios reais envolvendo:

autenticação JWT
tratamento de erros
sincronização de estado
organização de código
integração entre múltiplas tecnologias

O projeto marcou uma evolução importante na minha jornada como desenvolvedor, servindo como base sólida para aplicações mais avançadas no futuro.