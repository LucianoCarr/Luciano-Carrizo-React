export const validate = values => {
    const errors = {};

    if (!values.title) {
      errors.title = 'Titulo requerido';
    }
  
    if (!values.length) {
      errors.length = 'Duracion requerida';
    } 
  
    if (!values.rating) {
        errors.rating = 'Rating requerido';
      }

      if (!values.awards) {
        errors.awards = 'Premios requerido';
      }

      if (!values.release_date) {
        errors.release_date = 'Fecha de estreno requerido';
      }

      if (!values.genre_id) {
        errors.genre_id = 'Genero requerido';
      }
  
    return errors;
  };