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
import ApiResponce from "../utils/ApiResponce.js";
import ApiError from "../utils/ApiError.js";
import Employee from "../models/empoleeyes.models.js";
import Candidate from "../models/candidates.models.js";

export const getAllFollowingData = AsyncHandler(async (req, res) => {
  /**
   * check user is logged in
   * validate user details
   * reteive follow list
   * return responce
   */

  // check user is login
  if (!req.userId) {
    throw new ApiError(400, "LoginError : User not logged in");
  }
  if (!req.type) {
    throw new ApiError(400, "LoginError : User login Error");
  }
  if (req.userType !== req.params?.userType) {
    throw new ApiError(401, "AuthError : User not authorize");
  }
  if (req.userType !== req.params?.userType) {
    throw new ApiError(401, "AuthError : User not authorize");
  }
  // check user type
  if (req.type === "Employee") {
    // search Employee Datils
    let searchEmployee;
    try {
      searchEmployee = await Employee.findById(req.userId).select("-password");
    } catch (error) {
      throw new ApiError(
        500,
        `DbError : ${error.message || "Unable to find Employee"} `
      );
    }
    if (!searchEmployee) {
      throw new ApiError(404, "DataError : Employee not found");
    }
    // reteive following list from Employee
    const followingList = searchEmployee.followingList;
    if (!followingList) {
      throw new ApiError(404, "DbError : No any follawing list find");
    }
    // return responce with following list
    return res
      .status(200)
      .json(
        new ApiResponce(
          200,
          followingList,
          "successMessage : All following data received"
        )
      );
  } else if (req.type === "Candidate") {
    // search Candidate Datils
    let searchCandidate;
    try {
      searchCandidate = await Candidate.findById(req.userId).select(
        "-password"
      );
    } catch (error) {
      throw new ApiError(
        500,
        `DbError : ${error.message || "Unable to find Candidate"}`
      );
    }
    if (!searchCandidate) {
      throw new ApiError(404, "DataError : Candidate not found");
    }
    // reti
    const followingList = searchCandidate.followingList;
    if (!followingList) {
      throw new ApiError(404, "DbError : No any follwing list find");
    }
    return res
      .status(200)
      .json(
        new ApiResponce(
          200,
          followingList,
          "successMessage : All following data received"
        )
      );
  }
});

export const getAllFollowersData = AsyncHandler(async (req, res) => {
  /**
   * check user is logged in
   * validate user details
   * reteive following list
   * return responce
   */

  // check user is login
  if (!req.userId) {
    throw new ApiError(400, "LoginError : User not logged in");
  }
  if (!req.type) {
    throw new ApiError(400, "LoginError : User login Error");
  }
  if (req.userId !== req.params?.userId) {
    throw new ApiError(401, "AuthError : User not authorize");
  }
  if (req.userType !== req.params?.userType) {
    throw new ApiError(401, "AuthError : User not authorize");
  }
  // check user type
  if (req.type === "Employee") {
    // search Employee Datils
    let searchEmployee;
    try {
      searchEmployee = await Employee.findById(req.userId).select("-password");
    } catch (error) {
      throw new ApiError(
        500,
        `DbError : ${error.message || "Unable to find Employee"}`
      );
    }
    if (!searchEmployee) {
      throw new ApiError(404, "DataError : Employee not fonud");
    }
    const followersList = searchEmployee.followersList;
    if (!followersList) {
      throw new ApiError(400, "DbError : Not received any followers list");
    }
    return res
      .status(200)
      .json(
        new ApiResponce(
          200,
          followersList,
          "successMessage : All followers data received"
        )
      );
  } else if (req.type === "Candidate") {
    // search Candidate Datils
    let searchCandidate;
    try {
      searchCandidate = await Candidate.findById(req.userId).select(
        "-password"
      );
    } catch (error) {
      throw new ApiError(
        500,
        `DbError : ${error.message || "Unable to find candidate "}`
      );
    }
    if (!searchCandidate) {
      throw new ApiError(404, "DataError : Candidate not found");
    }
    const followersList = searchCandidate.followersList;
    if (!followersList) {
      throw new ApiError(400, "DbError : Not received any followers list");
    }
    return res
      .status(200)
      .json(
        new ApiResponce(
          200,
          followersList,
          "successMessage : All followers data received"
        )
      );
  }
});

