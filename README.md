# saffron-threads-ui

## Project structure

```text
frontend/
├─ src/
│  ├─ server.js
│  └─ data/
│     └─ templates.js
├─ public/
│  ├─ index.html
│  ├─ app.js
│  ├─ styles.css
│  ├─ templates/
│  │  ├─ template-1/
│  │  ├─ template-2/
│  │  └─ template-3/
│  └─ style-boards/
├─ package.json
└─ README.md
```

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Start the app server:

```bash
npm run dev
```

3. Open:

```text
http://localhost:4173
```

### API endpoints

- `GET /api/health`
- `GET /api/templates`

### Optional environment variables

- `PORT` (default: `4173`)
- `HOST` (default: `0.0.0.0`)
