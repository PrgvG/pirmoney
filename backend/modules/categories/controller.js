import { CategoryModel } from './model.js';

class CategoryController {
    Model;

    constructor(model) {
        this.Model = model;
    }

    getAll = async (req, res) => {
        const { userId } = req.body;

        try {
            const categories = await this.Model.find({
                userId,
                status: 'active',
            });
            res.status(200).send(categories);
        } catch (err) {
            res.status(500).send({
                message: 'Ошибка при получении категорий',
                error: err,
            });
        }
    };

    createOne = async (req, res) => {
        const category = new this.Model(req.body);

        try {
            const savedCategory = await category.save();
            res.status(201).send(savedCategory);
        } catch (err) {
            res.status(400).send({
                message: 'Ошибка при создании категории',
                error: err,
            });
        }
    };

    updateOne = async (req, res) => {
        const { id, ...restBody } = req.body;

        try {
            const updatedCategory = await this.Model.findByIdAndUpdate(
                id,
                { ...restBody },
                { new: true, runValidators: true },
            );

            if (!updatedCategory) {
                return res
                    .status(404)
                    .send({ message: 'Категория не найдена' });
            }

            res.status(200).send(updatedCategory);
        } catch (err) {
            res.status(400).send({
                message: 'Ошибка при обновлении категории',
                error: err,
            });
        }
    };

    patchOne = async (req, res) => {
        const { id, ...restBody } = req.body;

        try {
            const updatedCategory = await this.Model.findByIdAndUpdate(
                id,
                { $set: restBody },
                { new: true, runValidators: true },
            );

            if (!updatedCategory) {
                return res
                    .status(404)
                    .send({ message: 'Категория не найдена' });
            }

            res.status(200).send(updatedCategory);
        } catch (err) {
            res.status(400).send({
                message: 'Ошибка при обновлении категории',
                error: err,
            });
        }
    };
    deleteOne = async (req, res) => {
        const { id } = req.params;

        try {
            const updatedCategory = await this.Model.findByIdAndUpdate(
                id,
                { $set: { status: 'deleted', deleted_at: Date.now() } },
                { new: true, runValidators: true },
            );

            if (!updatedCategory) {
                return res.status(404).send({ message: 'Платеж не найден' });
            }

            res.status(200).send({ message: 'Платеж успешно удален' });
        } catch (err) {
            res.status(500).send({
                message: 'Ошибка при удалении платежа',
                error: err,
            });
        }
    };
}

export const categoriesController = new CategoryController(CategoryModel);
