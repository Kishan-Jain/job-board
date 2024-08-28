/**
 * check connection
 * send connection request
 * responce in connection request
 * breack connection
 */

import AsyncHandler from "../utils/AsyncHandler.js"
import ApiError from "../utils/ApiError.js"
import ApiResponce from "../utils/ApiResponce.js"


export const checkConnectionStatus = AsyncHandler(async (req, res) => {
  /**
   * check user is login
   * check secondUserId received from params
   * check secondUserId availabel in user connection array
   * return message with responce
   */
})

export const sendConnectionRequest = AsyncHandler(async (req, res) => {
  /**
   * check user is login
   * check secondUserId recieved from params
   * check user and secondUser type
   * set second user id in user connection array with pending status
   * set first user id in second user connectoin request array for responce
   * return message with responce
   */
})

export const responceConnection = AsyncHandler(async (req, res) => {
  /**
   * check user is login
   * check secondUserId recieved from params
   * check match secondUser id to connection request array
   * check user and secondUser type
   * set second user id in user connection array
   * remove first user id from second user connection request array and set first user id in second user connectoin array with connected
   * return message with responce
   */
})

export const breackConnection = AsyncHandler(async (req, res) => {
  /**
   * check user is login
   * check secondUserId received from params
   * check both user type
   * check users is connected
   * remove userIds from user connection array
   * return message with responce
   */
})

/**
 * check following
 * check followers
 * start following
 * stop following
 * remove followers
 */

export const checkFollowing = AsyncHandler(async (req, res) => {
  /**
   * check user is login
   * check secondUserId received from params
   * check second userId in user following array
   * 
   */
})

export const checkFollowers = AsyncHandler(async (req, res) => {
  /**
   * check user is login
   * check secondUserId received from params
   * check second userId in user followers array
   * return message
   */
})

export const startFollowing = AsyncHandler(async (req, res) => {
  /**
   * check user is login
   * check secondUserId received from params
   * set secondUserId in user following array and firstUserId in user followers array
   * return massage and responce
   */
})

export const stopFollowing = AsyncHandler(async (req, res) => {
  /**
   * check user is login
   * check secondUserId received from params
   * check secondUserId exits in user floowing array
   * remove secondUserId in user following array and firstUserId in user followers array
   * return message and responce
   */
})

export const removeFollowers = AsyncHandler(async (req, res) => {
  /**
   *  * check user is login
   * check secondUserId received from params
   * check secondUserId exits in user followers array
   * remove secondUserId in user followers array and firstUserId in user following array
   * return message and responce
   */
})