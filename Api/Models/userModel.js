const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        unique: true,
        lowercase: true,
        index:true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address!']
    },
    membershipType: {
        type: String,
        lowercase: true,
        default: "no",
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    }, 
    password: {
        type: String,
        required: [true, "Please create password!"],
        minlength: [4, "Password must be at least 4 characters long!"],
    },
    confirmPassword: {
        type: String,
        required: [true, "Please create password!"],
        validate: {
            validator: function (pwd) {
                return pwd === this.password;
            },
            message: "Passwords do not match"
        },
    },
    active: {
        type: Boolean,
        default: true,
    },
});

// middlewares
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    //
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    next();
});
userSchema.pre("save", function (next) {
    if (!this.isModified("password") || this.isNew) return next();
    //
    this.passwordChangedAt = Date.now() - 1000;
    next();
});
userSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } });
    next();
});

// methods
userSchema.methods.checkPassword = async function (inputPwd, pwd) {
    return await bcrypt.compare(inputPwd, pwd);
}
// tells if pwd changed or not after jwt issuance
userSchema.methods.passwordChangedAfter = function (jwtTimestamp) {
    if (this.passwordChangedAt) {
        const changeTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );
        return jwtTimestamp < changeTimestamp;
    }
    // false means not changed
    return false;
};

const User = mongoose.model("user", userSchema);

module.exports = User;