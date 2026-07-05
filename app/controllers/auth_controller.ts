import type { HttpContext } from '@adonisjs/core/http'
import AuthService from '#services/auth_service'
import { registerValidator } from '#validators/register_validator'
import { loginValidator } from '#validators/login_validator'
import { LucidUserRepository } from '#repositories/user/lucid_user_repository'
import { AdonisHashService } from '#services/adonis_hash_service'
import { InvalidCredentialsException } from '#exceptions/invalid_credentials_exception'
import { UserAlreadyExistsException } from '#exceptions/user_already_exists_exception'

export default class AuthController {
  private authService = new AuthService(new LucidUserRepository(), new AdonisHashService())

  async register({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(registerValidator)

      const result = await this.authService.register(payload)

      return response.created({
        message: 'User created successfully.',
        data: result,
      })
    } catch (error) {
      if (error instanceof UserAlreadyExistsException) {
        return response.conflict({
          message: error.message,
        })
      }

      throw error
    }
  }

  async login({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(loginValidator)

      const result = await this.authService.login(payload)

      return response.ok({
        message: 'Login successful.',
        data: result,
      })
    } catch (error) {
      if (error instanceof InvalidCredentialsException) {
        return response.unauthorized({
          message: error.message,
        })
      }

      throw error
    }
  }
}
