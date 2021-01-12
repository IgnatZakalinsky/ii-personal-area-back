# Check out https://hub.docker.com/_/node to select a new base image
FROM node:10-slim

# Set to a non-root built-in user `node`
USER node

# Create app directory (with user `node`)
RUN mkdir -p /home/node/dist/<app_name>

WORKDIR /home/node/dist/<app_name>

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

COPY --chown=node package*.json ./

RUN yarn install

# Bundle app source code
COPY --chown=node . .

RUN npm run build

# Bind to all network interfaces so that it can be mapped to the host OS

CMD [ "yarn", "start" ]
