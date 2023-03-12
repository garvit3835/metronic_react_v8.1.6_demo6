import React, {useState} from 'react'
import {Country, State, City} from 'country-state-city'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Form({setList, page, setNextbtn}) {
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

  const handleSubmit = async (event) => {
    event.preventDefault()
    const submit = document.getElementById('submit')
    submit.innerText = 'Submitting...'
    submit.disabled = true
    let data = {
      name: name,
      age: age,
      email: email,
      salary: salary,
      country: country,
      state: state,
      city: city,
    }
    const res = await axios.post(`http://localhost:5000/api/employees/insert/${page}`, data)
    if (res.data) {
      await setList(res.data)
      if (res.data.length >= 3) {
        setNextbtn(true)
      }
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

    submit.disabled = false
    submit.innerText = 'Submit'
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Enter name'
          onChange={(e) => setName(e.target.value)}
          required
          className='form-control w-25 d-inline m-5 mx-10'
        />
        <input
          type='number'
          placeholder='Enter age'
          onChange={(e) => setAge(e.target.value)}
          min='10'
          required
          className='form-control w-25 d-inline m-5 mx-10'
        />
        <input
          type='email'
          placeholder='Enter email'
          onChange={(e) => setEmail(e.target.value)}
          required
          className='form-control w-25 d-inline m-5 mx-10'
        />
        <input
          type='number'
          placeholder='Enter salary'
          onChange={(e) => setSalary(e.target.value)}
          required
          className='form-control w-25 d-inline m-5 mx-10'
        />

        <select
          onChange={handleCountry}
          defaultValue=''
          required
          className='form-control w-25 d-inline m-5 mx-10'
        >
          <option value='' label='Select Country' disabled />
          {countries.map((country, i) => {
            return (
              <option key={i} value={`${country.name}%${country.isoCode}`} label={country.name} />
            )
          })}
        </select>

        <select
          onChange={handleState}
          defaultValue=''
          className='form-control w-25 d-inline m-5 mx-10'
        >
          <option value='' label='Select State' disabled />
          {states.map((state, i) => {
            return <option key={i} value={`${state.name}%${state.isoCode}`} label={state.name} />
          })}
        </select>

        <select
          onChange={(e) => setCity(e.target.value)}
          defaultValue=''
          className='form-control w-25 d-inline m-5 mx-10'
        >
          <option value='' label='Select City' disabled />
          {cities.map((city, i) => {
            return <option key={i} value={city.name} label={city.name} />
          })}
        </select>

        <button
          type='submit'
          id='submit'
          className='btn btn-primary form-control w-25 d-inline m-5 mx-10'
        >
          Submit
        </button>
      </form>
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
    </div>
  )
}
