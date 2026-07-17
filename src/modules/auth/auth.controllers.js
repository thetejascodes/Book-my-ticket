import * as authService  from "./auth.service.js";
import ApiResponse from '../../common/utils/ApiResponse.js'

export const registerUser = async(req,res)=>{
    const user = await authService.registerUser(req.body)
    ApiResponse.created(res,"Registration success",user)
}
export const login = async(req,res)=>{
    const user = await authService.login(req.body)
    ApiResponse.ok(res,"User logged in successfully",user)
}