export const removeToFollowedList = AsyncHandler(async (req, res) => {
  /**
   * check user is logged in
   * validate user details
   * check followed user id received from params
   * remove to followList and second user following list
   * return responce
   */

  // check user is login
  if (!req.userId) {
    throw new ApiError(400, "LoginError : User not logged in");
  }
  if (!req.type) {
    throw new ApiError(400, "LoginError : User login Error");
  }
  if (req.userId !== req.params?.userId) {
    throw new ApiError(401, "AuthError : User not authorize");
  }
  if (req.userType !== req.params?.userType) {
    throw new ApiError(401, "AuthError : User not authorize");
  }
  if (!(req.params.secondUserId && req.params?.secondUserType)) {
    throw new ApiError(404, "DataError : No any params received");
  }
  // check user type
  if (req.type === "Employee") {
    // search Employee Datils
    let searchEmployee;
    try {
      searchEmployee = await Employee.findById(req.userId).select("-password");
    } catch (error) {
      throw new ApiError(
        500,
        `DbError : ${error.message || "Unable to find Employee"}`
      );
    }
    if (!searchEmployee) {
      throw new ApiError(404, "DataError : Employee not find");
    }
    if (
      !searchEmployee.followersList.find(
        (userObject) => userObject.userId === req.params?.secondUserId
      )
    ) {
      throw new ApiError(
        400,
        "DataError : giver user id not exits in user followers list"
      );
    }
    let searchSecondUser;
    if (req.params?.secondUserType === "Employee") {
      try {
        searchSecondUser = await Employee.findById(
          req.params.secondUserId
        ).select("followersList followingList");
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${error.message || "Unable to find second user"}`
        );
      }
    } else if (req.params?.secondUserType === "Candidate") {
      try {
        searchSecondUser = await Candidate.findById(
          req.params.secondUserId
        ).select("followersList followingList");
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${error.message || "Unable to find second user"}`
        );
      }
    }
    if (!searchSecondUser) {
      throw new ApiError(404, "DataError : Second user id not correct");
    }
    if (
      !searchSecondUser.followingList.find(
        (userObject) => userObject.userId === req.userId
      )
    ) {
      throw new ApiError(
        404,
        "DataError : userId not exits in second user following list"
      );
    }
    // remove user id in listed
    try {
      const newFollowersList = searchEmployee.followersList.filter(
        (userObject) => userObject.userId !== req.params.secondUserId
      );
      searchEmployee.followersList = newFollowersList;
      await searchEmployee.save({ validateBeforeSave: true });
    } catch (error) {
      throw new ApiError(
        500,
        `DbError : ${error.message || "unable to update user followers list"}`
      );
    }
    try {
      const newFollowingList = searchSecondUser.followingList.filter(
        (userObject) => userObject.userId !== req.userId
      );
      searchSecondUser.followingList = newFollowingList;
      await searchSecondUser.save({ validateBeforeSave: true });
    } catch (error) {
      throw new ApiError(
        500,
        `DbError : ${
          error.message || "unable to update second user following list"
        }`
      );
    }
    let updateSearchEmployee;
    try {
      updateSearchEmployee = await Employee.findById(
        searchEmployee?._id
      ).select("followingList followersList");
    } catch (error) {
      throw new ApiError(
        500,
        `DbError : ${error.message || "Unable to find Employee with new data"}`
      );
    }
    if (!updateSearchEmployee) {
      throw new ApiError(500, "DbError : Employee not updated");
    }
    let updateSearchSecondUser;
    if (req.params?.secondUserType === "Employee") {
      try {
        updateSearchSecondUser = await Employee.findById(
          searchSecondUser
        ).select("followingList followersList");
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${error.message || "Unable to find updated second user"}`
        );
      }
    } else if (req.params?.secondUserType === "Candidate") {
      try {
        updateSearchSecondUser = await Candidate.findById(
          searchSecondUser
        ).select("followingList followersList");
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${error.message || "Unable to find updated second user"}`
        );
      }
    }
    if (!updateSearchSecondUser) {
      throw new ApiError(404, "DbError : Second user not updated");
    }
    return res
      .status(200)
      .json(
        new ApiResponce(
          200,
          [updateSearchEmployee, updateSearchSecondUser],
          "successMessage : All following data received"
        )
      );
  } else if (req.type === "Candidate") {
    // search Candidate Datils
    let searchCandidate;
    try {
      searchCandidate = await Candidate.findById(req.userId).select(
        "-password"
      );
    } catch (error) {
      throw new ApiError(
        500,
        `DbError : ${error.message || "Unable to find Candidate"}`
      );
    }
    if (!searchCandidate) {
      throw new ApiError(404, "DbError : Candidate not found");
    }

    if (
      !searchCandidate.followersList.find(
        (userObject) => userObject.userId === req.params?.secondUserId
      )
    ) {
      throw new ApiError(400, "DBError : user followers list not reteived");
    }
    let searchSecondUser;
    if (req.params?.secondUserType === "Employee") {
      try {
        searchSecondUser = await Employee.findById(
          req.params.secondUserId
        ).select("followersList followingList");
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${error.message || "Unable to find second user"}`
        );
      }
    } else if (req.params?.secondUserType === "Candidate") {
      try {
        searchSecondUser = await Candidate.findById(
          req.params.secondUserId
        ).select("followersList followingList");
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${error.message || "Unable to find second user"}`
        );
      }
    }
    if (!searchSecondUser) {
      throw new ApiError(404, "DataError : sercond user Id not correct");
    }
    if (
      !searchSecondUser.followingList.find(
        (userObject) => userObject.userId === req.userId
      )
    ) {
      throw new ApiError(400, "DbError : second user following list not find");
    }
    // remove user id in listed
    try {
      const newFollowersList = searchCandidate.followersList.filter(
        (userObject) => userObject.userId !== req.params.secondUserId
      );
      searchCandidate.followersList = newFollowersList;
      await searchCandidate.save({ validateBeforeSave: true });
    } catch (error) {
      throw new ApiError(
        500,
        `DbError : ${error.message || "Unable to update user followers list"}`
      );
    }
    try {
      const newFollowingList = searchSecondUser.followingList.filter(
        (userObject) => userObject.userId !== req.userId
      );
      searchSecondUser.followingList = newFollowingList;
      await searchSecondUser.save({ validateBeforeSave: true });
    } catch (error) {
      throw new ApiError(
        500,
        `DbError : ${
          error.message || "Unable to update second user following list"
        }`
      );
    }
    let updateSearchCandidate;
    try {
      updateSearchCandidate = await Employee.findById(
        searchCandidate?._id
      ).select("followingList followersList");
    } catch (error) {
      throw new ApiError(
        500,
        `DbError : ${error.message || "Unable to find updated candidate"}`
      );
    }
    if (!updateSearchCandidate) {
      throw new ApiError(500, "DbError : Updated candidate not found");
    }
    let updateSearchSecondUser;
    if (req.params?.secondUserType === "Employee") {
      try {
        updateSearchSecondUser = await Employee.findById(
          searchSecondUser._id
        ).select("followingList followersList");
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${error.message || "Unable to find updated second user"}`
        );
      }
    } else if (req.params?.secondUserType === "Candidate") {
      try {
        updateSearchSecondUser = await Candidate.findById(
          searchSecondUser
        ).select("followingList followersList");
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${error.message || "Unable to find updated second user"}`
        );
      }
    }
    if (!updateSearchSecondUser) {
      throw new ApiError(500, "DbError : Update second user not found");
    }
    return res
      .status(200)
      .json(
        new ApiResponce(
          200,
          [updateSearchCandidate, updateSearchSecondUser],
          "successMessage : All following data received"
        )
      );
  }
});

