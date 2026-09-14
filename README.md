# Express TypeScript Template

A minimal, production-ready Express + TypeScript starter for building APIs.

## Features

- ✅ Express 5 + TypeScript (strict mode)
- ✅ Environment validation with Zod
- ✅ Security: Helmet + CORS
- ✅ Error handling
- ✅ Vercel deployment ready
- ✅ Minimal dependencies

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Development
npm run dev

# Build
npm run build

# Production
npm start
```

## Project Structure

```
src/
├── config.ts              # Environment configuration
├── server.ts              # Express app setup
├── routes/
│   └── index.ts          # API routes
├── middleware/
│   └── errors.ts         # Error handling
└── utils/
    └── logger.ts         # Logging utility
```

## Available Endpoints

- `GET /api` - Welcome message
- `GET /api/health` - Health check

## Adding New Routes

Edit `src/routes/index.ts` and add your routes:

```typescript
router.get('/users', (req, res) => {
  res.json({ message: 'Users endpoint' });
});
```

## Environment Variables

See `.env.example` for available options.

## Deployment

### Vercel

```bash
git push origin main
```

Vercel will automatically:
1. Install dependencies
2. Run `npm run build`
3. Deploy to production

## License

MIT
