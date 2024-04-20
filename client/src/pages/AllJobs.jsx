import React, { createContext, useContext } from 'react'
import customFetch from '../../../utils/customFetch'
import { toast } from 'react-toastify'
import { useLoaderData } from 'react-router-dom'
import { SearchContainer, JobsContainer } from '../Component'
export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  console.log(params, "params")
  try {
    const data = await customFetch.get('/jobs', {
      params,
    })
    return { data, searchValues: { ...params } }
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return null
  }
}


const AllJobsContext = createContext()
const AllJobs = () => {
  const { data, searchValues } = useLoaderData()
  console.log(data, "all")
  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  )
}
export const useAllJobsContext = () => useContext(AllJobsContext)
export default AllJobs
