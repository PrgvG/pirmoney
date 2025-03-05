import { Router } from 'express';
import { authMiddleware } from '../../auth_middleware.js';
import {
    bankPaymentsController,
    oneTimePaymentsController,
    repeatPaymentsController,
} from './controller.js';

const router = Router();

// One-time payments routes
router
    .route('/one_time_payments')
    .get(authMiddleware, oneTimePaymentsController.getAll)
    .post(authMiddleware, oneTimePaymentsController.createOne)
    .put(authMiddleware, oneTimePaymentsController.updateOne);

router
    .route('/one_time_payments/:id')
    .delete(authMiddleware, oneTimePaymentsController.deleteOne)
    .patch(authMiddleware, oneTimePaymentsController.patchOne);

// Repeat payments routes
router
    .route('/repeat_payments')
    .get(authMiddleware, repeatPaymentsController.getAll)
    .post(authMiddleware, repeatPaymentsController.createOne)
    .put(authMiddleware, repeatPaymentsController.updateOne);

router
    .route('/repeat_payments/:id')
    .delete(authMiddleware, repeatPaymentsController.deleteOne)
    .patch(authMiddleware, repeatPaymentsController.patchOne);

// Bank payments routes
router
    .route('/bank_payments')
    .get(authMiddleware, bankPaymentsController.getAll)
    .post(authMiddleware, bankPaymentsController.createOne)
    .put(authMiddleware, bankPaymentsController.updateOne);

router
    .route('/bank_payments/:id')
    .delete(authMiddleware, bankPaymentsController.deleteOne)
    .patch(authMiddleware, bankPaymentsController.patchOne);

export const paymentRoutes = router;
