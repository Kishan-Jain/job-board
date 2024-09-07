/**
 * Get all followers 
 * Get all following
 * remove to followed list
 * remove to folloeing list
 * check followed
 * check following
 * add to following and send follow request
 * responce on follow request
 * cancel following request
 */

import AsyncHandler from "../utils/AsyncHandler.js";
import ApiResponce from "../utils/ApiResponce.js"
import ApiError from "../utils/ApiError.js"
import Employee from "../models/empoleeyes.models.js";
import Candidate from "../models/candidates.models.js";
import { connection } from "mongoose";

const getAllFollowingList = AsyncHandler(async (req, res) => {
  /**
   * check user is logged in
   * validate user details
   * reteive follow list
   * return responce
   */

  // check user is login
  if(!req.userId){

  }
  if (req.userId !== req.params?.userId){

  }
  if(!req.type){

  }
  // check user type
  if(req.type === "Employee"){
    let searchEmployee
    try {
      searchEmployee = await Employee.findById(req.userId).select("-password")
    } catch (error) {
      
    }
    if(!searchEmployee){

    }
    const followingList = searchEmployee.followingList
    if(!followingList){

    }
    return res
    .status(200)
    .json(new ApiResponce(200, followingList, "successMessage : All following data received"))
    
  }
  else if(req.type === "Candidate"){
    let serchCandidate
    try {
      serchCandidate = await Candidate.findById(req.userId).select("-password")
    } catch (error) {
      
    }
    if(!serchCandidate){

    }
    const followingList = serchCandidate.followingList
    if(!followingList){

    }
    return res
    .status(200)
    .json(new ApiResponce(200, followingList, "successMessage : All following data received"))
  }
})

const getAllFollowersList = AsyncHandler(async (req, res) => {
  /**
   * check user is logged in
   * validate user details
   * reteive following list
   * return responce
   */
  
  // check user is login
  if(!req.userId){

  }
  if (req.userId !== req.params?.userId){

  }
  if(!req.type){

  }
  // check user type
  if(req.type === "Employee"){
    let searchEmployee
    try {
      searchEmployee = await Employee.findById(req.userId).select("-password")
    } catch (error) {
      
    }
    if(!searchEmployee){

    }
    const followersList = searchEmployee.followersList
    if(!followersList){

    }
    return res
    .status(200)
    .json(new ApiResponce(200, followersList, "successMessage : All following data received"))
    
  }
  else if(req.type === "Candidate"){
    let serchCandidate
    try {
      serchCandidate = await Candidate.findById(req.userId).select("-password")
    } catch (error) {
      
    }
    if(!serchCandidate){

    }
    const followersList = serchCandidate.followersList
    if(!followersList){

    }
    return res
    .status(200)
    .json(new ApiResponce(200, followersList, "successMessage : All following data received"))
  }
})

