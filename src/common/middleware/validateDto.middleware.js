import joi from 'joi'
import ApiError from '../utils/ApiError.js'

const validate = (DtoClass)=>{
    return (req,res,next)=>{
        const {error,value} = DtoClass.validate(req.body)
        if(error){
            throw new ApiError.badRequest(error.join(", "))
        }
        req.body = value;
        next()
    }
}
export default validate;