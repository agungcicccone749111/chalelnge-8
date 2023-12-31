import express, { Express, Response, Request, NextFunction } from "express";
import knex, { Knex } from "knex";
import { Model } from "objection";
import carRouter from "./app/Cars/CarRoute";
import errorhandler from "./middlewares/errorhandler";
import notFound from "./exceptions/404";
import knexInstance from "./config/KnexInstance";
import carBrandRouter from "./app/CarBrands/CarBrandRoute";
import carTypeRouter from "./app/CarTypes/CarTypeRoute";
import carTransmissionRouter from "./app/CarTransamissions/CarTransmissionRoute";
import AccountRouter from "./app/Accounts/AccountRoute";
import carRouteUser from "./app/Cars/CarRouteUser";
import cors from 'cors';
const uploadService = require("./helpers/UploadService");
const upload = require("./middlewares/upload");
const { jwtMiddleware } = require("./middlewares/user"); // Assuming jwtMiddleware is the actual middleware function
const app: Express = express();
const port = process.env.PORT;
app.use(cors())
const newKnex = knex(knexInstance);

Model.knex(newKnex);

app.use(express.json());

// Apply JWT middleware before your routes
app.use("/user/",carRouteUser);
app.use("/api/v1", AccountRouter);
app.use("/api/v1", jwtMiddleware);
app.use("/api/v1",upload.single('picture_url'));

// Routes
app.use("/api/v1", carRouter);
app.use("/api/v1", carBrandRouter);
app.use("/api/v1", carTypeRouter);
app.use("/api/v1", carTransmissionRouter);


// Photo upload route
app.post("/api/v1/photo/upload",);

// Handle Error
app.use(notFound);
app.use(errorhandler);

app.listen(port, (): void => {
  console.log(`Server running on port ${port}`);
});
