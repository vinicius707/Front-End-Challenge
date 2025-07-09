# Sistema de Cadastro de Pessoas

Um sistema completo de cadastro e consulta de pessoas desenvolvido em Angular 17, com validações robustas, interface moderna e testes abrangentes.

## Sobre o Projeto

Este projeto implementa um sistema completo de gerenciamento de pessoas com as seguintes características:

- **Cadastro de Pessoas**: Formulário com validações em tempo real
- **Consulta por CPF**: Busca e exibição de dados cadastrados
- **Validações Customizadas**: CPF, email e telefone com regras específicas
- **Interface Responsiva**: Design moderno com Angular Material
- **Testes Abrangentes**: Cobertura completa com Jest

## ✨ Funcionalidades

### 📝 Cadastro de Pessoas

- **Nome**: Validação de comprimento (3-100 caracteres) e formato (apenas letras e espaços)
- **CPF**: Validação completa com dígitos verificadores e máscara automática
- **Sexo**: Seleção obrigatória (Masculino, Feminino, Outro)
- **Email**: Validação de formato, caracteres especiais e comprimento máximo
- **Telefone**: Validação de DDD, formato e comprimento (10-11 dígitos)

### 🔍 Consulta de Pessoas

- Busca por CPF com validação de formato
- Exibição formatada dos dados encontrados
- Tratamento de erros e feedback ao usuário

### 🎨 Interface do Usuário

- Design moderno e responsivo
- Feedback visual em tempo real
- Estados de loading durante operações
- Mensagens de erro contextuais

## 🛠️ Tecnologias Utilizadas

- **Angular 17**: Framework principal
- **TypeScript**: Linguagem de programação
- **Angular Material**: Componentes de UI
- **Reactive Forms**: Gerenciamento de formulários
- **Jest**: Framework de testes
- **Angular In-Memory Web API**: Simulação de backend
- **RxJS**: Programação reativa

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** (gerenciador de pacotes do Node.js)
- **Git** (controle de versão)
- **Angular CLI** (ferramenta de linha de comando do Angular)

### 🔍 Verificando as Instalações

Abra o terminal e execute:

```bash
# Verificar versão do Node.js
node --version

# Verificar versão do npm
npm --version

# Verificar versão do Git
git --version

# Verificar versão do Angular CLI
ng version
```

**Versões recomendadas:**

- Node.js: 18.x ou superior
- npm: 9.x ou superior
- Git: 2.x ou superior
- Angular CLI: 17.x ou superior

### 📦 Instalando o Angular CLI

Se você não tiver o Angular CLI instalado, execute:

```bash
# Instalar Angular CLI globalmente
npm install -g @angular/cli

# Verificar se foi instalado corretamente
ng version
```

## 🚀 Como Executar o Projeto

### 1. Clone o Repositório

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/front-end-challenge.git

# Entre na pasta do projeto
cd front-end-challenge
```

### 2. Instale as Dependências

```bash
# Instalar todas as dependências
npm install
```

**⏱️ Tempo estimado:** 2-5 minutos (dependendo da conexão)

### 3. Execute o Projeto

```bash
# Iniciar o servidor de desenvolvimento
npm start
```

**🎉 Sucesso!** O projeto estará disponível em: `http://localhost:4200`

### 4. Acesse a Aplicação

Abra seu navegador e acesse:

- **Cadastro**: `http://localhost:4200/cadastro`
- **Consulta**: `http://localhost:4200/consulta`

## 🧪 Executando os Testes

### Executar Todos os Testes

```bash
# Executar todos os testes
npm test
```

### Executar Testes em Modo Watch

```bash
# Executar testes em modo watch (re-executa quando há mudanças)
npm run test:watch
```

### Executar Testes com Cobertura

```bash
# Executar testes com relatório de cobertura
npm run test:coverage
```

### Executar Testes Específicos

```bash
# Executar apenas testes de um arquivo específico
npm test -- --testPathPattern=cadastro.component.spec.ts

# Executar apenas testes de validators
npm test -- --testPathPattern=validators
```

## 📁 Estrutura do Projeto

