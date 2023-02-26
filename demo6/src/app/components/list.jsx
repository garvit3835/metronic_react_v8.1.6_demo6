import React, {useState, useEffect} from 'react'
import Update from './update'
import axios from 'axios'

export default function List({list, setList}) {
  //   const [list, setList] = useState()
  const [update, setUpdate] = useState('hello')
  //   const [count, setCount] = useState(0)

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/employees/delete/${id}`)
      .then(async (res) => await setList(res.data))
  }

  useEffect(() => {
    axios.get('http://localhost:5000/api/employees')
    .then(async (res) => await setList(res.data))
  }, [])

  console.log(list)
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
