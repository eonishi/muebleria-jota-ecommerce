import { mongoose } from "mongoose"
import { bcrypt } from "bcrypt"


const UserSchema = new mongoose.Schema ({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
})

UserSchema.pre("save", async function(next){
	const SALT = 10

	if (!this.isModified("password")) return next()
	this.password = await bcrypt.hash(this.password, SALT)
	next()
})

export const UserModel = mongoose.model("User", UserSchema)
