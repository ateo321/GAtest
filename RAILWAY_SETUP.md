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

### 2. Tạo Railway Token

1. **Vào Account Settings**
   - Click avatar → **Settings**
   - Chọn **"Tokens"**

2. **Tạo token mới**
   - Click **"New Token"**
   - Đặt tên: `GitHub Actions Deploy`
   - Copy token (chỉ hiện 1 lần!)

### 3. GitHub Actions (Optional)

**Lưu ý:** Railway có thể auto-deploy mà không cần GitHub Actions!

Nếu muốn sử dụng GitHub Actions:
1. **Vào GitHub Repository**
   - `https://github.com/ateo321/GAtest`
   - Click **Settings** → **Secrets and variables** → **Actions**

2. **Thêm secrets (nếu cần):**
   - `RAILWAY_TOKEN`: Token từ bước 2
   - `RAILWAY_SERVICE`: Service name từ Railway project

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
