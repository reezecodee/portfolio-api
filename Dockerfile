FROM oven/bun:1 as base
WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --production

COPY . .

ENV PORT=3000
EXPOSE 3000

CMD ["bun", "src/index.ts"]