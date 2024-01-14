import User from "../entities/user"

type WhereInput = {
  id?: string
  email?: string
  username?: string
}

type UpdateInput = {
  email?: string
  username?: string
  password?: string
}

type InputId = {
  id: string
}

export default interface UserRepository {
  save(data: User): Promise<void>
  list(): Promise<User[]>
  get(where: WhereInput): Promise<User | null>
  check(where: WhereInput): Promise<boolean>
  update(params: { where: InputId, data: UpdateInput }): Promise<void>
  delete(where: InputId): Promise<void>
}
