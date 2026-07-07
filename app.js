import express from 'express';
import dotenv from 'dotenv';
import paymentRoutes from './src/routes/payment.routes.js';

dotenv.config();

const app = express();

// Sin CORS propio: este servicio ya no es alcanzable directo desde el navegador
// (solo dentro de la red de docker), el Gateway es el único que habla con el
// browser y es quien maneja CORS. Tenerlo en ambos lados duplica la cabecera
// Access-Control-Allow-Origin y el navegador rechaza la respuesta.
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/payments', paymentRoutes);

app.use((req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

export default app;