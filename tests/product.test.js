import { faker } from '@faker-js/faker';
import { createPreference } from '../src/services/payment.service.js';

test('crear_preferencia', async () => {
  const result = await createPreference({
    title: faker.commerce.productName(),
    quantity: 1,
    unit_price: 9990,
  });

  expect(result).toBeDefined();
  expect(result.id).toBeDefined();
});

test('respuesta_tiene_id', async () => {
  const result = await createPreference({
    title: 'Plan Test',
    quantity: 1,
    unit_price: 19990,
  });

  expect(typeof result.id).toBe('string');
});
