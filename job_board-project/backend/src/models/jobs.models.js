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
        unique:true      
    },
    description : {
        type:String,
        required : true      
    },
    type : {
        type:String,
        required : true      
    },
    status : {
        type:String,
        required : true      
    },
    fiels : {
        type:String,
        required : true      
    },
    keySkills : [{
        type:String,
        required : true      
    }],
    numberOdOpening : {
        type:Number,
        default : 1
    },
    maxApplication : {
        type:number,
        default : 1000
    },
    applicationStartDate : {
        type : Date,
        required : true
    },
    applicationEndtDate : {
        type : Date,
        required : true
    },
    application_array : [{
        type : Schema.Types.ObjectId,
        ref : "Application"
    }]

})

// models
const Job = model("Job", JobSchema)
export default Job