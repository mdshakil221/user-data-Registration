const mongoose=require("mongoose");
const bcrypt=require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    NIDNumber: {type: String, required: true, unique: true},
    phoneNumber: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    bloodGroup: {type: String, required: true},
});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return nexr();
    this.password=await bcrypt.hash(this.password, 10);
    next();
});

const User=mongoose.model("User", userSchema);
module.exports=User;