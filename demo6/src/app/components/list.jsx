import React, {useState, useEffect} from 'react'
import {Country, State, City} from 'country-state-city'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {string} from 'yup'

export default function List({list, setList, page, setPage, nextbtn}) {
  const [employeeId, setEmployeeId] = useState()
  const [name, setName] = useState('')
  const [age, setAge] = useState()
  const [email, setEmail] = useState('')
  const [salary, setSalary] = useState()
  const [country, setCountry] = useState('')
  const [countryId, setCountryId] = useState('')
  const [stateId, setStateId] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('ascending')

  const countries = Country.getAllCountries()
  let states = []
  if (countryId) {
    states = State.getStatesOfCountry(countryId)
  }
  let cities = []
  if (stateId) {
    cities = City.getCitiesOfState(countryId, stateId)
  }

  useEffect(() => {
    if (nextbtn) {
      const nextPage = document.getElementById('nextPage')
      nextPage.disabled = false
    }
  }, [nextbtn])

  const handleDelete = async (id) => {
    const deleteBtn = document.getElementById(id)
    deleteBtn.innerHTML = 'Deleting...'
    deleteBtn.disabled = true
    await axios.delete(`http://localhost:5000/api/employees/delete/${id}/${page}`).then((res) => {
      const nextPage = document.getElementById('nextPage')
      setList(res.data)
      if (res.data.length < 3) {
        nextPage.disabled = true
      } else {
        nextPage.disabled = false
      }
    })
    deleteBtn.innerHTML = 'Delete'
    deleteBtn.disabled = false
  }

  useEffect(() => {
    axios.get(`http://localhost:5000/api/employees/${page}`).then((res) => {
      const nextPage = document.getElementById('nextPage')
      setList(res.data)
      if (res.data.length < 3) {
        nextPage.disabled = true
      } else {
        nextPage.disabled = false
      }
    })
    const prevPage = document.getElementById('prevPage')
    if (page === 0) {
      prevPage.disabled = true
    } else {
      prevPage.disabled = false
    }

    // .catch((document.getElementById('nextPage').disabled = true))
  }, [page])

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/employees/search/${search}`)
      .then((res) => setList(res.data))
      .then(() => {
        const nextPage = document.getElementById('nextPage')
        // const prevPage = document.getElementById('prevPage')
        if (search) {
          nextPage.disabled = true
          // prevPage.disabled = true
        } else {
          nextPage.disabled = false
          // prevPage.disabled = false
        }
      })
  }, [search])

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
    const res = await axios.put(`http://localhost:5000/api/employees/put/${page}`, data)
    if (res.data) {
      await setList(res.data)
    } else {
      toast.error('Enter a unique Email', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      })
    }
    setState('')
    setCity('')
    update.disabled = false
    update.innerText = 'Confirm Update'
  }

  const handleCountry = async (event) => {
    const countryData = await event.target.value.split('%')
    setCountry(countryData[0])
    setCountryId(countryData[1])
  }

  const sorting = (column) => {
    if (sort === 'ascending') {
      const sorted = [...list].sort((a, b) =>
        a[column].toLowerCase() > b[column].toLowerCase() ? 1 : -1
      )
      setList(sorted)
      setSort('descending')
    }

    if (sort === 'descending') {
      const sorted = [...list].sort((a, b) =>
        a[column].toLowerCase() < b[column].toLowerCase() ? 1 : -1
      )
      setList(sorted)
      setSort('ascending')
    }
  }

  const sortingNum = (column) => {
    if (sort === 'ascending') {
      const sorted = [...list].sort((a, b) =>
        a[column] > b[column] ? 1 : -1
      )
      setList(sorted)
      setSort('descending')
    }

    if (sort === 'descending') {
      const sorted = [...list].sort((a, b) =>
        a[column] < b[column] ? 1 : -1
      )
      setList(sorted)
      setSort('ascending')
    }
  }

  const handleState = async (event) => {
    const stateData = await event.target.value.split('%')
    setState(stateData[0])
    setStateId(stateData[1])
  }

  return (
    <>
      <input
        type='text'
        placeholder='Search Employee'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='form-control d-inline m-5 w-50 mx-10'
      />
      <form onSubmit={handleUpdate}>
        <table className='table table-sm'>
          <thead>
            <tr>
              <th scope='col' className='fs-3 fw-bold'>
                #
              </th>
              <th scope='col' className='fs-3 fw-bold' onClick={() => sorting('name')}>
                Name
              </th>
              <th scope='col' className='fs-3 fw-bold' onClick={() => sortingNum('age')}>
                Age
              </th>
              <th scope='col' className='fs-3 fw-bold' onClick={() => sorting('email')}>
                Email
              </th>
              <th scope='col' className='fs-3 fw-bold' onClick={() => sortingNum('salary')}>
                Salary
              </th>
              <th scope='col' className='fs-3 fw-bold' onClick={() => sorting('country')}>
                Country
              </th>
              <th scope='col' className='fs-3 fw-bold' onClick={() => sorting('state')}>
                State
              </th>
              <th scope='col' className='fs-3 fw-bold' onClick={() => sorting('city')}>
                City
              </th>
            </tr>
          </thead>

          {list &&
            list.map((employee, i) => {
              return (
                <tbody key={i}>
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
                        onClick={async () => {
                          if (employee._id !== employeeId) {
                            setEmployeeId(employee._id)
                            setName(employee.name)
                            setAge(employee.age)
                            setSalary(employee.salary)
                            setEmail(employee.email)
                          } else {
                            setEmployeeId()
                          }
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

                  {employeeId === employee._id && (
                    <tr>
                      <th className='fs-3'></th>

                      <td className='fs-4'>
                        <input
                          type='text'
                          placeholder='Enter name'
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className='form-control form-control-sm'
                        />
                      </td>
                      <td className='fs-4'>
                        <input
                          type='number'
                          id='age'
                          value={age}
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
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className='form-control form-control-sm w-100'
                        />
                      </td>
                      <td className='fs-4'>
                        <input
                          type='number'
                          placeholder='Enter salary'
                          value={salary}
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
                  )}
                </tbody>
              )
              // )
            })}
          {/* </tbody> */}
        </table>
      </form>
      <div>
        <button
          id='prevPage'
          onClick={() => setPage(page - 1)}
          className='btn btn-primary btn-sm py-1 m-2'
        >
          Previous Page
        </button>
        <button
          id='nextPage'
          onClick={() => setPage(page + 1)}
          className='btn btn-primary btn-sm py-1 m-2'
        >
          Next Page
        </button>
      </div>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
    </>
  )
}
