# LLM-front

LLM-front is a modern frontend application for chatting with various Large Language Models (LLMs). It provides a user-friendly interface to interact with multiple LLMs, manage conversations, and customize chat experiences. Based on openrouter.ai API.

## Features

- Chat with different LLMs (Gemma, DeepSeek, etc.)
- Model selection and switching
- Pre-made chat templates
- Conversation history management
- Responsive and clean UI built with React and Tailwind CSS

## Tech Stack

- **React** (TypeScript)
- **Vite**
- **Tailwind CSS**
- **Zustand**
- **ESLint** for code quality

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Running the App

```bash
npm run dev
```

## Project Structure

```
LLM-front/
├── src/
│   ├── components/        # React components (chat list, model selector, etc.)
│   ├── constants/         # Static data (models, pre-made chats)
│   ├── services/          # API and chat service logic
│   ├── store/             # State management
│   ├── types/             # TypeScript types
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Entry point
├── public/                # Static assets
├── package.json           # Project metadata and scripts
├── vite.config.ts         # Vite configuration
└── tailwind.css           # Tailwind CSS config
```

## Customization

- Add or modify LLM models in `src/constants/models.ts`
- Update chat templates in `src/constants/preMadeChats.ts`

## Backend Proxy: openrouter-proxy

LLM-front uses a companion backend project, [**openrouter-proxy**](https://github.com/BMike903/openrouter-proxy). This proxy acts as a secure intermediary for calling the OpenRouter.ai API, ensuring secret API key is never exposed to the frontend or client-side code.

- All requests to OpenRouter.ai are routed through this proxy.
- You should configure your secret key in the proxy env.
