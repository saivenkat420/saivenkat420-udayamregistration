const request = require('supertest');
const express = require('express');
const udyamRoutes = require('./udyamRoutes');

const app = express();
app.use(express.json());
app.use('/', udyamRoutes);

describe('POST /submit', () => {
  it('should return 400 for invalid data', async () => {
    const response = await request(app)
      .post('/submit')
      .send({
        aadhaarNumber: '1234', // Invalid Aadhaar
        entrepreneurName: 'A', // Too short
        panNumber: 'ABCDE123', // Invalid PAN
        entityType: '' // Missing entity type
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.errors).toContain('Aadhaar number is required');
    expect(response.body.errors).toContain('Invalid Aadhaar number format');
    expect(response.body.errors).toContain('Entrepreneur name must be at least 2 characters');
    expect(response.body.errors).toContain('Invalid PAN number format');
    expect(response.body.errors).toContain('Entity type is required');
  });
});
