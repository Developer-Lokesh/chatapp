import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export const hashedPassword = (password, saltRound) => {
    return bcrypt.hash(password, saltRound);
}

export const  verifyPassword = (password, hashPassword) => {
    return bcrypt.compare(password, hashPassword);
}

export const generateToken =  (data) => {
    const accessToken = jwt.sign(data, process.env.JWT_ACCESS_SECRET, {expiresIn:"6d"});

    const refreshToken = jwt.sign(data, process.env.JWT_REFRESH_SECRET, {expiresIn:"60d"})

    return {accessToken, refreshToken}
}

export const verifyToken = (token) => {
    return jwt.verify(token , process.env.JWT_ACCESS_SECRET)
}