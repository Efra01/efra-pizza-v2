const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema (
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            required: [ true, "Email is required"],
        },
        password: {
            type: String,
            required: [ true, "Password is required"],
            minLength: [ 8, "Password must be atleast 8 characters"]
        },
        address: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },

        orders: {

        },

        favorite: {            

        },
    },
    { timestamps: true }
);

UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set((value) => this._confirmPassword = value);


UserSchema.pre("validate", function(next) {
    if(this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Passwords must match!");
    }
    next();
})


UserSchema.pre("save", function(next) {
bcrypt.hash(this.password, 10)
    .then((hashedPass) => {
        this.password = hashedPass;
        next();
    })
})


const User = mongoose.model("User", UserSchema);

module.exports = User;
