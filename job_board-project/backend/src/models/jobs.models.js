import {Schema, model} from "mongoose"

const JobSchema = new Schema({
    title : {
        type:String,
        required : true      
    },
    employeeId : {
        type:Schema.Types.ObjectId,
        ref : "Employee",
        required : true,
              
    },
    description : {
        type:String,
        required : true      
    },
    type : {
        type:String,
        required : true      
    },
    startStatus : {
        type:String,
        required : true      
    },
    field : {
        type:String,
        required : true      
    },
    keySkills : [{
        type:String,
        required : true      
    }],
    numberOfOpening : {
        type:Number,
        default : 1
    },
    maxApplication : {
        type:Number,
        default : 1000
    },
    applicationStartDate : {
        type : Date,
        required : true
    },
    applicationEndDate : {
        type : Date,
        required : true
    },
    application_array : [{
        type : Schema.Types.ObjectId,
        ref : "Application"
    }],
    status : {
        type : String,
        default : "Active"
    }
})

// models
const Job = model("Job", JobSchema)
export default Job