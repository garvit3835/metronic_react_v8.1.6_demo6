import React, {useState, useEffect} from 'react'
import {Country, State, City} from 'country-state-city'
import axios from 'axios'

export default function List({list, setList}) {
  const [employeeId, setEmployeeId] = useState()
  const [name, setName] = useState('')
  const [age, setAge] = useState()
  const [email, setEmail] = useState('')
  const [salary, setSalary] = useState()
  const [country, setCountry] = useState('')
  const [countryId, setCountryId] = useState()
  const [stateId, setStateId] = useState()
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const countries = Country.getAllCountries()
  let states = []
  if (countryId) {
    states = State.getStatesOfCountry(countryId)
  }
  let cities = []
  if (stateId) {
    cities = City.getCitiesOfState(countryId, stateId)
  }
  const handleDelete = async (id) => {
    const deleteBtn = document.getElementById(id)
    deleteBtn.innerHTML = 'Deleting...'
    deleteBtn.disabled = true
    await axios
      .delete(`http://localhost:5000/api/employees/delete/${id}`)
      .then((res) => setList(res.data))
    deleteBtn.innerHTML = 'Delete'
    deleteBtn.disabled = false
  }

  useEffect(() => {
    axios.get('http://localhost:5000/api/employees').then((res) => setList(res.data))
  }, [])

  const handleUpdate = async (event) => {
    event.preventDefault()
    const update = document.getElementById('update')
    update.innerText = 'Updating...'
    update.disabled = true
    const data = {
      id: employeeId,
      name: name,
      age: age,
      email: email,
      salary: salary,
      country: country,
      state: state,
      city: city,
    }
    const res = await axios.put('http://localhost:5000/api/employees/put', data)
    if (res.data) {
      await setList(res.data)
    } else {
      alert('Employee with this Email already exist')
    }

    update.disabled = false
    update.innerText = 'Confirm Update'
  }

  const handleCountry = async (event) => {
    const countryData = await event.target.value.split('%')
    setCountry(countryData[0])
    setCountryId(countryData[1])
  }

  const handleState = async (event) => {
    const stateData = await event.target.value.split('%')
    setState(stateData[0])
    setStateId(stateData[1])
  }

  return (
    <>
      <form onSubmit={handleUpdate}>
        <table className='table table-sm'>
          <thead>
            <tr>
              <th scope='col' className='fs-3 fw-bold'>
                #
              </th>
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
          {/* <tbody> */}
            {list &&
              list.map((employee, i) => {
                return <tbody key={i}>
                <tr>
                      <td className='fs-3'>{i + 1}</td>
                      <td className='fs-3'>{employee.name}</td>
                      <td className='fs-3'>{employee.age}</td>
                      <td className='fs-3'>{employee.email}</td>
                      <td className='fs-3'>{employee.salary}</td>
                      <td className='fs-3'>{employee.country}</td>
                      <td className='fs-3'>{employee.state}</td>
                      <td className='fs-3'>{employee.city}</td>

                      <td>
                        <button
                          type='button'
                          className='btn btn-primary btn-sm py-1'
                          onClick={() => {
                            employee._id !== employeeId
                              ? setEmployeeId(employee._id)
                              : setEmployeeId()
                          }}
                        >
                          Update
                        </button>
                      </td>

                      <td>
                        <button
                          type='button'
                          id={employee._id}
                          className='btn btn-danger btn-sm py-1'
                          onClick={() => {
                            handleDelete(employee._id)
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>

                    {employeeId === employee._id ? (
                      <tr>
                        <th className='fs-3'></th>

                        <td className='fs-4'>
                          <input
                            type='text'
                            placeholder='Enter name'
                            onChange={(e) => setName(e.target.value)}
                            required
                            className='form-control form-control-sm'
                          />
                        </td>
                        <td className='fs-4'>
                          <input
                            type='number'
                            id='age'
                            placeholder='Enter age'
                            onChange={(e) => setAge(e.target.value)}
                            min='10'
                            required
                            className='form-control form-control-sm w-100'
                          />
                        </td>
                        <td className='fs-4'>
                          <input
                            type='email'
                            placeholder='Enter email'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className='form-control form-control-sm w-100'
                          />
                        </td>
                        <td className='fs-4'>
                          <input
                            type='number'
                            placeholder='Enter salary'
                            onChange={(e) => setSalary(e.target.value)}
                            required
                            className='form-control form-control-sm w-100'
                          />
                        </td>
                        <td className='fs-4'>
                          <select
                            onChange={handleCountry}
                            defaultValue=''
                            required
                            className='form-control form-control-sm w-100'
                          >
                            <option value='' label='Select Country' disabled />
                            {countries.map((country, i) => {
                              return (
                                <option
                                  key={i}
                                  value={`${country.name}%${country.isoCode}`}
                                  label={country.name}
                                />
                              )
                            })}
                          </select>
                        </td>
                        <td className='fs-4'>
                          <select
                            onChange={handleState}
                            defaultValue=''
                            className='form-control form-control-sm w-100'
                          >
                            <option value='' label='Select State' disabled />
                            {states.map((state, i) => {
                              return (
                                <option
                                  key={i}
                                  value={`${state.name}%${state.isoCode}`}
                                  label={state.name}
                                />
                              )
                            })}
                          </select>
                        </td>
                        <td className='fs-4'>
                          <select
                            onChange={(e) => setCity(e.target.value)}
                            defaultValue=''
                            className='form-control form-control-sm w-100'
                          >
                            <option value='' label='Select City' disabled />
                            {cities.map((city, i) => {
                              return <option key={i} value={city.name} label={city.name} />
                            })}
                          </select>
                        </td>
                        <td colSpan='2'>
                          <button
                            id='update'
                            type='submit'
                            className='btn btn-primary btn-sm py-2'
                            // onClick={handleUpdate}
                            value='Confirm'
                          >
                            Confirm Update
                          </button>
                        </td>
                      </tr>
                    ) : (
                      ''
                    )}
                  </tbody>
                // )
              })}
          {/* </tbody> */}
        </table>
      </form>
    </>
  )
}
