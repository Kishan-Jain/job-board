/**
 * start new chat
 * send a message
 * edit send message with sort time limitation
 * delete send message with time limitation
 * check all message
 * send media file
 * delete send media file
 * delete full chat
 */

import AsyncHandler from "../utils/AsyncHandler.js"

export const startNewChat = AsyncHandler(async (req, res) => {
    /**
     * check user is login
     * check user Employee or candidate
     * check coonection with second user allow 
     * check massage received
     * make new object
     * push in chatBox
     * add connection in second user chatbox with massage in recieved massage array
     * return seccess responce
     */
})

export const deleteChatInChatBox = AsyncHandler(async (req, res) => {
    /**
     * check user is login
     * check chatBox id received from params
     * remove full chatBox
     * return success message with responce
     */
})

export const sendAMessage = AsyncHandler(async (req, res) => {
    /**
     * check user is login
     * received chatBox id from param
     * check message received from body
     * push this message on chatBox send message array
     * push this message on second user chatBox received massage array
     * return success responce
     */
})

export const editSendMessage = AsyncHandler(async (req, res) => {
    /**
     * check user is login
     * received chatBox Id and send message Id from params
     * check updated message received from body
     * check time bondation for updated massage
     * update this message on user and second user chatBox
     * return
     */
})

export const deleteSendMessage = AsyncHandler(async (req, res) => {
    /**
     * check user is login
     * received chatBox Id and send message Id from params
     * check time bondation for deleting massage
     * update message body to "delete message by sender" on user and second user chatbox
     * return
     */
})

export const sendAMedia = AsyncHandler(async (req, res) => {
    /**
     * check user is login
     * received chatBox id from param
     * check Media file received from body
     * upload the file on cloudinary and received Url
     * push file url on chatBox send message array
     * push file Url on second user chatBox received massage array
     * return success responce
     */
})

export const deleteSendMedia = AsyncHandler(async (req, res) => {
    /**
     * check user is login
     * received chatBox Id and send mediaId from params
     * check time bondation for deleting media
     * remove media in cloudinary by media url 
     * create new message with body "delete massage by sender" in chatBox message with same date and remove media url on user and second user chatbox media.
     * return
     */
})