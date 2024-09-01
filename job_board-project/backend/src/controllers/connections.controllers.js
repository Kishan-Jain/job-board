/**
 * check connection
 * send connection request
 * responce in connection request
 * breack connection
 */

import AsyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponce from "../utils/ApiResponce.js";

export const checkConnectionStatus = AsyncHandler(async (req, res) => {
  /**
   * check user is login
   * check secondUserId received from params
   * check secondUserId availabel in user connection array
   * return message with responce
   */
  // check user login
  if (!req.userId) {
    throw new ApiError(400, "LoginError : Not login, please login first");
  }
  if (!req.userType) {
    throw new ApiError(
      409,
      "LoginError : UserType not received, pleace clear cookie and login again"
    );
  }
  if (!req.params?.userId) {
    throw new ApiError(404, "DataError : UserId not received from params");
  }
  if (req.params?.userId !== req.userId) {
    throw new ApiError(409, "ParamsError : Unauthorize Access");
  }
  if (!req.params?.userType) {
    throw new ApiError(404, "DataError : UserType not received from params");
  }
  if (req.params?.userType !== req.userType) {
    throw new ApiError(409, "paramsError : Unauthorize Access");
  }
  if (!req.params?.secondUser) {
    throw new ApiError(
      404,
      "DataError : Second userId not received from params"
    );
  }
  if (req.userType === "Employee") {
    
  } else if (req.userType === "Candidate") {
  }
});

export const sendConnectionRequest = AsyncHandler(async (req, res) => {
  /**
   * check user is login
   * check secondUserId recieved from params
   * check user and secondUser type
   * set second user id in user connection array with pending status
   * set first user id in second user connectoin request array for responce
   * return message with responce
   */
  // check user login
  if (!req.userId) {
    throw new ApiError(400, "LoginError : Not login, please login first");
  }
  if (!req.userType) {
    throw new ApiError(
      409,
      "LoginError : UserType not received, pleace clear cookie and login again"
    );
  }
  if (!req.params?.userId) {
    throw new ApiError(404, "DataError : UserId not received from params");
  }
  if (req.params?.userId !== req.userId) {
    throw new ApiError(409, "ParamsError : Unauthorize Access");
  }
  if (!req.params?.userType) {
    throw new ApiError(404, "DataError : UserType not received from params");
  }
  if (req.params?.userType !== req.userType) {
    throw new ApiError(409, "paramsError : Unauthorize Access");
  }
  if (!req.params?.secondUser) {
    throw new ApiError(
      404,
      "DataError : Second userId not received from params"
    );
  }
  if (req.userType === "Employee") {
  } else if (req.userType === "Candidate") {
  }
});

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
  // check user login
  if (!req.userId) {
    throw new ApiError(400, "LoginError : Not login, please login first");
  }
  if (!req.userType) {
    throw new ApiError(
      409,
      "LoginError : UserType not received, pleace clear cookie and login again"
    );
  }
  if (!req.params?.userId) {
    throw new ApiError(404, "DataError : UserId not received from params");
  }
  if (req.params?.userId !== req.userId) {
    throw new ApiError(409, "ParamsError : Unauthorize Access");
  }
  if (!req.params?.userType) {
    throw new ApiError(404, "DataError : UserType not received from params");
  }
  if (req.params?.userType !== req.userType) {
    throw new ApiError(409, "paramsError : Unauthorize Access");
  }
  if (!req.params?.secondUser) {
    throw new ApiError(
      404,
      "DataError : Second userId not received from params"
    );
  }
  if (req.userType === "Employee") {
  } else if (req.userType === "Candidate") {
  }
});

export const breackConnection = AsyncHandler(async (req, res) => {
  /**
   * check user is login
   * check secondUserId received from params
   * check both user type
   * check users is connected
   * remove userIds from user connection array
   * return message with responce
   */
  // check user login
  if (!req.userId) {
    throw new ApiError(400, "LoginError : Not login, please login first");
  }
  if (!req.userType) {
    throw new ApiError(
      409,
      "LoginError : UserType not received, pleace clear cookie and login again"
    );
  }
  if (!req.params?.userId) {
    throw new ApiError(404, "DataError : UserId not received from params");
  }
  if (req.params?.userId !== req.userId) {
    throw new ApiError(409, "ParamsError : Unauthorize Access");
  }
  if (!req.params?.userType) {
    throw new ApiError(404, "DataError : UserType not received from params");
  }
  if (req.params?.userType !== req.userType) {
    throw new ApiError(409, "paramsError : Unauthorize Access");
  }
  if (!req.params?.secondUser) {
    throw new ApiError(
      404,
      "DataError : Second userId not received from params"
    );
  }
  if (req.userType === "Employee") {
  } else if (req.userType === "Candidate") {
  }
});

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
  // check user login
  if (!req.userId) {
    throw new ApiError(400, "LoginError : Not login, please login first");
  }
  if (!req.userType) {
    throw new ApiError(
      409,
      "LoginError : UserType not received, pleace clear cookie and login again"
    );
  }
  if (!req.params?.userId) {
    throw new ApiError(404, "DataError : UserId not received from params");
  }
  if (req.params?.userId !== req.userId) {
    throw new ApiError(409, "ParamsError : Unauthorize Access");
  }
  if (!req.params?.userType) {
    throw new ApiError(404, "DataError : UserType not received from params");
  }
  if (req.params?.userType !== req.userType) {
    throw new ApiError(409, "paramsError : Unauthorize Access");
  }
  if (!req.params?.secondUser) {
    throw new ApiError(
      404,
      "DataError : Second userId not received from params"
    );
  }
  if (req.userType === "Employee") {
  } else if (req.userType === "Candidate") {
  }
});

