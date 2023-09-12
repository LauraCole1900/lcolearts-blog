import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import bcrypt from 'bcrypt';

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
});

// hash user password
userSchema.pre(
  'save',
  async function (this: typeof User, next: any): Promise<void> {
    if (this.isNew || this.isModified("password")) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
  }
);

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

var User: any = model('User', userSchema);

export default User;
