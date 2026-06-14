import app from './app.js';
import dotenv from 'dotenv';
import pool from './src/config/database.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

pool.connect()
  .then(client => {
    console.log(`[DB] Conexión a PostgreSQL exitosa - host: ${process.env.DB_HOST}`);
    client.release();
  })
  .catch(err => {
    console.error(`[DB] Error al conectar a PostgreSQL: ${err.message}`);
  });

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[SERVER] Servidor corriendo en puerto ${PORT}`);
  console.log(`[SERVER] Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`[SERVER] MP_ACCESS_TOKEN configurado: ${!!process.env.MP_ACCESS_TOKEN}`);
  console.log(`[SERVER] FRONTEND_URL: ${process.env.FRONTEND_URL}`);
  console.log(`[SERVER] ALLOWED_ORIGINS: ${process.env.ALLOWED_ORIGINS}`);
});
