// Esquema SQL para referencia — ejecutar en PostgreSQL antes de iniciar
//
// CREATE TABLE IF NOT EXISTS payments (
//   id            SERIAL PRIMARY KEY,
//   mp_id         BIGINT UNIQUE,          -- ID devuelto por MercadoPago
//   status        VARCHAR(50),            -- approved, pending, rejected
//   status_detail VARCHAR(100),
//   amount        NUMERIC(10, 2),
//   description   TEXT,
//   payer_email   VARCHAR(255),
//   created_at    TIMESTAMPTZ DEFAULT NOW(),
//   updated_at    TIMESTAMPTZ DEFAULT NOW()
// );

export const PAYMENT_TABLE = 'payments';
