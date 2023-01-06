FROM node:lts-alpine

ARG VITE_TEST=${VITE_TEST}
ENV VITE_TEST=${VITE_TEST}

ARG VITE_BASE_API_URL=${VITE_BASE_API_URL}
ENV VITE_BASE_API_URL=${VITE_BASE_API_URL}

ARG VITE_BASE_URL=${VITE_BASE_URL}
ENV VITE_BASE_URL=${VITE_BASE_URL}

ARG VITE_API_KEY=${VITE_API_KEY}
ENV VITE_API_KEY=${VITE_API_KEY}

ARG VITE_AUTH_DOMAIN=${VITE_AUTH_DOMAIN}
ENV VITE_AUTH_DOMAIN=${VITE_AUTH_DOMAIN}

ARG VITE_PROJECT_ID=${VITE_PROJECT_ID}
ENV VITE_PROJECT_ID=${VITE_PROJECT_ID}

ARG VITE_STORAGE_BUCKET=${VITE_STORAGE_BUCKET}
ENV VITE_STORAGE_BUCKET=${VITE_STORAGE_BUCKET}

ARG VITE_MESSAGING_SENDER_ID=${VITE_MESSAGING_SENDER_ID}
ENV VITE_MESSAGING_SENDER_ID=${VITE_MESSAGING_SENDER_ID}

ARG VITE_APP_ID=${VITE_APP_ID}
ENV VITE_APP_ID=${VITE_APP_ID}

ARG VITE_GOOGLE_API=${VITE_GOOGLE_API}
ENV VITE_GOOGLE_API=${VITE_GOOGLE_API}

ARG VITE_NODE_ENV=${VITE_NODE_ENV}
ENV VITE_NODE_ENV=${VITE_NODE_ENV}

# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist" ]