import PropTypes from "prop-types";
import { useState } from "react"
import { Form } from "react-bootstrap";

const FormSearch = ({getMovies}) => {
    const [valuesForm, setValuesForm] = useState({})

    const handleInputChange = ({target}) => {
        setValuesForm({
            ...valuesForm,
            [target.name] : target.value
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        getMovies(`/api/v1/movies?keyword=${valuesForm.keyword}`)
    }

  return (
    <Form onSubmit={handleSubmit} className="d-flex"> 
    <div className="input-group mb-3">
      <input type='text' name='keyword' className='form-control' onChange={handleInputChange} />
      <button className='btn btn-putline-dark' type='submit'><i className='fa fa-search'></i></button>
      </div>
    </Form>
  )
}

export default FormSearch


FormSearch.prototypes = {
  getMovies : PropTypes.func
}