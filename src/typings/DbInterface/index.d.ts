import * as Sequelize from "sequelize";
import { DeliveriesModel } from "@models/Delivery/DeliveriesModel";
import { UserModel } from "@models/User/UserModel";
import { ProductModel } from "@models/Product/ProductModel";
import { VideoModel } from "@models/Video/VideoModel";

export interface DatabaseInterface {
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.SequelizeStatic;
  User: UserModel;
  Product: ProductModel;
  Video: VideoModel;
}
