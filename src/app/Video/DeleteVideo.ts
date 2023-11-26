import { models } from "../../models";
import TranslatorLanguage from "../../locales";

class DeleteVideo {
  async execute({ id, locale }: DeleteVideoTypings) {
    try {
      if (!id) {
        return {
          status: 409,
          response: {
            data: null,
            error:
              TranslatorLanguage(locale)["video.validation_on_delete_409"],
          },
        };
      }

      await models().Video.destroy({
        where: { id },
      });

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

export default new DeleteVideo();
