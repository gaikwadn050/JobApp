import React from 'react'
import customFetch from '../../../utils/customFetch'
import { redirect, useLoaderData, Form, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { FormRowSelect, FormRow } from '../Component'
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants'
export const loader = async ({ params }) => {
  console.log(params.id)
  try {
    const { data } = await customFetch.get(`/jobs/${params.id}`)
    console.log(data)
    return data
  } catch (error) {
    toast.error(error?.(error?.response?.data?.msg))
    return redirect(`/dashboard/all-jobs`)
  }
}

export const action = async ({ request, params }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  console.log(data, "data......")
  try {
    await customFetch.patch(`/jobs/${params.id}`, data)
    toast.success(`jobs edited succesfully`)
    return redirect(`/dashboard/all-jobs`)
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const EditJob = () => {
  const { job } = useLoaderData();
  console.log(job, 'job')
  const navigation = useNavigate()
  const isSubmiting = navigation.status === "submitting"
  return (
    <Wrapper>
      <Form method="post" className='form'>
        <h4 className='form-title'>
          edit job
        </h4>
        <div className='form-center'>
          <FormRow type="text" name="position" defaultValue={job.position} />
          <FormRow type="text" name="company" defaultValue={job.company} />
          <FormRow type="text" name="jobLocation" defaultValue={job.jobLocation} />
          <FormRowSelect name='jobStatus'
            labelText='job Status'
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)} />
          <FormRowSelect name='jobType'
            labelText='job type'
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)} />
          <button type='submit' className='btn btn-block form-btn' disabled={isSubmiting}>{isSubmiting ? "submitting..." : "submit"} </button>
        </div>
      </Form>
    </Wrapper>
  )
}

export default EditJob
