import { createTask, getAll, getById, updateTask, deleteTask } from "../repositorys/user.repository.js";

export const create = async (req,res) => {
    try {
        await userValidation.validate(req.body);

        const hashPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashPassword;
        const user = await createTask(req.body);
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
};

export const get = async (req, res) => {
    try {
        const tasks = await getAll();
        res.status(200).send(tasks)
    } catch (e) {
        res.status(400).send(e);
    }
}

export const getId = async (req,res) => {
    try {
        const tasks = await getById(Number(req.params.id));
        res.status(200).send(tasks)
    } catch (e) {
        res.status(400).send(e);
    }
};

export const update = async (req, res) => {
    try {
        const task = await updateTask(Number(req.params.id), req.body);
        res.status(200).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
}

export const remove = async (req, res) => {
    try {
        await deleteTask(Number(req.params.id));
        res.status(200).send();
    } catch (e) {
        res.status(400).send(e);
    }
}