# Nginx Configuration for UAS Sister Project

Konfigurasi Nginx untuk menjalankan aplikasi SIAKAD dengan:
- **Frontend**: React/Vite (Static files)
- **Backend**: NestJS API

## 📁 Struktur File

```
nginx/
├── nginx.conf      # Konfigurasi Nginx
├── deploy.sh       # Script deployment otomatis
└── README.md       # Dokumentasi ini
```

## 🚀 Quick Start (Manual)

### 1. Build Frontend
```bash
cd frontend-sister
npm install
npm run build
```

### 2. Build Backend
```bash
cd nest-js-restful-api
npm install
npm run build
```

### 3. Copy files ke server
```bash
# Frontend
sudo mkdir -p /var/www/frontend-sister
sudo cp -r frontend-sister/dist/* /var/www/frontend-sister/

# Backend
sudo mkdir -p /var/www/nest-js-restful-api
sudo cp -r nest-js-restful-api/dist /var/www/nest-js-restful-api/
sudo cp -r nest-js-restful-api/node_modules /var/www/nest-js-restful-api/
sudo cp nest-js-restful-api/package.json /var/www/nest-js-restful-api/
sudo cp nest-js-restful-api/.env /var/www/nest-js-restful-api/
```

### 4. Setup Nginx
```bash
# Copy konfigurasi
sudo cp nginx/nginx.conf /etc/nginx/sites-available/uas-sister

# Enable site
sudo ln -s /etc/nginx/sites-available/uas-sister /etc/nginx/sites-enabled/

# Disable default site
sudo rm /etc/nginx/sites-enabled/default

# Test & restart
sudo nginx -t
sudo systemctl restart nginx
```

### 5. Jalankan Backend dengan PM2
```bash
# Install PM2
sudo npm install -g pm2

# Start backend
cd /var/www/nest-js-restful-api
pm2 start dist/main.js --name "uas-sister-api"
pm2 save
pm2 startup
```

## 🤖 Automated Deployment

Gunakan script `deploy.sh` untuk deployment otomatis:

```bash
chmod +x nginx/deploy.sh
./nginx/deploy.sh
```

## ⚙️ Konfigurasi

### Environment Variables (Backend)

Buat file `.env` di `/var/www/nest-js-restful-api/`:

```env
# Database
DATABASE_URL="mysql://user:password@localhost:3306/nestdb"

# Application
PORT=3000
NODE_ENV=production

# JWT
JWT_SECRET=your-super-secret-key
```

### Ubah Domain

Edit `nginx.conf` dan ganti `server_name`:

```nginx
server_name yourdomain.com www.yourdomain.com;
```

## 🔒 SSL/HTTPS (dengan Certbot)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Generate SSL
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renew
sudo certbot renew --dry-run
```

## 📊 Monitoring

```bash
# Status PM2
pm2 status

# Logs backend
pm2 logs uas-sister-api

# Logs Nginx
sudo tail -f /var/log/nginx/uas-sister-access.log
sudo tail -f /var/log/nginx/uas-sister-error.log
```

## 🛠️ Troubleshooting

### Backend tidak bisa diakses
```bash
# Cek status PM2
pm2 status

# Cek logs
pm2 logs uas-sister-api --lines 50

# Restart
pm2 restart uas-sister-api
```

### Nginx error
```bash
# Test config
sudo nginx -t

# Cek error log
sudo tail -f /var/log/nginx/error.log
```

### Permission issues
```bash
sudo chown -R www-data:www-data /var/www/frontend-sister
sudo chown -R $USER:$USER /var/www/nest-js-restful-api
```

## 📝 URL Endpoints

| Service | URL |
|---------|-----|
| Frontend | http://localhost/ |
| Backend API | http://localhost/api |
| WebSocket | http://localhost/socket.io |
| Uploads | http://localhost/uploads |
