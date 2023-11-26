import { models } from "../../models";

class GetAllVideo {
  async execute() {
    try {
      const videos = await models().Video.findAll();

      return { status: 200, response: { data: videos, error: null } };
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

export default new GetAllVideo();
