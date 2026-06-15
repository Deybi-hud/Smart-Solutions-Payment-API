import { jest } from '@jest/globals';
import { faker } from '@faker-js/faker';
import { validate } from '../src/middlewares/validate.middleware.js';
import { createPreferenceSchema } from '../src/validations/payment.validation.js';

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

test('peticion_valida', () => {
  const req = { body: { title: faker.commerce.productName(), quantity: 1, unit_price: 9990 } };
  const res = mockRes();
  const next = jest.fn();

  validate(createPreferenceSchema)(req, res, next);

  expect(next).toHaveBeenCalled();
  expect(res.status).not.toHaveBeenCalled();
});

test('peticion_sin_datos', () => {
  const req = { body: {} };
  const res = mockRes();
  const next = jest.fn();

  validate(createPreferenceSchema)(req, res, next);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(next).not.toHaveBeenCalled();
});

test('peticion_precio_negativo', () => {
  const req = { body: { title: faker.commerce.productName(), quantity: 1, unit_price: -500 } };
  const res = mockRes();
  const next = jest.fn();

  validate(createPreferenceSchema)(req, res, next);

  expect(res.status).toHaveBeenCalledWith(400);
});