export const removeToFollowingList = AsyncHandler(async (req, res) => {
  /**
   * check user is logged in
   * validate user details
   * check following user id
   * remove to following list and second user followed list
   * return responce
   */

  // check user is login
  if (!req.userId) {
    throw new ApiError(400, "LoginError : User not logged in");
  }
  if (!req.type) {
    throw new ApiError(400, "LoginError : User login Error");
  }
  if (req.userId !== req.params?.userId) {
    throw new ApiError(401, "AuthError : User not authorize");
  }
  if (req.userType !== req.params?.userType) {
    throw new ApiError(401, "AuthError : User not authorize");
  }
  if (!(req.params?.secondUserId && req.params?.secondUserType)) {
    throw new ApiError(404, "DataError : Parameters not received");
  }
  // check user type
  if (req.type === "Employee") {
    // search Employee Datils
    let searchEmployee;
    try {
      searchEmployee = await Employee.findById(req.userId).select("-password");
    } catch (error) {
      throw new ApiError(
        500,
        `DbError : ${error.message || "unable to find Employee"}`
      );
    }
    if (!searchEmployee) {
      throw new ApiError(404, "DbError : Employee not found");
    }

    if (
      !searchEmployee.followingList.find(
        (userObject) => userObject.userId === req.params?.secondUserId
      )
    ) {
      throw new ApiError(400, "DbError : Employee following list not reteived");
    }
    let searchSecondUser;
    if (req.params?.secondUserType === "Employee") {
      try {
        searchSecondUser = await Employee.findById(
          req.params.secondUserId
        ).select("followersList followingList");
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${error.message || "Unable to find second user"}`
        );
      }
    } else if (req.params?.secondUserType === "Candidate") {
      try {
        searchSecondUser = await Candidate.findById(
          req.params.secondUserId
        ).select("followersList followingList");
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${error.message || "Unable to find second user"}`
        );
      }
    }
    if (!searchSecondUser) {
      throw new ApiError(404, "DataError : Second user Id not connect");
    }
    if (
      !searchSecondUser.followersList.find(
        (userObject) => userObject.userId === req.userId
      )
    ) {
      throw new ApiError(
        404,
        "DataError : User id not exits in second user followers list"
      );
    }
    // remove user id in listed
    try {
      const newFollowingList = searchEmployee.followingList.filter(
        (userObject) => userObject.userId !== req.params.secondUserId
      );
      searchEmployee.followingList = newFollowingList;
      await searchEmployee.save({ validateBeforeSave: true });
    } catch (error) {
      throw new ApiError(
        500,
        `DbError : ${error.message || "Unable to update user following list"}`
      );
    }
    try {
      const newFollowersList = searchSecondUser.followersList.filter(
        (userObject) => userObject.userId !== req.userId
      );
      searchSecondUser.followersList = newFollowersList;
      await searchSecondUser.save({ validateBeforeSave: true });
    } catch (error) {
      throw new ApiError(
        500,
        `DbError : ${
          error.message || "Unable to update second user followers list"
        }`
      );
    }
    let updateSearchEmployee;
    try {
      updateSearchEmployee = await Employee.findById(
        searchEmployee?._id
      ).select("followingList followersList");
    } catch (error) {
      throw new ApiError(
        500,
        `DbError : ${error.message || "Unable to find updated user"}`
      );
    }
    if (!updateSearchEmployee) {
      throw new ApiError(500, "DbError : updated user not found");
    }
    let updateSearchSecondUser;
    if (req.params?.secondUserType === "Employee") {
      try {
        updateSearchSecondUser = await Employee.findById(
          searchSecondUser?._id
        ).select("followingList followersList");
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${error.message || "Unable to find updated second user"}`
        );
      }
    } else if (req.params?.secondUserType === "Candidate") {
      try {
        updateSearchSecondUser = await Candidate.findById(
          searchSecondUser?._id
        ).select("followingList followersList");
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${error.message || "Unable to find updated second user"}`
        );
      }
    }
    if (!updateSearchSecondUser) {
      throw new ApiError(500, "DbError : Updated second user not found");
    }
    return res
      .status(200)
      .json(
        new ApiResponce(
          200,
          [updateSearchEmployee, updateSearchSecondUser],
          "successMessage : All following data received"
        )
      );
  } else if (req.type === "Candidate") {
    // search Candidate Datils
    let searchCandidate;
    try {
      searchCandidate = await Candidate.findById(req.userId).select(
        "-password"
      );
    } catch (error) {
      throw new ApiError(
        500,
        `DbError : ${error.message || "Unable to find candidate"}`
      );
    }
    if (!searchCandidate) {
      throw new ApiError(404, "DBerror : Candidate not found");
    }

    if (
      !searchCandidate.followingList.find(
        (userObject) => userObject.userId === req.params?.secondUserId
      )
    ) {
      throw new ApiError(
        400,
        "DbError : second user id not exits in user following list"
      );
    }
    let searchSecondUser;
    if (req.params?.secondUserType === "Employee") {
      try {
        searchSecondUser = await Employee.findById(
          req.params.secondUserId
        ).select("followersList followingList");
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${error.message || "Unable to find second user"}`
        );
      }
    } else if (req.params?.secondUserType === "Candidate") {
      try {
        searchSecondUser = await Candidate.findById(
          req.params.secondUserId
        ).select("followersList followingList");
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${error.message || "Unable to find second user"}`
        );
      }
    }
    if (!searchSecondUser) {
      throw new ApiError(404, "DataError : Second user Id not correct");
    }
    if (
      !searchSecondUser.followersList.find(
        (userObject) => userObject.userId === req.userId
      )
    ) {
      throw new ApiError(
        404,
        "DataError : user Id not exits in second user followers list"
      );
    }
    // remove user id in listed
    try {
      const newFollowingList = searchCandidate.followingList.filter(
        (userObject) => userObject.userId !== req.params.secondUserId
      );
      searchCandidate.followingList = newFollowingList;
      await searchCandidate.save({ validateBeforeSave: true });
    } catch (error) {
      throw new ApiError(
        500,
        `DbError : ${error.message || "Unable to update user following list"}`
      );
    }
    try {
      const newFollowersList = searchSecondUser.followersList.filter(
        (userObject) => userObject.userId !== req.userId
      );
      searchSecondUser.followersList = newFollowersList;
      await searchSecondUser.save({ validateBeforeSave: true });
    } catch (error) {
      throw new ApiError(
        500,
        `DbError : ${
          error.message || "Unable to update second user followers list"
        }`
      );
    }
    let updateSearchCandidate;
    try {
      updateSearchCandidate = await Employee.findById(
        searchCandidate._id
      ).select("followingList followersList");
    } catch (error) {
      throw new ApiError(
        500,
        `DbError : ${error.message || "Unable to find updated user"}`
      );
    }
    if (!updateSearchCandidate) {
      throw new ApiError(500, "DbError : Updated User not found");
    }
    let updateSearchSecondUser;
    if (req.params?.secondUserType === "Employee") {
      try {
        updateSearchSecondUser = await Employee.findById(
          searchSecondUser._id
        ).select("followingList followersList");
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${error.message || "Unable to find updated second user"}`
        );
      }
    } else if (req.params?.secondUserType === "Candidate") {
      try {
        updateSearchSecondUser = await Candidate.findById(
          searchSecondUser._id
        ).select("followingList followersList");
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${error.message || "Unable to find updated second user"}`
        );
      }
    }
    if (!updateSearchSecondUser) {
      throw new ApiError(500, "DbError : Updated second user not found");
    }
    return res
      .status(200)
      .json(
        new ApiResponce(
          200,
          [updateSearchCandidate, updateSearchSecondUser],
          "successMessage : All following data received"
        )
      );
  }
});

