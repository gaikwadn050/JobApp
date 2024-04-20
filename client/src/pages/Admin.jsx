import React from 'react'
import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';
import { useLoaderData, redirect } from 'react-router-dom';

import Wrapper from '../assets/wrappers/StatsContainer';
import { toast } from 'react-toastify'
import customFetch from '../../../utils/customFetch';
import { Statsitem } from '../Component';
export const loader = async () => {
  try {
    const response = await customFetch.get('users/admin/app-stats')
    return response
  } catch (error) {
    toast.error('You are not authorized to this page')
    return redirect('/dashboard')
  }
}
const Admin = () => {
  const { data } = useLoaderData()
  const { users, jobs } = data
  return (
    <Wrapper>
      <Statsitem title='current users' count={users}
        color="#e9b949" bcg="#fcefc7"
        icon={<FaSuitcaseRolling />} />
      <Statsitem title='total Jobs'
        count={jobs} color="#647acb" bcg="e0e8f9"
        icon={<FaCalendarCheck />} />
    </Wrapper>
  )
}

export default Admin;
