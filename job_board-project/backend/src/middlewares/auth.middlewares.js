/**
 * check user not login
 * check user already login
 */

import AsyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js"
import jwt from "jsonwebtoken"
import Employee from "../models/empoleeyes.models.js"
import Candidate from "../models/candidates.models.js";
import {accessTokenCookieOption} from "../constants.js"

export const isLogin = AsyncHandler(async (req, res, next) => {
  /**
   * if user is login, then accessToken and refreshToken already available in cookies
   * if accessToken not available, so regenrate it.
   * decode accessToken and store data on request parameter and next function call  
   */
  if(!req.cookies["refreshToken"]){
    throw new ApiError(409, "loginError : Refresh token not available, please login first")
  }

  let decodeRefreshToken;
  try {
    decodeRefreshToken = await jwt.verify(
      req.cookies["refreshToken"],
      process.env.REFRESH_TOKEN_SECRET_KEY
    )
  } catch (error) {
    throw new ApiError(500, `jwtError : ${error.message || "unable to decode refresh token" }`)
  }
  if(!decodeRefreshToken){
    throw new ApiError(409, "loginError : Refresh token not valid, please clear cookie and login again")
  }
  
  const userType = decodeRefreshToken?.userType
 
  if(!req.cookies["accessToken"]){
    if(userType === "Employee"){
      try {
        req.cookie("accessToken", await Employee.findById(decodeRefreshToken._id).generateAccessToken(), accessTokenCookieOption)
      } catch (error) {
        throw new ApiError(500, `DBError : ${error.message || "unable to generate accessToken"}`)
      }
    } else if(userType === "Candidate"){
      try {
        req.cookie("accessToken", await Candidate.findById(decodeRefreshToken._id).generateAccessToken(), accessTokenCookieOption)
      } catch (error) {
        throw new ApiError(500, `DBError : ${error.message || "unable to generate accessToken"}`)
      }
    }
  } 

  let decodeAccessToken;
  try {
    decodeAccessToken = await jwt.verify(
      req.cookies["accessToken"],
      process.env.ACCESS_TOKEN_SECRET_KEY
    )
  } catch (error) {
    throw new ApiError(500, `jwtError : ${error.message || "unable to decode accessToken"}`)
    
  }
  if(decodeAccessToken){
    throw new ApiError(409, `jwtError : Access token not valid, please clear cookie and login again`)
  }

  req.userId = decodeAccessToken._id
  req.userType = decodeAccessToken.userType
  next()
})

export const ifAlreadyLogin = AsyncHandler(async (req, res, next) => {
  /**
   * chack user not login, if accessToken and refreshTokene available in cookies, so throw error
   * either call next function
   */
  if(req.cookies["refreshToken"]){
    throw new ApiError(500, "loginError : user is already login, please logout or clear cookies")
  }
  next()
})