export const checkFollowed = AsyncHandler(async (req, res) => {
  /**
   * check user is logged in
   * validate user details
   * check second user id in followed list
   * return responce
   */

  // check user is login
  if (!req.userId) {
    throw new ApiError(400, "LoginError : User not logged in");
  }
  if (!req.type) {
    throw new ApiError(400, "LoginError : User login Error");
  }
  if (req.userId !== req.params?.userId) {
    throw new ApiError(401, "AuthError : User not authorize");
  }
  if (req.userType !== req.params?.userType) {
    throw new ApiError(401, "AuthError : User not authorize");
  }
  if (!(req.params?.secondUserId && req.params?.secondUserType)) {
    throw new ApiError(404, "DataError : Parameters not received");
  }
  // check user type
  if (req.type === "Employee") {
    // search Employee Datils
    let searchEmployee;
    try {
      searchEmployee = await Employee.findById(req.userId).select("-password");
    } catch (error) {
      throw new ApiError(
        500,
        `DbError : ${error.message || "unable to find Employee"}`
      );
    }
    if (!searchEmployee) {
      throw new ApiError(404, "DbError : Employee not found");
    }
    if (
      searchEmployee.followersList.find(
        (userObject) => userObject.userId === req.params.secondUserId
      )
    ) {
      return res
        .status(200)
        .json(new ApiResponce(200, {}, "successMessage : Followed"));
    } else if (
      searchEmployee.followersRequestList.find(
        (userObject) => userObject.userId === req.params.secondUserId
      )
    ) {
      return res
        .status(200)
        .json(new ApiResponce(200, {}, "successMessage : Follow Requested"));
    } else {
      return res
        .status(200)
        .json(new ApiResponce(200, {}, "successMessage : Not Followed"));
    }
  } else if (req.type === "Candidate") {
    // search Candidate Datils
    let searchCandidate;
    try {
      searchCandidate = await Candidate.findById(req.userId).select(
        "-password"
      );
    } catch (error) {
      throw new ApiError(
        500,
        `DbError : ${error.message || "Unable to find candidate"}`
      );
    }
    if (!searchCandidate) {
      throw new ApiError(404, "DBerror : Candidate not found");
    }
    if (
      searchCandidate.followersList.find(
        (userObject) => userObject.userId === req.params.secondUserId
      )
    ) {
      return res
        .status(200)
        .json(new ApiResponce(200, {}, "successMessage : Followed"));
    } else if (
      searchCandidate.followersRequestList.find(
        (userObject) => userObject.userId === req.params.secondUserId
      )
    ) {
      return res
        .status(200)
        .json(new ApiResponce(200, {}, "successMessage : Follow Requested"));
    } else {
      return res
        .status(200)
        .json(new ApiResponce(200, {}, "successMessage : Not Followed"));
    }
  }
});

export const checkFollowing = AsyncHandler(async (req, res) => {
  /**
   * check user is logged in
   * validate user details
   * check second user id in following list
   * return responce
   */

  // check user is login
  if (!req.userId) {
    throw new ApiError(400, "LoginError : User not logged in");
  }
  if (!req.type) {
    throw new ApiError(400, "LoginError : User login Error");
  }
  if (req.userId !== req.params?.userId) {
    throw new ApiError(401, "AuthError : User not authorize");
  }
  if (req.userType !== req.params?.userType) {
    throw new ApiError(401, "AuthError : User not authorize");
  }
  if (!(req.params?.secondUserId && req.params?.secondUserType)) {
    throw new ApiError(404, "DataError : Parameters not received");
  }
  // check user type
  if (req.type === "Employee") {
    // search Employee Datils
    let searchEmployee;
    try {
      searchEmployee = await Employee.findById(req.userId).select("-password");
    } catch (error) {
      throw new ApiError(
        500,
        `DbError : ${error.message || "unable to find Employee"}`
      );
    }
    if (!searchEmployee) {
      throw new ApiError(404, "DbError : Employee not found");
    }
    if (
      searchEmployee.followingList.find(
        (userObject) => userObject.userId === req.params.secondUserId
      )
    ) {
      return res
        .status(200)
        .json(new ApiResponce(200, {}, "successMessage : Following"));
    } else if (
      searchEmployee.followingRequestList.find(
        (userObject) => userObject.userId === req.params.secondUserId
      )
    ) {
      return res
        .status(200)
        .json(new ApiResponce(200, {}, "successMessage : Following Requested"));
    } else {
      return res
        .status(200)
        .json(new ApiResponce(200, {}, "successMessage : Not Following"));
    }
  } else if (req.type === "Candidate") {
    // search Candidate Datils
    let searchCandidate;
    try {
      searchCandidate = await Candidate.findById(req.userId).select(
        "-password"
      );
    } catch (error) {
      throw new ApiError(
        500,
        `DbError : ${error.message || "Unable to find candidate"}`
      );
    }
    if (!searchCandidate) {
      throw new ApiError(404, "DBerror : Candidate not found");
    }
    if (
      searchCandidate.followingList.find(
        (userObject) => userObject.userId === req.params.secondUserId
      )
    ) {
      return res
        .status(200)
        .json(new ApiResponce(200, {}, "successMessage : Following"));
    } else if (
      searchCandidate.followingRequestList.find(
        (userObject) => userObject.userId === req.params.secondUserId
      )
    ) {
      return res
        .status(200)
        .json(new ApiResponce(200, {}, "successMessage : Following Requested"));
    } else {
      return res
        .status(200)
        .json(new ApiResponce(200, {}, "successMessage : Not Following"));
    }
  }
});

