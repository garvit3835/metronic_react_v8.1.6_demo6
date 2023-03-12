import React, {useState} from 'react'
import Form from '../components/form'
import List from '../components/list'

export default function Employees() {
  const [list, setList] = useState([])
  const [page, setPage] = useState(0)
  const [nextbtn, setNextbtn] = useState()
  return (
    <div>
      <Form setList={setList} page={page} setNextbtn={setNextbtn} />
      <List
        list={list}
        setList={setList}
        page={page}
        setPage={setPage}
        nextbtn={nextbtn}
        setNextbtn={setNextbtn}
      />
    </div>
  )
}
