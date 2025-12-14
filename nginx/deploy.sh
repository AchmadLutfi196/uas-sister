#!/bin/bash

# ===========================================
# Deployment Script untuk UAS Sister Project
# ===========================================

set -e

echo "🚀 Starting deployment..."

# Variables - SESUAIKAN DENGAN SERVER ANDA
PROJECT_DIR="/var/www"
FRONTEND_DIR="$PROJECT_DIR/frontend-sister"
BACKEND_DIR="$PROJECT_DIR/nest-js-restful-api"
NGINX_CONF="/etc/nginx/sites-available/uas-sister"
NGINX_ENABLED="/etc/nginx/sites-enabled/uas-sister"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

# 1. Update system packages
echo ""
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y
print_status "System updated"

# 2. Install Node.js (jika belum ada)
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
    print_status "Node.js installed"
else
    print_status "Node.js already installed: $(node -v)"
fi

# 3. Install Nginx (jika belum ada)
if ! command -v nginx &> /dev/null; then
    echo "📦 Installing Nginx..."
    sudo apt install -y nginx
    print_status "Nginx installed"
else
    print_status "Nginx already installed"
fi

# 4. Install PM2 (untuk menjalankan NestJS)
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2..."
    sudo npm install -g pm2
    print_status "PM2 installed"
else
    print_status "PM2 already installed"
fi

# 5. Create project directories
echo ""
echo "📁 Creating project directories..."
sudo mkdir -p $FRONTEND_DIR
sudo mkdir -p $BACKEND_DIR
sudo chown -R $USER:$USER $PROJECT_DIR
print_status "Directories created"

# 6. Build Frontend
echo ""
echo "🔨 Building Frontend..."
cd "$(dirname "$0")/../frontend-sister"
npm install
npm run build
sudo cp -r dist/* $FRONTEND_DIR/
print_status "Frontend built and deployed"

# 7. Setup Backend
echo ""
echo "🔨 Setting up Backend..."
cd "$(dirname "$0")/../nest-js-restful-api"
npm install
npm run build
sudo cp -r dist/* $BACKEND_DIR/
sudo cp -r node_modules $BACKEND_DIR/
sudo cp package.json $BACKEND_DIR/
sudo cp .env $BACKEND_DIR/ 2>/dev/null || print_warning ".env file not found, please create it manually"
sudo cp -r uploads $BACKEND_DIR/ 2>/dev/null || mkdir -p $BACKEND_DIR/uploads
print_status "Backend built and deployed"

# 8. Setup Nginx
echo ""
echo "⚙️ Configuring Nginx..."
sudo cp "$(dirname "$0")/nginx.conf" $NGINX_CONF

# Enable site
if [ ! -L $NGINX_ENABLED ]; then
    sudo ln -s $NGINX_CONF $NGINX_ENABLED
fi

# Remove default site
sudo rm -f /etc/nginx/sites-enabled/default 2>/dev/null || true

# Test nginx config
sudo nginx -t
print_status "Nginx configured"

# 9. Start/Restart services
echo ""
echo "🔄 Starting services..."

# Start NestJS with PM2
cd $BACKEND_DIR
pm2 delete uas-sister-api 2>/dev/null || true
pm2 start dist/main.js --name "uas-sister-api" --env production
pm2 save
pm2 startup 2>/dev/null || true
print_status "Backend started with PM2"

# Restart Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
print_status "Nginx restarted"

# 10. Setup Firewall (optional)
echo ""
echo "🔥 Configuring Firewall..."
sudo ufw allow 'Nginx Full' 2>/dev/null || true
sudo ufw allow 22 2>/dev/null || true
print_status "Firewall configured"

echo ""
echo "=========================================="
echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo "=========================================="
echo ""
echo "📌 URLs:"
echo "   Frontend: http://localhost"
echo "   Backend API: http://localhost/api"
echo ""
echo "📌 Useful commands:"
echo "   pm2 status          - Check backend status"
echo "   pm2 logs            - View backend logs"
echo "   pm2 restart all     - Restart backend"
echo "   sudo nginx -t       - Test nginx config"
echo "   sudo systemctl restart nginx - Restart nginx"
echo ""
