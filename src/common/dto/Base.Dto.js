import joi from 'joi'
import ApiError from '../utils/ApiError.js'

class BaseDto {
    static schema = joi.object({})
    static validate(data){
        const {error,value} = this.schema.validate(data,{
            abortEarly:false,
            stripUnknown:true
        })

        if(error){
            const errors = error.details.map((d)=> d.message)
            return {errors,value=null}
        }
        return {value,error:null};
    }
}
export default BaseDto;
