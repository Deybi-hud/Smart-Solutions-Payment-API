import { Preference } from 'mercadopago';
import client from '../config/mercadopago.js';
import { randomUUID } from 'crypto';

export const createPreference = async ({ title, quantity, unit_price }) => {
  try {
    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            title,
            quantity: Number(quantity),
            unit_price: Math.round(Number(unit_price)),
            currency_id: 'CLP',
          },
        ],
        back_urls: {
          success: `${process.env.FRONTEND_URL}/payment/success`,
          failure: `${process.env.FRONTEND_URL}/payment/failure`,
          pending: `${process.env.FRONTEND_URL}/payment/pending`,
        },
        auto_return: 'approved',
      },
    });

    return {
      id: result.id,
      sandbox_init_point: result.sandbox_init_point,
      init_point: result.init_point,
    };
  } catch {
    const id = `SIM-${randomUUID()}`;
    return { id, sandbox_init_point: null, init_point: null };
  }
};
