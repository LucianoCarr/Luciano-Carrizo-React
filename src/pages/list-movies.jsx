import { Card, CardBody, CardHeader, CardTitle, Col, Row, Table } from "react-bootstrap";
import TableItem from "../components/TableItem";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import FormSearch from "../components/FormSearch";
import FormMovie from "../components/FormMovie";
import { ShowMessageSuccess } from "../components/Toast";
import Swal from "sweetalert2";

const ListMovies = () => {

  const [movie, setMovie] = useState(null)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState()


    const getMovies = async (endpoint = "/api/v1/movies") => {
      try {
        setLoading(true)

        const response = await fetch(`http://localhost:3001${endpoint}`)
        const result = await response.json()

        setLoading(false)
        setMovies(result.data) 
        setPagination(result.meta)

        return result

      } catch (error) {
        console.log(error);
      }
    }
    
    useEffect(() => {
      getMovies()
  }, [])

  const handlePagination = async (endpoint) => {
    getMovies(endpoint)
  }

  const handleAddMovie = async(data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/movies`, {
        method : "POST",
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
      })

      const result = await response.json()

      ShowMessageSuccess(result.message)
      getMovies()


    } catch (error) {
      console.log(error);
    }
  };

  const handleEditMovie = async (id) => {
    try {

      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/movies/${id}`)
      const result = await response.json()

      result.ok && setMovie(result.data)

    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdateMovie = async (id, data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/movies/${id}`,{
        method : "PUT",
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
      })

      const result = await response.json()
      //console.log(result);
      setMovies(movies.map(movie => movie.id === result.data.id ? result.data : movie))
      setMovie(null)
      ShowMessageSuccess(result.message)

    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteMovie = async (id) => {

    Swal.fire({
      title: "Eliminar Pelicula?",
      showDenyButton: true,
      confirmButtonText: "Eliminar",
      confirmButtonColor: "red",
      denyButtonText: `Cancelar`,
      denyButtonColor: "grey"
    }).then(async(result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/movies/${id}`,{
            method : "DELETE",
          })
    
          const result = await response.json()
    
          if (result.ok) {
            ShowMessageSuccess(result.message)
            setMovies(movies.filter(movie => movie.id !== id))
          }
          
    
        } catch (error) {
          console.log(error);
        }
      } 
    });

   
  }


  return  loading ? (
     <Loading/> ) : (
      <Row className="w-100">
        <Col sm={12} md={6} lg={4}>
          <Card className="mb-3">
            <CardHeader>
              <CardTitle>{movie ? 'Editar' : 'Agregar'} Pelicula</CardTitle>
            </CardHeader>
          </Card>
        <CardBody>
        <FormMovie handleAddMovie={handleAddMovie} movie={movie} setMovie={setMovie} handleUpdateMovie={handleUpdateMovie} />
        </CardBody>
        </Col>
        <Col sm={12} md={6} lg={8}>
        <Card className="align-self-center w-100 p-3">
      <FormSearch getMovies={getMovies}/> 
      <CardBody>
        <div className="d-flex justify-content-end">
      <nav aria-label="Page navigation example">
  <ul className="pagination">
{
  pagination.currentPage !== 1 && (

    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous" onClick={() => handlePagination(`/api/v1/movies?page=${pagination.currentPage - 1}&limit=8`)}>
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
  )}
{
  pagination.pages.map(page => (
    <li key={page.number} className={`page-item ${page.number == pagination.currentPage && 'active'}`}>
      <a className="page-link" href="#" onClick={() => handlePagination(page.url)}>{page.number}</a></li>
  ))
}
{
  pagination.currentPage !== pagination.pages[pagination.pages.length -1].number && (

    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next" onClick={() => handlePagination(`/api/v1/movies?page=${pagination.currentPage + 1}&limit=8`)}>
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
)}
  </ul>
</nav>
</div>
    <Table>
    <thead striped bordeless>
      <tr>
        <th>Pelicula</th>
        <th>Duracion</th>
        <th>Rating</th>
        <th>Genero</th>
        <th>Premios</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
   {
     movies.map((movie) => ( <TableItem key={movie.id} movie={movie} handleEditMovie={handleEditMovie} handleDeleteMovie={handleDeleteMovie} /> ))
   /*  movies.map(({id, title, length, awards, rating, genre}) => ( <TableItem key={id} title={title} length={length} awards={awards} rating={rating} genre={genre} /> )) */
   }
   
   </tbody>
   </Table>
   </CardBody>
   </Card>
        </Col>
      </Row>
    
    )
  }

export default ListMovies
