import {Schema, model} from "mongoose"

const ApplicationSchema = new Schema({
    jobTitle : {
        type:Schema.Types.ObjectId,
        ref : "Job",
        required : true,
        unique : true
    },
    candidateId : {
        type:Schema.Types.ObjectId,
        ref : "Candidate",
        required : true,
        unique : true
    },
    employeeId : {
        type:Schema.Types.ObjectId,
        ref : "Employee",
        required : true,
        unique : true
    },
    applicationStatus : {
        type:String,
        default:"pending"
    }
})

// models
const Application = model("Application", ApplicationSchema)
export default Application