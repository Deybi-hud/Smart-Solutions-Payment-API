import pool from '../config/database.js';
import { PAYMENT_TABLE } from '../models/payment.model.js';

export const savePayment = async ({ mp_id, status, status_detail, amount, description, payer_email }) => {
  const { rows } = await pool.query(
    `INSERT INTO ${PAYMENT_TABLE} (mp_id, status, status_detail, amount, description, payer_email)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [mp_id, status, status_detail, amount, description, payer_email]
  );
  return rows[0];
};

export const findPaymentByMpId = async (mp_id) => {
  const { rows } = await pool.query(
    `SELECT * FROM ${PAYMENT_TABLE} WHERE mp_id = $1`,
    [mp_id]
  );
  return rows[0] || null;
};

export const findAllPayments = async () => {
  const { rows } = await pool.query(
    `SELECT * FROM ${PAYMENT_TABLE} ORDER BY created_at DESC`
  );
  return rows;
};

export const updatePaymentStatus = async (mp_id, status, status_detail) => {
  const { rows } = await pool.query(
    `UPDATE ${PAYMENT_TABLE}
     SET status = $2, status_detail = $3, updated_at = NOW()
     WHERE mp_id = $1
     RETURNING *`,
    [mp_id, status, status_detail]
  );
  return rows[0] || null;
};
