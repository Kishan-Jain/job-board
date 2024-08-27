import Express from "express"
import session from "express-session"
import Cookie from "cookie-parser"
import mainRouter from "./routes/main.routes.js"
const app = Express()

app.use(Express.json({limit:"16kb"}))
app.use(Express.urlencoded({extended:true, limit:"16kb"}))
app.use(Express.static("public/temp"))
app.use(session({
    secret : process.env.EXPRESS_SESSION_SECRET,
    cookie : {
        httpOnly: true,
        secure : true
    }
}))

app.use("/api/v1", mainRouter)

export default app