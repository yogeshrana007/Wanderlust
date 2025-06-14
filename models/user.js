const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
});

userSchema.plugin(passportLocalMongoose); // isliye plugin kiya qki ye automatically username, hashing, salting and hash password in sab ko automatically implement kar deta hai

module.exports = mongoose.model("User", userSchema);
