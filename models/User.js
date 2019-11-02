const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
    username: {
        type: String,
        max: [32, 'Too long, max is 128 characters'],
        min: [4, 'Too long, max is 128 characters']
    },
    email: {
        type: String,
        required: 'Email is required',
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
        lowercase: true,
        max: [32, 'Too long, max is 128 characters'],
        min: [4, 'Too long, max is 128 characters']
    },
    password: {
        type: String,
        max: [32, 'Too long, max is 128 characters'],
        min: [4, 'Too long, max is 128 characters'],
        required: 'Password is require!'
    },


});
userSchema.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    //    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);