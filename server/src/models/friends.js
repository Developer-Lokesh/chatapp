import db from "../config/db.js";

export const friends = async (userId) => {
  try {
    const [friends] = await db.query(
      `
            SELECT DISTINCT u.id, u.fullName, u.email, u.profileImageUrl
            FROM users u
            JOIN chat_request c
            ON (
            (c.senderId = ? AND c.receiverId = u.id)
            OR 
            (c.receiverId = ? AND c.senderId = u.id)
            )
            WHERE c.status = 'accepted'
            `,
      [userId, userId],
    );
    // console.log(friends, "in schema")
    return friends;
  } catch (error) {
    throw new Error(error || "Please Add friends");
  }
};

export const unFriend = async (id, friendId) => {
  const [friend] = await db.query(
    `
        DELETE FROM chat_request
        WHERE
        (
        (senderId = ? AND receiverId = ?)
        OR 
        (senderId = ? AND receiverId = ?)
        )
        AND  status = 'accepted'
        `,
    [id, friendId, friendId, id],
  );
  await db.query(`
    DELETE FROM messages
    WHERE 
    (
    (senderId = ? AND receiverId = ?)
    OR 
    (senderId = ? AND receiverId = ?)
    )`, [id, friendId, friendId, id])
  return friend;
};
