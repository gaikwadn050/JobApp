import React from 'react'
import { FormRow, FormRowSelect } from '../Component'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import { Form, redirect, useNavigate, useOutletContext } from 'react-router-dom'
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants"
import customFetch from '../../../utils/customFetch'
import { toast } from 'react-toastify'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    await customFetch.post('./jobs', data)
    toast.success('Job Added Successfully')
    return redirect('all-jobs')
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
}

const AddJob = () => {
  const { user } = useOutletContext()
  const navigation = useNavigate()
  const isSubmiting = navigation.state = "submitting"
  return (

    // {
    //   "company": "Facebook",
    //   "position": "backend-end",
    //   "jobStatus": "pending",
    //   "jobType": "full-time",
    //   "jobLocation": "florida"
    // }
    <Wrapper>
      <Form method='post' className='form'>
        <h1>add job</h1>
        <div className="form-center">
          <FormRow type='text' name='position' />
          <FormRow type='text' name='company' />
          <FormRowSelect list={Object.values(JOB_STATUS)}
            name="jobStatus" labelText="Job Status"
            defaultValue={JOB_STATUS.PENDING} />
          <FormRowSelect list={Object.values(JOB_TYPE)}
            name="jobType" labelText="JobType"
            defaultValue={JOB_TYPE.FULL_TIME} />
          <FormRow type='text' labelText='job location' name='jobLocation' defaultValue={user?.location} />
          <button type='submit' className='btn btn-block form-btn' > {isSubmiting ? 'submiting' : 'submit'}</button>
        </div>
      </Form>
    </Wrapper>
  )
}

export default AddJob
