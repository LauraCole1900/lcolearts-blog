import { Document, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { NextFunction } from 'express';

interface IUser {
  userName: string;
  email: string;
  password: string;
};

interface IUserDoc extends IUser, Document {};

const userSchema = new Schema<IUserDoc>({
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
});

// hash user password
userSchema.pre<IUserDoc>('save', async function () {
    if (this.isNew || this.isModified("password")) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  }
);

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

var User = model<IUserDoc>('User', userSchema);

export default User;
