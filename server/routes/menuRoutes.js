import { Router } from 'express';
import { createMenuItem, getMenuItems } from '../controllers/menuController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, getMenuItems);
router.post('/', requireAuth, createMenuItem);

export default router;
