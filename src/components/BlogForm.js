import React, { useState } from 'react'
import {IoIosAddCircle} from "react-icons/io"

const initInputs = {
  title: "",
  description: "",
  imgUrl: ""
}

export default function BlogForm(props){
  const [inputs, setInputs] = useState(initInputs)
  const {addBlog} = props

  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSubmit(e){
    e.preventDefault()
    addBlog(inputs)
    setInputs(initInputs)
  }

  const { title, description, imgUrl } = inputs
  return (
    <form onSubmit={handleSubmit}id='blog-form'>
      <input 
        type="text" 
        name="title" 
        value={title} 
        onChange={handleChange} 
        required={true}
        placeholder="Title"/>
      <input 
        type="text" 
        name="description" 
        value={description} 
        required={true}
        onChange={handleChange} 
        placeholder="Description"/>
      <input 
        type="text" 
        name="imgUrl" 
        value={imgUrl} 
        onChange={handleChange}
        placeholder="Image Url"/>
      <button id='add-blog'><IoIosAddCircle/></button>
    </form>
  )
  }