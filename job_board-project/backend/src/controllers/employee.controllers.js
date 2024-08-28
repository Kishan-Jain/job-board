/**
 * register Employee
 * login 
 * logout
 * update details : fullName, company details
 * change password
 * reset password
 * delete 
 * get perticuler Employee details
 * setAvatar
 * remove avatar
 * 
 * reteive all jobs
 * reteive all previous joobs
 * 
 */

import AsyncHandler from "../utils/AsyncHandler.js"
import AirError from "../utils/ApiError.js"
import ApiResponce from "../utils/ApiResponce.js"
import Employee from "../models/empoleeyes.models.js"


export const registerEmployee = AsyncHandler(async (req, res) => {
  /**
   * check Employee not login : check accessToken in cookies
   * check necessary data is received from body
   * validate all data - data validity, email exitance
   * create new Employee object and save to database
   * varify saved Employee
   * return with responce
   */
})


export const loginEmployee = AsyncHandler(async (req, res) => {
  /**
   * check Employee not login : check accessToken in cookies
   * check necessary data is received from body
   * validate and varify data - data validity, email exitance, password varification
   * generate access and refresh tokens
   * save refresh token in database and update Employee
   * set access token and Refresh Token flag in cookie
   * return EmployeeData and responce
   */
})


export const logoutEmployee = AsyncHandler(async (req, res) => {
  /**
   * check Employee already login : check access token in cookies
   * update some Employee data field in database and clear accessToken and refreshToken flag in cookie
   * return message and responce
   */
})


export const updateEmployeeDetails = AsyncHandler(async (req, res) => {
  /**
   * check Employee already login : check accessToken in cookies
   * check necessary data is received from body
   * updated data in Employee database
   * return result and responce
   */
})


export const changeEmployeePassword = AsyncHandler(async (req, res) => {
  /**
   * check Employee already login : check accessToken in cookies
   * chack passwords received from body
   * varify password and update its
   * return result and responce
   */
})


export const resetEmployeePassword = AsyncHandler(async (req, res) => {
  /**
   * check Employee not login : check accessToken in cookies
   * check Employee datails received from body
   * varify Employee details and set password
   * return result and responce
   */
})


export const deleteEmployee = AsyncHandler(async (req, res) => {
  /**
   * check Employee already login : check accessToken in cookies
   * delete Employee and clear cookies
   * return result and responce
   */

})

export const getEmployeeDetails = AsyncHandler(async (req, res) => {
  /**
   * check Employee already login
   * serch Employee and return datails in responce
   */
})

export const setAvatar = AsyncHandler(async(req, res) => {
  /**
   * check Employee already login : check accessToken in cookies
   * reteive file localPath and upload in cloudinary
   * check previous Avatar url is not default url, then delete pic by url in cloudinary
   * set cloudinary url in Employee database
   * return responce
   */
})

export const removeAvatar = AsyncHandler(async(req, res) => {
  /**
   * check Employee already login : check accessToken in cookies
   * check Employee Avatar is default
   * remove Avatar by Url in cloudinary
   * set Avatar to defalt
   * return responce
   */
})

export const getCandidateDetails = AsyncHandler(async (req, res) => {
  /**
   * check Employee already login : check accessToken in cookies
   * get Candidate Id from params
   * search Candidate details from condidate Database 
   * return candidate and responce
   */
})



