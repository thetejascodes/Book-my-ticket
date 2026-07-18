import { users } from "../../common/db/schema.js";
import express from 'express'
import {verifyAccessToken,verifyRefreshToken} from '../../common/utils/jwt.utils.js'
import ApiError from '../../common/utils/ApiError.js'
import {db} from '../../index.js'
import { eq } from "drizzle-orm"; 
export const isAuthenticated = async(req,res,next)=>{
    let token;
    if(    req.headers.authorization?.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
    }
    if(!token){
        throw ApiError.unauthorized("Not Authenticated")
    }
    const decoded = verifyAccessToken(token)
    const user = await db.select().from(users).where(eq(users.id,decoded.id))
    if(!user){
        throw ApiError.unauthorized("User no longer exists")
    }
    req.user = {
        id:user[0].id,
        name:user[0].name,
        email:user[0].email,
        role:user[0].role,
    }
    next()
}