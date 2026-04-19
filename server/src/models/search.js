import db from "../config/db.js";

export const search = async (data, userId) => {
  console.log(userId);
  try {
    const [rows] = await db.query(
      `
        SELECT * FROM users u
        WHERE 
        (u.fullName LIKE ? OR u.email LIKE ?)
        AND u.id != ?
        AND u.id NOT IN (
        SELECT 
          CASE 
            WHEN senderId = ? THEN receiverId
            ELSE senderId
          END
        FROM chat_request
        WHERE 
        (senderId = ? OR receiverId = ?)
        AND status IN ('accepted', 'pending')
      );`,
      [`%${data}%`, `%${data}%`, userId, userId, userId, userId],
    );
    console.log(rows);

    return rows;
  } catch (error) {
    console.log(error);
    throw new Error(error || "Something went wrong while searching...");
  }
};

export const searchFriend = async (data, userId) => {
  try {
    const [rows] = await db.query(
      `
      SELECT u.*
      FROM users u
      JOIN chat_request c 
      ON u.id = (
        CASE 
          WHEN c.senderId = ? THEN c.receiverId
          ELSE c.senderId
        END
      )
      WHERE (c.senderId = ? OR c.receiverId = ?)
      AND c.status = 'accepted'
      AND (u.fullName LIKE ? OR u.email LIKE ?)
      `,
      [userId, userId, userId, `%${data}%`, `%${data}%`]
    );

    return rows;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong while searching...");
  }
};