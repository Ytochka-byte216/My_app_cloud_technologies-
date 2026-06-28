FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY app.js .

RUN adduser -D -u 1001 appuser && chown -R appuser:appuser /app
USER appuser

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost/health', (r) => {r.statusCode === 200 ? process.exit(0) : process.exit(1)})" || exit 1

CMD ["node", "app.js"]