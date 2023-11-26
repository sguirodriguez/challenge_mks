import Joi from "joi";
import { models } from "../../models";
import TranslatorLanguage from "../../locales";

const schema = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string().required(),
  value: Joi.number().required(),
});

class CreateProduct {
  async execute({ name, value, description, locale }: CreateProductTypings) {
    try {
      const { error } = schema.validate({
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
    
      const hasProduct = await models().Product.findOne({
        where: {
          name,
        },
      });
     
      if (hasProduct) {
        return {
          status: 409,
          response: {
            data: null,
            error:
              TranslatorLanguage(locale)["product.validation_has_product_409"],
          },
        };
      }
    
      const product = await models().Product.create({
        name,
        description,
        value,
      });
    
      if (!product) {
        return {
          status: 409,
          response: {
            data: null,
            error: TranslatorLanguage(locale)["product.validation_409"],
          },
        };
      }
  
      return { status: 200, response: { data: product, error: null } };
    } catch (error) {

      return { status: 500, response: { error } };
    }
  }
}

export default new CreateProduct();
