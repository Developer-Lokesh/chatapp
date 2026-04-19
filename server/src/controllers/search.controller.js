import { searchDB, searchInFriendListDB } from "../services/search.service.js";

export const search = async (req, res) => {
  try {
    const { query } = req.query;
    const userId = req.user.id;
    const data = await searchDB(query, userId);
    if(!data){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    return res.status(200).json({
        success:true,
        message:"Search result",
        data:data
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"Internal server Error"
    })
  }
};

export const searchInFriendList = async (req, res) => {
  try {
    const { query } = req.query;
    const userId = req.user.id;
    const data = await searchInFriendListDB(query, userId);
    if(!data){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    return res.status(200).json({
        success:true,
        message:"Search result",
        data:data
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"Internal server Error"
    })
  }
}