const request = require('supertest');
const app = require('../app');

describe('API Tests', () => {
  describe('GET /', () => {
    it('should return welcome message for API requests', async () => {
      const response = await request(app)
        .get('/?format=json')
        .set('Accept', 'application/json');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('version');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body.message).toContain('Chào mừng');
    });

    it('should return HTML page for browser requests', async () => {
      const response = await request(app)
        .get('/')
        .set('Accept', 'text/html');
      
      expect(response.status).toBe(200);
      expect(response.text).toContain('<!DOCTYPE html>');
      expect(response.text).toContain('GitHub Actions Demo');
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /api/users', () => {
    it('should return list of users', async () => {
      const response = await request(app).get('/api/users');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('email');
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return specific user', async () => {
      const userId = 1;
      const response = await request(app).get(`/api/users/${userId}`);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', userId);
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('email');
    });

    it('should handle non-existent user', async () => {
      const response = await request(app).get('/api/users/999');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 999);
    });
  });

  describe('404 Handler', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app).get('/non-existent-route');
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('Không tìm thấy');
    });
  });
});