export const checkFollowers = AsyncHandler(async (req, res) => {
  /**
   * check user is login
   * check secondUserId received from params
   * check second userId in user followers array
   * return message
   */
  // check user login
  if (!req.userId) {
    throw new ApiError(400, "LoginError : Not login, please login first");
  }
  if (!req.userType) {
    throw new ApiError(
      409,
      "LoginError : UserType not received, pleace clear cookie and login again"
    );
  }
  if (!req.params?.userId) {
    throw new ApiError(404, "DataError : UserId not received from params");
  }
  if (req.params?.userId !== req.userId) {
    throw new ApiError(409, "ParamsError : Unauthorize Access");
  }
  if (!req.params?.userType) {
    throw new ApiError(404, "DataError : UserType not received from params");
  }
  if (req.params?.userType !== req.userType) {
    throw new ApiError(409, "paramsError : Unauthorize Access");
  }
  if (!req.params?.secondUser) {
    throw new ApiError(
      404,
      "DataError : Second userId not received from params"
    );
  }
  if (req.userType === "Employee") {
  } else if (req.userType === "Candidate") {
  }
});

export const startFollowing = AsyncHandler(async (req, res) => {
  /**
   * check user is login
   * check secondUserId received from params
   * set secondUserId in user following array and firstUserId in user followers array
   * return massage and responce
   */
  // check user login
  if (!req.userId) {
    throw new ApiError(400, "LoginError : Not login, please login first");
  }
  if (!req.userType) {
    throw new ApiError(
      409,
      "LoginError : UserType not received, pleace clear cookie and login again"
    );
  }
  if (!req.params?.userId) {
    throw new ApiError(404, "DataError : UserId not received from params");
  }
  if (req.params?.userId !== req.userId) {
    throw new ApiError(409, "ParamsError : Unauthorize Access");
  }
  if (!req.params?.userType) {
    throw new ApiError(404, "DataError : UserType not received from params");
  }
  if (req.params?.userType !== req.userType) {
    throw new ApiError(409, "paramsError : Unauthorize Access");
  }
  if (!req.params?.secondUser) {
    throw new ApiError(
      404,
      "DataError : Second userId not received from params"
    );
  }
  if (req.userType === "Employee") {
  } else if (req.userType === "Candidate") {
  }
});

export const stopFollowing = AsyncHandler(async (req, res) => {
  /**
   * check user is login
   * check secondUserId received from params
   * check secondUserId exits in user floowing array
   * remove secondUserId in user following array and firstUserId in user followers array
   * return message and responce
   */
  // check user login
  if (!req.userId) {
    throw new ApiError(400, "LoginError : Not login, please login first");
  }
  if (!req.userType) {
    throw new ApiError(
      409,
      "LoginError : UserType not received, pleace clear cookie and login again"
    );
  }
  if (!req.params?.userId) {
    throw new ApiError(404, "DataError : UserId not received from params");
  }
  if (req.params?.userId !== req.userId) {
    throw new ApiError(409, "ParamsError : Unauthorize Access");
  }
  if (!req.params?.userType) {
    throw new ApiError(404, "DataError : UserType not received from params");
  }
  if (req.params?.userType !== req.userType) {
    throw new ApiError(409, "paramsError : Unauthorize Access");
  }
  if (!req.params?.secondUser) {
    throw new ApiError(
      404,
      "DataError : Second userId not received from params"
    );
  }
  if (req.userType === "Employee") {
  } else if (req.userType === "Candidate") {
  }
});

export const removeFollowers = AsyncHandler(async (req, res) => {
  /**
   *  * check user is login
   * check secondUserId received from params
   * check secondUserId exits in user followers array
   * remove secondUserId in user followers array and firstUserId in user following array
   * return message and responce
   */
  // check user login
  if (!req.userId) {
    throw new ApiError(400, "LoginError : Not login, please login first");
  }
  if (!req.userType) {
    throw new ApiError(
      409,
      "LoginError : UserType not received, pleace clear cookie and login again"
    );
  }
  if (!req.params?.userId) {
    throw new ApiError(404, "DataError : UserId not received from params");
  }
  if (req.params?.userId !== req.userId) {
    throw new ApiError(409, "ParamsError : Unauthorize Access");
  }
  if (!req.params?.userType) {
    throw new ApiError(404, "DataError : UserType not received from params");
  }
  if (req.params?.userType !== req.userType) {
    throw new ApiError(409, "paramsError : Unauthorize Access");
  }
  if (!req.params?.secondUser) {
    throw new ApiError(
      404,
      "DataError : Second userId not received from params"
    );
  }
  if (req.userType === "Employee") {
  } else if (req.userType === "Candidate") {
  }
});
