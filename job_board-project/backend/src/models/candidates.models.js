import { Schema, model } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const CandidatesSchema = new Schema({
    emailId : {
        type : String,
        required : [true, "EmailId is required"],
        unique : [true, "EmailId already exits"]
    },
    fullName : {
        type : String,
        required : [true, "FullName is required"]
    },
    password : {
        type : String,
        required : [true, "EmailId is required"],
    },
    field : {
        type:String,
        required : true
    },
    keySkills : [{
        type : String 
    }],
    lastLogin : {
        type : Date
    },
    lastLogout : {
        type : Date,
    },
    isActive : {
        type : Boolean,
        default: true
    },
    avatar : {
        type : String,
        
    },
    connectionsRequestWithEmployees : [{
        EmployeeId :  {
            type : Schema.Types.ObjectId,
            ref : "Employee",
        },
        status : {
            type:Boolean,
            default : panding
        },
        joinDate : {
            type : Date
        }
    }],
    connectionsRequestWithCandidates : [{
        CandidateId :  {
            type : Schema.Types.ObjectId,
            ref : "Candidate",
        },
        status : {
            type:Boolean,
            default : panding
        },
        joinDate : {
            type : Date
        }
    }],
    connectionsWithEmployees : [{
        EmployeeId :  {
            type : Schema.Types.ObjectId,
            ref : "Employee",
        },
        status : {
            type:Boolean,
            default : panding
        },
        joinDate : {
            type : Date
        }
    }],
    connectionsWithCandidates : [{
        CandidateId :  {
            type : Schema.Types.ObjectId,
            ref : "Candidate",
        },
        status : {
            type:Boolean,
            default : panding
        },
        joinDate : {
            type : Date
        }
    }],
    followingByEmployees : [{
        type : Schema.Types.ObjectId,
        ref : "Employee"
    }],
    followingByCandidates : [{
        type : Schema.Types.ObjectId,
        ref : "Candidate"
    }],    
    followrdEmployees : [{
        type : Schema.Types.ObjectId,
        ref : "Employee"
    }],
    followrdCandidates : [{
        type : Schema.Types.ObjectId,
        ref : "Candidate"
    }],
    
    chatBox : [{
        connectionId : {
            type : String
        },
        chat : {
            receivedMessage : [{
                message : String,
                time : Date
            }],
            receivedMediaFile : [{
                fileUrl:String,
                time:Date
            }],
            sendMessage : [{
                message : String,
                time : Date
            }],
            sendMediaFile : [{
                fileUrl:String,
                time:Date
            }]
        }
    }],
    areaOfIntrest : [{
        type : String
    }],
    resumeArray : [{
        type : String
    }],
    application : [{
            type : Schema.Types.ObjectId,
            ref : "Application"
    }],
    sortedApplication : [{
            type : Schema.Types.ObjectId,
            ref : "Application"
    }]

}, {timestamps:true})


// save password with hash
CandidatesSchema.pre("save", async function(next){
    if(this.isModified("password")) (
        this.password = await bcrypt.hash(this.password, 10)
    )
    next()
})

// custom methods for utilities of schemas
// check password is correct
CandidatesSchema.methods.checkPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

// generate AccessRefreshTokens
CandidatesSchema.methods.generateAccessToken() = async function () {
    return await jwt.sign({
        _id : this._id,
        userType : "Candidate"
    },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}
CandidatesSchema.methods.generateRefreshToken() = async function () {
    return await jwt.sign({
        _id : this._id,
        userType : "Candidate"
    },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}

// models
const Candidate = model("Candidate", CandidatesSchema)
export default Candidate
