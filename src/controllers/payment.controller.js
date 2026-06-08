import * as paymentService from '../services/payment.service.js';

// POST /api/payments/preference
export const createPreference = async (req, res) => {
  try {
    const result = await paymentService.createPreference(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error('createPreference error:', err);
    res.status(500).json({ error: 'Error al crear la preferencia', detail: err.message });
  }
};
