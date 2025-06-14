FROM oven/bun

WORKDIR /app

COPY . .

RUN bun install

CMD ["bun", "src/server.ts"]
