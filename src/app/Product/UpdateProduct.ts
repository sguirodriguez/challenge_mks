import { models } from "../../models";
import Joi from "joi";
import TranslatorLanguage from "../../locales";

const schema = Joi.object().keys({
  id: Joi.number().required(),
  name: Joi.string().optional().allow(null),
  description: Joi.string().optional().allow(null),
  value: Joi.number().optional().allow(null),
});

class UpdateProduct {
  async execute({ id, name, description, value, locale }: UpdateProductTypings) {
    try {
      const { error } = schema.validate({
        id,
        name,
        description,
        value,
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

      if (!name && !name && !value && !description) {
        return {
          status: 409,
          response: {
            data: null,
            error:
              TranslatorLanguage(locale)["product.validation_on_update_409"],
          },
        };
      }

      const products = await models().Product.findOne({ where: { id } });

      if (!products) {
        return {
          status: 404,
          response: {
            data: null,
            error: TranslatorLanguage(locale)["product.validation_404"],
          },
        };
      }

      const hasName = name ? { name } : {};
      const hasDescription = description ? { description } : {};
      const hasValue = value ? { value } : {};
  

      await models().Product.update(
        {
          ...hasName,
          ...hasDescription,
          ...hasValue,
        },
        {
          where: { id },
        }
      );

      return { status: 200, response: { data: true, error: null } };
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

export default new UpdateProduct();
