import db from "../config/db.js";

export const findRequest = async (senderId, receiverId) => {
  const [rows] = await db.query(
    `
        SELECT * FROM  chat_request 
        WHERE 
        (senderId = ? AND  receiverId = ?)
        OR 
        (senderId = ? AND receiverId = ?)`,
    [senderId, receiverId, receiverId, senderId],
  );
  return rows;
};

export const insertRequest = async (senderId, receiverId) => {
  const result = await db.query(
    `INSERT INTO  chat_request (senderId, receiverId) VALUES(?, ?)`,
    [senderId, receiverId],
  );
  return result;
};

export const getRequest = async (userId) => {
  // console.log(userId)
  const [rows] = await db.query(
    `SELECT cr.id, u.id  as senderId , u.fullName, u.profileImageUrl
        FROM chat_request cr
        JOIN users u ON  cr.senderId = u.id
        WHERE cr.receiverId = ? AND  cr.status = 'pending'`,
    [userId],
  );
  // console.log(rows);
  return rows;
};

export const updateRequest = async (requestId, status) => {
  try {
    console.log(requestId, status, "info");
  const [result] = await db.query(
    `UPDATE chat_request SET status = ? WHERE id = ?`,
    [status, requestId],
  );
  if (result.affectedRows > 0) {
    const [rows] = await db.query(`SELECT * FROM chat_request WHERE id = ?`, [
      requestId,
    ]);

    return { success: true, data: rows };
  }
  } catch (error) {
    throw new Error("Request ID not found" )
  }

};
