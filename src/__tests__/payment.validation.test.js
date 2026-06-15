import { faker } from '@faker-js/faker';
import { createPreferenceSchema } from '../validations/payment.validation.js';

test('pago_valido', () => {
  const data = {
    title: faker.commerce.productName(),
    quantity: 1,
    unit_price: Number(faker.commerce.price({ min: 5000, max: 50000 })),
  };

  const result = createPreferenceSchema.safeParse(data);

  expect(result.success).toBe(true);
});

test('titulo_requerido', () => {
  const data = {
    quantity: 1,
    unit_price: 29990,
  };

  const result = createPreferenceSchema.safeParse(data);

  expect(result.success).toBe(false);
});

test('titulo_en_blanco', () => {
  const data = {
    title: '',
    quantity: 1,
    unit_price: 19990,
  };

  const result = createPreferenceSchema.safeParse(data);

  expect(result.success).toBe(false);
});

test('precio_invalido', () => {
  const data = {
    title: faker.commerce.productName(),
    quantity: 1,
    unit_price: -5000,
  };

  const result = createPreferenceSchema.safeParse(data);

  expect(result.success).toBe(false);
});

test('email_mal_formato', () => {
  const data = {
    title: faker.commerce.productName(),
    quantity: 1,
    unit_price: 9990,
    payer_email: 'estonoesuncorreo',
  };

  const result = createPreferenceSchema.safeParse(data);

  expect(result.success).toBe(false);
});

test('email_correcto', () => {
  const data = {
    title: faker.commerce.productName(),
    quantity: 1,
    unit_price: 14990,
    payer_email: faker.internet.email(),
  };

  const result = createPreferenceSchema.safeParse(data);

  expect(result.success).toBe(true);
});

test('pago_sin_cantidad', () => {
  const data = {
    title: 'Plan Básico',
    unit_price: 9990,
  };

  const result = createPreferenceSchema.safeParse(data);

  expect(result.success).toBe(true);
  expect(result.data.quantity).toBe(1);
});

test('monto_valido', () => {
  const data = {
    title: faker.commerce.productName(),
    quantity: 1,
    unit_price: 9990.99,
  };

  const result = createPreferenceSchema.safeParse(data);

  expect(result.success).toBe(false);
});
