FROM node:lts-alpine

ARG VITE_BASE_API_URL=${VITE_BASE_API_URL}
ENV VITE_BASE_API_URL=${VITE_BASE_API_URL}

ARG VITE_BASE_URL=${VITE_BASE_URL}
ENV VITE_BASE_URL=${VITE_BASE_URL}

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