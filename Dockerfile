ARG NODE_VERSION=19.2.0

# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
WORKDIR /usr/src/app

ARG ENV=dev


# Create a stage for installing production dependencies.
FROM base as deps

# Install sharp for image optimization
RUN npm install sharp

# Download dependencies as a separate step to take advantage of Docker's caching.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Create a stage for building the application.
FROM deps as build


RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

COPY . .
RUN npm run build

# Create a new stage to run the application with minimal runtime dependencies.
FROM base as final



USER node

COPY package.json .

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build --chown=node:node /usr/src/app/.next ./.next
COPY --from=build /usr/src/app/next.config.js ./
COPY --from=build /usr/src/app/public ./public

EXPOSE 3000

# Set the ENV inside the container
ENV ENV=${ENV}

CMD npm run start:$ENV
