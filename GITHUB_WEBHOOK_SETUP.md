# 🔗 GitHub Webhook Setup cho Railway

## 📋 **Tổng quan**

Để Railway auto-deploy hoạt động, cần setup webhook giữa GitHub và Railway. Webhook sẽ tự động trigger Railway deployment khi có push code.

## 🚀 **Cách 1: Railway Dashboard (Khuyến nghị)**

### **Bước 1: Tạo Railway Project**
1. Vào [railway.app](https://railway.app)
2. Click **"New Project"**
3. Chọn **"Deploy from GitHub repo"**
4. Tìm và chọn `ateo321/GAtest`
5. Click **"Deploy Now"**

### **Bước 2: Railway Auto-Setup**
Railway sẽ tự động:
- ✅ Connect với GitHub repository
- ✅ Tạo webhook
- ✅ Detect Node.js app
- ✅ Setup build configuration
- ✅ Cung cấp public URL

### **Bước 3: Verify Setup**
1. Railway Dashboard → **Deployments**
2. Check deployment status
3. Copy public URL

## 🔧 **Cách 2: Manual Webhook Setup**

### **Bước 1: Lấy Railway Webhook URL**
1. Railway Dashboard → **Project Settings**
2. **GitHub** tab
3. Copy **Webhook URL**

### **Bước 2: Tạo GitHub Webhook**
1. GitHub repo → **Settings** → **Webhooks**
2. Click **"Add webhook"**
3. **Payload URL**: Paste Railway webhook URL
4. **Content type**: `application/json`
5. **Events**: Chọn `Just the push event`
6. **Active**: ✅ Checked
7. Click **"Add webhook"**

### **Bước 3: Test Webhook**
1. Make a small change to code
2. Push to main branch
3. Check Railway dashboard for deployment

## 🔍 **Kiểm tra Webhook hoạt động**

### **1. GitHub Webhooks**
- Vào `https://github.com/ateo321/GAtest/settings/hooks`
- Check có Railway webhook
- Click webhook để xem recent deliveries

### **2. Railway Dashboard**
- Vào `https://railway.app/dashboard`
- Check deployment logs
- Verify app URL

### **3. Test Deployment**
```bash
# Tạo test commit
echo "<!-- Test: $(date) -->" >> public/index.html
git add public/index.html
git commit -m "Test webhook"
git push origin main

# Check Railway app
curl https://your-app.railway.app/
```

## 🚨 **Troubleshooting**

### **Webhook không hoạt động:**
1. **Check GitHub webhook status**:
   - Vào GitHub repo settings
   - Check webhook có lỗi gì không
   - Xem recent deliveries

2. **Check Railway project**:
   - Verify project connected to GitHub
   - Check deployment logs
   - Try manual redeploy

3. **Check permissions**:
   - Railway có quyền truy cập GitHub repo
   - Repository không bị private
   - Webhook có quyền gửi requests

### **Railway không deploy:**
1. **Check build logs**:
   - Railway Dashboard → **Deployments**
   - Click vào deployment để xem logs
   - Check có lỗi build không

2. **Check environment**:
   - Verify Node.js version
   - Check environment variables
   - Verify package.json scripts

3. **Manual trigger**:
   - Railway Dashboard → **Redeploy**
   - Force trigger deployment

## 📊 **Webhook Events**

### **Events được trigger:**
- `push` - Khi push code
- `pull_request` - Khi tạo/update PR (optional)

### **Events không cần:**
- `issues` - Không liên quan đến deployment
- `fork` - Không cần thiết
- `watch` - Không cần thiết

## 🎯 **Best Practices**

### **1. Webhook Security:**
- Sử dụng HTTPS URLs
- Verify webhook signatures (Railway tự động)
- Không expose webhook URLs

### **2. Monitoring:**
- Check webhook delivery status
- Monitor Railway deployment logs
- Set up alerts nếu cần

### **3. Testing:**
- Test webhook với small changes
- Verify deployment success
- Check app functionality

## 🔗 **Useful Links**

- [Railway Documentation](https://docs.railway.app/)
- [GitHub Webhooks Guide](https://docs.github.com/en/developers/webhooks-and-events/webhooks)
- [Railway Dashboard](https://railway.app/dashboard)
- [GitHub Repository](https://github.com/ateo321/GAtest)

## ✅ **Success Checklist**

- [ ] Railway project created from GitHub repo
- [ ] Webhook automatically created by Railway
- [ ] GitHub webhook shows as active
- [ ] Test commit triggers Railway deployment
- [ ] Railway app accessible via public URL
- [ ] App shows latest changes

**Sau khi setup xong, mỗi lần push code sẽ tự động deploy lên Railway!** 🚂✨
