import { Router } from "express";
import { validateUrl } from "../middlewares/validate.middlewares.js";
import { createShortLink, navigateToOriginal } from "../controllers/url.controller.js";

const linkRouter = Router();

linkRouter.route("/short").post(validateUrl, createShortLink);
linkRouter.route("/:shortUrl").get(navigateToOriginal);

export default linkRouter;