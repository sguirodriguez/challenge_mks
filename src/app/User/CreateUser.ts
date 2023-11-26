import { models } from "../../models";
import Joi from "joi";
import TranslatorLanguage from "../../locales";

const schema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().required(),
});

class CreateUser {
  async execute({
    name,
    email,
    locale,
  }: CreateUserTypings) {
    try {
      const { error } = schema.validate({
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

      const hasEmailRegistered = await models().User.findOne({
        where: { email },
      });

      if (hasEmailRegistered) {
        return {
          status: 409,
          response: {
            data: null,
            error: TranslatorLanguage(locale)["client.validation_email_409"],
          },
        };
      }

      const client = await models().User.create({
        name,
        email,
      });

      if (!client) {
        return {
          status: 409,
          response: {
            data: null,
            error: TranslatorLanguage(locale)["client.validation_409"],
          },
        };
      }

      return { status: 200, response: { data: client, error: null } };
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

export default new CreateUser();
