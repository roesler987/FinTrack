import express from "express";
import { config } from "dotenv";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoClient } from "./database/mongo";
import { MongoCreateUserRepository } from "./repositories/create-user/mongo-create-user";
import { CreateUserController } from "./controllers/create-user/create-user";
import { UpdateUserController } from "./controllers/update-user/update-user";
import { MongoUpdateUserRepository } from "./repositories/update-user/mongo-update-user";
import { MongoDeleteUserRepository } from "./repositories/delete-user/mongo-delete-user";
import { DeleteUserController } from "./controllers/delete-user/delete-user";
import { MongoGetCategoriesRepository } from "./repositories/get-category/mongo-get-category";
import { GetCategoriesController } from "./controllers/get-category/get-categorias";
import { MongoDeleteCategoryRepository } from "./repositories/delete-category/mongo-delete-category";
import { DeleteCategoryController } from "./controllers/delete-category/delete-category";
import { MongoCreateCategoryRepository } from "./repositories/create-category/mongo-create-category"; // Import Create Category Repository
import { CreateCategoryController } from "./controllers/create-category/create-category"; // Import Create Category Controller
import { UpdateCategoryController } from "./controllers/update-category/update-category"; // Import Update Category Controller
import { MongoUpdateCategoryRepository } from "./repositories/update-category/mongo-update-category"; // Import Update Category Repository

const main = async () => {
  config();
  const app = express();

  app.use(express.json());

  const port = process.env.PORT || 8000;

  await MongoClient.connect();

  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);

    const { body, statusCode } = await getUsersController.handle();

    res.status(statusCode).send(body);
  });

  app.post("/users", async (req, res) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository();

    const createUserController = new CreateUserController(
      mongoCreateUserRepository
    );

    const { body, statusCode } = await createUserController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  app.patch("/users/:id", async (req, res) => {
    const mongoUpdateUserRepository = new MongoUpdateUserRepository();

    const updateUserController = new UpdateUserController(
      mongoUpdateUserRepository
    );

    const { body, statusCode } = await updateUserController.handle({
      body: req.body,
      params: req.params,
    });
    res.status(statusCode).send(body);
  });

  app.delete("/users/:id", async (req, res) => {
    const mongoDeleteUserRepository = new MongoDeleteUserRepository();

    const deleteUserController = new DeleteUserController(
      mongoDeleteUserRepository
    );

    const { body, statusCode } = await deleteUserController.handle({
      body: req.body,
      params: req.params,
    });
    res.status(statusCode).send(body);
  });

  app.get("/categories", async (req, res) => {
    const mongoGetCategoriesRepository = new MongoGetCategoriesRepository();
    const getCategoriesController = new GetCategoriesController(
      mongoGetCategoriesRepository
    );

    const { body, statusCode } = await getCategoriesController.handle();

    res.status(statusCode).send(body);
  });

  app.post("/categories", async (req, res) => {
    const mongoCreateCategoryRepository = new MongoCreateCategoryRepository();
    const createCategoryController = new CreateCategoryController(
      mongoCreateCategoryRepository
    );

    const { body, statusCode } = await createCategoryController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  app.patch("/categories/:id", async (req, res) => {
    const mongoUpdateCategoryRepository = new MongoUpdateCategoryRepository();
    const updateCategoryController = new UpdateCategoryController(
      mongoUpdateCategoryRepository
    );

    const { body, statusCode } = await updateCategoryController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  app.delete("/categories/:id", async (req, res) => {
    const mongoDeleteCategoryRepository = new MongoDeleteCategoryRepository();
    const deleteCategoryController = new DeleteCategoryController(
      mongoDeleteCategoryRepository
    );

    const { body, statusCode } = await deleteCategoryController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  app.listen(port, () => console.log(`listening on port ${port}!`));
};

main();
