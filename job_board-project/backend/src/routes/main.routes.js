import { Router } from "express";
import employeeRouter from "./employee.routes.js";
import candidateRouter from "./candidates.routes.js";
import jobsRouter from "./jobs.routes.js";
import applicationRouter from "./application.routes.js";

const mainRouter = Router()

mainRouter.use("/employee", employeeRouter)
mainRouter.use("/candidate", candidateRouter)
mainRouter.use("/jobs", jobsRouter)
mainRouter.use("/application", applicationRouter)
export default mainRouter