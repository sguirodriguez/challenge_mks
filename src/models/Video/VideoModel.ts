import Sequelize from "sequelize";
import { SequelizeAttributes } from "../../typings/SequelizeAttributes";

export interface VideoAttributes {
  id?: number;
  name: string;
  url: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface VideoInstance
  extends Sequelize.Instance<VideoAttributes>,
  VideoAttributes {}

export interface VideoModel
  extends Sequelize.Model<VideoInstance, VideoAttributes> {}

export const VideoFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): VideoModel => {
  const attributes: SequelizeAttributes<VideoAttributes> = {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },

    url: {
      type: DataTypes.STRING,
    },

    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: "created_at",
    },

    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: "updated_at",
    },
  };

  const Video = sequelize.define<VideoInstance, VideoAttributes>(
    "Video",
    attributes,
    {
      tableName: "video",
      timestamps: true,
      paranoid: false,
    }
  ) as VideoModel;

  return Video;
};