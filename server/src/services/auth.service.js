import { createUser, findUserbyEmail } from "../models/auth.js";
import {
  hashedPassword,
  generateToken,
  verifyPassword,
} from "../utils/index.js";

export const signupDB = async ( fullName, email, password ) => {
    // console.log(fullName, email, password, "this is details in service")

  if (!fullName || !email || !password) {
    throw new Error("All fields required")
  }

  const isExisting = await findUserbyEmail(email);
  if (isExisting.length > 0) {
    throw new Error("User already exist");
  }

  const hashPassword = await hashedPassword(password, 10);

  const saveUser = await createUser(
    fullName,
    email,
    hashPassword,
  );

  return saveUser;
};

export const loginDB = async ( email, password ) => {
  // console.log(email,password , " in service")
  if (!email || !password) {
    throw new Error("All fields required")
  }

  try {
    const data =await findUserbyEmail(email);
    // console.log(data,"data in service")
    if (data.length === 0) {
      throw new Error("User not found")
    }

    const user = data[0]
    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      throw new Error("Invalid password")
    }
    const {password: _ , ...safeDetails} = user;
    const { accessToken, refreshToken } = generateToken({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
    });

    return { safeDetails, accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong")
  }
};

