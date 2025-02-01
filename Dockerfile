# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1.2 AS build

# Set the working directory to /app inside the container
WORKDIR /app

# Copy necessary package files to install dependencies
COPY package.json package.json
COPY bun.lock bun.lock

# Install dependencies using Bun
RUN bun install --production

# Copy source code
COPY ./src ./src

# Will create a binary executable with the name of server
RUN bun build \
	--compile \
	--minify-whitespace \
	--minify-syntax \
	--target bun \
	--outfile server \
	./src/index.ts

# Use a minimal distroless image as the final base to reduce attack surface
FROM gcr.io/distroless/base

# Copy application artifacts from build stage:
COPY --from=build /app/server server
COPY --from=build /app/src/db/migrations src/db/migrations

# Start Server
EXPOSE 3000/tcp
ENTRYPOINT ["./server"]

