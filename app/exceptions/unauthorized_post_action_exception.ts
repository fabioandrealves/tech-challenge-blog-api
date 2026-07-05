import { Exception } from '@adonisjs/core/exceptions'

export class UnauthorizedPostActionException extends Exception {
  static status = 403

  constructor(message: string) {
    super(message)
  }
}