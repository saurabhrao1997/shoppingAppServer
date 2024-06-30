const  mongoose  = require("mongoose")

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = mongoose.Schema({
    image:{
        type:String
    },
    Name:{
        type:String,
        required:true,
        min:[3,"first name should be greater than 3 char"],
        max:[40,"first name should be greater than 40 char"],
        validate:{
            validator:(v)=>{
                return /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/.test(v)
            }
        }
        
    },
    Mobile:{
        type:String,
        required:true,
        
    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        
    },
    password:{
        type:String,
        required:true,
        
    },
    confirmPassword:{
        type:String,
        required:true,
        
    },
    token:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        default:0
        // required:true
    }
  })


  const User = mongoose.model("userData",userSchema)

module.exports = User