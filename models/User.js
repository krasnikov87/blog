const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', function hashPassword(next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
    }
    next();
});

module.exports = mongoose.model('User', UserSchema);
