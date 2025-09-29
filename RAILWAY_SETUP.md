# 🚂 Railway Setup Guide

## 📋 Cần thiết để auto-deploy Railway

### 1. Tạo Railway Project

1. **Vào Railway Dashboard**
   - Truy cập: [railway.app](https://railway.app)
   - Đăng nhập với GitHub account

2. **Tạo Project mới**
   - Click **"New Project"**
   - Chọn **"Deploy from GitHub repo"**
   - Chọn repository: `ateo321/GAtest`

3. **Lấy thông tin cần thiết**
   - Railway sẽ tự động detect Node.js app
   - Lưu lại **Project ID** và **Service name**

### 2. Railway Project Setup

1. **Tạo Railway Project**
   - [railway.app](https://railway.app) → **New Project**
   - **Deploy from GitHub repo**
   - Chọn `ateo321/GAtest`

2. **Railway tự động setup**
   - Auto-detect Node.js app
   - Setup webhook với GitHub
   - Cung cấp public URL

### 3. Railway Webhook Auto-Deploy

**Railway tự động deploy qua webhook (Không cần GitHub Actions):**

1. **Railway tự động connect:**
   - Railway sẽ tự động connect với GitHub repo
   - Webhook được setup tự động
   - Không cần cấu hình thêm

2. **Auto-deploy features:**
   - ✅ Tự động deploy khi push to main
   - ✅ Không cần GitHub Actions
   - ✅ Railway webhook trigger
   - ✅ Simple và reliable

### 4. Test Auto-Deploy

Sau khi setup xong:

```bash
# Tạo commit test
git add .
git commit -m "Test Railway auto-deploy"
git push origin main
```

**Kết quả mong đợi:**
- ✅ GitHub Actions chạy test
- ✅ Railway deploy tự động
- ✅ App live trên Railway URL

## 🔧 Troubleshooting

### Lỗi thường gặp:

1. **"Railway token not found"**
   - Kiểm tra `RAILWAY_TOKEN` secret
   - Đảm bảo token còn valid

2. **"Service not found"**
   - Kiểm tra `RAILWAY_SERVICE` secret
   - Đảm bảo service name đúng

3. **"Deployment failed"**
   - Kiểm tra Railway logs
   - Kiểm tra app có start được không

### Kiểm tra logs:

1. **GitHub Actions**: `https://github.com/ateo321/GAtest/actions`
2. **Railway Dashboard**: `https://railway.app/dashboard`

## 🎯 Kết quả

Sau khi setup thành công:
- ✅ Mỗi push vào `main` → Auto deploy Railway
- ✅ Tests chạy trước khi deploy
- ✅ App live trên Railway URL
- ✅ Logs và monitoring trong Railway dashboard
