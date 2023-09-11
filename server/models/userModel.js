var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
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
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isNew || this.isModified("password")) {
            const saltRounds = 10;
            this.password = yield bcrypt.hash(this.password, saltRounds);
        }
        next();
    });
});
// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcrypt.compare(password, this.password);
    });
};
var User = model("User", userSchema);
export default User;
