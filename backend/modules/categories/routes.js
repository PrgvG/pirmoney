import { Router } from 'express';
import { authMiddleware } from '../../auth_middleware.js';
import { categoriesController } from './controller.js';

const router = Router();

router
    .route('/categories')
    .get(authMiddleware, categoriesController.getAll)
    .post(authMiddleware, categoriesController.createOne)
    .put(authMiddleware, categoriesController.updateOne)
    .patch(authMiddleware, categoriesController.patchOne);

router.route('/categories/:id').delete(authMiddleware, categoriesController.deleteOne);

export const categoryRoutes = router;
