import React, {useState, useEffect} from 'react'
// import Form from "./form";
import Update from './update'

export default function List({list, setList}) {
  //   const [list, setList] = useState()
  const [update, setUpdate] = useState('soduhgfs')
  //   const [count, setCount] = useState(0)

  const handleDelete = async (id) => {
    let data = {
      id: id,
    }
    console.log(data)
    const res = await fetch('http://localhost:5000/api/employees/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(async(response) => await response.json())
      .then(async(info) => await setList(info))
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        'http://localhost:5000/api/employees',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
        []
      )

      const data = await res.json()
      console.log('hello')
      await setList(data)
    }

    fetchData()
  }, [])

  return (
    <>
      <table className='table table-sm'>
        <thead>
          <tr>
            <td scope='col' className='fs-3 fw-bold'>
              #
            </td>
            <th scope='col' className='fs-3 fw-bold'>
              Name
            </th>
            <th scope='col' className='fs-3 fw-bold'>
              Age
            </th>
            <th scope='col' className='fs-3 fw-bold'>
              Email
            </th>
            <th scope='col' className='fs-3 fw-bold'>
              Salary
            </th>
            <th scope='col' className='fs-3 fw-bold'>
              Country
            </th>
            <th scope='col' className='fs-3 fw-bold'>
              State
            </th>
            <th scope='col' className='fs-3 fw-bold'>
              City
            </th>
          </tr>
        </thead>
        {/* <br /> */}
        <tbody>
          {list &&
            list.map((employee, i) => (
              <tr key={i}>
                <th className='fs-3'>{i + 1}</th>
                <td className='fs-3'>{employee.name}</td>
                <td className='fs-3'>{employee.age}</td>
                <td className='fs-3'>{employee.email}</td>
                <td className='fs-3'>{employee.salary}</td>
                <td className='fs-3'>{employee.country}</td>
                <td className='fs-3'>{employee.state}</td>
                <td className='fs-3'>{employee.city}</td>

                <td
                  onClick={() => {
                    setUpdate('hello')
                  }}
                >
                  <button type='button' className='btn btn-primary btn-sm py-1'>
                    Update
                  </button>
                </td>

                <td onClick={() => handleDelete(employee._id)}>
                  <button type='button' className='btn btn-danger btn-sm py-1'>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}
