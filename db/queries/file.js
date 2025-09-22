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
    // 1. Get the folder itself
    const folderSql = `SELECT * FROM folders WHERE id = $1`;
    const { rows: folderRows } = await db.query(folderSql, [id]);
    if (folderRows.length === 0) return null; // folder not found
  
    const folder = folderRows[0];
  
    const filesSql = `SELECT * FROM files WHERE folder_id = $1`;
    const { rows: fileRows } = await db.query(filesSql, [id]);
  
    return {
      ...folder,
      files: fileRows,
    };
  }

  export async function createFileInFolder({name, size, folder_id}) {
    // TODO


    const doesFolderExist = await db.query(
      `SELECT * FROM folders WHERE id = $1`,
      [folder_id]
    );

    if (doesFolderExist.rows.length === 0) {
      return null; 
    }

    //excutes the actual query and returns something
    const sql = `
    INSERT INTO files (name, size, folder_id)
    VALUES ($1, $2, $3)
    RETURNING *
    `;
  
    const {rows}  = await db.query(sql, [name, size, folder_id]);
    return rows[0];
  }