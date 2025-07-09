# Sistema de Cadastro de Pessoas

Um sistema completo de cadastro e consulta de pessoas desenvolvido em Angular 17, com validações robustas, interface moderna e testes abrangentes.

## 🌐 Preview da Aplicação

**Acesse a aplicação em produção:** [https://front-end-challenge-rosy.vercel.app/](https://front-end-challenge-rosy.vercel.app/)

---

## Sobre o Projeto

Este projeto implementa um sistema completo de gerenciamento de pessoas com as seguintes características:

- **Página Inicial**: Interface de boas-vindas com navegação intuitiva
- **Cadastro de Pessoas**: Formulário com validações em tempo real
- **Consulta por CPF**: Busca e exibição de dados cadastrados
- **Validações Customizadas**: CPF, email e telefone com regras específicas
- **Interface Responsiva**: Design moderno com Angular Material
- **Testes Abrangentes**: Cobertura completa com Jest (185 cenários de teste)

## ✨ Funcionalidades

### 🏠 Página Inicial

- **Interface de Boas-vindas**: Mensagem de apresentação do sistema
- **Navegação Intuitiva**: Cards interativos para acessar funcionalidades
- **Design Responsivo**: Adaptação perfeita para todos os dispositivos
- **Acessibilidade**: Suporte completo a navegação por teclado e leitores de tela
- **Animações Suaves**: Transições elegantes e feedback visual

### 📝 Cadastro de Pessoas

- **Nome**: Validação de comprimento (3-100 caracteres) e formato (apenas letras e espaços)
- **CPF**: Validação completa com dígitos verificadores e máscara automática
- **Sexo**: Seleção obrigatória (Masculino, Feminino, Outro)
- **Email**: Validação de formato, caracteres especiais e comprimento máximo
- **Telefone**: Validação de DDD, formato e comprimento (10-11 dígitos)
- **Navegação**: Botão de voltar para a página inicial

### 🔍 Consulta de Pessoas

- Busca por CPF com validação de formato
- Exibição formatada dos dados encontrados
- Tratamento de erros e feedback ao usuário
- Suporte a colar CPF com formatação automática
- Teclas de atalho funcionais (Ctrl+A, Ctrl+V, etc.)
- Navegação: Botão de voltar para a página inicial

### 🎨 Interface do Usuário

- Design moderno e responsivo
- Feedback visual em tempo real
- Estados de loading durante operações
- Mensagens de erro contextuais
- Navegação fluida entre páginas

## 🧪 Cobertura de Testes

O projeto possui **185 cenários de teste** distribuídos em **9 suites de teste**:

### **Validadores (3 suites)**

- ✅ **CPF Validator**: 15 testes - Validação completa de CPF
- ✅ **Email Validator**: 12 testes - Validação de formato e regras
- ✅ **Telefone Validator**: 10 testes - Validação de DDD e formato

### **Serviços (2 suites)**

- ✅ **Pessoas Service**: 18 testes - Operações CRUD completas
- ✅ **In-Memory Data Service**: 8 testes - Dados mock e simulação de backend

### **Componentes (4 suites)**

- ✅ **App Component**: 3 testes - Estrutura principal da aplicação
- ✅ **Página Inicial Component**: 29 testes - Interface de boas-vindas e navegação
- ✅ **Cadastro Component**: 85 testes - Formulário completo com validações
- ✅ **Consulta Component**: 15 testes - Busca e exibição de dados

### **Execução dos Testes**

```bash
# Todos os testes (185 cenários)
npm test

# Modo watch
npm run test:watch

# Com cobertura
npm run test:coverage

# Testes específicos
npm test -- --testPathPattern=cadastro.component.spec.ts
```

## 🛠️ Tecnologias Utilizadas

- **Angular 17**: Framework principal
- **TypeScript**: Linguagem de programação
- **Angular Material**: Componentes de UI
- **Reactive Forms**: Gerenciamento de formulários
- **Jest**: Framework de testes (185 cenários)
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

- **Página Inicial**: `http://localhost:4200/`
- **Cadastro**: `http://localhost:4200/cadastro`
- **Consulta**: `http://localhost:4200/consulta`

## 📁 Estrutura do Projeto

```
front-end-challenge/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── pagina-inicial/
│   │   │   │   ├── pagina-inicial.component.ts      # Página inicial
│   │   │   │   ├── pagina-inicial.component.html    # Template da página inicial
│   │   │   │   ├── pagina-inicial.component.scss    # Estilos da página inicial
│   │   │   │   └── pagina-inicial.component.spec.ts # Testes da página inicial
│   │   │   ├── cadastro/
│   │   │   │   ├── cadastro.component.ts      # Componente de cadastro
│   │   │   │   ├── cadastro.component.html    # Template do cadastro
│   │   │   │   ├── cadastro.component.scss    # Estilos do cadastro
│   │   │   │   └── cadastro.component.spec.ts # Testes do cadastro (85 cenários)
│   │   │   └── consulta/
│   │   │       ├── consulta.component.ts      # Componente de consulta
│   │   │       ├── consulta.component.html    # Template da consulta
│   │   │       ├── consulta.component.scss    # Estilos da consulta
│   │   │       └── consulta.component.spec.ts # Testes da consulta (15 cenários)
│   │   ├── validators/
│   │   │   ├── email.validator.ts             # Validador de email
│   │   │   ├── cpf.validator.ts               # Validador de CPF
│   │   │   ├── telefone.validator.ts          # Validador de telefone
│   │   │   └── *.spec.ts                      # Testes dos validators (37 cenários)
│   │   ├── directives/
│   │   │   └── cpf-mask.directive.ts          # Diretiva de máscara CPF
│   │   ├── services/
│   │   │   ├── pessoas.service.ts             # Serviço de pessoas
│   │   │   ├── in-memory-data.service.ts      # Serviço de dados mock
│   │   │   └── *.spec.ts                      # Testes dos serviços (26 cenários)
│   │   ├── interfaces/
│   │   │   └── pessoa.interface.ts            # Interface IPessoa
│   │   ├── app.component.ts                   # Componente principal
│   │   ├── app.module.ts                      # Módulo principal
│   │   └── app.routes.ts                      # Configuração de rotas
│   ├── assets/                                # Recursos estáticos
│   ├── styles.scss                            # Estilos globais
│   └── main.ts                                # Ponto de entrada
├── package.json                               # Dependências e scripts
├── jest.config.js                             # Configuração do Jest
└── README.md                                  # Documentação do projeto
```

## 🎯 Funcionalidades Avançadas

### **Acessibilidade**

- ✅ Navegação por teclado completa
- ✅ Roles semânticos (main, region, button)
- ✅ Aria-labels descritivos
- ✅ Suporte a leitores de tela
- ✅ Estados de foco visíveis

### **Responsividade**

- ✅ **Desktop**: Layout otimizado para telas grandes
- ✅ **Tablet**: Adaptação para dispositivos médios
- ✅ **Mobile**: Interface mobile-first
- ✅ **Dispositivos pequenos**: Otimização para telas pequenas

### **Validações Robustas**

- ✅ **CPF**: Validação completa com dígitos verificadores
- ✅ **Email**: Formato, caracteres especiais e comprimento
- ✅ **Telefone**: DDD válido e formato brasileiro
- ✅ **Nome**: Apenas letras, espaços e acentos

### **Experiência do Usuário**

- ✅ **Feedback visual** em tempo real
- ✅ **Estados de loading** durante operações
- ✅ **Mensagens de erro** contextuais
- ✅ **Animações suaves** e transições
- ✅ **Navegação intuitiva** entre páginas

## 📊 Métricas do Projeto

- **Total de Testes**: 185 cenários
- **Suites de Teste**: 9
- **Cobertura**: 100% dos componentes principais
- **Componentes**: 4 (Página Inicial, Cadastro, Consulta)
- **Validadores**: 3 (CPF, Email, Telefone)
- **Serviços**: 2 (Pessoas, In-Memory Data)
- **Diretivas**: 1 (Máscara CPF)

## Contato

Em caso de dúvidas, entre em contato:

Email: viniciussilva707@gmail.com

GitHub: https://github.com/vinicius707
