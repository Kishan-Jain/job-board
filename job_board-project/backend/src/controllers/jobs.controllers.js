/**
 * publish a job vacancy
 * get perticeler vacancy details by vacancyId for user
 * get perticeler vacancy details by vacancyId for Employee
 * update vacancy details
 * deactivate vacancy 
 * auto deactivate vacancy when passing max application number or expire end application date
 * reactivate vancancy
 */

import AsyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponce from "../utils/ApiResponce.js";
import Job from "../models/jobs.models.js";
import Employee from "../models/empoleeyes.models.js";

export const publishNewJobVacancy = AsyncHandler(async (req, res) => {
  /**
   * check employee is login
   * check necessary data is received
   * fill data in job model and save
   * save jobs Id in employee jobs array
   *
   */

  // check Employee login
  if (!req.userId) {
    throw new ApiError(400, "Employee not login, please login first");
  }
  if (req.userType !== "Employee") {
    throw new ApiError(409, "LoginError : Unauthorize Access");
  }
  if (req.params?.userId !== req.userId) {
    throw new ApiError(409, "ParamsError : Unauthorize Access");
  }

  if (!req.body) {
    throw new ApiError(404, "DataError : No any data received");
  }
  const {
    title,
    description,
    type,
    startStatus,
    field,
    keySkills,
    numberOfOpening,
    maxApplications,
    applicationStartDate,
    applicationEndDate,
  } = req.body;

  if (
    [
      title,
      description,
      type,
      startStatus,
      field,
      keySkills,
      numberOfOpening,
      maxApplications,
      applicationStartDate,
      applicationEndDate,
    ].some((field) => field === undefined)
  ) {
    throw new ApiError(404, "DataError : All field is required");
  }
  if (
    [
      title,
      description,
      type,
      startStatus,
      field,
      keySkills,
      numberOfOpening,
      maxApplications,
      applicationStartDate,
      applicationEndDate,
    ].some((field) => field?.toString().trim() === "")
  ) {
    throw new ApiError(400, "DataError : No any field is Empty");
  }

  let createNewJob;
  try {
    createNewJob = await Job.create({
      employeeId: req.userId,
      title,
      description,
      type,
      startStatus,
      field,
      keySkills,
      numberOfOpening,
      maxApplications,
      applicationStartDate,
      applicationEndDate,
    });
  } catch (error) {
    throw new ApiError(
      500,
      `DbError : ${error.message || "Unable to create new job "}`
    );
  }
  if (!createNewJob) {
    throw new ApiError(500, "DbError : Job not created");
  }
  let searchNewCreatedJob;
  try {
    searchNewCreatedJob = await Job.findById(createNewJob._id);
  } catch (error) {
    throw new ApiError(
      500,
      `DbError : ${error.message || "Unable to find new created job"}`
    );
  }
  if (!searchNewCreatedJob) {
    throw new ApiError(500, "DbError : new created job not find");
  }
  const newJobId = {
    jobId : searchNewCreatedJob._id,
    addDate : Date.now()
  }
  let addJobIdInEmployee;
  try {
    addJobIdInEmployee = await Employee.findByIdAndUpdate(req.userId, 
      {
        $push : {
          jobsArray : newJobId
        }
      }, {new:true}
    ).select("jobsArray previousJobsArray")
  } catch (error) {
    throw new ApiError(
      500,
      `DbError : ${error.message || "Unable to update Employee"} `
    );
  }
  if (!addJobIdInEmployee) {
    throw new ApiError(500, "DbError : Employee not updated");
  }

  return res.status(200).json(new ApiResponce(200, [createNewJob, addJobIdInEmployee], "successMessage : job vacancy add successfully"));
});

