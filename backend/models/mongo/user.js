import mongoose from "mongoose"
import { UserSchema } from "./schemas/User.js"
import { throwValidateMongoError } from "./utils/errors.js"
import { AppError } from "../../errors/error.js"

const User = mongoose.model("User", UserSchema)
export class UserModel {
  static async getByEmail(email) {
    const user = await User.findOne({ email: email })
    return user
  }

  static async exist(user) {
    const existUser = await User.exists({
      $or: [
        { username: user.username },
        { email: user.email }
      ]
    })

    return existUser
  }

  static async create(user) {
    // TODO: Implementar un create de admin.
    // Sobreescribo el role de todas las peticiones para que un cliente no se pueda registrar como admin NUNCA!
    user = { ...user, role: "user" }
    const newUser = new User(user)

    const err = newUser.validateSync()
    throwValidateMongoError(err)

    if (await this.exist(user)) {
      throw new AppError("El usuario deberia ser único", 400)
    }

    return await newUser.save()
  }
}
