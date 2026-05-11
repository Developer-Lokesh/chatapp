import { me, updateName, updateProfile } from "../models/me.js";

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

export const updateProfileDB = async (id, img, profileImagePublicId) => {
  if(!id){
    throw new Error("User not found")
  }
  if(!img){
    throw new Error("Image not receive")
  }
  try {
    const data = await updateProfile(id, img, profileImagePublicId);
    return data;
  } catch (error) {
    throw new Error("Something went wrong")
  }
};