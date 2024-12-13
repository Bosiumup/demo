import express from "express";
import path from "path";

const configViewEngine = (app) => {
    app.use("/static", express.static(path.join(__dirname, "public")));
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
};

export default configViewEngine;
