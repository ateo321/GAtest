# GitHub Actions Demo Project

Dự án demo này minh họa cách sử dụng GitHub Actions để xây dựng một pipeline CI/CD hoàn chỉnh cho ứng dụng Node.js/Express.

> **Update:** Đã clean up workflows và simplified deployment process - v1.0.1

## 🚀 Tính năng

- **Ứng dụng Express.js** đơn giản với API endpoints
- **GitHub Actions CI/CD** pipeline hoàn chỉnh
- **Docker containerization** 
- **Railway auto-deployment** với GitHub Actions
- **Automated testing** với Jest
- **Code linting** với ESLint
- **Security scanning** với Trivy
- **Multi-environment deployment** (staging/production)

## 📁 Cấu trúc dự án

```
├── .github/
│   └── workflows/
│       ├── ci.yml          # Continuous Integration
│       ├── cd.yml          # Continuous Deployment
│       └── docker.yml      # Docker build & test
├── src/
│   ├── __tests__/
│   │   └── app.test.js     # Unit tests
│   └── app.js              # Main application
├── Dockerfile              # Docker configuration
├── package.json            # Dependencies & scripts
├── .eslintrc.js           # ESLint configuration
└── README.md              # This file
```

## 🛠️ Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js >= 18.0.0
- npm hoặc yarn

### Cài đặt dependencies
```bash
npm install
```

### Chạy ứng dụng
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### Chạy tests
```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch
```

### Linting
```bash
# Check for linting errors
npm run lint

# Fix linting errors automatically
npm run lint:fix
```

## 🐳 Docker

### Build Docker image
```bash
docker build -t github-actions-demo .
```

### Chạy container
```bash
docker run -p 3000:3000 github-actions-demo
```

### Test health endpoint
```bash
curl http://localhost:3000/health
```

## 🔄 GitHub Actions Workflows

### 1. CI Pipeline (`.github/workflows/ci.yml`)
Chạy khi có push/PR vào branch `main` hoặc `develop`:

- **Test**: Chạy tests trên Node.js 18.x và 20.x
- **Lint**: Kiểm tra code style với ESLint
- **Build**: Tạo build artifacts
- **Security Scan**: Quét lỗ hổng bảo mật với Trivy
- **Coverage**: Upload coverage report lên Codecov

### 2. CD Pipeline (`.github/workflows/cd.yml`)
Chạy khi push vào `main` hoặc tạo tag:

- **Build & Push**: Tạo Docker image và push lên GitHub Container Registry
- **Deploy Staging**: Tự động deploy lên staging environment
- **Deploy Production**: Deploy lên production khi tạo tag
- **Release**: Tự động tạo GitHub Release

### 3. Docker Pipeline (`.github/workflows/docker.yml`)
Test Docker image:

- **Build**: Build Docker image
- **Test**: Test image có chạy được không
- **Health Check**: Kiểm tra health endpoint

## 🌐 API Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/` | Trang chủ với thông tin ứng dụng |
| GET | `/health` | Health check endpoint |
| GET | `/api/users` | Lấy danh sách users |
| GET | `/api/users/:id` | Lấy thông tin user theo ID |

## 🔧 Environment Variables

| Variable | Mô tả | Default |
|----------|-------|---------|
| `PORT` | Port cho server | `3000` |
| `NODE_ENV` | Environment | `development` |

## 📊 Monitoring & Health Checks

Ứng dụng có built-in health check endpoint tại `/health` trả về:
- Status: OK/ERROR
- Uptime: Thời gian chạy
- Timestamp: Thời gian hiện tại

## 🚀 Deployment

### Staging
Tự động deploy khi push vào branch `main`

### Production
Tự động deploy khi tạo tag với format `v*` (ví dụ: `v1.0.0`)

### Manual Deployment
Có thể trigger manual deployment qua GitHub Actions UI với các environment options.

## 🔒 Security

- **Helmet.js**: Security headers
- **CORS**: Cross-origin resource sharing
- **Trivy**: Vulnerability scanning
- **Non-root user**: Docker container chạy với non-root user

## 📝 Scripts

| Script | Mô tả |
|--------|-------|
| `npm start` | Chạy ứng dụng production |
| `npm run dev` | Chạy ứng dụng development với nodemon |
| `npm test` | Chạy tests |
| `npm run test:watch` | Chạy tests trong watch mode |
| `npm run lint` | Kiểm tra code style |
| `npm run lint:fix` | Tự động fix code style |

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

## 📄 License

MIT License - xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 🆘 Troubleshooting

### Lỗi thường gặp

1. **Port đã được sử dụng**: Thay đổi PORT environment variable
2. **Dependencies không cài được**: Xóa `node_modules` và `package-lock.json`, sau đó chạy `npm install`
3. **Docker build fail**: Kiểm tra Dockerfile và đảm bảo tất cả files cần thiết đã được copy

### Debug

```bash
# Chạy với debug mode
DEBUG=* npm start

# Kiểm tra logs
docker logs <container_id>

# Vào trong container
docker exec -it <container_id> sh
```

## 📞 Support

Nếu có vấn đề gì, vui lòng tạo issue trên GitHub repository.
# Railway Deploy Fix
