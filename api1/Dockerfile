# Init layer image
FROM node:18-alpine
# Working directory on image
WORKDIR /app
# Copy vao /app
COPY package.json .
# Command execute on buildtime
RUN npm i
COPY . .
EXPOSE 3000
# Cmd execute on runtime
CMD [ "npm", "run", "dev" ]