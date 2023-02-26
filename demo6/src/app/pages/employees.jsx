import React, {useState} from 'react'
import Form from '../components/form'
import List from '../components/list'
import Update from '../components/update'

export default function Employees() {
  const [list, setList] = useState()
  return (
    <div>
		  <Form list={list} setList={setList} />
      <List list={list} setList={setList} />
      {/* <Update /> */}
    </div>
  )
}
