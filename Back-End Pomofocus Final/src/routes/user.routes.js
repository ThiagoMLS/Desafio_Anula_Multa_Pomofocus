import { create, get, getId, update, remove } from "../controllers/user.controller.js";

const taskRoutes = app => {
    app.post("/task", create);
    app.get("/task", get);
    app.get("/task/:id", getId);
    app.put("/task/:id", update);
    app.delete("/task/:id", remove)
};

export default taskRoutes;