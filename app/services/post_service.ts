import { CreatePostDTO } from '#dtos/create_post_dto'
import { UpdatePostDTO } from '#dtos/update_post_dto'
import { LucidPostRepository } from '#repositories/post/lucid_post_repository'
import User from '#models/user'
import { PostNotFoundException } from '#exceptions/post_not_found_exception'
import { UnauthorizedPostActionException } from '#exceptions/unauthorized_post_action_exception'

export default class PostService {
  private repository = new LucidPostRepository()

  async create(data: CreatePostDTO, user: User) {
    if (user.role !== 'teacher') {
      throw new UnauthorizedPostActionException('Only teachers can create posts.')
    }

    return this.repository.create(data)
  }

  async list() {
    return this.repository.findAll()
  }

  async findById(id: number) {
    return this.repository.findById(id)
  }

  async findByTeacher(user: User) {
    if (user.role !== 'teacher') {
      throw new UnauthorizedPostActionException('Only teachers can access this resource.')
    }

    return this.repository.findByTeacher(user.id)
  }
  
  async update(id: number, data: UpdatePostDTO, user: User) {
    if (user.role !== 'teacher') {
      throw new UnauthorizedPostActionException('Only teachers can update posts.')
    }

    const post = await this.repository.findById(id)

    if (!post) {
      throw new PostNotFoundException()
    }

    if (post.userId !== user.id) {
      throw new UnauthorizedPostActionException('You can only edit your own posts.')
    }

    return this.repository.update(id, data)
  }

  async delete(id: number, user: User) {
    if (user.role !== 'teacher') {
      throw new UnauthorizedPostActionException('Only teachers can delete posts.')
    }

    const post = await this.repository.findById(id)

    if (!post) {
      throw new PostNotFoundException()
    }

    if (post.userId !== user.id) {
      throw new UnauthorizedPostActionException('You can only delete your own posts.')
    }

    await this.repository.delete(id)
  }

  async search(term: string) {
    return this.repository.search(term)
  }
}
