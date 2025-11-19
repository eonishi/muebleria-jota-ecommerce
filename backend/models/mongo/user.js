import { UserSchema } from "./schemas/User.js"
import { throwAllMongoError } from "./utils/errors.js"

const User = mongoose.model("User", UserSchema)
export class UserModel {
	static async create(username, email, password) {
		const newUser = new User(username, email, password)
		const err = newUser.validateSync()
		throwAllMongoError(err)

		return await newUser.save()
	}

	static async get(email) {
		return await User.findOne({ email })
	}
}
