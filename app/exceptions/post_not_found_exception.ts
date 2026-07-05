import { Exception } from '@adonisjs/core/exceptions'

export class PostNotFoundException extends Exception {
  static status = 404

  constructor() {
    super('Post not found.')
  }
}