export const getPerticulerVacancyFullDetailsForEmployee = AsyncHandler(
  async (req, res) => {
    /**
     * check employee is login
     * check vacancy id recieved from param
     * serch vacancy and return full data
     */
    // check Employee login
  if (!req.userId) {
    throw new ApiError(400, "Employee not login, please login first");
  }
  if (req.userType !== "Employee") {
    throw new ApiError(409, "LoginError : Unauthorize Access");
  }
  if (req.params?.userId !== req.userId) {
    throw new ApiError(409, "ParamsError : Unauthorize Access");
  } 
  // check vacancy id
    if(!req.params?.vacancyId){
      throw new ApiError(404, "DataError : No any field received")
    }
    // check user authorize for access
    if((await Job.findById(req.params?.vacancyId))?.employeeId.toString() !== req.userId){
      throw new ApiError(409, "LoginError : Employee unauthorize to access")
    }  
    let searchVacancyDetails
    try {
      searchVacancyDetails = await Job.findById(req.params?.vacancyId).select("-maxApplications -applicationArray")
    } catch (error) {
      throw new ApiError(500, `DbError : ${error.message || "unable to find jab info"}`)
    }
    if(!searchVacancyDetails){
      throw new ApiError(404, "job info not finded")
    }
    return res
    .status(200)
    .json(new ApiResponce(200, searchVacancyDetails, "successMessage : Vacancy data received successfully"))
});

export const getPerticulerVacancyFullDetailsForUsers = AsyncHandler(
  async (req, res) => {
    /**
     * check vacancy id recieved from param
     * serch vacancy and return full data
     */
    // check vacancy id received from params
    if(!req.params?.vacancyId){
      throw new ApiError(404, "DataError : vacancy id not received from params")
    }
    // serch vacancy details
    let searchVacancyDetails
    try {
      searchVacancyDetails = await Job.findById(req.params?.vacancyId).select("-maxApplications -applicationArray")
    } catch (error) {
      throw new ApiError(500, `DbError : ${error.message || "unable to find jab info"}`)
    }
    if(!searchVacancyDetails){
      throw new ApiError(404, "job info not finded")
    }
    // return responce
    return res
    .status(200)
    .json(new ApiResponce(200, searchVacancyDetails, "successMessage : Vacancy data received successfully"))
});


export const updateVacancyDetails = AsyncHandler(async (req, res) => {
  /**
   * check employee is login
   * check vacancy id on params
   * check nessary data received from body
   * update job 
   * return responce
   */
  
  // check Employee login
  if (!req.userId) {
    throw new ApiError(400, "Employee not login, please login first");
  }
  if (req.userType !== "Employee") {
    throw new ApiError(409, "LoginError : Unauthorize Access");
  }
  if (req.params?.userId !== req.userId) {
    throw new ApiError(409, "ParamsError : Unauthorize Access");
  }
  if(!req.params?.vacancyId){
    throw new ApiError(404, "DataError : vacancyId not received from params" )
  }

  if((await Job.findById(req.params?.vacancyId))?.employeeId.toString() !== req.userId){
    throw new ApiError(409, "LoginError : Employee unauthorize to access")
  }
  if((await Job.findById(req.params?.vacancyId))?.status.toString() !== "Active"){
    throw new ApiError(409, "LoginError : Job Vacancy not active stage")
  }
  
  if(!req.body){
    throw new ApiError(404, "no any data received from params")
  }
  // const {description, keySkills, numberOfOpening, maxApplications, applicationEndDate} = req.body

  let updateJobDetails
  try {
    updateJobDetails = await Job.findByIdAndUpdate(req.params.vacancyId, 
    {
      $set : req.body
    },{new : true}).select("-applicationArray")
  } catch (error) {
    throw new ApiError(500, `DbError : ${error.message || "Unable to update job details"}`)
  }
  if(!updateJobDetails){
    throw new ApiError(500, "DbError : Job details not updated")
  }
  return res
  .status(200)
  .json(new ApiResponce(200, updateJobDetails, "successMessage : job details updated successfully"))
});

