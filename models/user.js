
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  lastName: {
    type: String,
    required: true
  },
  
  firstName: {
    type: String,
    required: true
  },

  login:{
  type: String,
  required: true
  },
phone:
{
  type : Number,
  min:8,
  max: 8,
  required: true

},
  password:{
    type: String,
    required: true
  },
 adresse:{
    type: String,
    required: true
  },
  role: 
  {
  type: String,
   default: "member"
  }

  
})

userSchema.methods.isMember = function() {
  return (this.role === "member");
};
userSchema.methods.isAdmin = function() {
  return (this.role === "Admin");
};
module.exports = mongoose.model('User', userSchema)
