const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = Schema({
name: { 
    type: String, 
    required: true 
},
email: { 
    type: String,
    required: [true, 'Email is required'],
    unique: true,
},
phone: {
    type: String,
    required: [true, 'Phone is required'],
  },
password: { 
    type: String,
    minlength: 6,
    required: true
 },
 role: {
    type: String,
    enum: ["executor", "customer", "admin"],
    required: [true, 'Role is required'],
 },
 projectIds: [{ type: Schema.Types.ObjectId, ref: 'projects' }],
 token: {
    type: String,
    default: null
  }
}, {versionKey: false, timestamps: true})

const User = model("user", userSchema);
 

module.exports = {
    User
}
