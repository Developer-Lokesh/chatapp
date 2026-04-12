import { verifyToken } from "../utils/index.js";

export const verifyUser = (req, res, next) => {
    try {
        const token  = req.cookies.accessToken;
        console.log(token)
        if(!token || token === null || token === undefined){
            return res.status(401).json({
                success:false,
                error:"Unauthorized"
            })
        }
        console.log("lokesh")
        console.log(process.env.JWT_ACCESS_SECRET)
        const payload =  verifyToken(token, process.env.JWT_ACCESS_SECRET);
        console.log(payload)
        if(!payload){
            return res.status(401).json({
                success:false,
                error:"Wrong Token"
            })
        }

        req.user = payload;

        next();
    } catch (error) {
        return res.status(401).json({
            success:false,
            error:"Invalid token"
        })
    }
}