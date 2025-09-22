import express from "express";
import folderRoutes from "./api/folder.js"
import fileRoutes from "./api/file.js"


const app = express()
app.use(express.json());

app.route("/").get((req, res) => {
    res.send("I am in my app.js file")
})

app.use("/files", fileRoutes)
app.use("/folders", folderRoutes)

export default app;
