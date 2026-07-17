import {users} from '../../common/db/schema.js'
import {db} from '../../index.js'
import {eq} from 'drizzle-orm'
import ApiError from '../../common/utils/ApiError.js'
import bcrypt from 'bcryptjs'
import {generateAccessToken, generateRefreshToken} from '../../common/utils/jwt.utils.js'
export const registerUser = async ({name,email,password,role})=>{
    const existingUser = await db.select().from(users).where(eq(users.email,email))
    if(existingUser.length>0){
        throw ApiError.badRequest('User with this email already exists')
    }
    const salt = Number(process.env.SALT_ROUNDS)
    const hash = await bcrypt.hash(password,salt)

    const newUser = await db.insert(users).values({
        name,
        email,
        password: hash,
        role
    }).returning({
        id:users.id,
        name:users.name,
        email:users.email,
        role:users.role
    })
    return newUser[0];   
}
export const login = async({email,password})=>{
    const User = await db.select().from(users).where(eq(users.email,email))
    if(!User[0]){
        throw ApiError.badRequest(`user with this email ${email} not found`)
    }
    const hashed = await bcrypt.compare(password,User[0].password)
    if(!hashed){
        throw ApiError.unauthorized("Invalid credintials")
    }
    const accessToken = generateAccessToken({id:User[0].id,role:User[0].role})
    const refreshToken = generateRefreshToken({id:User[0].id})
    const payload = {
        name:User[0].name,
        email:User[0].email,
        role:User[0].role,
        accessToken,
        refreshToken
    }
    return payload;
}

