import connectDB from "./database/server.js";
import { webServer } from "./app.js";
import dotenv from "dotenv";
import { log } from "console";

dotenv.config({
    path:'./.env'
});

const serverPort = process.env.PORT || 3000;

connectDB()
.then(()=>{
    webServer.listen(serverPort,()=>{
        console.log(`Link compression service is now active on port: ${serverPort}`);
    })
})
.catch((connectionError)=>{
    console.log("Database connection attempt failed in main server file", connectionError);
})