import { mongoose } from "mongoose"
import bcrypt from "bcrypt"
import { commonFormat } from "../utils/format.plugin.js"


export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: [true, 'username deberia ser único'],
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'email deberia ser único'],
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    required: true,
  },
}, { timestamps: true })

UserSchema.pre("save", async function (next) {
  const SALT = 10

  if (!this.isModified("password")) return next()
  this.password = await bcrypt.hash(this.password, SALT)
  next()
})

UserSchema.plugin(commonFormat)
