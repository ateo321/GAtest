# 🔄 GitHub Actions Workflows Guide

## 📋 **Tổng quan Workflows**

Dự án này có 3 workflows chính:

| Workflow | Trigger | Mô tả |
|----------|---------|-------|
| **`main.yml`** | Push/PR/Tags | CI/CD + Docker + Release |
| **`railway-webhook.yml`** | Push to main | Railway webhook deployment |
| **`railway-setup.yml`** | Manual | Railway setup guide |

## 🚀 **Main CI/CD Pipeline**

### **File**: `.github/workflows/main.yml`

### **Trigger**:
- Push to `main` branch
- Pull requests to `main`
- Create tags (e.g., `v1.0.0`)

### **Jobs**:
1. **Test**: Chạy tests và linting
2. **Build**: Tạo Docker image
3. **Deploy**: Push image to GitHub Container Registry
4. **Release**: Tạo GitHub Release (khi có tag)

### **Sử dụng**:
```bash
# Tự động chạy khi push code
git push origin main

# Tạo release
git tag v1.0.0
git push origin v1.0.0
```

## 🚂 **Railway Webhook Deploy**

### **File**: `.github/workflows/railway-webhook.yml`

### **Trigger**:
- Push to `main` branch
- Manual trigger

### **Jobs**:
1. **Test**: Chạy tests trước khi deploy
2. **Notify**: Thông báo Railway webhook deployment

### **Sử dụng**:
```bash
# Tự động chạy khi push to main
git push origin main

# Manual trigger
# GitHub Actions → railway-webhook.yml → Run workflow
```

### **Lưu ý**:
- Workflow này chỉ thông báo, không thực sự deploy
- Railway webhook sẽ tự động deploy
- Kiểm tra Railway dashboard để xem deployment status

## 🛠️ **Railway Setup Guide**

### **File**: `.github/workflows/railway-setup.yml`

### **Trigger**:
- Manual trigger only
- Có 3 options: `guide`, `check`, `test`

### **Options**:

#### **1. Guide** (`guide`):
- Hiển thị hướng dẫn setup Railway
- Step-by-step instructions
- Links và commands cần thiết

#### **2. Check** (`check`):
- Kiểm tra trạng thái Railway
- Thông tin repository và commit
- Hướng dẫn check Railway dashboard

#### **3. Test** (`test`):
- Test Railway integration
- Hướng dẫn verify deployment
- Success criteria checklist

### **Sử dụng**:
1. Vào GitHub Actions
2. Chọn `railway-setup.yml`
3. Click **Run workflow**
4. Chọn action: `guide`, `check`, hoặc `test`
5. Click **Run workflow**

## 🔧 **Cấu hình Workflows**

### **Environment Variables**:
Không cần environment variables cho Railway workflows vì sử dụng webhook.

### **Secrets**:
- `GITHUB_TOKEN`: Tự động có sẵn
- Không cần `RAILWAY_TOKEN` vì dùng webhook

### **Permissions**:
```yaml
permissions:
  contents: read
  packages: write
  id-token: write
```

## 📊 **Monitoring Workflows**

### **GitHub Actions**:
- Vào `https://github.com/ateo321/GAtest/actions`
- Xem status của các workflows
- Check logs nếu có lỗi

### **Railway Dashboard**:
- Vào `https://railway.app/dashboard`
- Check deployment status
- View logs và metrics

## 🚨 **Troubleshooting**

### **Workflow fails**:
1. Check GitHub Actions logs
2. Verify tests pass locally
3. Check Railway dashboard

### **Railway not deploying**:
1. Verify Railway project exists
2. Check webhook connection
3. Run `railway-setup.yml` với option `test`

### **Tests failing**:
1. Run `npm test` locally
2. Check test files
3. Fix issues before pushing

## 🎯 **Best Practices**

### **Development**:
1. Chạy tests locally trước khi push
2. Sử dụng feature branches
3. Test Railway setup với `railway-setup.yml`

### **Deployment**:
1. Push to `main` để trigger Railway deploy
2. Check Railway dashboard sau khi deploy
3. Test endpoints sau khi deploy

### **Releases**:
1. Tạo tag để trigger release
2. Check GitHub Releases
3. Verify Docker image được tạo

## 📚 **Tài liệu tham khảo**

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Railway Documentation](https://docs.railway.app/)
- [Docker Documentation](https://docs.docker.com/)
- [Node.js Documentation](https://nodejs.org/docs/)
