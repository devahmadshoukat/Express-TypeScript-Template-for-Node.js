# Express TypeScript Server 🚀

A robust, production-ready Node.js server setup powered by Express and TypeScript. Designed for scalability, clean architecture, and an exceptional developer experience out of the box.

## ✨ Key Features

- **Robust Foundation**: Built with Express v5 and compiled with TypeScript v6.
- **Exceptional DX**: Instant hot-reloading with `nodemon` and `ts-node`.
- **Clean Imports**: Fully configured absolute path aliasing via `tsconfig-paths` & `tsc-alias`.
- **Production Ready**: Optimized multi-step build process separating source and distributable code.

## 🛠️ Prerequisites

Ensure you have the following installed on your system:
- **Node.js** (v18.x or newer is recommended)

## 🚀 Getting Started

Follow these steps to get your development environment set up and running locally.

### 1. Install Dependencies

Install all the required packages to run the project.

```bash
npm install
```

### 2. Run Development Server

Start up the development server. This mode features hot-reloading, meaning the server will automatically restart whenever you save changes to your files.

```bash
npm run dev
```

### 3. Build for Production

Compile your TypeScript codebase down to optimized JavaScript code ready for deployment.

```bash
npm run build
```

The compiled output will be securely generated inside a root-level `dist/` directory.

### 4. Start Production Server

Start the compiled JavaScript application. Ensure you have compiled the code using `npm run build` beforehand!

```bash
npm run start
```

## 📜 Available Scripts

Here is a summary of the npm scripts defined within `package.json`:

- `npm run dev` - Initializes the development server.
- `npm run build` - Initiates the TypeScript compiler & processes path aliases.
- `npm run start` - Executes the compiled application from `/dist`.
- `npm run test` - Placeholder command for initializing a test runner.

## 📁 Project Structure

```text
├── src/                # Contains all raw TypeScript source files
│   └── index.ts        # Primary execution entry point
├── dist/               # Production-ready compiled JavaScript
├── package.json        # Dependencies & executable project scripts
└── tsconfig.json       # TypeScript compiler options
```

## 🥞 Tech Stack

- **[Express.js](https://expressjs.com/)** - Core web application framework.
- **[TypeScript](https://www.typescriptlang.org/)** - Static type-checking and modern JavaScript features.
- **[Nodemon](https://nodemon.io/)** - Utility monitor that automatically restarts the server.

---

*This setup is kept intentionally lean while enforcing strict, reliable types.*
