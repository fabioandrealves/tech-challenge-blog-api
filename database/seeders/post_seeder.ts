import Post from '#models/post'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    //  PROFESSORES
  const teachers = await Promise.all(
    Array.from({ length: 5 }).map(async (_, i) =>
      User.firstOrCreate(
        { email: `teacher${i + 1}@blog.com` },
        {
          name: `Teacher ${i + 1}`,
          password: await hash.make('123456'),
          role: 'teacher',
        }
      )
    )
  )

    // ALUNOS
    await Promise.all(
      Array.from({ length: 5 }).map(async (_, i) =>
        User.firstOrCreate(
          { email: `student${i + 1}@blog.com` },
          {
            name: `Student ${i + 1}`,
            password: await hash.make('123456'),
            role: 'student',
          }
        )
      )
    )

    // POSTS (2 por professor = 10 total)
    const posts = teachers.flatMap((teacher, index) => [
      {
        title: `Post 1 - Teacher ${index + 1}`,
        content: `Conteúdo do primeiro post do professor ${index + 1}`,
        userId: teacher.id,
      },
      {
        title: `Post 2 - Teacher ${index + 1}`,
        content: `Segundo post do professor ${index + 1}`,
        userId: teacher.id,
      },
    ])

    await Post.createMany(posts)
  }
}