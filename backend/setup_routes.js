import { authMiddleware } from './auth_middleware.js';

export function setupRoutes(router, path, controller) {
    router
        .route(path)
        .get(authMiddleware, controller.getAll)
        .post(authMiddleware, controller.createOne)
        .put(authMiddleware, controller.updateOne)
        .patch(authMiddleware, controller.patchOne);

    router.route(`${path}/:id`).delete(authMiddleware, controller.deleteOne);
}
