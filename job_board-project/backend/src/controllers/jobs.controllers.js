/**
 * publish a job vacancy
 * get perticeler vacancy details by vacancyId
 * update vacancy details
 * delete vacancy info
 *
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
    throw new ApiError(409, "LoginError : Unaurtorize Access");
  }
  if (req.params?.userId !== req.userId) {
    throw new ApiError(409, "ParamsError : Unaurtorize Access");
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
    maxApplication,
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
      maxApplication,
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
      maxApplication,
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
      maxApplication,
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
  let updateEmployee;
  try {
    updateEmployee = await Employee.findByIdAndUpdate(
      req.userId,
      {
        $push: {
          jobsArray: createNewJob._id,
        },
      },
      { new: true }
    ).select("jobsArray");
  } catch (error) {
    throw new ApiError(
      500,
      `DbError : ${error.message || "Unable to update Employee"} `
    );
  }
  if (!updateEmployee) {
    throw new ApiError(500, "DbError : Employee not updated");
  }

  return res.status(200).json(new ApiResponce(200, [createNewJob, updateEmployee], "successMessage : job vacancy add successfully"));
});



export const getPerticulerVacancyFullDetails = AsyncHandler(
  async (req, res) => {
    /**
     * check vacancy id recieved from param
     * serch vacancy and return full data
     */
});


export const updateVacancyDetails = AsyncHandler(async (req, res) => {
  /**
   * check employee is login
   * check vacancy id on params
   * check nessary data received from body
   *  
   */

});

export const deleteVacancy = AsyncHandler(async (req, res) => {});

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
