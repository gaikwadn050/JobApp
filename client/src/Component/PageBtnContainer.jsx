import React from 'react'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAllJobsContext } from '../pages/AllJobs'
// import { ListIndexesCursor } from 'mongodb';
const PageBtnContainer = () => {
  const { data } = useAllJobsContext()
  console.log(data, "afadgg")
  const { numOfPages, currentPage } = data.data
  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);

  const { search, pathname } = useLocation()
  const navigate = useNavigate()
  console.log(search, "nilesh", pathname)
  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search)
    searchParams.set('page',pageNumber)
    console.log(pageNumber)
    navigate(`${pathname}?${searchParams.toString()}`)
  }
  return (
    <Wrapper>
      <button className='btn prev-btn' onClick={() => {
        let prevPage = currentPage - 1;
        if (prevPage < 1) prevPage = numOfPages
        handlePageChange(prevPage)
      }}><HiChevronDoubleLeft />prev</button>
      <div className='btn-container'>
        {pages.map((pageNumber) => {
          return <button className={`btn page-btn ${pageNumber === currentPage && 'active'}`} key={pageNumber} onClick={() => handlePageChange(pageNumber)}>{pageNumber}</button>
        })}
      </div>
      <button className='btn next-btn' onClick={() => {
        let nextPage = currentPage + 1;
        if (nextPage > numOfPages) nextPage = 1;
        handlePageChange(nextPage)
      }}><HiChevronDoubleRight />next</button>


    </Wrapper>
  )
}

export default PageBtnContainer
