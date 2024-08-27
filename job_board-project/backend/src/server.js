import app from "./app.js";
import connectDb from "./db/connect.db.js";
import cloudinary from "cloudinary"
// variable defining
const host = process.env.HOST
const port = process.env.PORT
const db_uri = process.env.DATABASE_URI
const db_name = process.env.DATABASE_NAME



// Cloudnary Configuration
(async function () {
  try {
    await cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  } catch (error) {
    return console.log(`Cloundinary configuration error : ${error.message}`)
  }
})();

// connect DataBase and listen server
connectDb(db_uri, db_name)
.then(
    app.listen(port, function(){
        console.log(`server listen on ${host}/${port}`)
    })
)
.catch(error => (
    console.log(`Db-Server connection faild \nErrors : ${error.message}`)
))
