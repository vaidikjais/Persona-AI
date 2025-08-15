# 🤖 AI Persona Chat

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fai-persona-chat)

**Live Demo**: [https://persona-ai-sepia.vercel.app/](https://persona-ai-sepia.vercel.app/)

---

An advanced, secure, and feature-rich AI chat application built with Next.js and the Vercel AI SDK. This project allows users to interact with distinct AI personalities, each powered by detailed, custom-engineered prompts for an authentic conversational experience.



## ✨ Features

- **Dual AI Personas**: Engage with two unique AI experts (Hitesh Choudhary & Piyush Garg), each with a distinct tone, knowledge base, and conversational style.
- **Advanced Prompt Engineering**: Utilizes detailed system instructions and few-shot examples to ensure high-quality, in-character AI responses.
- **Secure API Key Management**:
  - **Server Key**: A default "Free API Key" is protected on the server-side and never exposed to the client.
  - **User Key**: An option for users to securely use their own API key, which is stored exclusively in their browser's `localStorage`.
- **Real-time Streaming**: AI responses are streamed word-by-word for a dynamic and engaging user experience.
- **Modern UI/UX**: A clean, responsive, and aesthetically pleasing interface built with Tailwind CSS and shadcn/ui.
- **Light & Dark Modes**: A theme toggle for user preference.
- **Built with Next.js 15**: Leverages the latest features of the Next.js App Router for a fast and powerful full-stack application.
- **Deployable on Vercel**: Ready for easy, secure deployment.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: JavaScript
- **AI**: [Google Gemini Pro](https://ai.google.dev/)
- **AI SDK**: [Vercel AI SDK](https://sdk.vercel.ai/docs)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

Follow these instructions to set up and run the project locally on your machine.

### Prerequisites

- Node.js (v18 or newer recommended)
- `npm` or a similar package manager

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/ai-persona-chat.git](https://github.com/your-username/ai-persona-chat.git)
    cd ai-persona-chat
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up your environment variables:**
    - Create a new file named `.env.local` in the root of your project.
    - Add your secret Google AI API key to this file. You can get a key from [Google AI Studio](https://aistudio.google.com/app/apikey).

    ```
    # .env.local
    GOOGLE_API_KEY="YOUR_SECRET_GOOGLE_AI_API_KEY"
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application running.

---

## ☁️ Deployment

This application is optimized for deployment on **Vercel**.

1.  **Push your code to GitHub.**
2.  **Import your project on Vercel.** Sign in to Vercel with your GitHub account and import the repository.
3.  **Configure Environment Variables**: In your Vercel project settings, navigate to the "Environment Variables" section and add your `GOOGLE_API_KEY` (the same one from your `.env.local` file). This is a crucial step to ensure your server-side API key is used securely in production.

Vercel will automatically build and deploy your application, providing you with a live URL.

---

## 🛡️ Security Model

This project implements a dual API key system to ensure both security and flexibility:

- **Server-Side Key (Default)**: The `GOOGLE_API_KEY` stored in `.env.local` (and in Vercel's environment variables) is only ever accessed by the server-side API route (`/api/chat`). It is never exposed to the client, making it secure.
- **Client-Side Key (User's Option)**: When a user enters their own API key in the settings modal, it is saved exclusively in their browser's `localStorage`. All API calls made with this key are sent directly from the user's browser to the AI provider, bypassing our server entirely. This ensures the user's private key remains private to them.
