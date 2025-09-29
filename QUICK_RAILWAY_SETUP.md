# 🚂 Quick Railway Setup

## ⚡ **Setup trong 2 phút:**

### **1. Tạo Railway Project:**
1. Vào [railway.app](https://railway.app) → **New Project**
2. **Deploy from GitHub repo**
3. Chọn `ateo321/GAtest`
4. Railway sẽ tự động connect và deploy

### **2. Cấu hình Environment (Optional):**
1. Railway Dashboard → **Variables**
2. Thêm `NODE_ENV=production` (nếu cần)
3. Railway tự động detect Node.js app

### **3. Lấy URL:**
1. Railway Dashboard → **Deployments**
2. Copy public URL của app
3. Test các endpoints

## 🎯 **Kết quả:**

- ✅ **Auto-deploy** mỗi khi push to main
- ✅ **Không cần GitHub Actions** cho Railway
- ✅ **Railway webhook** tự động trigger
- ✅ **Simple và reliable**

## 🔍 **Kiểm tra:**

1. **Railway Dashboard**: `https://railway.app/dashboard`
2. **App URL**: Railway cung cấp sau khi deploy
3. **GitHub Actions**: Chỉ chạy CI/CD, không deploy Railway

## 📋 **Workflows hiện tại:**

| Workflow | Mô tả | Trigger |
|----------|-------|---------|
| **`main.yml`** | CI/CD + Docker + Release | Push/PR/Tags |
| **Railway** | Auto-deploy via webhook | Push to main |

**Sau khi setup xong, mỗi lần push code sẽ tự động deploy!** 🚀
