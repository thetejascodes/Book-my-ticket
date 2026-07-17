import express from 'express'
import {Router} from 'express'
import * as authController from './auth.controllers.js'
import validate from '../../common/middleware/validateDto.middleware.js'
import RegisterDto from './dto/register.dto.js'
const router = Router()

router.post('/register',validate(RegisterDto),authController.registerUser)

export default router