const removeToFollowedList = AsyncHandler(async (req, res) => {
  /**
   * check user is logged in
   * validate user details
   * check followed user id received from params
   * remove to followList and second user following list
   * return responce
   */
  
  // check user is login
  if(!req.userId){

  }
  if (req.userId !== req.params?.userId){

  }
  if(!req.type){

  }
  if (!(req.params.secondUserId && req.params?.secondUserType)){

  }
  // check user type
  if(req.type === "Employee"){
    let searchEmployee
    try {
      searchEmployee = await Employee.findById(req.userId).select("-password")
    } catch (error) {
      
    }
    if(!searchEmployee){

    }

    if(!(searchEmployee.followersList.find(connection => connection.userId === req.params?.secondUserId ))){

    }
    let searchSecondUser
    if(req.params?.secondUserType === "Employee"){
      searchSecondUser = await Employee.findById(req.params.secondUserId).select("followersList followingList")
    }
    else if(req.params?.secondUserType === "Candidate"){
      searchSecondUser = await Candidate.findById(req.params.secondUserId).select("followersList followingList")
    }
    if(!searchSecondUser){

    }
    if(!(searchSecondUser.followingList.find(connection => connection.userId === req.userId))){

    }
    // remove user id in listed
    try {
      const newFollowersList = searchEmployee.followersList.filter(connection => connection.userId !== req.params.secondUserId)
      searchEmployee.followersList = newFollowersList
      await searchEmployee.save({validateBeforeSave : true})
      
    } catch (error) {
      
    }
    try {
      const newFollowingList = searchSecondUser.followingList.filter(connection => connection.userId !== req.userId)
      searchSecondUser.followingList = newFollowingList
      await searchSecondUser.save({validateBeforeSave : true})
      
    } catch (error) {
      
    }
    let updateSearchEmployee
    try {
      updateSearchEmployee = await Employee.findById(searchEmployee).select("followingList followersList")
    } catch (error) {
      
    }
    if(!updateSearchEmployee){

    }
    let updateSearchSecondUser
    if(req.params?.secondUserType === "Employee"){
      try {
        updateSearchSecondUser = await Employee.findById(searchSecondUser).select("followingList followersList")
      } catch (error) {
        
      }
    }
    else if(req.params?.secondUserType === "Candidate"){
      try {
        updateSearchSecondUser = await Candidate.findById(searchSecondUser).select("followingList followersList")
      } catch (error) {
        
      }   
    }
    if(!updateSearchSecondUser){

    }
    return res
    .status(200)
    .json(new ApiResponce(200, [updateSearchEmployee, updateSearchSecondUser], "successMessage : All following data received"))
  }
  else if(req.type === "Candidate"){
    let searchCandidate
    try {
      searchCandidate = await Candidate.findById(req.userId).select("-password")
    } catch (error) {
      
    }
    if(!searchCandidate){

    }

    if(!(searchCandidate.followersList.find(connection => connection.userId === req.params?.secondUserId ))){

    }
    let searchSecondUser
    if(req.params?.secondUserType === "Employee"){
      searchSecondUser = await Employee.findById(req.params.secondUserId).select("followersList followingList")
    }
    else if(req.params?.secondUserType === "Candidate"){
      searchSecondUser = await Candidate.findById(req.params.secondUserId).select("followersList followingList")
    }
    if(!searchSecondUser){

    }
    if(!(searchSecondUser.followingList.find(connection => connection.userId === req.userId))){

    }
    // remove user id in listed
    try {
      const newFollowersList = searchCandidate.followersList.filter(connection => connection.userId !== req.params.secondUserId)
      searchCandidate.followersList = newFollowersList
      await searchCandidate.save({validateBeforeSave : true})
      
    } catch (error) {
      
    }
    try {
      const newFollowingList = searchSecondUser.followingList.filter(connection => connection.userId !== req.userId)
      searchSecondUser.followingList = newFollowingList
      await searchSecondUser.save({validateBeforeSave : true})
      
    } catch (error) {
      
    }
    let updateSearchCandidate
    try {
      updateSearchCandidate = await Employee.findById(searchCandidate).select("followingList followersList")
    } catch (error) {
      
    }
    if(!updateSearchCandidate){

    }
    let updateSearchSecondUser
    if(req.params?.secondUserType === "Employee"){
      try {
        updateSearchSecondUser = await Employee.findById(searchSecondUser).select("followingList followersList")
      } catch (error) {
        
      }
    }
    else if(req.params?.secondUserType === "Candidate"){
      try {
        updateSearchSecondUser = await Candidate.findById(searchSecondUser).select("followingList followersList")
      } catch (error) {
        
      }   
    }
    if(!updateSearchSecondUser){

    }
    return res
    .status(200)
    .json(new ApiResponce(200, [updateSearchCandidate, updateSearchSecondUser], "successMessage : All following data received"))
  }
})

