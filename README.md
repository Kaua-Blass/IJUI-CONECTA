# 🏙️ Ijuí Conecta

**Plataforma digital para participação cidadã no município de Ijuí — RS**

Projeto desenvolvido no Componente Curricular de **Projeto Integrador** do curso de **Engenharia de Software — UNIJUÍ**, alinhado ao **ODS 11 da Agenda 2030 da ONU** — Cidades e Comunidades Sustentáveis.

---

## 📋 Sobre o projeto

O **Ijuí Conecta** é um aplicativo mobile/PWA que aproxima a população da Prefeitura Municipal de Ijuí. A plataforma permite que cidadãos acompanhem notícias e eventos municipais, registrem reclamações com geolocalização, proponham e votem em ideias de melhoria, avaliem serviços públicos e acompanhem indicadores de transparência.

O sistema foi desenvolvido como **protótipo funcional completo** com dados simulados (mockados) no frontend, sem necessidade de backend para rodar.

### Funcionalidades

| Módulo | Cidadão | Prefeitura (Admin) |
|---|---|---|
| Autenticação | Cadastro, login, recuperação de senha | Login com perfil admin |
| Notícias | Visualizar e filtrar por categoria | Criar, editar, excluir |
| Eventos | Visualizar calendário e detalhes | Criar, editar, cancelar |
| Reclamações | Registrar (foto + GPS), acompanhar status e histórico | Listar, filtrar, atualizar status |
| Ideias | Propor e votar | Aprovar, rejeitar, marcar como implementada |
| Feedback | Avaliar projetos com 1–5 estrelas | Ver média geral e comentários |
| Transparência | Ver indicadores do município | — |
| Notificações | Ver notificações push | — |
| Perfil | Editar dados, alterar senha, configurar notificações | — |

---

## 🛠️ Stack tecnológico

| Camada | Tecnologia | Versão |
|---|---|---|
| Framework mobile/PWA | Ionic Framework | 7.8.6 |
| Framework frontend | Angular | 17.3.12 |
| Linguagem | TypeScript | 5.4.5 |
| Bridge Android/iOS | Capacitor | 5.7.8 |
| Câmera nativa | @capacitor/camera | 5.0.9 |
| Geolocalização | @capacitor/geolocation | 5.0.7 |
| Push Notifications | @capacitor/push-notifications | 5.1.2 |
| Ícones | Ionicons | 7.4.0 |
| Estilização | SCSS com variáveis CSS | — |
| Tipografia | Inter + Fraunces (Google Fonts) | — |

### Especificação do backend (para produção)

> O protótipo atual roda sem backend. A arquitetura de produção prevê:

- **Node.js + Express** — API RESTful
- **PostgreSQL** — Banco de dados relacional
- **Firebase Cloud Messaging** — Notificações push
- **Google Maps API** — Geolocalização de reclamações
- **JWT (JSON Web Tokens)** — Autenticação segura

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

