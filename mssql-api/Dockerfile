FROM node

#setup working directory
WORKDIR /app

#copying the files from the local to the docker
COPY package.json package.json
COPY package-lock.json package-lock.json

#installing the npm packages
RUN npm install

COPY src/ src/

# running this command when the container starts
ENTRYPOINT [ "node" , "src/server.js" ].