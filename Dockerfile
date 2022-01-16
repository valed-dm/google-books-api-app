FROM node:lts-alpine
ENV NODE_ENV=production
ENV REACT_APP_GOOGLE_API_KEY $REACT_APP_GOOGLE_API_KEY
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 8080
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
