import db from "#db/client";


//for the seeding
export async function createFolder(name) {
  // TODO
  const sql = `
    INSERT INTO folders (name)
    VALUES ($1) RETURNING *`;

  const {
    rows: [folder],
  } = await db.query(sql, [name]);
  return folder;
}

export async function createFile({ name, size, folder_id }) {
  const sql = `
    INSERT INTO files (name, size, folder_id)
    VALUES ($1, $2, $3)
    RETURNING *
    `;

  const {
    rows: [file],
  } = await db.query(sql, [name, size, folder_id]);
  return file;
}

//for the querying
export async function getFolders() {
    const sql = `
    SELECT * FROM folders`;
    const {rows} = await db.query(sql)
    return rows;
}


export async function getFiles() {
    const sql = `
    SELECT files.*, folders.name as folder_name
    FROM files
    INNER JOIN folders
    ON files.folder_id = folders.id;`
    const {rows} = await db.query(sql)
    return rows
}

  export async function getFilesInFolder(id) {
    // TODO
    const sql = `
    SELECT folders.name, folders.id as folder_ids, files.*  FROM files
    JOIN folders ON files.folder_id = folders.id
    WHERE folder_id = $1`;
  
    const {rows}  = await db.query(sql, [id]);
    return rows;
  }

  export async function createFileInFolder({name, size, folder_id}) {
    // TODO
    const sql = `
    INSERT INTO files (name, size, folder_id)
    VALUES ($1, $2, $3)
    RETURNING *
    `;
  
    const {rows}  = await db.query(sql, [id]);
    return rows[0];
  }