import jwt from 'jsonwebtoken'

export const generateAccessToken = (payload) =>{
    return jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_ACCESS_EXPIRES_IN
    })
}
export const verifyAccessToken = (token) =>{
    return jwt.verify(token,process.env.JWT_SECRET)
}
export const generateRefreshToken = (payload) =>{
    return jwt.sign(payload,process.env.JWT_REFRESH_SECRET,{
        expiresIn:process.env.JWT_REFRESH_EXPIRES_IN
    })
}
export const verifyRefreshToken = (token) =>{
    return jwt.verify(token,process.env.JWT_REFRESH_SECRET)
}
