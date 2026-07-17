import {users} from '../../common/db/schema.js'
import {db} from '../../index.js'
import {eq} from 'drizzle-orm'
import ApiError from '../../common/utils/ApiError.js'
import bcrypt from 'bcryptjs'
import {generateAccessToken} from '../../common/utils/jwt.utils.js'
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
    })
    return newUser;
}
