import express from "express";
import { config } from "dotenv";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoCliente } from "./database/mongo";

const main = async () => {
    config();
    const app = express();

    const port = process.env.PORT || 8000;

    await MongoCliente.connect();

    app.get("/users", async (req, res) => {
        const mongoGetUsersRepository = new MongoGetUsersRepository();

        const getUsersController = new GetUsersController(mongoGetUsersRepository);

        const { body, statusCode } = await getUsersController.handle();

        res.send(body).status(statusCode);
    });

    app.listen(port, () => console.log(`listening on port ${port}!`));
};

main();