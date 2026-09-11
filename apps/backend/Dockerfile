# syntax=docker/dockerfile:1

# Imagem de produção do site da FAZ.
#
# O backend Express serve a API E o frontend (SSR/prerender) já buildado a
# partir de um único processo — não há servidor de frontend separado. Por
# isso o build entra em duas partes (frontend, depois backend) e o estágio
# final carrega os dois `dist/`.

# pnpm >=11 exige Node >=22.13 (usa node:sqlite internamente); o mínimo do
# projeto (">=20" no package.json) não é suficiente para o corepack.
# ---------- 1. dependências (monorepo inteiro, é pnpm workspace) ----------
FROM node:22-alpine AS deps
WORKDIR /repo
RUN corepack enable && corepack prepare pnpm@11.9.0 --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/frontend/package.json ./apps/frontend/package.json
COPY apps/backend/package.json ./apps/backend/package.json
RUN pnpm install --frozen-lockfile

# ---------- 2. build ----------
FROM node:22-alpine AS builder
WORKDIR /repo
RUN corepack enable && corepack prepare pnpm@11.9.0 --activate
COPY --from=deps /repo/node_modules ./node_modules
COPY --from=deps /repo/apps/frontend/node_modules ./apps/frontend/node_modules
COPY --from=deps /repo/apps/backend/node_modules ./apps/backend/node_modules
COPY . .
RUN pnpm --filter ./apps/frontend run build
RUN pnpm --filter ./apps/backend run build

# ---------- 3. execução ----------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

RUN addgroup -g 1001 -S nodejs && adduser -S faz -u 1001

COPY --from=builder --chown=faz:nodejs /repo/apps/backend/dist ./apps/backend/dist
COPY --from=builder --chown=faz:nodejs /repo/apps/backend/package.json ./apps/backend/package.json
COPY --from=builder --chown=faz:nodejs /repo/apps/frontend/dist ./apps/frontend/dist
COPY --from=builder --chown=faz:nodejs /repo/node_modules ./node_modules
COPY --from=builder --chown=faz:nodejs /repo/apps/backend/node_modules ./apps/backend/node_modules

# Dados persistentes (leads, logs de consentimento) — montados como volume
# pelo compose; criados aqui só para o caso de subir sem volume nenhuma vez.
RUN mkdir -p /app/apps/backend/data/consent-logs && chown -R faz:nodejs /app/apps/backend/data

USER faz
WORKDIR /app/apps/backend
EXPOSE 3001

HEALTHCHECK --interval=15s --timeout=5s --retries=5 --start-period=15s \
  CMD node -e "fetch('http://127.0.0.1:3001/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "dist/server.js"]
