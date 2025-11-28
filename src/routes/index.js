import express from "express";
import { routerAuth } from "./auth.routes.js";
import { routerArticle } from "./article.routes.js";
import { routerComment } from "./comment.routes.js";
import { routerTag } from "./tag.routes.js";
import { routerUser } from "./user.routes.js";
import { routerArticleTags } from "./article_tags.routes.js";

export const routesVarias = express.Router();
routesVarias.use(routerAuth);
routesVarias.use(routerArticle);
routesVarias.use(routerComment);
routesVarias.use(routerTag);
routesVarias.use(routerUser);
routesVarias.use(routerArticleTags);
