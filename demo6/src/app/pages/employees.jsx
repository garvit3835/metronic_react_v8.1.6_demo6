import React, {useState} from 'react'
import Form from '../components/form'
import List from '../components/list'

export default function Employees() {
  const [list, setList] = useState()
  return (
    <div>
		  <Form setList={setList} />
      <List list={list} setList={setList} />
    </div>
  )
}