```
front-end-challenge/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── cadastro/
│   │   │   │   ├── cadastro.component.ts      # Componente de cadastro
│   │   │   │   ├── cadastro.component.html    # Template do cadastro
│   │   │   │   ├── cadastro.component.scss    # Estilos do cadastro
│   │   │   │   └── cadastro.component.spec.ts # Testes do cadastro
│   │   │   └── consulta/
│   │   │       ├── consulta.component.ts      # Componente de consulta
│   │   │       ├── consulta.component.html    # Template da consulta
│   │   │       ├── consulta.component.scss    # Estilos da consulta
│   │   │       └── consulta.component.spec.ts # Testes da consulta
│   │   ├── validators/
│   │   │   ├── email.validator.ts             # Validador de email
│   │   │   ├── cpf.validator.ts               # Validador de CPF
│   │   │   ├── telefone.validator.ts          # Validador de telefone
│   │   │   └── *.spec.ts                      # Testes dos validators
│   │   ├── directives/
│   │   │   └── cpf-mask.directive.ts          # Diretiva de máscara CPF
│   │   ├── services/
│   │   │   ├── pessoas.service.ts             # Serviço de pessoas
│   │   │   ├── in-memory-data.service.ts      # Serviço de dados mock
│   │   │   └── *.spec.ts                      # Testes dos serviços
│   │   ├── interfaces/
│   │   │   └── pessoa.interface.ts            # Interface IPessoa
│   │   ├── app.component.ts                   # Componente principal
│   │   ├── app.module.ts                      # Módulo principal
│   │   └── app.routes.ts                      # Configuração de rotas
│   ├── assets/                                # Recursos estáticos
│   ├── styles.scss                            # Estilos globais
│   └── main.ts                                # Ponto de entrada
├── package.json                               # Dependências e scripts
├── angular.json                               # Configuração do Angular
├── jest.config.js                             # Configuração do Jest
├── tsconfig.json                              # Configuração do TypeScript
└── README.md                                  # Este arquivo
```

## 🔧 Configurações

### Scripts Disponíveis

```json
{
  "scripts": {
    "start": "ng serve", // Inicia servidor de desenvolvimento
    "build": "ng build", // Gera build de produção
    "test": "jest", // Executa testes
    "test:watch": "jest --watch", // Executa testes em modo watch
    "test:coverage": "jest --coverage" // Executa testes com cobertura
  }
}
```

### Configurações Importantes

#### Jest (Testes)

- Framework: Jest + Angular Testing
- Cobertura: HTML, LCOV, Text
- Ambiente: jsdom
- Preset: jest-preset-angular

#### Angular Material

- Tema: Indigo/Pink (padrão)
- Animações: Habilitadas
- Responsividade: Mobile-first

## 📊 Cobertura de Testes

### Estatísticas Atuais

- **Total de Testes**: 156
- **Suites de Teste**: 8
- **Cobertura**: 100% dos componentes críticos

### Tipos de Testes

#### 🎯 Testes de Componentes

- Renderização e inicialização
- Validações de formulário
- Interações do usuário
- Estados de loading
- Tratamento de erros

#### 🔍 Testes de Validators

- Validação de CPF (20 testes)
- Validação de Email (15 testes)
- Validação de Telefone (25 testes)

#### 🛠️ Testes de Serviços

- Operações CRUD
- Tratamento de erros HTTP
- Dados mock

### Executando Testes Específicos

```bash
# Testes de cadastro
npm test -- --testPathPattern=cadastro

# Testes de validators
npm test -- --testPathPattern=validators

# Testes de serviços
npm test -- --testPathPattern=services
```

## 🎨 Funcionalidades Detalhadas

### Validações Implementadas

#### CPF

- ✅ Formato numérico (11 dígitos)
- ✅ Dígitos verificadores válidos
- ✅ Não aceita todos os dígitos iguais
- ✅ Máscara automática: `000.000.000-00`

#### Email

- ✅ Formato válido (regex robusto)
- ✅ Caracteres especiais permitidos
- ✅ Comprimento máximo (254 caracteres)
- ✅ Domínio válido

#### Telefone

- ✅ Comprimento (10-11 dígitos)
- ✅ DDD válido (11-99)
- ✅ Apenas números
- ✅ Não aceita zero no início
- ✅ Formatação automática: `(00) 00000-0000`

### Estados da Aplicação

#### Cadastro

- **Vazio**: Formulário limpo
- **Preenchendo**: Validações em tempo real
- **Enviando**: Loading e desabilitação
- **Sucesso**: Mensagem e reset
- **Erro**: Mensagem de erro

#### Consulta

- **Vazio**: Campo CPF vazio
- **Buscando**: Loading e desabilitação
- **Encontrado**: Exibição dos dados
- **Não encontrado**: Mensagem de erro
- **Erro**: Mensagem de erro

## Contato

Em caso de dúvidas, entre em contato:

Email: viniciussilva707@gmail.com

GitHub: https://github.com/vinicius707

---

**Desenvolvido usando Angular 17**
