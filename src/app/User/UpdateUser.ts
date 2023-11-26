import { models } from "../../models";
import Joi from "joi";
import TranslatorLanguage from "../../locales";

const schema = Joi.object().keys({
  id: Joi.number().required(),
  name: Joi.string().optional().allow(null),
  email: Joi.string().optional().allow(null),
});

class UpdateUser {
  async execute({
    id,
    name,
    email,
    locale,
  }: UpdateUserTypings) {
    try {
      const { error } = schema.validate({
        id,
        name,
        email,
 
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

      if (!name && !email) {
        return {
          status: 409,
          response: {
            data: null,
            error:
              TranslatorLanguage(locale)["client.validation_on_update_409"],
          },
        };
      }

      const client = await models().User.findOne({ where: { id } });

      if (!client) {
        return {
          status: 404,
          response: {
            data: null,
            error: TranslatorLanguage(locale)["client.validation_404"],
          },
        };
      }

      const hasEmail = email ? { email } : {};
      const hasName = name ? { name } : {};


      await models().User.update(
        {
          ...hasEmail,
          ...hasName,
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

export default new UpdateUser();
