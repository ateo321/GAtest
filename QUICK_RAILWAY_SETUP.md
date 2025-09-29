# 🚂 Quick Railway Setup

## ⚡ **Setup trong 2 phút:**

### **1. Tạo Railway Token:**
1. Vào [railway.app](https://railway.app) → **Account Settings** → **Tokens**
2. **New Token** → Copy token

### **2. Thêm GitHub Secret:**
1. GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret:**
   - Name: `RAILWAY_TOKEN`
   - Value: [paste token từ bước 1]

### **3. Tạo Railway Project:**
1. [railway.app](https://railway.app) → **New Project**
2. **Deploy from GitHub repo**
3. Chọn `ateo321/GAtest`

## 🎯 **Kết quả:**

- ✅ **Auto-deploy** mỗi khi push to main
- ✅ **Tests chạy trước** khi deploy
- ✅ **Railway URL** hiển thị trong GitHub Actions
- ✅ **Fallback guide** nếu chưa setup

## 🔍 **Kiểm tra:**

1. **GitHub Actions**: `https://github.com/ateo321/GAtest/actions`
2. **Railway Dashboard**: `https://railway.app/dashboard`

**Sau khi setup xong, mỗi lần push code sẽ tự động deploy!** 🚀
