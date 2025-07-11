// import mongoose
import mongoose from "mongoose";


// user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

// user model
const User = mongoose.model("User", userSchema);

// export user model
export default User;