export const sendFollowRequest = AsyncHandler(async (req, res) => {
  /**
   * check user is logged in
   * validate user details
   * check second user id and type from params
   * add second user id in user followind request list and add first user id in second user followed request list
   * return responce
   */

  // check user is login
  if (!req.userId) {
    throw new ApiError(400, "LoginError : User not logged in");
  }
  if (!req.type) {
    throw new ApiError(400, "LoginError : User login Error");
  }
  if (req.userId !== req.params?.userId) {
    throw new ApiError(401, "AuthError : User not authorize");
  }
  if (req.userType !== req.params?.userType) {
    throw new ApiError(401, "AuthError : User not authorize");
  }
  if (!(req.params?.secondUserId && req.params?.secondUserType)) {
    throw new ApiError(404, "DataError : Parameters not received");
  }
  // check user type
  if (req.type === "Employee") {
    // search Employee Datils
    let searchEmployee;
    try {
      searchEmployee = await Employee.findById(req.userId).select("-password");
    } catch (error) {
      throw new ApiError(
        500,
        `DbError : ${error.message || "unable to find Employee"}`
      );
    }
    if (!searchEmployee) {
      throw new ApiError(404, "DbError : Employee not found");
    }
    if (
      searchEmployee.followingList.find(
        (userObject) => userObject.userId === req.params.secondUserId
      )
    ) {
      throw new ApiError(
        404,
        "DbError : secondUser id already exits following list"
      );
    }
    if (
      searchEmployee.followingRequestList.find(
        (userObject) => userObject.userId === req.params.secondUserId
      )
    ) {
      throw new ApiError(
        404,
        "DbError : secondUser id already exits following request list"
      );
    }
    let searchSecondUser;
    if (req.params?.secondUserType === "Employee") {
      try {
        searchSecondUser = await Employee.findById(
          req.params.secondUserId
        ).select("followersList followingList");
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${error.message || "Unable to find second user"}`
        );
      }
    } else if (req.params?.secondUserType === "Candidate") {
      try {
        searchSecondUser = await Candidate.findById(
          req.params.secondUserId
        ).select("followersList followingList");
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${error.message || "Unable to find second user"}`
        );
      }
    }
    if (!searchSecondUser) {
      throw new ApiError(404, "DataError : Second user Id not connect");
    }
    const secondUserDetails = {
      userId: searchSecondUser._id,
      fullname: searchSecondUser.fullName,
      userType: req.params?.secondUserType,
    };
    const userDetails = {
      userId: searchEmployee._id,
      fullName: searchEmployee.fullName,
      userType: "Employee",
    };
    let updateSearchEmployee;
    try {
      updateSearchEmployee = await Employee.findByIdAndUpdate(
        searchEmployee._id,
        {
          $push: {
            followingRequestList: secondUserDetails,
          },
        },
        { new: true }
      ).select("-password");
    } catch (error) {
      throw new ApiError(
        500,
        `DbError : ${error.message || "Unable to update Employee"}`
      );
    }
    if (!updateSearchEmployee) {
      throw new ApiError(500, "DbError : Employee not updated");
    }
    let updateSearchSecondUser;
    if (req.params?.secondUserType === "Employee") {
      try {
        updateSearchSecondUser = await Employee.findByIdAndUpdate(
          searchSecondUser._id,
          {
            $push: {
              followersRequestList: userDetails,
            },
          }
        );
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${error.message || "Unable to update second user"}`
        );
      }
    } else if (req.params?.secondUserType === "Candidate") {
      try {
        updateSearchSecondUser = await Candidate.findByIdAndUpdate(
          searchSecondUser._id,
          {
            $push: {
              followersRequestList: userDetails,
            },
          }
        );
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${error.message || "Unable to update second user"}`
        );
      }
    }
    if (!updateSearchSecondUser) {
      throw new ApiError(500, "second user not updated");
    }
    return res
      .status(200)
      .json(
        new ApiResponce(
          200,
          {},
          "successMessage : Following request send successfully"
        )
      );
  } else if (req.type === "Candidate") {
    // search Candidate Datils
    let searchCandidate;
    try {
      searchCandidate = await Candidate.findById(req.userId).select(
        "-password"
      );
    } catch (error) {
      throw new ApiError(
        500,
        `DbError : ${error.message || "Unable to find candidate"}`
      );
    }
    if (!searchCandidate) {
      throw new ApiError(404, "DBerror : Candidate not found");
    }
    if (
      searchCandidate.followingList.find(
        (userObject) => userObject.userId === req.params.secondUserId
      )
    ) {
      throw new ApiError(
        404,
        "DbError : secondUser id already exits following list"
      );
    }
    if (
      searchCandidate.followingRequestList.find(
        (userObject) => userObject.userId === req.params.secondUserId
      )
    ) {
      throw new ApiError(
        404,
        "DbError : secondUser id already exits following request list"
      );
    }

    let searchSecondUser;
    if (req.params?.secondUserType === "Employee") {
      try {
        searchSecondUser = await Employee.findById(
          req.params.secondUserId
        ).select("followersList followingList");
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${error.message || "Unable to find second user"}`
        );
      }
    } else if (req.params?.secondUserType === "Candidate") {
      try {
        searchSecondUser = await Candidate.findById(
          req.params.secondUserId
        ).select("followersList followingList");
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${error.message || "Unable to find second user"}`
        );
      }
    }
    if (!searchSecondUser) {
      throw new ApiError(404, "DataError : Second user Id not connect");
    }
    const secondUserDetails = {
      userId: searchSecondUser._id,
      fullname: searchSecondUser.fullName,
      userType: req.params?.secondUserType,
    };
    const userDetails = {
      userId: searchCandidate._id,
      fullName: searchCandidate.fullName,
      userType: "Candidate",
    };
    let updateSearchEmployee;
    try {
      updateSearchEmployee = await Employee.findByIdAndUpdate(
        searchCandidate._id,
        {
          $push: {
            followingRequestList: secondUserDetails,
          },
        },
        { new: true }
      ).select("-password");
    } catch (error) {
      throw new ApiError(
        500,
        `DbError : ${error.message || "Unable to update Candidate"}`
      );
    }
    if (!updateSearchEmployee) {
      throw new ApiError(500, "DbError : Employee not updated");
    }
    let updateSearchSecondUser;
    if (req.params?.secondUserType === "Employee") {
      try {
        updateSearchSecondUser = await Employee.findByIdAndUpdate(
          searchSecondUser._id,
          {
            $push: {
              followersRequestList: userDetails,
            },
          }
        );
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${error.message || "Unable to update second user"}`
        );
      }
    } else if (req.params?.secondUserType === "Candidate") {
      try {
        updateSearchSecondUser = await Candidate.findByIdAndUpdate(
          searchSecondUser._id,
          {
            $push: {
              followersRequestList: userDetails,
            },
          }
        );
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${error.message || "Unable to update second user"}`
        );
      }
    }
    if (!updateSearchSecondUser) {
      throw new ApiError(500, "second user not updated");
    }
    return res
      .status(200)
      .json(
        new ApiResponce(
          200,
          {},
          "successMessage : Following request send successfully"
        )
      );
  }
});

