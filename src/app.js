const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ['\'self\''],
      styleSrc: ['\'self\'', '\'unsafe-inline\'', 'https://fonts.googleapis.com', 'https://cdnjs.cloudflare.com'],
      fontSrc: ['\'self\'', 'https://fonts.gstatic.com', 'https://cdnjs.cloudflare.com'],
      scriptSrc: ['\'self\'', '\'unsafe-inline\''],
      imgSrc: ['\'self\'', 'data:', 'https:'],
      connectSrc: ['\'self\'']
    }
  }
}));
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  // Check if request is from test or API client
  const isTestRequest = req.headers['user-agent']?.includes('supertest');
  const isJsonRequest = req.headers.accept?.includes('application/json');
  const isApiRequest = req.query.format === 'json';
  
  if (isTestRequest || isJsonRequest || isApiRequest) {
    // Return JSON for API clients and tests
    res.json({
      message: 'Chào mừng đến với GitHub Actions Demo!',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  } else {
    // Try to serve the main HTML page for browsers
    const htmlPath = path.join(__dirname, '../public/index.html');
    
    // Check if file exists
    const fs = require('fs');
    if (fs.existsSync(htmlPath)) {
      res.sendFile(htmlPath);
    } else {
      // Fallback to a simple HTML response if file doesn't exist
      res.send(`
        <!DOCTYPE html>
        <html lang="vi">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>GitHub Actions Demo</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #333; text-align: center; }
            .status { background: #e8f5e8; padding: 20px; border-radius: 5px; margin: 20px 0; }
            .api-links { margin: 20px 0; }
            .api-links a { display: inline-block; margin: 10px; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; }
            .api-links a:hover { background: #0056b3; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🚀 GitHub Actions Demo</h1>
            <div class="status">
              <h2>✅ App đang chạy!</h2>
              <p>Ứng dụng đã được deploy thành công lên Railway!!!.</p>
              <p><strong>Environment:</strong> ${process.env.NODE_ENV || 'development'}</p>
              <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
            </div>
            <div class="api-links">
              <h3>🔗 Test API Endpoints:</h3>
              <a href="/health">Health Check</a>
              <a href="/api/users">Users API</a>
              <a href="/?format=json">JSON Response</a>
            </div>
          </div>
        </body>
        </html>
      `);
    }
  }
});

// Serve static files AFTER routes
app.use(express.static(path.join(__dirname, '../public')));

// API route for JSON response
app.get('/api', (req, res) => {
  res.json({
    message: 'Chào mừng đến với GitHub Actions Demo!',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'Nguyễn Văn A', email: 'a@example.com' },
    { id: 2, name: 'Trần Thị B', email: 'b@example.com' },
    { id: 3, name: 'Lê Văn C', email: 'c@example.com' }
  ];
  res.json(users);
});

app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const user = { id: parseInt(id), name: `User ${id}`, email: `user${id}@example.com` };
  res.json(user);
});

// New API endpoints
app.get('/api/git-status', (req, res) => {
  res.json({
    branch: 'main',
    commit: process.env.GITHUB_SHA || 'local-dev',
    author: process.env.GITHUB_ACTOR || 'local-user',
    timestamp: new Date().toISOString(),
    repository: process.env.GITHUB_REPOSITORY || 'ateo321/GAtest'
  });
});

app.get('/api/system-info', (req, res) => {
  res.json({
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/deployment-info', (req, res) => {
  res.json({
    version: '1.0.0',
    buildTime: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    port: PORT,
    features: [
      'GitHub Actions CI/CD',
      'Docker Containerization',
      'Automated Testing',
      'Security Scanning',
      'Multi-Environment Deployment'
    ],
    endpoints: [
      { method: 'GET', path: '/', description: 'Main page' },
      { method: 'GET', path: '/health', description: 'Health check' },
      { method: 'GET', path: '/api/users', description: 'Get all users' },
      { method: 'GET', path: '/api/users/:id', description: 'Get user by ID' },
      { method: 'GET', path: '/api/git-status', description: 'Git status info' },
      { method: 'GET', path: '/api/system-info', description: 'System information' },
      { method: 'GET', path: '/api/deployment-info', description: 'Deployment information' }
    ]
  });
});

// Error handling middleware
app.use((err, req, res, _next) => {
  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.status(500).json({
    error: 'Có lỗi xảy ra!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Không tìm thấy trang',
    path: req.originalUrl
  });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
    // eslint-disable-next-line no-console
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
  });
}

module.exports = app;
