/**
 * check connections
 * send connection request
 * view connection request
 * responce on conection request
 * brack connection
 */

import AsyncHandler from "../utils/AsyncHandler.js";
import Employee from "../models/empoleeyes.models.js";
import Candidate from "../models/candidates.models.js";

export const checkConnection = AsyncHandler(async (req, res) => {
  /**
   * check user is logged in
   * validate user
   * check second user Id and type from query perameter
   * validate second user 
   * match second user id and type in frist user connectionlist and connection request list
   * return responce
   */

  // check user is login
  if (!req.userId) {
    throw new ApiError(400, "LoginError : User not logged in")
  }
  if (req.userId !== req.params?.userId) {
    throw new ApiError(401, "AuthError : User not authorize")
  }
  if (!req.type) {
    throw new ApiError(400, "LoginError : User login Error")
  }
  // check user type
  if(req.type === "Employee"){

  }
  else if(req.type === "Candidate"){

  }
})

export const getAllReceivedConnectionRequest = AsyncHandler(async (req, res) => {
  /**
   * check user is logged in
   * validate user
   * reteive all data
   * return data and responce
   */
  
  // check user is login
  if (!req.userId) {
    throw new ApiError(400, "LoginError : User not logged in")
  }
  if (req.userId !== req.params?.userId) {
    throw new ApiError(401, "AuthError : User not authorize")
  }
  if (!req.type) {
    throw new ApiError(400, "LoginError : User login Error")
  }
  // check user type
  if(req.type === "Employee"){

  }
  else if(req.type === "Candidate"){

  }
})

export const getAllSendConnectionRequest = AsyncHandler(async (req, res) => {
  /**
   * check user is logged in
   * validate user
   * reteive all data
   * return data and responce
   */
  
  // check user is login
  if (!req.userId) {
    throw new ApiError(400, "LoginError : User not logged in")
  }
  if (req.userId !== req.params?.userId) {
    throw new ApiError(401, "AuthError : User not authorize")
  }
  if (!req.type) {
    throw new ApiError(400, "LoginError : User login Error")
  }
  // check user type
  if(req.type === "Employee"){

  }
  else if(req.type === "Candidate"){

  }
})

export const sendConnectionRequest = AsyncHandler(async (req, res) => {
  /**
   * check user is logged in
   * validate user
   * check second user id and type from query perameter
   * validate second user
   * push user id on connection request send list and push first user id in second user connection request received list
   * return responce
   */
  
  // check user is login
  if (!req.userId) {
    throw new ApiError(400, "LoginError : User not logged in")
  }
  if (req.userId !== req.params?.userId) {
    throw new ApiError(401, "AuthError : User not authorize")
  }
  if (!req.type) {
    throw new ApiError(400, "LoginError : User login Error")
  }
  // check user type
  if(req.type === "Employee"){

  }
  else if(req.type === "Candidate"){

  }
})


export const responceOnConnectionRequest = AsyncHandler(async (req, res) => {
  /**
   * check user is logged in
   * validate user
   * check connection request availabel on user connection requesr list
   * responce on connection request
   * if request accept, add user id in both user connection list
   * if request reject, remove user id from both user connection request listed
   * return responce 
   */
  
  // check user is login
  if (!req.userId) {
    throw new ApiError(400, "LoginError : User not logged in")
  }
  if (req.userId !== req.params?.userId) {
    throw new ApiError(401, "AuthError : User not authorize")
  }
  if (!req.type) {
    throw new ApiError(400, "LoginError : User login Error")
  }
  // check user type
  if(req.type === "Employee"){

  }
  else if(req.type === "Candidate"){

  }
})

export const brackConnection = AsyncHandler(async (req, res) => {
  /**
   * check user is logged in
   * check users also connected
   * remove connection details in both user connection list
   * return responce
   */
  
  // check user is login
  if (!req.userId) {
    throw new ApiError(400, "LoginError : User not logged in")
  }
  if (req.userId !== req.params?.userId) {
    throw new ApiError(401, "AuthError : User not authorize")
  }
  if (!req.type) {
    throw new ApiError(400, "LoginError : User login Error")
  }
  // check user type
  if(req.type === "Employee"){

  }
  else if(req.type === "Candidate"){

  }
})

export const cancelConnectionSendRequest = AsyncHandler(async (req, res) => {
  /**
   * check user is logged in
   * check connection request availabel on user connection request list
   * remove connection request details in both user connection request list
   * return responce
   */
  
  // check user is login
  if (!req.userId) {
    throw new ApiError(400, "LoginError : User not logged in")
  }
  if (req.userId !== req.params?.userId) {
    throw new ApiError(401, "AuthError : User not authorize")
  }
  if (!req.type) {
    throw new ApiError(400, "LoginError : User login Error")
  }
  // check user type
  if(req.type === "Employee"){

  }
  else if(req.type === "Candidate"){

  }
})