export const responceOnFollowRequest = AsyncHandler(async (req, res) => {
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
  if (!req.userId) {
    throw new ApiError(400, "LoginError : User not logged in");
  }
  if (!req.type) {
    throw new ApiError(400, "LoginError : User login Error");
  }
  if (req.userId !== req.params?.userId) {
    throw new ApiError(401, "AuthError : User not authorize");
  }
  if (req.userType !== req.params?.userType) {
    throw new ApiError(401, "AuthError : User not authorize");
  }
  if (!(req.params?.secondUserId && req.params?.secondUserType)) {
    throw new ApiError(404, "DataError : Parameters not received");
  }
  if (!req.params?.responce) {
    throw new ApiError(404, "DataError : Responce Parameters not received");
  }
  // check user type
  if (req.type === "Employee") {
    // search Employee Datils
    let searchEmployee;
    try {
      searchEmployee = await Employee.findById(req.userId).select("-password");
    } catch (error) {
      throw new ApiError(
        500,
        `DbError : ${error.message || "unable to find Employee"}`
      );
    }
    if (!searchEmployee) {
      throw new ApiError(404, "DbError : Employee not found");
    }
    if (
      !searchEmployee.followersRequestList.find(
        (userObject) => userObject.userId === req.params.secondUserId
      )
    ) {
      throw new ApiError(
        404,
        "DbError : secondUser id not exits in following request list"
      );
    }
    if (
      searchEmployee.followingList.find(
        (userObject) => userObject.userId === req.params.secondUserId
      )
    ) {
      throw new ApiError(
        404,
        "DbError : secondUser id already exits following list"
      );
    }
    let searchSecondUser;
    if (req.params?.secondUserType === "Employee") {
      try {
        searchSecondUser = await Employee.findById(
          req.params.secondUserId
        ).select("followersList followingList");
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${error.message || "Unable to find second user"}`
        );
      }
    } else if (req.params?.secondUserType === "Candidate") {
      try {
        searchSecondUser = await Candidate.findById(
          req.params.secondUserId
        ).select("followersList followingList");
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${error.message || "Unable to find second user"}`
        );
      }
    }
    if (!searchSecondUser) {
      throw new ApiError(404, "DataError : Second user Id not connect");
    }
    if (
      searchSecondUser.followersList.find(
        (userObject) => userObject.userId === req.userId
      )
    ) {
      throw new ApiError(
        404,
        "DbError : User id already exits second user followers list"
      );
    }
    if (
      !searchSecondUser.followersRequestList.find(
        (userObject) => userObject.userId === req.userId
      )
    ) {
      throw new ApiError(
        404,
        "DbError : user id not exits in second user followers request list"
      );
    }
    if (req.params?.responce === "Accept") {
      // create object
      const secondUserDetails = {
        userId: searchSecondUser._id,
        fullname: searchSecondUser.fullName,
        userType: req.params?.secondUserType,
      };
      const userDetails = {
        userId: searchEmployee._id,
        fullName: searchEmployee.fullName,
        userType: "Employee",
      };
      let updateSearchEmployee;
      try {
        updateSearchEmployee = await Employee.findByIdAndUpdate(
          searchEmployee._id,
          {
            $push: {
              followersList: secondUserDetails,
            },
          },
          { new: true }
        ).select("-password");
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${error.message || "Unable to update Employee"}`
        );
      }
      if (!updateSearchEmployee) {
        throw new ApiError(500, "DbError : Employee not updated");
      }
      let updateSearchSecondUser;
      if (req.params?.secondUserType === "Employee") {
        try {
          updateSearchSecondUser = await Employee.findByIdAndUpdate(
            searchSecondUser._id,
            {
              $push: {
                followingList: userDetails,
              },
            }
          );
        } catch (error) {
          throw new ApiError(
            500,
            `DbError : ${error.message || "Unable to update second user"}`
          );
        }
      } else if (req.params?.secondUserType === "Candidate") {
        try {
          updateSearchSecondUser = await Candidate.findByIdAndUpdate(
            searchSecondUser._id,
            {
              $push: {
                followersList: userDetails,
              },
            }
          );
        } catch (error) {
          throw new ApiError(
            500,
            `DbError : ${error.message || "Unable to update second user"}`
          );
        }
      }
      if (!updateSearchSecondUser) {
        throw new ApiError(500, "DbError Unable to update second user");
      }
      try {
        const newFollowRequestList =
          updateSearchEmployee.followersRequestList.filter(
            (userObject) => userObject.userId !== updateSearchSecondUser
          );
        updateSearchEmployee.followersRequestList = newFollowRequestList;
        updateSearchEmployee.save({ validateBeforeSave: false });
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${
            error.message || "Unable to update Employee followers list"
          }`
        );
      }
      if (!updateSearchEmployee) {
        throw new ApiError(500, "DbError : Employee not updated");
      }
      try {
        const newFollowingRequestList =
          updateSearchSecondUser.followingRequestList.filter(
            (userObject) => userObject.userId !== updateSearchEmployee
          );
        updateSearchEmployee.followingRequestList = newFollowingRequestList;
        updateSearchEmployee.save({ validateBeforeSave: false });
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${
            error.message || "Unable to update second user following list"
          }`
        );
      }
      if (!updateSearchSecondUser) {
        throw new ApiError(500, "DbError : second user not updated");
      }

      return res
        .status(200)
        .json(
          new ApiResponce(200, {}, "successMessage : Follow request accepted")
        );
    } else if (req.params?.responce === "Reject") {
      try {
        const newFollowRequestList = searchEmployee.followersRequestList.filter(
          (userObject) => userObject.userId !== searchSecondUser
        );
        searchEmployee.followersRequestList = newFollowRequestList;
        searchEmployee.save({ validateBeforeSave: false });
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${
            error.message || "Unable to update Employee followers list"
          }`
        );
      }
      if (!searchEmployee) {
        throw new ApiError(500, "DbError : Employee not updated");
      }
      try {
        const newFollowingRequestList =
          searchSecondUser.followingRequestList.filter(
            (userObject) => userObject.userId !== searchEmployee
          );
        searchEmployee.followingRequestList = newFollowingRequestList;
        searchEmployee.save({ validateBeforeSave: false });
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${
            error.message || "Unable to update second user following list"
          }`
        );
      }
      if (!searchSecondUser) {
        throw new ApiError(500, "DbError : second user not updated");
      }
      return res
        .status(200)
        .json(
          new ApiResponce(200, {}, "successMessage : Follow request rejected")
        );
    }
  } else if (req.type === "Candidate") {
    // search Candidate Datils
    let searchCandidate;
    try {
      searchCandidate = await Candidate.findById(req.userId).select(
        "-password"
      );
    } catch (error) {
      throw new ApiError(
        500,
        `DbError : ${error.message || "Unable to find candidate"}`
      );
    }
    if (!searchCandidate) {
      throw new ApiError(404, "DbError : Candidate not found");
    }
    if (
      !searchCandidate.followersRequestList.find(
        (userObject) => userObject.userId === req.params.secondUserId
      )
    ) {
      throw new ApiError(
        404,
        "DbError : secondUser id not exits in following request list"
      );
    }
    if (
      searchCandidate.followersList.find(
        (userObject) => userObject.userId === req.params.secondUserId
      )
    ) {
      throw new ApiError(
        404,
        "DbError : secondUser id already exits following list"
      );
    }

    let searchSecondUser;
    if (req.params?.secondUserType === "Employee") {
      try {
        searchSecondUser = await Employee.findById(
          req.params.secondUserId
        ).select("followersList followingList");
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${error.message || "Unable to find second user"}`
        );
      }
    } else if (req.params?.secondUserType === "Candidate") {
      try {
        searchSecondUser = await Candidate.findById(
          req.params.secondUserId
        ).select("followersList followingList");
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${error.message || "Unable to find second user"}`
        );
      }
    }
    if (!searchSecondUser) {
      throw new ApiError(404, "DataError : Second user Id not connect");
    }
    if (
      searchSecondUser.followersList.find(
        (userObject) => userObject.userId === req.userId
      )
    ) {
      throw new ApiError(
        404,
        "DbError : User id already exits second user followers list"
      );
    }
    if (
      !searchSecondUser.followersRequestList.find(
        (userObject) => userObject.userId === req.userId
      )
    ) {
      throw new ApiError(
        404,
        "DbError : user id not exits in second user followers request list"
      );
    }
    if (req.params.responce === "Accept") {
      // create object
      const secondUserDetails = {
        userId: searchSecondUser._id,
        fullname: searchSecondUser.fullName,
        userType: req.params?.secondUserType,
      };
      const userDetails = {
        userId: searchCandidate._id,
        fullName: searchCandidate.fullName,
        userType: "Candidate",
      };
      let updateSearchCandidate;
      try {
        updateSearchCandidate = await Candidate.findByIdAndUpdate(
          searchCandidate._id,
          {
            $push: {
              followersList: secondUserDetails,
            },
          },
          { new: true }
        ).select("-password");
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${error.message || "Unable to update Candidate"}`
        );
      }
      if (!updateSearchCandidate) {
        throw new ApiError(500, "DbError : Candidate not updated");
      }
      let updateSearchSecondUser;
      if (req.params?.secondUserType === "Employee") {
        try {
          updateSearchSecondUser = await Employee.findByIdAndUpdate(
            searchSecondUser._id,
            {
              $push: {
                followingList: userDetails,
              },
            }
          );
        } catch (error) {
          throw new ApiError(
            500,
            `DbError : ${error.message || "Unable to update second user"}`
          );
        }
      } else if (req.params?.secondUserType === "Candidate") {
        try {
          updateSearchSecondUser = await Candidate.findByIdAndUpdate(
            searchSecondUser._id,
            {
              $push: {
                followersList: userDetails,
              },
            }
          );
        } catch (error) {
          throw new ApiError(
            500,
            `DbError : ${error.message || "Unable to update second user"}`
          );
        }
      }
      if (!updateSearchSecondUser) {
        throw new ApiError(500, "DbError Unable to update second user");
      }
      try {
        const newFollowRequestList =
          updateSearchCandidate.followersRequestList.filter(
            (userObject) => userObject.userId !== updateSearchSecondUser
          );
        updateSearchCandidate.followersRequestList = newFollowRequestList;
        updateSearchCandidate.save({ validateBeforeSave: false });
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${
            error.message || "Unable to update Candidate followers list"
          }`
        );
      }
      if (!updateSearchCandidate) {
        throw new ApiError(500, "DbError : Employee not updated");
      }
      try {
        const newFollowingRequestList =
          updateSearchSecondUser.followingRequestList.filter(
            (userObject) => userObject.userId !== updateSearchCandidate
          );
        updateSearchCandidate.followingRequestList = newFollowingRequestList;
        updateSearchCandidate.save({ validateBeforeSave: false });
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${
            error.message || "Unable to update second user following list"
          }`
        );
      }
      if (!updateSearchSecondUser) {
        throw new ApiError(500, "DbError : second user not updated");
      }

      return res
        .status(200)
        .json(
          new ApiResponce(200, {}, "successMessage : Follow request accepted")
        );
    } else if (req.params.responce === "Reject") {
      try {
        const newFollowRequestList =
          searchCandidate.followersRequestList.filter(
            (userObject) => userObject.userId !== searchSecondUser
          );
        searchCandidate.followersRequestList = newFollowRequestList;
        searchCandidate.save({ validateBeforeSave: false });
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${
            error.message || "Unable to update Employee followers list"
          }`
        );
      }
      if (!searchCandidate) {
        throw new ApiError(500, "DbError : Employee not updated");
      }
      try {
        const newFollowingRequestList =
          searchSecondUser.followingRequestList.filter(
            (userObject) => userObject.userId !== searchCandidate
          );
        searchCandidate.followingRequestList = newFollowingRequestList;
        searchCandidate.save({ validateBeforeSave: false });
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${
            error.message || "Unable to update second user following list"
          }`
        );
      }
      if (!searchSecondUser) {
        throw new ApiError(500, "DbError : second user not updated");
      }
      return res
        .status(200)
        .json(
          new ApiResponce(200, {}, "successMessage : Follow request rejected")
        );
    }
  }
});

