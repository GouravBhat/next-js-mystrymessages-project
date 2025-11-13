import mongoose,{Schema,Document} from "mongoose";



const MessageSchema=new Schema({
    content:{
        type:String,
        required:true
    },
    CreatedAt:{
        type:Date,
        required:true,
        default:Date.now
    }

})


const UserSchema=new Schema({
   username:{
    type:String,
    required:true,
    trim:true,
   },
   Email:{
    type:String,
    required:true,
    unique:true,
    match:[/.+\@.+\..+/,"please use a valid email"]
   },
   password:{
    type:String,
    required:true,
   },
   verifycode:{
    type:String,
    required:true
   },
   verifycodeexpire:{
    type:Date,
    required:true, 
   },
   isverified:{
    type:Boolean,
    default:false,
   },
   isacceptingmessages:{
    type:Boolean,
    default:true
   },
   messages:[MessageSchema]

})

const UserModel=mongoose.models.User  || mongoose.model("User",UserSchema)

export  default UserModel
