FROM node:16.9.0
LABEL maintainer = "Tina"

# Copy source files from host computer to the container
COPY / /app

#install package and compile files
WORKDIR /app
RUN yarn


# ENTRYPOINT ["node ./src/Listener.js"]
CMD ["yarn", "deploy"]
CMD ["yarn", "start"]