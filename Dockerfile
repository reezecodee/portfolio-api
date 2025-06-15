FROM oven/bun

WORKDIR /app

COPY . .

RUN bun install

EXPOSE 3000

CMD ["bun", "src/server.ts"]
