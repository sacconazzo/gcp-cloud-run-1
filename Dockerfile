FROM node:20-slim

RUN apt-get update && apt-get install -y curl

RUN mkdir -p --mode=0755 /usr/share/keyrings && \
    curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null

RUN echo 'deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared bookworm main' | tee /etc/apt/sources.list.d/cloudflared.list

RUN apt-get update && apt-get install -y cloudflared

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

ENV PORT=8080

RUN yarn install --production

COPY . ./

# Run the web service with cloudflare tunnel db.
CMD cloudflared access tcp --hostname mysql.giona.tech --url 127.0.0.1:3306 \
    --header "CF-Access-Client-Id: ${CF_ID}" --header "CF-Access-Client-Secret: ${CF_SECRET}" & \
    cloudflared access tcp --hostname mongo.giona.tech --url 127.0.0.1:27017 \
    --header "CF-Access-Client-Id: ${CF_ID}" --header "CF-Access-Client-Secret: ${CF_SECRET}" & \
    node index.js
