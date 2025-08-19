import express from "express";
import cors from "cors";

const webServer = express();

webServer.use(cors({
    origin:"*",
    credentials:true
}));

webServer.use(express.json({limit:"16kb"}));
webServer.use(express.urlencoded({extended:true, limit:"16kb"}));
webServer.use(express.static("public"));

import linkRoutes from "./routes/url.routes.js"

webServer.use("/api/url", linkRoutes);

export {webServer};