export const deactivateVacancy = AsyncHandler(async (req, res) => {
  /**
   * check employee is login
   * check vacancy id on params
   * chang job to deactive
   * cut job id from employee job array and paste previous job array 
   * return responce
   */
  
  // check Employee login
  if (!req.userId) {
    throw new ApiError(400, "Employee not login, please login first");
  }
  if (req.userType !== "Employee") {
    throw new ApiError(409, "LoginError : Unauthorize Access");
  }
  if (req.params?.userId !== req.userId) {
    throw new ApiError(409, "ParamsError : Unauthorize Access");
  }
  if(!req.params?.vacancyId){
    throw new ApiError(404, "DataError : vacancyId not received from params" )
  }
  if((await Job.findById(req.params?.vacancyId))?.employeeId.toString() !== req.userId){
    throw new ApiError(409, "LoginError : Employee unauthorize to access")
  }
  if((await Job.findById(req.params?.vacancyId))?.status.toString() === "Deactive"){
    throw new ApiError(409, "LoginError : Vacancy allready deactivate")
  }
  let makeVacancyDeactive
  try {
    makeVacancyDeactive = await Job.findByIdAndUpdate(req.params?.vacancyId, 
      {
        $set : {
          status : "Deactive"
        },
        $setOnInsert : {
          deactiveDate : Date.now()
        }
      }, {new:true}
    ).select("-applicationArray")
  } catch (error) {
    throw new ApiError(500, `DbError : ${error.message || "unable to deactivate vacancy"} `)
  }
  if(!makeVacancyDeactive){
    throw new ApiError(500, "DbError : Vacancy not deactivate")
  }
  const jobId = {
    jobId : req.params.vacancyId,
    startDate : makeVacancyDeactive.startDate,
    addDate : Date.now()
  }
  let changeEmployeeJobArray
  try {
    changeEmployeeJobArray = await Employee.findById(req.userId)
    const newJobArray = changeEmployeeJobArray.jobsArray.filter(field => field.jobId?.toString() !== req.params.vacancyId)
    changeEmployeeJobArray.jobsArray = newJobArray
    changeEmployeeJobArray.save({validateBeforeSave:false})
    changeEmployeeJobArray = await Employee.findByIdAndUpdate(req.userId, {
      $push : {previousJobsArray : jobId}
    },{new:true}).select("jobsArray previousJobsArray")
  } catch (error) {
    throw new ApiError(500, `DbError : ${error.message || "Unable to change Employee job array" }`)
  }
  if(!changeEmployeeJobArray){
    throw new ApiError(500, "DbError : Employee Job Array not changed")
  }
  return res
  .status(200)
  .json(new ApiResponce(200, [makeVacancyDeactive, changeEmployeeJobArray], "successMessage : Vacancy deactivate marked"))
});

export const autoDeactivateVacancy = AsyncHandler(async (req, res) => {
  /**
   * check employee is login
   * check vacancy id on params
   * chang job to deactive
   * cut job id from employee job array and paste previous job array 
   * return responce
   */
  
  // check Employee login
  if (!req.userId) {
    throw new ApiError(400, "Employee not login, please login first");
  }
  if (req.userType !== "Employee") {
    throw new ApiError(409, "LoginError : Unauthorize Access");
  }
  if (req.params?.userId !== req.userId) {
    throw new ApiError(409, "ParamsError : Unauthorize Access");
  }
  if(!req.params?.vacancyId){
    throw new ApiError(404, "DataError : vacancyId not received from params" )
  }
  if((await Job.findById(req.params?.vacancyId))?.employeeId.toString() !== req.userId){
    throw new ApiError(409, "LoginError : Employee unauthorize to access")
  }
  if((await Job.findById(req.params?.vacancyId))?.status.toString() === "Deactive"){
    throw new ApiError(409, "LoginError : Vacancy allready deactivate")
  }
  let makeVacancyDeactive
  try {
    makeVacancyDeactive = await Job.findByIdAndUpdate(req.params?.vacancyId, 
      {
        $set : {
          status : "Deactive"
        },
        $setOnInsert : {
          deactiveDate : Date.now()
        }
      }, {new:true}
    ).select("-applicationArray")
  } catch (error) {
    throw new ApiError(500, `DbError : ${error.message || "unable to deactivate vacancy"} `)
  }
  if(!makeVacancyDeactive){
    throw new ApiError(500, "DbError : Vacancy not deactivate")
  }
  const jobId = {
    jobId : req.params.vacancyId,
    startDate : makeVacancyDeactive.startDate,
    addDate : Date.now()
  }
  let changeEmployeeJobArray
  try {
    changeEmployeeJobArray = await Employee.findById(req.userId)
    const newJobArray = changeEmployeeJobArray.jobsArray.filter(field => field.jobId?.toString() !== req.params.vacancyId)
    changeEmployeeJobArray.jobsArray = newJobArray
    changeEmployeeJobArray.save({validateBeforeSave:false})
    changeEmployeeJobArray = await Employee.findByIdAndUpdate(req.userId, {
      $push : {previousJobsArray : jobId}
    },{new:true}).select("jobsArray previousJobsArray")
  } catch (error) {
    throw new ApiError(500, `DbError : ${error.message || "Unable to change Employee job array" }`)
  }
  if(!changeEmployeeJobArray){
    throw new ApiError(500, "DbError : Employee Job Array not changed")
  }
  return res
  .status(200)
  .json(new ApiResponce(200, [makeVacancyDeactive, changeEmployeeJobArray], "successMessage : Vacancy deactivate marked"))
});