export const cancelFollowingRequst = AsyncHandler(async (req, res) => {
  /**
   * check user is logged in
   * validate user details
   * check second user id and type from params
   * check second user id available in following request list
   * remove second user id from following request list and first user id from second folloed request list
   * return responce
   */

  // check user is login
  if (!req.userId) {
    throw new ApiError(400, "LoginError : User not logged in");
  }
  if (!req.type) {
    throw new ApiError(400, "LoginError : User login Error");
  }
  if (req.userId !== req.params?.userId) {
    throw new ApiError(401, "AuthError : User not authorize");
  }
  if (req.userType !== req.params?.userType) {
    throw new ApiError(401, "AuthError : User not authorize");
  }
  if (!(req.params?.secondUserId && req.params?.secondUserType)) {
    throw new ApiError(404, "DataError : parameter not recevied");
  }
  if (req.type === "Employee") {
    // search Employee Datils
    let searchEmployee;
    try {
      searchEmployee = await Employee.findById(req.userId).select("-password");
    } catch (error) {
      throw new ApiError(
        500,
        `DbError : ${error.message || "Unable to find Employee"}`
      );
    }
    if (!searchEmployee) {
      throw new ApiError(404, "DbError : Employee not found");
    }
    if (
      !searchEmployee.followingRequestList.find(
        (userObject) => userObject.userId === req.params.secondUserId
      )
    ) {
      throw new ApiError(
        404,
        "DataError : second user id not exits in user following request list"
      );
    }
    if (
      searchEmployee.followingList.find(
        (userObject) => userObject.userId === req.params.secondUserId
      )
    ) {
      throw new ApiError(
        400,
        "DataError : Second user id exits on user following list"
      );
    }

    let searchSecondUser;
    if (req.params?.secondUserType === "Employee") {
      try {
        searchSecondUser = await Employee.findById(req.params?.secondUserId);
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${error.message || "Unable to find second user"}`
        );
      }
    } else if (req.params?.secondUserType === "Candidate") {
      try {
        searchSecondUser = await Candidate.findById(req.params?.secondUserId);
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${error.message || "Unable to find second user"}`
        );
      }
    }
    if (!searchSecondUser) {
      throw new ApiError(404, "DataError : second user id not correct");
    }
    try {
      const newFollowingRequestList =
        searchEmployee.followingRequestList.filter(
          (userObject) => userObject.userId !== searchSecondUser
        );
      searchEmployee.followingRequestList = newFollowingRequestList;
      searchEmployee.save({ validateBeforeSave: false });
    } catch (error) {
      throw new ApiError(
        500,
        `DbError : ${error.message || "Unable to update user following list"}`
      );
    }
    try {
      const newFollowersRequestList =
        searchSecondUser.followersRequestList.filter(
          (userObject) => userObject.userId !== searchEmployee
        );
      searchEmployee.followersRequestList = newFollowersRequestList;
      searchEmployee.save({ validateBeforeSave: false });
    } catch (error) {
      throw new ApiError(
        500,
        `DbError ${
          error.message || "Unable to update second user followers list"
        }`
      );
    }
    let updateSearchEmployee;
    try {
      updateSearchEmployee = await Employee.findById(
        searchEmployee?._id
      ).select("followingList followersList");
    } catch (error) {
      throw new ApiError(
        500,
        `DbError : ${error.message || "unable to find Updated Employee "}`
      );
    }
    if (!updateSearchEmployee) {
      throw new ApiError(500, "DbError : Updated Employee not found");
    }
    let updateSearchSecondUser;
    if (req.params?.secondUserType === "Employee") {
      try {
        updateSearchSecondUser = await Employee.findById(
          searchSecondUser._id
        ).select("followingList followersList");
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${error.message || "Unable to find updated SecondUser"}`
        );
      }
    } else if (req.params?.secondUserType === "Candidate") {
      try {
        updateSearchSecondUser = await Candidate.findById(
          searchSecondUser._id
        ).select("followingList followersList");
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${error.message || "Unable to find updated SecondUser"}`
        );
      }
    }
    if (!updateSearchSecondUser) {
      throw new ApiError(500, "DbError : Update SecondUser not found");
    }
  } else if (req.type === "Candidate") {
    // search Candidate Datils
    let searchCandidate;
    try {
      searchCandidate = await Candidate.findById(req.userId).select(
        "-password"
      );
    } catch (error) {
      throw new ApiError(
        500,
        `DbError : ${error.message || "Unable to find candidate"}`
      );
    }
    if (!searchCandidate) {
      throw new ApiError(404, "DbError : Candidate not found");
    }
    if (
      !searchCandidate.followingRequestList.find(
        (userObject) => userObject.userId === req.params.secondUserId
      )
    ) {
      throw new ApiError(
        404,
        "second user id not exits in user followind request list"
      );
    }
    if (
      searchCandidate.followingList.find(
        (userObject) => userObject.userId === req.params.secondUserId
      )
    ) {
      throw new ApiError(500, "second user id exits in user following list");
    }

    let searchSecondUser;
    if (req.params?.secondUserType === "Employee") {
      try {
        searchSecondUser = await Employee.findById(req.params?.secondUserId);
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${error.message || "unable to find second user"}`
        );
      }
    } else if (req.params?.secondUserType === "Candidate") {
      try {
        searchSecondUser = await Candidate.findById(req.params?.secondUserId);
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${error.message || "Unable to find second user"}`
        );
      }
    }
    if (!searchSecondUser) {
      throw new ApiError(404, "DataError : second user id not correct");
    }
    try {
      const newFollowIngRequestList =
        searchCandidate.followingRequestList.filter(
          (userObject) => userObject.userId !== searchSecondUser
        );
      searchCandidate.followingRequestList = newFollowIngRequestList;
      searchCandidate.save({ validateBeforeSave: false });
    } catch (error) {
      throw new ApiError(
        500,
        `DbError ${error.message || "Unable to update user following list"}`
      );
    }
    try {
      const newFollowersRequestList =
        searchSecondUser.followersRequestList.filter(
          (userObject) => userObject.userId !== searchCandidate
        );
      searchCandidate.followersRequestList = newFollowersRequestList;
      searchCandidate.save({ validateBeforeSave: false });
    } catch (error) {
      throw new ApiError(
        500,
        `DbError : ${
          error.message || "Unable to update second user followers list"
        }`
      );
    }
    let updateSearchCandidate, updatedSearchSecondUser;
    try {
      updateSearchCandidate = await Candidate.findById(
        searchCandidate._id
      ).select("followingList followersList");
    } catch (error) {
      throw new ApiError(
        500,
        `DbError : ${error.message || "Unable to find updated candidate"}`
      );
    }
    if (!updateSearchCandidate) {
      throw new ApiError(500, "DbError : Updated candidate not found");
    }
    if (req.params?.secondUserId === "Employee") {
      try {
        updatedSearchSecondUser = await Employee.findById(
          searchSecondUser._id
        ).select("followingList followersList");
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${error.message || "Unable to find update second user"}`
        );
      }
    } else if (req.params?.secondUserId === "Candidate") {
      try {
        updatedSearchSecondUser = await Candidate.findById(
          searchSecondUser._id
        ).select("followingList followersList");
      } catch (error) {
        throw new ApiError(
          500,
          `DbError : ${error.message || "Unable to find update second user"}`
        );
      }
    }
    if (!updatedSearchSecondUser) {
      throw new ApiError(500, "DbError : Updated second user not found");
    }
  }
  return res
    .status(200)
    .json(
      new ApiResponce(200, {}, "successMessage : Following request canceled")
    );
});
