import { models } from "../../models";

class GetAllProducts {
  async execute() {
    try {
      const products = await models().Product.findAll();

      return { status: 200, response: { data: products, error: null } };
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

export default new GetAllProducts();
