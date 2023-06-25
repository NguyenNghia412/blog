const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    displayName: {
        type: String
    },
    email: {
        type: String,
        unique: true,
    },
    phone: {
        type: String,
        unique: true,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    deleted: {
        type: Boolean,
        default: false,
    }
});

UserSchema.methods.toJSON = function () {
    var obj = this.toObject(); //or var obj = this;
    delete obj.password;
    delete obj.__v;
}

const User = mongoose.model('User', UserSchema);
module.exports = User;

