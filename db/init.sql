CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    mp_id VARCHAR(255) NOT NULL UNIQUE,
    status VARCHAR(50) NOT NULL,
    status_detail VARCHAR(255),
    amount NUMERIC(12, 2) NOT NULL,
    description TEXT,
    payer_email VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