| Ferramenta | Versão mínima | Download |
|---|---|---|
| Node.js | 18.0.0 | [nodejs.org](https://nodejs.org) |
| npm | 9.0.0 | Incluído no Node.js |

Para verificar:

```bash
node --version   # deve retornar v18.x.x ou superior
npm --version    # deve retornar 9.x.x ou superior
```

---

## 🚀 Como executar

### 1. Clonar ou extrair o projeto

```bash
# Se usando o ZIP
unzip ijui-conecta-frontend.zip
cd ijui-conecta/frontend
```

### 2. Instalar as dependências

```bash
npm install
```

> Isso instala automaticamente todas as dependências listadas no `package.json`. Pode aparecer avisos de `deprecated` — são normais e não afetam o funcionamento.

### 3. Iniciar o servidor de desenvolvimento

```bash
npm start
```

Aguarde a mensagem:

```
✔ Browser application bundle generation complete.
```

### 4. Abrir no navegador

Acesse: **[http://localhost:4200](http://localhost:4200)**

---

## 🔑 Contas de demonstração

O sistema já possui usuários pré-cadastrados para teste imediato — **sem necessidade de backend**:

| Perfil | E-mail | Senha | Acesso |
|---|---|---|---|
| 👤 Cidadão | `demo@ijui.gov.br` | `123456` | App completo do cidadão |
| 🏛️ Admin | `admin@ijui.gov.br` | `123456` | Painel administrativo da prefeitura |

Na tela de login, use os botões **"Entrar como Cidadão"** ou **"Entrar como Prefeitura"** para login de um clique, sem precisar digitar nada.

---

## 🧪 Como testar cada funcionalidade

### Cadastro de novo usuário
1. Na tela de login, clique em **"Criar conta"**
2. Preencha nome, e-mail (novo), senha e confirmação de senha
3. CPF é opcional
4. Clique em **"Criar conta"** — você será logado automaticamente
5. Para testar o login com a nova conta: clique em **"Sair"** (Perfil → Sair) e entre com o e-mail e senha que você cadastrou

### Reclamações
1. Acesse **Reclamações** → **+ (botão flutuante)**
2. Selecione a categoria, descreva o problema
3. Clique em **"Usar minha localização"** (requer permissão no navegador)
4. Clique em **"Enviar Reclamação"**
5. A reclamação aparece no topo da lista com protocolo gerado
6. Clique na reclamação para ver o histórico

> Para testar o painel admin: entre como `admin@ijui.gov.br`, acesse **Reclamações** e clique em **"Atualizar status"** em qualquer reclamação.

### Ideias
1. Acesse **Ideias** → **+ (botão flutuante)**
2. Preencha título, categoria e descrição
3. Clique em **"Publicar Ideia"** — aparece no topo da lista
4. Clique em **"Apoiar"** em qualquer ideia para votar (1 voto por ideia por sessão)

### Feedback
1. Acesse o menu **Perfil** → ou **Aba Início** → card de módulo
2. Selecione um projeto, escolha a nota (1–5 estrelas) e escreva um comentário
3. Clique em **"Enviar avaliação"** — aparece nas avaliações recentes

### Painel Administrativo (perfil admin)
1. Entre com `admin@ijui.gov.br / 123456`
2. Você será redirecionado automaticamente para `/admin`
3. No dashboard, acesse qualquer módulo pelo menu
4. **Notícias**: crie uma nova notícia (botão +) ou edite uma existente
5. **Reclamações**: filtre por status e atualize o status de uma reclamação
6. **Ideias**: altere a situação de uma ideia para "Em análise" ou "Aprovada"
7. **Usuários**: ative ou desative uma conta de usuário

### Perfil
1. Acesse a aba **Perfil**
2. Aba **Dados**: edite nome e e-mail e salve
3. Aba **Senha**: troque a senha (a nova senha funcionará no próximo login)
4. Aba **Notificações**: ative/desative preferências de notificação

---

## 📱 Build para Android (Google Play Store)

> Requer: **Android Studio** + **Java JDK 17** + **Android SDK API 33+**

```bash
# 1. Build de produção
npm run build:prod

# 2. Copiar para o Android
npx cap copy android

# 3. Abrir no Android Studio
npx cap open android
```

No Android Studio: **Run ▶** com o celular conectado via USB (depuração USB ativada) ou use o emulador.

---

## 📂 Estrutura do projeto

```
frontend/
├── src/
│   ├── app/
│   │   ├── guards/             # AuthGuard, AdminGuard
│   │   ├── middleware/         # AuthInterceptor (JWT)
│   │   ├── models/             # Interfaces TypeScript
│   │   ├── pages/
│   │   │   ├── splash/         # Tela de splash
│   │   │   ├── login/          # Login com acesso demo
│   │   │   ├── cadastro/       # Cadastro de usuário
│   │   │   ├── forgot-password/# Recuperação de senha
│   │   │   ├── home/           # Home com módulos
│   │   │   ├── noticias/       # Listagem de notícias
│   │   │   ├── noticia-detalhe/# Detalhe da notícia
│   │   │   ├── eventos/        # Listagem de eventos
│   │   │   ├── evento-detalhe/ # Detalhe do evento
│   │   │   ├── reclamacoes/    # Minhas reclamações
│   │   │   ├── nova-reclamacao/# Formulário (foto+GPS)
│   │   │   ├── detalhe-reclamacao/ # Status + histórico
│   │   │   ├── ideias/         # Ideias com votação
│   │   │   ├── nova-ideia/     # Formulário de ideia
│   │   │   ├── feedback/       # Avaliação de projetos
│   │   │   ├── transparencia/  # Indicadores do município
│   │   │   ├── perfil/         # Dados, senha, notificações
│   │   │   ├── notificacoes/   # Central de notificações
│   │   │   └── admin/
│   │   │       ├── admin-dashboard/    # KPIs e menu admin
│   │   │       ├── admin-noticias/     # CRUD de notícias
│   │   │       ├── admin-noticia-form/ # Formulário notícia
│   │   │       ├── admin-eventos/      # CRUD de eventos
│   │   │       ├── admin-evento-form/  # Formulário evento
│   │   │       ├── admin-reclamacoes/  # Gestão de reclamações
│   │   │       ├── admin-ideias/       # Gestão de ideias
│   │   │       ├── admin-feedbacks/    # Visualizar feedbacks
│   │   │       └── admin-usuarios/     # Ativar/desativar contas
│   │   ├── services/           # Serviços com dados mockados
│   │   │   ├── auth.service.ts         # Login, cadastro, perfil
│   │   │   ├── noticias.service.ts
│   │   │   ├── eventos.service.ts
│   │   │   ├── reclamacoes.service.ts
│   │   │   ├── ideias.service.ts
│   │   │   ├── feedback.service.ts
│   │   │   ├── transparencia.service.ts
│   │   │   ├── notificacoes.service.ts
│   │   │   └── admin.service.ts
│   │   ├── app-routing.module.ts
│   │   ├── app.module.ts
│   │   └── app.component.ts
│   ├── environments/
│   │   ├── environment.ts       # Dev (localhost:3000)
│   │   └── environment.prod.ts  # Produção
│   ├── theme/
│   │   └── variables.scss       # Paleta azul e branco
│   ├── global.scss              # Estilos globais Ionic
│   ├── index.html
│   └── main.ts
├── angular.json
├── capacitor.config.ts
├── ionic.config.json
├── package.json
└── tsconfig.json
```

---

## ⚠️ Comportamento dos dados mockados

Os dados do protótipo ficam em **memória** enquanto a aba do navegador estiver aberta:

- ✅ **Novos cadastros** funcionam e ficam disponíveis para login na mesma sessão
- ✅ **Novas reclamações, ideias e feedbacks** aparecem na lista imediatamente
- ✅ **Votos em ideias** persistem durante a sessão (1 por ideia)
- ✅ **Atualização de status** pelo admin reflete em tempo real
- ⚠️ **Ao recarregar a página (F5)** os dados voltam ao estado inicial do código

> Para persistência real, o backend Node.js + PostgreSQL deve ser integrado conforme especificado em `src/environments/environment.ts`.

---

## 👥 Equipe

| Nome | Função |
|---|---|
| Gabriel do Nascimento Esteves | Desenvolvedor |
| Kauã Blass | Desenvolvedor |
| Pedro Emilio Martinelli | Desenvolvedor |
| Vinícius Ribeiro Dutra | Desenvolvedor |

**Orientadora:** Profª Taciana Paula Enderle
**Curso:** Engenharia de Software — UNIJUÍ
**Componente:** Projeto Integrador — 2025/2

---

## 📄 Licença

Projeto desenvolvido para fins acadêmicos. Todos os direitos reservados aos autores.
