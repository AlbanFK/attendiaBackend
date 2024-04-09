import express from "express";
import UserController from "./controllers";

const userRoutes = express.Router();

userRoutes.route("/api/v1/users").post(UserController.create);

userRoutes.route("/api/v1/users").get(UserController.getUsers);

userRoutes.route("/api/v1/users/:id").get(UserController.retrieve);

userRoutes.route("/api/v1/users/:id").patch(UserController.update);

userRoutes.route("/api/v1/users/:id").delete(UserController.delete);

export default userRoutes;
