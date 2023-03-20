import React from 'react'

export default function Profile({data}) {
  console.log(data)
  return (
    <>
      <h1>Employee Data</h1>
      <br />
      <h4>Name : {data.name}</h4>
      <h4>Email: {data.email}</h4>
      <h4>Password: {data.password}</h4>
      <h4>Age: {data.age}</h4>
      <h4>Salary: {data.salary}</h4>
      <h4>Country: {data.country}</h4>
      <h4>State: {data.state}</h4>
      <h4>City: {data.city}</h4>
    </>
  )
}
