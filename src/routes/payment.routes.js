import { Router } from 'express';
import { validate } from '../middlewares/validate.middleware.js';
import { createPreferenceSchema } from '../validations/payment.validation.js';
import * as paymentController from '../controllers/payment.controller.js';

const router = Router();

router.post('/preference', validate(createPreferenceSchema), paymentController.createPreference);

export default router;
