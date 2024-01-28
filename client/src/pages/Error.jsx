import React from 'react'
import { Link, useRouteError } from "react-router-dom"
import Wrapper from "../assets/wrappers/ErrorPage"
import img from "../assets/images/not-found.svg"
const Error = () => {
  const error = useRouteError();
  console.log(error)

  if (error.status === 404) {
    return <Wrapper>
      <center>
        <br></br>  <br></br>
        <img src={img} alt='Page Not Found' />
        <h1> Error Page </h1>
        <br />
        <br />
        <h2>  Ooh! Page {error.statusText} .</h2>
        <br />
        <br />
        <Link style={{ color: "red", fontFamily: "sans-serif", fontSize: "24px" }} to="/" >back home</Link>
      </center>
    </Wrapper>
  }
  return (

    <>
      <h1>Somthing went wrong</h1>
    </>
  )
}

export default Error;
