import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { Form, FormControl, FormGroup, FormLabel } from "react-bootstrap"
import PropTypes from "prop-types";
//import validate from "../validations/movie-validator";
import { validate } from "../validations/movie-validator";


const FormMovie = ({handleAddMovie, handleUpdateMovie, movie, setMovie}) => {

  const [genres, setGenres] =  useState([])

  const getGenres = async () => {
    let response = await fetch(`${import.meta.env.VITE_APP_API_URL}/genres`)
    let result = await response.json()

    setGenres(result.data)
  }

  useEffect(() => {
    getGenres()
  }, [])

  useEffect(() => {
    if (movie) {
      formik.setValues({
        title : movie.title,
        length : movie.length,
        rating : movie.rating,
        awards : movie.awards,
        release_date : movie.release_date.split('T')[0],
        genre_id : movie.genre ? movie.genre.id : null,
      })
    }
  },[movie])

  const formik = useFormik({
    initialValues : {
      title :  "",
      length : "",
      rating : "",
      awards : "",
      release_date : "",
      genre_id : "",
    },
    validate,
    onSubmit : (values) => {
      movie ? handleUpdateMovie(movie.id, values) : handleAddMovie(values)
      formik.handleReset()
    }
  })

  const handleCancel = () => {
    setMovie(null),
    formik.handleReset()
  }
  
  return (
    <Form className="row" onSubmit={formik.handleSubmit}>
      {/* Titulo */}
<FormGroup className="form-floating mb-3">
  <FormControl type="text" name="title" onChange={formik.handleChange} value={formik.values.title} className="form-control"  placeholder="Titulo" />
  {
    formik.errors.title && <small className="ms-2 text-danger">{formik.errors.title}</small>
  } 
  <FormLabel>Titulo</FormLabel>
</FormGroup>
{/* Duracion */}
<FormGroup className="form-floating mb-3">
  <FormControl type="number" name="length" onChange={formik.handleChange} value={formik.values.length} placeholder="Duracion" />
  {
    formik.errors.length && <small className="ms-2 text-danger">{formik.errors.length}</small>
  } 
  <FormLabel>Duracion</FormLabel>
</FormGroup>
{/* Rating */}
<FormGroup className="form-floating mb-3">
  <FormControl type="number" name="rating" onChange={formik.handleChange} value={formik.values.rating} placeholder="Rating" />
  {
    formik.errors.rating && <small className="ms-2 text-danger">{formik.errors.rating}</small>
  } 
  <FormLabel >Rating</FormLabel>
</FormGroup>
{/* Premios */}
<FormGroup className="form-floating mb-3">
  <FormControl type="number" name="awards" onChange={formik.handleChange} value={formik.values.awards} placeholder="Premios" />
  {
    formik.errors.awards && <small className="ms-2 text-danger">{formik.errors.awards}</small>
  } 
  <FormLabel >Premios</FormLabel>
</FormGroup>
{/* Fecha */}
<FormGroup className="form-floating mb-3">
  <FormControl type="date" name="release_date" onChange={formik.handleChange} value={formik.values.release_date} placeholder="Premios" />
  {
    formik.errors.release_date && <small className="ms-2 text-danger">{formik.errors.release_date}</small>
  } 
  <FormLabel >Fecha de Estreno</FormLabel>
</FormGroup>
{/* Genero */}
<FormGroup className="form-floating mb-3">
<select className="form-control" name="genre_id" onChange={formik.handleChange} value={formik.values.genre_id} placeholder="Genero">
  <option hidden defaultChecked>
    Genero
  </option>
  {
    genres.map(({name, id}) => <option key={id} value={id}>{name}</option>)
  }
  </select>
  {
    formik.errors.genre_id && <small className="ms-2 text-danger">{formik.errors.genre_id}</small>
  } 
</FormGroup>

<button type="submit" className="w-100 mb-3" variant="outline-dark">Guardar</button>
<button onClick={handleCancel} className="w-100" variant="outline-secondary">Cancelar</button>
    </Form>  
  )
}

export default FormMovie


FormMovie.prototypes = {
  handleAddMovie : PropTypes.func,
  handleUpdateMovie : PropTypes.func,
  movie : PropTypes.object,
  setMovie : PropTypes.func
}