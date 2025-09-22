import express from "express";
import { createFiles, createFolder, getFiles, getFolders } from "../db/queries/file.js";

const router = express.Router();

router.route("/").get(async (req, res) => {
    try {
        const response = await getFiles()
        if (!response) {
            return res.status(400).send("no files")
        }
        return res.status(200).send(response)
    } catch (error) {
        return res.status(400).send(error)
    }
})



router
  .route("/:id")
  .get(async (req, res) => {
    console.log("I'm in the get");
    console.log(req.params);
    const { id } = req.params;
    if (!id) {
      return res.status(400).send(error);
    }
    if (!/^\d+$/.test(id) || Number(id) < 0) {
      return res.status(400).send(error);
    }
    try {
      const response = await getFile({ id });
      if (!response) {
        return res.status(404).send("File not found");
      }
      res.status(200).send(response);
    } catch (error) {
      res.status(400).send(error);
    }
  })

  export default router;
