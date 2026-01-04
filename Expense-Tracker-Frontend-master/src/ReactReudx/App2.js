import React from 'react'
import { connect } from 'react-redux'
import { DeAction, InAction } from './Action'
const App2 = ({count,InAction,DeAction}) => {
  return (
    <div>
        <center>
            <h2>Hello World</h2>
            <h1> Value is : {count}</h1>
            <button onClick={InAction}  className='border-2 w-max-md h-5 px-2 py-5 m-auto bg-blue-700'> Increment </button>
            <button onClick={DeAction}  className='border-2 w-max-md h-5 px-2 py-5 m-auto bg-blue-700'> Decrement </button>
        </center>
    
    </div>
  )
}

const mapStateToProps =(state) =>
({
    count:state
})

export default  connect(mapStateToProps,{InAction,DeAction}) (App2)
