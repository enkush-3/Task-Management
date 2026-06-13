# ============================================
# Stage 1: Development (Hot reload)
# ============================================
FROM node:22-alpine AS development

WORKDIR /app

# ✅ `/` устгасан
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

# ============================================
# Stage 2: Production
# ============================================
FROM node:22-alpine AS production

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

COPY . .

EXPOSE 3000

USER node

CMD ["node", "app.js"]