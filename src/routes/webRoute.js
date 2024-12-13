import express from "express";
import webController from "../controllers/WebController";
import UserController from "../controllers/UserController";
import Page404 from "../controllers/Page404";

const router = express.Router();
const initWebRoute = (app) => {
    router.get("/", webController.getHomePage);
    router.get("/about", webController.getAboutPage);

    // User
    // render page
    router.get("/create-user", (req, res) => {
        res.render("createUser", {
            title: "Create User",
            errorMessage: null,
        });
    });
    router.get("/edit-user/:id", UserController.controllerEditUserById);
    router.get("/login", (req, res) => {
        res.render("Auth/login", {
            title: "Login",
            errorMessage: null,
            username: "",
        });
    });

    // api
    router.get("/list-user", UserController.controllerGetAllUser);
    router.post("/create-new-user", UserController.controllerCreateNewUser);
    router.post("/delete-user", UserController.controllerDeleteUserById);
    router.post("/update-user", UserController.controllerUpdateUserById);
    router.post("/handle-login", UserController.controllerHandleLogin);

    router.get("*", Page404);
    return app.use("/", router);
};

export default initWebRoute;
