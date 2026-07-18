import express from 'express'
import {Router} from 'express'
import * as authController from './auth.controllers.js'
import validate from '../../common/middleware/validateDto.middleware.js'
import RegisterDto from './dto/register.dto.js'
import LoginDto from './dto/login.dto.js'
import { isAuthenticated } from './auth.middleware.js'
const router = Router()

router.post('/register',validate(RegisterDto),authController.registerUser)
.post('/login',validate(LoginDto),authController.login)
.get('/me',isAuthenticated,authController.me)
export default router