const { Router } = require("express");
import { Request, Response } from "express";
const router = Router();
import { LocaleLinguage } from "../typings";
import CreateVideo from "../app/Video/CreateVideo";
import GetAllVideo from "../app/Video/GetAllVideo";
import UpdateVideo from "../app/Video/UpdateVideo";
import DeleteVideo from "../app/Video/DeleteVideo";

router.post("/", async (request: Request, response: Response) => {
  try {
    const { name, url } = request.body as {
      name: string;
      url: string;
  
    };

    const locale = request.headers.locale as LocaleLinguage;

    const result = await CreateVideo.execute({
      name,
      url,
      locale,
    });

    return response.status(result.status).send(result.response);
  } catch (error) {
    return response.status(500).json({
      error,
    });
  }
});

router.get("/", async (_request: Request, response: Response) => {
  try {
    const result = await GetAllVideo.execute();

    return response.status(result.status).send(result.response);
  } catch (error) {
    return response.status(500).json({
      error,
    });
  }
});

router.put("/", async (request: Request, response: Response) => {
  try {
    const { id, name, url } = request.body as {
      id: number;
      name: string;
      url: string;
    };

    const locale = request.headers.locale as LocaleLinguage;

    const result = await UpdateVideo.execute({
      id,
      name,
      url,
      locale
    });

    return response.status(result.status).send(result.response);
  } catch (error) {
    return response.status(500).json({
      error,
    });
  }
});

router.delete("/", async (request: Request, response: Response) => {
  try {
    const { id } = request.body as {
      id: number;
    };

    const locale = request.headers.locale as LocaleLinguage;

    const result = await DeleteVideo.execute({
      id,
      locale,
    });

    return response.status(result.status).send(result.response);
  } catch (error) {
    return response.status(500).json({
      error,
    });
  }
});

export default router;
