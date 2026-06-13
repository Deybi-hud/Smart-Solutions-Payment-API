import request from 'supertest';
import app from '../src/app.js';

describe('Health check', () => {
  it('GET /health → 200', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('POST /api/payments/preference - validación', () => {
  it('body vacío → 400', async () => {
    const res = await request(app)
      .post('/api/payments/preference')
      .send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Datos inválidos');
  });

  it('body inválido (precio negativo) → 400', async () => {
    const res = await request(app)
      .post('/api/payments/preference')
      .send({ title: 'Producto', quantity: 1, unit_price: -100 });
    expect(res.status).toBe(400);
  });
});
