import { models } from "../../models";
import Joi from "joi";
import TranslatorLanguage from "../../locales";

const schema = Joi.object().keys({
  name: Joi.string().required(),
  url: Joi.string().required(),
});

class CreateVideo {
  async execute({
    name,
    url,
    locale,
  }: CreateVideoTypings) {
    try {
      const { error } = schema.validate({
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

      const hasUrlRegistered = await models().Video.findOne({
        where: { url },
      });

      const hasNameRegistered = await models().Video.findOne({
        where: { name },
      });

      if (hasUrlRegistered) {
        return {
          status: 409,
          response: {
            data: null,
            error: TranslatorLanguage(locale)["video.validation_url_409"],
          },
        };
      }

      if (hasNameRegistered) {
        return {
          status: 409,
          response: {
            data: null,
            error: TranslatorLanguage(locale)["video.validation_name_409"],
          },
        };
      }

      const video = await models().Video.create({
        name,
        url
      });

      if (!video) {
        return {
          status: 409,
          response: {
            data: null,
            error: TranslatorLanguage(locale)["video.validation_409"],
          },
        };
      }

      return { status: 200, response: { data: video, error: null } };
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

export default new CreateVideo();
