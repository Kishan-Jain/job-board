
import ApiError from "../utils/ApiError.js"
import jwt from "jsonwebtoken"


export const GenrateAccessRefreshToken = async function (user) {
    if(!user){
        throw new ApiError(400, "DataError : User not received")
    }
    let accessToken, refreshToken;
    try {
        accessToken = await user.GenrateAccessToken()
        refreshToken = await user.GenrateRefreshToken() 
    } catch (error) {
        throw new ApiError(500, `DbError : ${error.message || "Unable to generate Tokens"}`)
    }
    if(![accessToken, refreshToken].some(field => field)){
        throw new ApiError(500, "Tokens not Genrated")
    }
    if([accessToken, refreshToken].some(field => field.toString().trim() === "")){
        throw new ApiError(500, "Generated Token is Empty")
    }
    return {accessToken, refreshToken}
}

