import { Router } from "express";
import employeeRouter from "./employee.routes.js";
import candidateRouter from "./candidates.routes.js";
import jobsRouter from "./jobs.routes.js";

const mainRouter = Router()

mainRouter.use("/employee", employeeRouter)
mainRouter.use("/candidate", candidateRouter)
mainRouter.use("/jobs", jobsRouter)

export default mainRouter