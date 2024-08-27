
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

export const reGeneratedAccessToken = async function (user) {
    if(!user){
        throw new ApiError(400, "DataError : User not received")
    }
    let userData
    try {
        userData = jwt.verify(user?.refreshToken, 
            process.env.REFRESH_TOKEN_SECRET_KEY
        )
    } catch (error) {
        throw new ApiError(500, `JWTError : ${error.message ||"Unable to varify jwt string"}`)
    }
    if(!userData){
        throw new ApiError(400, `DBError : Your RefreshToken Expire or not validate, please login`)
    }

    let accessToken;
    try {
        accessToken = await user.GenrateAccessToken()
    } catch (error) {
        throw new ApiError(500, `DbError : ${error.message || "Enable to generated access token"}`)
    }
    if(!accessToken){
        throw new ApiError(500, "DbError : AccessToken not generated")
    }
    return accessToken
}
