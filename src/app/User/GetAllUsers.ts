import { models } from "../../models";

class GetAllUsers {
  async execute() {
    try {
      const users = await models().User.findAll();

      return { status: 200, response: { data: users, error: null } };
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

export default new GetAllUsers();
