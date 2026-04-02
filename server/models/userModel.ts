import { Document, Model, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { NextFunction } from 'express';

// interface IUser extends Document {
//   userName: string;
//   email: string;
//   password: string;
// };

// interface UserModelType extends Model<IUser> {
//   isCorrectPassword(password: string): Promise<boolean>;
// };

// interface IUserDoc extends IUser, Document {};

const userSchema = new Schema({
  userName: {
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
},
{
  methods: {
    isCorrectPassword: async function (password: string): Promise<boolean> {
      return bcrypt.compare(password, this.password);
    }
  }
});

// hash user password
userSchema.pre('save', async function () {
    if (this.isNew || this.isModified("password")) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  }
);

// custom method to compare and validate password for logging in
// userSchema.methods.isCorrectPassword = async function (
//   password: string,
//   next?: NextFunction
// ): Promise<boolean> {
//   return bcrypt.compare(password, this.password);
// };

var User = model('User', userSchema);

export default User;
