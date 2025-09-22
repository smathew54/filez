import db from "#db/client";
import { faker } from "@faker-js/faker";
import { createFolder, createFile } from "./queries/file.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  try {
    const folders = [];
    for (let i = 0; i < 3; i++) {
      const documentName = faker.lorem.word();
      const folder = await createFolder(documentName);
      console.log(folder);
      folders.push(folder);
    }

    for (let folder of folders) {
      const numFiles = 5; 

      for (let j = 0; j < numFiles; j++) {
        const name = faker.lorem.word();
        const size = faker.helpers.rangeToNumber({ min: 10000, max: 200000 });

        console.log(
          `Inserting file: name=${name}, size=${size}, folder_id=${folder.id}`
        );

        const response = await createFile({
          name,
          size,
          folder_id: folder.id,
        });

        console.log(response);
      }
    }
  } catch (error) {
    console.error(error);
  }
}