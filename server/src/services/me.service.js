import { me, updateName } from "../models/me.js";

export const meDB = async (id) => {
  try {
    if (!id) {
      throw new Error("User id required");
    }
    const data = me(id);
    return data;
  } catch (error) {
    throw new Error(error || "Something went wrong");
  }
};

export const updateNameDB = async (id, fullName) => {
    console.log(id, fullName, "in service")
  if (!id) {
    throw new Error("Id is required");
  }

  if (!fullName) {
    throw new Error("Information is required");
  }

  try {

    const data = await updateName(id, fullName);
    return data;

  } catch (error) {
    throw new Error(error || "something went wrong");
  }
};
