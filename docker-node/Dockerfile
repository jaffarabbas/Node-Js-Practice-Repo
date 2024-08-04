FROM ubuntu

#for installing node on ubuntu
RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get upgrade -y
RUN apt-get install -y nodejs

#copying the files from the local to the docker
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY main.js main.js

#installing the npm packages
RUN npm install

# running this command when the container starts
ENTRYPOINT [ "node" , "main.js" ]