import express from "express";
import {
  createFiles,
  createFileInFolder,
  getFilesInFolder,
  getFolders,
} from "../db/queries/file.js";

const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const response = await getFolders();
      if (!response) {
        res.status(400).send("no folders");
      }
      return res.status(200).send(response);
    } catch (error) {
      return res.status(400).send(error);
    }
  })
  .post(async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send("no body");
    }

    const newFile = await createFiles(req.body);
    return res.status(201).send(newFile);
  });

router.route("/:id/").get(async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  if (!id) {
    return res.status(404).send("error");
  }
  if (!/^\d+$/.test(id) || Number(id) < 0) {
    return res.status(404).send("invalid id");
  }
  try {
    const response = await getFilesInFolder(id);
    if (!response) {
      return res.status(404).send("Folder not found");
    }
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.route("/:id/files").post(async (req, res) => {
  const { folder_id } = req.params;
  const { name, size } = req.body;

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send("no body");
  }
  if (!name || !size) {
    return res.status(404).send("no fields");
  }
  try {
    const response = await createFileInFolder({ name, size, folder_id });
    if (!response) {
      return res.status(404).send("Folder not found");
    }
    return res.status(201).send(response);
  } catch (error) {
    return res.status(400).send(error);
  }
});

export default router;
