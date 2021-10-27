import { Request, Response, Router } from "express";

export default class LoadsController {
  routes(): Router {
    const router = Router();
    router.get("/test", this.test.bind(this));

    return router;
  }

  async test(_req: Request, res: Response): Promise<Response> {
    return res.json({ ok: "ok" });
  }
}
