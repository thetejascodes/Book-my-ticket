import joi from "joi";
import BaseDto from "../../../common/dto/Base.Dto.js";

class LoginDto extends BaseDto {
    static schema = joi.object({
        email: joi.string().email().lowercase().trim().required(),
        password: joi.string().min(8).message('Password must contain at least one uppercase letter and one digit').required()
    })
}
export default LoginDto;