export const reactivateVacancy = AsyncHandler(async (req, res) => {
  /**
   * check employee is login
   * check vacancy id on params
   * check job is deactive
   * change job to active
   * cut job id from employee previous job array and paste job array 
   * return responce
   */
  
  // check Employee login
  if (!req.userId) {
    throw new ApiError(400, "Employee not login, please login first");
  }
  if (req.userType !== "Employee") {
    throw new ApiError(409, "LoginError : Unauthorize Access");
  }
  if (req.params?.userId !== req.userId) {
    throw new ApiError(409, "ParamsError : Unauthorize Access");
  }
  if(!req.params?.vacancyId){
    throw new ApiError(404, "DataError : vacancyId not received from params" )
  }
  if((await Job.findById(req.params?.vacancyId))?.employeeId.toString() !== req.userId){
    throw new ApiError(409, "LoginError : Employee unauthorize to access")
  }
  if((await Job.findById(req.params?.vacancyId))?.status.toString() !== "Deactive"){
    throw new ApiError(409, "DataError : Vacancy not deactivate")
  }
  let makeVacancyActivate
  try {
    makeVacancyActivate = await Job.findByIdAndUpdate(req.params?.vacancyId, 
      {
        $set : {
          status : "Active",
          deactiveDate : undefined
        }
      }, {new:true}
    ).select("-applicationArray")
  } catch (error) {
    throw new ApiError(500, `DbError : ${error.message || "unable to deactivate vacancy"} `)
  }
  if(!makeVacancyActivate){
    throw new ApiError(500, "DbError : Vacancy not deactivate")
  }
  const jobId = {
    jobId : req.params.vacancyId,
    addDate : makeVacancyActivate.startDate
  }
  let changeEmployeeJobArray
  try {
    changeEmployeeJobArray = await Employee.findById(req.userId)
    const newPreviousJobArray = changeEmployeeJobArray.previousJobsArray.filter(field => field.jobId?.toString() !== req.params.vacancyId)
    changeEmployeeJobArray.previousJobsArray = newPreviousJobArray
    changeEmployeeJobArray.save({validateBeforeSave:false})
    changeEmployeeJobArray = await Employee.findByIdAndUpdate(req.userId, {
      $push : {jobsArray : jobId}
    },{new:true}).select("jobsArray previousJobsArray")
  } catch (error) {
    throw new ApiError(500, `DbError : ${error.message || "Unable to change Employee job array" }`)
  }
  if(!changeEmployeeJobArray){
    throw new ApiError(500, "DbError : Employee Job Array not changed")
  }
  return res
  .status(200)
  .json(new ApiResponce(200, [makeVacancyActivate, changeEmployeeJobArray], "successMessage : Vacancy Activate marked"))
});

/**
 * apply for jobs vacancy
 * match application with job keyskills
 * application mark to sorted
 *
 */

export const applyJobVacancy = AsyncHandler(async (req, res) => {});

export const matchApplicationWithJobKeySkills = AsyncHandler(
  async (req, res) => {}
);

export const markToSortlistedJobApplication = AsyncHandler(
  async (req, res) => {}
);
