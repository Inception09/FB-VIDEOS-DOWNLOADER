<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=timeGradient&height=250&section=header&text=FB%20Videos%20Downloader&fontSize=60&fontAlignY=35&desc=Original%20API%20%2B%20Premium%20UI&descAlignY=55&descAlign=50" />

  <!-- Tech Stack Badges -->
  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
  ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
  ![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
  ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

  <br />

  <!-- Repo Stats Badges -->
  [![GitHub stars](https://img.shields.io/github/stars/Inception09/FB-VIDEOS-DOWNLOADER?style=social)](https://github.com/Inception09/FB-VIDEOS-DOWNLOADER/stargazers)
  [![GitHub forks](https://img.shields.io/github/forks/Inception09/FB-VIDEOS-DOWNLOADER?style=social)](https://github.com/Inception09/FB-VIDEOS-DOWNLOADER/network/members)
  [![GitHub issues](https://img.shields.io/github/issues/Inception09/FB-VIDEOS-DOWNLOADER)](https://github.com/Inception09/FB-VIDEOS-DOWNLOADER/issues)
  [![GitHub last commit](https://img.shields.io/github/last-commit/Inception09/FB-VIDEOS-DOWNLOADER)](https://github.com/Inception09/FB-VIDEOS-DOWNLOADER/commits/main)
  [![License](https://img.shields.io/github/license/Inception09/FB-VIDEOS-DOWNLOADER)](LICENSE)
  [![Website](https://img.shields.io/website?url=https%3A%2F%2Ffb-videos-downloader.netlify.app&label=Live%20Demo)](https://fb-videos-downloader.netlify.app)
  [![Netlify Status](https://api.netlify.com/api/v1/badges/b9594161-aa37-418b-a5e9-ba6aca232850/deploy-status)](https://app.netlify.com/projects/fb-videos-downloader/deploys)
  <br />
  <b>Created with ❤️ by Professor Imamul Islam & Inception</b>
</div>

---

## 📑 Table of Contents

- [🤖 The Story](#-the-story-how-it-started-vs-how-its-going)
- [✨ Features](#-features)
- [🚀 Live Demo](#-live-demo)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [⚙️ Getting Started](#️-getting-started)
- [☁️ Deploy to Netlify](#️-deploy-to-netlify)
- [🐍 Original Backend API Script](#-original-backend-api-script)
- [🤝 Contributing](#-contributing)
- [👨‍💻 Creators](#-creators)
- [📜 License](#-license)

---

## 🤖 The Story (How it Started vs. How it's Going)

This project belongs to my friend **Professor Imamul Islam**, who asked me to help update it.

I had originally created the core backend script (still visible in `facebook-video-download-api.py`)—a smart direct scraper to extract video links without relying on heavy binaries like `yt-dlp`. To fulfill his request and take the project to the next level, I decided it needed a full redesign with new features — and then I did it: **Redesigned the entire project with AI :0**! 🚀

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎬 **HD & SD Download** | Choose between high-quality and standard-quality video downloads |
| ⚡ **Fast Extraction** | Custom Python scraper — no heavy binaries like `yt-dlp` required |
| 🌐 **Serverless API** | Powered by Netlify Functions — zero server management |
| 🎨 **Premium UI** | Beautiful, responsive interface built with React + Tailwind CSS |
| 📋 **Paste & Go** | Just paste a Facebook video URL and download instantly |
| 🔒 **No Login Required** | Works on public Facebook videos without any account |
| 📱 **Mobile Friendly** | Fully responsive — works on phones, tablets, and desktops |
| 🌙 **Dark Mode Ready** | Elegant dark-themed design out of the box |

---

## 🚀 Live Demo

> Check out the live web application here:
>
> **🔗 [https://fb-videos-downloader.netlify.app/](https://fb-videos-downloader.netlify.app/)**

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18 + TypeScript |
| **Styling** | Tailwind CSS |
| **Build Tool** | Vite |
| **Backend API** | Netlify Functions (Node.js) |
| **Original Scraper** | Python 3 |
| **Deployment** | Netlify |

---

## 📁 Project Structure

```
FB-VIDEOS-DOWNLOADER/
├── netlify/
│   └── functions/          # Serverless API functions
├── src/                    # React frontend source
├── facebook-video-download-api.py  # Original Python scraper
├── index.html
├── vite.config.ts
├── tailwind.config.*
├── netlify.toml
└── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js `v18+`
- npm or yarn
- Netlify CLI (optional, for local serverless dev)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Inception09/FB-VIDEOS-DOWNLOADER.git

# 2. Navigate into the project
cd FB-VIDEOS-DOWNLOADER

# 3. Install dependencies
npm install

# 4. Copy the environment example and configure
cp .env.example .env
```

### Running Locally

```bash
# Start the Vite dev server (frontend only)
npm run dev

# Or with Netlify CLI to also run serverless functions locally
netlify dev
```

### Building for Production

```bash
npm run build
```

---

## ☁️ Deploy to Netlify

You can deploy your own instance of this project to Netlify in two ways:

### 🟢 Option 1 — One-Click Deploy (Easiest)

Click the button below to instantly fork & deploy to your own Netlify account:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Inception09/FB-VIDEOS-DOWNLOADER)

> Netlify will automatically clone the repo, set up the build, and give you a live URL. Done in under a minute! ⚡

---

### 🔵 Option 2 — Manual Deploy via Netlify Dashboard

**Step 1 — Fork the repository**

Click **Fork** at the top-right of this page to get your own copy.

**Step 2 — Log in to Netlify**

Go to [app.netlify.com](https://app.netlify.com) and sign in (GitHub login works great).

**Step 3 — Create a new site**

- Click **"Add new site"** → **"Import an existing project"**
- Choose **GitHub** as the Git provider
- Select your forked `FB-VIDEOS-DOWNLOADER` repository

**Step 4 — Configure build settings**

Netlify will auto-detect most settings from `netlify.toml`, but verify:

| Setting | Value |
|---|---|
| **Base directory** | *(leave blank)* |
| **Build command** | `npm run build` |
| **Publish directory** | `dist` |
| **Functions directory** | `netlify/functions` |

**Step 5 — Set environment variables** *(if needed)*

Go to **Site settings → Environment variables** and add any keys from `.env.example`:

```
# Example (add your actual values)
SOME_API_KEY=your_value_here
```

**Step 6 — Deploy!**

Click **"Deploy site"**. Netlify will build and publish your site. You'll get a URL like:
`https://your-site-name.netlify.app` 🎉

---

### 🔧 Option 3 — Deploy via Netlify CLI

For power users who prefer the terminal:

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Log in to your Netlify account
netlify login

# Clone and enter the project
git clone https://github.com/Inception09/FB-VIDEOS-DOWNLOADER.git
cd FB-VIDEOS-DOWNLOADER
npm install

# Link to a new or existing Netlify site
netlify init

# Deploy a preview
netlify deploy

# Deploy to production
netlify deploy --prod
```

---

### 🔁 Automatic Deploys

Once connected to GitHub, every push to `main` will **automatically trigger a new deploy** on Netlify — no manual steps needed.

You can also enable **Deploy Previews** so every Pull Request gets its own preview URL for testing before merging.

---

## 🐍 Original Backend API Script

The `facebook-video-download-api.py` file contains the original standalone Python scraper — a lightweight, clever solution that extracts direct video links from Facebook pages **without needing `yt-dlp` or other heavy tools**.

You can use it independently as a local API server:

```bash
pip install -r requirements.txt   # if applicable
python facebook-video-download-api.py
```

Then send a request:

```
GET /download?url=<facebook_video_url>
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** your feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add some amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

Please make sure your code follows the existing style and passes any linting checks.

---

## 👨‍💻 Creators

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/creationofprofessor">
        <img src="https://github.com/creationofprofessor.png" width="80px;" alt="Professor Imamul Islam"/><br />
        <sub><b>Professor Imamul Islam</b></sub>
      </a><br/>
      🎓 Project Owner
    </td>
    <td align="center">
      <a href="https://github.com/Inception09">
        <img src="https://github.com/Inception09.png" width="80px;" alt="Inception"/><br />
        <sub><b>Inception</b></sub>
      </a><br/>
      ⚙️ Developer & Redesigner<br/>
      Telegram: <a href="https://t.me/inception00007">@inception00007</a>
    </td>
  </tr>
</table>

---

## 📜 License

This project is open source. Feel free to use, modify, and distribute it — just give credit where it's due! 🙏

---

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=timeGradient&height=120&section=footer" />
  <p>If you found this useful, please ⭐ star the repo — it really helps!</p>
</div>
