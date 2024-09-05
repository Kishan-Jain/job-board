import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from "./layout/Lauout.jsx"
import HomeLayout from './layout/HomeLayout.jsx'
import MainLayout from './layout/MainLayout.jsx'

import { AddNewVacancyPage, ApplyVacancyPage, CandidateAllApplicationPage, CandidateProfilePage, ChangeCandidatePasswordPage, ChangeEmployeePasswordPage, EmployeeProfilePage, LoginCandidatePages, LoginEmployeePage, MakeUpdateInApplicationPage, RegisterCandidatePage, RegisterEmployeePage, UpdateCandidateDetailsPage, UpdateEmployeeDetailsPage, UpdateVacancyPage, ViewAllApplicationPage, ViewAllVacancy, ViewAllVacancyPage, ViewVacancyDetails, HomePage } from "./components"

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
    <Route
      path=''
      element={<HomeLayout />}
    >
      <Route path='' element={<HomePage />} />
      <Route path="vacancyList/" element={<ViewAllVacancy />}>
        <Route path=':vacancyId' element={<ViewVacancyDetails/>} />
      </Route>
    </Route>
    <Route path='Employee/' element={<MainLayout />}>
      <Route path='login/' element={<LoginEmployeePage />} />
      <Route path='register/' element={<RegisterEmployeePage />} />
      <Route path='profile/' element={<EmployeeProfilePage />} >
        <Route path='updateDetails/' element={<UpdateEmployeeDetailsPage />} />
        <Route path='changePassword/' element={<ChangeEmployeePasswordPage />} />
        <Route path='job/addNewJob/' element={<AddNewVacancyPage />} />
        <Route path='job/viewAllJobs/' element={<ViewAllVacancyPage />} />
        <Route path='job/updateDetails/:vacancyId/' element={<UpdateVacancyPage />} />
        <Route path='job/:vacancyId/viewAllApplications/' element={<ViewAllApplicationPage />} />
        <Route path='job/:vacancyId/makeUpdated/:applicationId/' element={<MakeUpdateInApplicationPage />} />
      </Route>
    </Route>
    <Route path='candidate/' element={<MainLayout />}>
      <Route path='login/' element={<LoginCandidatePages />} />
      <Route path='register/' element={<RegisterCandidatePage />} />
      <Route path='profile/' element={<CandidateProfilePage />} >
        <Route path='updateDetails/' element={<UpdateCandidateDetailsPage />} />
        <Route path='changePassword/' element={<ChangeCandidatePasswordPage />} />
        <Route path='application/ApplyJob/:vacancyId' element={<ApplyVacancyPage />} />
        <Route path='application/viewAllapplications/' element={<CandidateAllApplicationPage />} />
        <Route path='application/viewApplicationDetails/:applicationId/' element={<UpdateVacancyPage />} />
      </Route>
    </Route>
    </Route>
  ))


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Router} />
  </StrictMode>,
)
