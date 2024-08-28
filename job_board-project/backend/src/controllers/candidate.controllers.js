/**
 * register candidate
 * login candidate
 * logout candidate
 * update candidate details : fullName, company details
 * change Candidate password
 * reset candidate password
 * delete Candidate
 * get perticuler candidate details
 * set Candidate Avatar
 * remove Candidate avatar
 * 
 * get Employee details
 * 
 * upload resume
 * remove resume
 * 
 * get all job that match candidate keySkills
 * get all applications
 * get all sorted application
 * 
 * view application details
 * check application status
 */

import AsyncHandler from "../utils/AsyncHandler.js"
import AirError from "../utils/ApiError.js"
import ApiResponce from "../utils/ApiResponce.js"
import candidate from "../models/candidates.models.js"
import Employee from "../models/empoleeyes.models.js"

export const registercandidate = AsyncHandler(async (req, res) => {
  /**
   * check candidate not login : check accessToken in cookies
   * check necessary data is received from body
   * validate all data - data validity, email exitance
   * create new candidate object and save to database
   * varify saved candidate
   * return with responce
   */
})


export const logincandidate = AsyncHandler(async (req, res) => {
  /**
   * check candidate not login : check accessToken in cookies
   * check necessary data is received from body
   * validate and varify data - data validity, email exitance, password varification
   * generate access and refresh tokens
   * save refresh token in database and update candidate
   * set access token and Refresh Token flag in cookie
   * return candidateData and responce
   */
})


export const logoutcandidate = AsyncHandler(async (req, res) => {
  /**
   * check candidate login : check access token in cookies
   * update some candidate data field in database and clear accessToken and refreshToken flag in cookie
   * return message and responce
   */
})


export const updatecandidateDetails = AsyncHandler(async (req, res) => {
  /**
   * check candidate login : check accessToken in cookies
   * check necessary data is received from body
   * updated data in candidate database
   * return result and responce
   */
})


export const changecandidatePassword = AsyncHandler(async (req, res) => {
  /**
   * check candidate login : check accessToken in cookies
   * chack passwords received from body
   * varify password and update its
   * return result and responce
   */
})


export const resetcandidatePassword = AsyncHandler(async (req, res) => {
  /**
   * check candidate not login : check accessToken in cookies
   * check candidate datails received from body
   * varify candidate details and set password
   * return result and responce
   */
})


export const deletecandidate = AsyncHandler(async (req, res) => {
  /**
   * check candidate login : check accessToken in cookies
   * delete candidate and clear cookies
   * return result and responce
   */

})

export const getcandidateDetails = AsyncHandler(async (req, res) => {
  /**
   * check candidate login
   * serch candidate and return datails in responce
   */
})

export const setAvatar = AsyncHandler(async(req, res) => {
  /**
   * check candidate login : check accessToken in cookies
   * reteive file localPath and upload in cloudinary
   * check previous Avatar url is not default url, then delete pic by url in cloudinary
   * set cloudinary url in candidate database
   * return responce
   */
})

export const removeAvatar = AsyncHandler(async(req, res) => {
  /**
   * check candidate login : check accessToken in cookies
   * check candidate Avatar is default
   * remove Avatar by Url in cloudinary
   * set Avatar to defalt
   * return responce
   */
})

export const getAllJobsByKeySkills = AsyncHandler(async (req, res) => {
  /**
   * check candidate login : check accessToken in cookies
   * reteive candidate keyskills 
   * filter jobs by keyskills 
   * return result and responce
   */
})
export const getAllJobsbyFilter = AsyncHandler(async (req, res) => {
  /**
   * check candidate login : check accessToken in cookies 
   * check defining Filter from params
   * filter jobs and return result with responce
   */
})

export const getAllApplications = AsyncHandler(async (req, res) => {
  /**
   * check candidate login : check accessToken in cookies
   * reteive all application by candidate applications array
   * return result and responce
   */
})

export const getAllSortedApplications = AsyncHandler(async (req, res) => {
  /**
   * check candidate login : check accessToken in cookies 
   * reteive all sorted application by candidate sorted applications array
   * return result and responce 
   */
})

export const getApplicationDetails = AsyncHandler(async (req, res) => {
  /**
   * check candidate login : check accessToken in cookies
   * check application Id from params
   * retrive application details by application id
   * return result and responce
   */
})

export const checkApplicationStatus = AsyncHandler(async (req, res) => {
  /**
   * check candidate login : check accessToken in cookies
   * check application Id from params
   * retrive application status by application id
   * return result and responce
   */
})


export const getEmployeeDetails = AsyncHandler(async (req, res) => {
  /**
   * check candidate login : check accessToken in cookies
   * get Employee Id from params
   * search Employee details from condidate Database 
   * return Employee and responce
   */
})


