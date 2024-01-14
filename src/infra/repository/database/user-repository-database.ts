import DrizzleAdapter from "../../../infra/database/drizzle-adapter";
import { users } from "../../../../drizzle/schema"
import User from "../../../domain/entities/user"
import UserRepository from "../../../domain/repository/user-repository"
import { desc, eq, or, } from "drizzle-orm";

export default class UserRepositoryDatabase implements UserRepository {
  constructor(private readonly db: DrizzleAdapter) { }

  async save(data: { id: string, email: string, username: string, password: string }): Promise<void> {
    try {
      await this.db.connect().insert(users).values({
        id: data.id,
        email: data.email,
        username: data.username,
        password: data.password
      })
    } finally {
    }
  }

  async list(): Promise<User[]> {
    try {
      const resultFound = await this.db.connect()
        .select({
          id: users.id,
          email: users.email,
          username: users.username,
          password: users.password,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt
        })
        .from(users)
        .orderBy(
          desc(users.createdAt)
        )

      const result: User[] = [];
      for (const data of resultFound) {
        result.push(new User(
          data.id,
          data.email,
          data.username,
          data.password,
          data.createdAt!,
          data.updatedAt!
        ));
      }
      return result;
    } finally {
    }
  }

  async get(where: {
    id?: string, email?: string, username?: string
  }): Promise<User | null> {
    try {
      const { id, email, username } = where
      const [userFound] = await this.db.connect()
        .selectDistinct()
        .from(users)
        .where(
          or(
            id ? eq(users.id, id) : undefined,
            email ? eq(users.email, email) : undefined,
            username ? eq(users.username, username) : undefined
          ))

      return userFound && new User(
        userFound.id,
        userFound.email,
        userFound.username,
        userFound.password,
        userFound.createdAt!,
        userFound.updatedAt!
      )
    } finally {
    }
  }

  async check(where: { id?: string, email?: string, username?: string }): Promise<boolean> {
    try {
      const { id, email, username } = where
      const userFound = await this.db.connect()
        .select()
        .from(users)
        .where(
          or(
            id ? eq(users.id, id) : undefined,
            email ? eq(users.email, email) : undefined,
            username ? eq(users.username, username) : undefined
          ))
      return userFound.length > 0 ? true : false
    } finally {
      // await this.db.end()
    }
  }

  async update(params: {
    where: { id: string },
    data: { email?: string, username?: string, password?: string }
  }): Promise<void> {
    const { id } = params.where

    const { ...data } = Object.fromEntries(
      Object.entries(params.data).filter(([_, value]) =>
        value !== undefined));

    try {
      await this.db.connect()
        .update(users)
        .set(data)
        .where(eq(users.id, id))
    } finally {
    }
  }

  async delete(where: { id: string }): Promise<void> {
    const { id } = where
    try {
      await this.db.connect()
        .delete(users)
        .where(
          eq(users.id, id)
        )
    } finally {
    }
  }
}