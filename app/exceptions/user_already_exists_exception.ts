import { Exception } from '@adonisjs/core/exceptions'

export class UserAlreadyExistsException extends Exception {
  static status = 409

  constructor() {
    super('A user with this email already exists.')
  }
}