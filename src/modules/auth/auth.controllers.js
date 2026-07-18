import * as authService  from "./auth.service.js";
import ApiResponse from '../../common/utils/ApiResponse.js'
import cookieParser from "cookie-parser";
export const registerUser = async(req,res)=>{
    const user = await authService.registerUser(req.body)
    ApiResponse.created(res,"Registration success",user)
}
export const login = async(req,res)=>{
    const {user,accessToken,refreshToken} = await authService.login(req.body)
    console.log()
    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:true,
        maxAge:7 * 24 * 60 * 60 * 1000
    })
    ApiResponse.ok(res,"User logged in successfully",{user,accessToken})
}

export const me = async(req,res)=>{
    const user = await authService.me(req.user.id)
    ApiResponse.ok(res,"User Profile",user)
}