import { models } from "../../models";
import Joi from "joi";
import TranslatorLanguage from "../../locales";

const schema = Joi.object().keys({
  id: Joi.number().required(),
  name: Joi.string().optional().allow(null),
  url: Joi.string().optional().allow(null),
});

class UpdateVideo {
  async execute({
    id,
    name,
    url,
    locale,
  }: UpdateVideoTypings) {
    try {
      const { error } = schema.validate({
        id,
        name,
        url,
      });

      if (error) {
        return {
          status: 409,
          response: {
            data: null,
            error: error.details[0].message,
          },
        };
      }

      if (!name && !url) {
        return {
          status: 409,
          response: {
            data: null,
            error:
              TranslatorLanguage(locale)["video.validation_on_update_409"],
          },
        };
      }

      const video = await models().Video.findOne({ where: { id } });

      if (!video) {
        return {
          status: 404,
          response: {
            data: null,
            error: TranslatorLanguage(locale)["video.validation_404"],
          },
        };
      }

      const hasName = name ? { name } : {};
      const hasUrl = url ? { url } : {};


      await models().Video.update(
        {
          ...hasName,
          ...hasUrl,
        },
        {
          where: { id },
        }
      );

      return {
        status: 200,
        response: { data: true, error: null },
      };
    } catch (error) {
      return {
        status: 500,
        response: {
          error,
        },
      };
    }
  }
}

export default new UpdateVideo();
