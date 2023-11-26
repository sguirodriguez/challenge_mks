import { Sequelize, Options } from "sequelize";
import { singleton } from "../config/singleton";
import { DatabaseInterface } from "../typings/DbInterface";
import { UserFactory } from "./User/UserModel";
import { ProductFactory } from "./Product/ProductModel";
import { VideoFactory } from "./Video/VideoModel";

interface SequelizeConfig {
  database: string;
  username: string;
  password: string;
  optionsConfig: Options;
}

const createModels = (sequelizeConfig: SequelizeConfig): DatabaseInterface => {
  const { database, username, password, optionsConfig } = sequelizeConfig;

  const sequelize = new Sequelize(database, username, password, optionsConfig);

  const database_: DatabaseInterface = {
    sequelize,
    Sequelize,
    User: UserFactory(sequelize, Sequelize),
    Product: ProductFactory(sequelize, Sequelize),
    Video: VideoFactory(sequelize, Sequelize),
  };

  return database_;
};

export const models = singleton<DatabaseInterface>(
  function models(): DatabaseInterface {
    const sequelizeConfig: SequelizeConfig = {
      database: String(process.env.DB_DATABASE),
      username: String(process.env.DB_USERNAME),
      password: process.env.DB_PASSWORD || "",
      optionsConfig: {
        dialect: process.env.DB_DIALECT || "postgres",
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || "5432"),
        operatorsAliases: false,
        ssl: false
      },
    };

    const instance = createModels(sequelizeConfig);

    instance.sequelize
      .authenticate()
      .then(() => {
        console.log(
          "Connection has been established successfully.",
          process.env.NODE_ENV
        );
      })
      .catch((error: unknown) => {
        console.error("Unable to connect to the database:", error);
      });

    return instance;
  }
);
