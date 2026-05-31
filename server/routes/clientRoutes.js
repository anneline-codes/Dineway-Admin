import { Router } from 'express';
import { createClient, getClients } from '../controllers/clientController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, getClients);
router.post('/', requireAuth, createClient);

export default router;