const removeToFollowingList = AsyncHandler(async (req, res) => {
    /**
     * check user is logged in
     * validate user details
     * check following user id
     * remove to following list and second user followed list
     * return responce
     */
    
  // check user is login
  if(!req.userId){

  }
  if (req.userId !== req.params?.userId){

  }
  if(!req.type){

  }
  // check user type
  if(req.type === "Employee"){
    let searchEmployee
    try {
      searchEmployee = await Employee.findById(req.userId).select("-password")
    } catch (error) {
      
    }
    if(!searchEmployee){

    }

    if(!(searchEmployee.followingList.find(connection => connection.userId === req.params?.secondUserId ))){

    }
    let searchSecondUser
    if(req.params?.secondUserType === "Employee"){
      searchSecondUser = await Employee.findById(req.params.secondUserId).select("followersList followingList")
    }
    else if(req.params?.secondUserType === "Candidate"){
      searchSecondUser = await Candidate.findById(req.params.secondUserId).select("followersList followingList")
    }
    if(!searchSecondUser){

    }
    if(!(searchSecondUser.followersList.find(connection => connection.userId === req.userId))){

    }
    // remove user id in listed
    try {
      const newFollowingList = searchEmployee.followingList.filter(connection => connection.userId !== req.params.secondUserId)
      searchEmployee.followingList = newFollowingList
      await searchEmployee.save({validateBeforeSave : true})
      
    } catch (error) {
      
    }
    try {
      const newFollowersList = searchSecondUser.followersList.filter(connection => connection.userId !== req.userId)
      searchSecondUser.followersList = newFollowersList
      await searchSecondUser.save({validateBeforeSave : true})
      
    } catch (error) {
      
    }
    let updateSearchEmployee
    try {
      updateSearchEmployee = await Employee.findById(searchEmployee).select("followingList followersList")
    } catch (error) {
      
    }
    if(!updateSearchEmployee){

    }
    let updateSearchSecondUser
    if(req.params?.secondUserType === "Employee"){
      try {
        updateSearchSecondUser = await Employee.findById(searchSecondUser).select("followingList followersList")
      } catch (error) {
        
      }
    }
    else if(req.params?.secondUserType === "Candidate"){
      try {
        updateSearchSecondUser = await Candidate.findById(searchSecondUser).select("followingList followersList")
      } catch (error) {
        
      }   
    }
    if(!updateSearchSecondUser){

    }
    return res
    .status(200)
    .json(new ApiResponce(200, [updateSearchEmployee, updateSearchSecondUser], "successMessage : All following data received"))
  }
  else if(req.type === "Candidate"){
    let searchCandidate
    try {
      searchCandidate = await Candidate.findById(req.userId).select("-password")
    } catch (error) {
      
    }
    if(!searchCandidate){

    }

    if(!(searchCandidate.followingList.find(connection => connection.userId === req.params?.secondUserId ))){

    }
    let searchSecondUser
    if(req.params?.secondUserType === "Employee"){
      searchSecondUser = await Employee.findById(req.params.secondUserId).select("followersList followingList")
    }
    else if(req.params?.secondUserType === "Candidate"){
      searchSecondUser = await Candidate.findById(req.params.secondUserId).select("followersList followingList")
    }
    if(!searchSecondUser){

    }
    if(!(searchSecondUser.followersList.find(connection => connection.userId === req.userId))){

    }
    // remove user id in listed
    try {
      const newFollowingList = searchCandidate.followingList.filter(connection => connection.userId !== req.params.secondUserId)
      searchCandidate.followingList = newFollowingList
      await searchCandidate.save({validateBeforeSave : true})
      
    } catch (error) {
      
    }
    try {
      const newFollowersList = searchSecondUser.followersList.filter(connection => connection.userId !== req.userId)
      searchSecondUser.followersList = newFollowersList
      await searchSecondUser.save({validateBeforeSave : true})
      
    } catch (error) {
      
    }
    let updateSearchCandidate
    try {
      updateSearchCandidate = await Employee.findById(searchCandidate).select("followingList followersList")
    } catch (error) {
      
    }
    if(!updateSearchCandidate){

    }
    let updateSearchSecondUser
    if(req.params?.secondUserType === "Employee"){
      try {
        updateSearchSecondUser = await Employee.findById(searchSecondUser).select("followingList followersList")
      } catch (error) {
        
      }
    }
    else if(req.params?.secondUserType === "Candidate"){
      try {
        updateSearchSecondUser = await Candidate.findById(searchSecondUser).select("followingList followersList")
      } catch (error) {
        
      }   
    }
    if(!updateSearchSecondUser){

    }
    return res
    .status(200)
    .json(new ApiResponce(200, [updateSearchCandidate, updateSearchSecondUser], "successMessage : All following data received"))
  }
})

const checkFollowed = AsyncHandler(async (req, res) => {
  /**
   * check user is logged in
   * validate user details
   * check second user id in followed list
   * return responce
   */
  
  // check user is login
  if(!req.userId){

  }
  if (req.userId !== req.params?.userId){

  }
  if(!req.type){

  }
  // check user type
  if(req.type === "Employee"){

  }
  else if(req.type === "Candidate"){

  }
})

const checkFollowing = AsyncHandler(async (req, res) => {
  /**
   * check user is logged in
   * validate user details
   * check second user id in following list
   * return responce
   */
  
  // check user is login
  if(!req.userId){

  }
  if (req.userId !== req.params?.userId){

  }
  if(!req.type){

  }
  // check user type
  if(req.type === "Employee"){

  }
  else if(req.type === "Candidate"){

  }
})

const sendFollowRequest = AsyncHandler(async (req, res) => {
  /**
   * check user is logged in
   * validate user details
   * check second user id and type from params
   * add second user id in user followind request list and add first user id in second user followed request list
   * return responce
   */
  
  // check user is login
  if(!req.userId){

  }
  if (req.userId !== req.params?.userId){

  }
  if(!req.type){

  }
  // check user type
  if(req.type === "Employee"){

  }
  else if(req.type === "Candidate"){

  }
})

const responceOnFollowRequest = AsyncHandler(async (req, res) => {
  /**
   * check user is logged in
   * validate user details
   * check second user id and type from params
   * check userId available in following request list
   * resonce in it
   * if accept request, add second userId in followind list and add first userId in followed list
   * if reject ewruest, remove userId in following request list and first userId in followed requst list
   * return responce
   */
  
  // check user is login
  if(!req.userId){

  }
  if (req.userId !== req.params?.userId){

  }
  if(!req.type){

  }
  // check user type
  if(req.type === "Employee"){

  }
  else if(req.type === "Candidate"){

  }
})

const cancelFollowingRequst = AsyncHandler(async (req, res) => {
  /**
   * check user is logged in
   * validate user details
   * check second user id and type from params
   * check second user id available in following request list
   * remove second user id from following request list and first user id from second folloed request list
   * return responce
   */
  
  // check user is login
  if(!req.userId){

  }
  if (req.userId !== req.params?.userId){

  }
  if(!req.type){

  }
  // check user type
  if(req.type === "Employee"){

  }
  else if(req.type === "Candidate"){

  }
})
