import { Router } from "express";
import {isLogin} from "../middlewares/auth.middlewares.js"
import {publishNewJobVacancy} from "../controllers/jobs.controllers.js"

const jobsRouter = Router()

jobsRouter.route("/:userId/publishNewVacancy").post(
  isLogin, publishNewJobVacancy
)


export default jobsRouter