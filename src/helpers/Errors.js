// Liste des erreurs que l'API peut renvoyer

const list = {
  noGamesError: {
    code: 500,
    error: 'noGamesError',
    error_description: 'La base ne contient pas de Game'
  },
  noGameError: {
    code: 500,
    error: 'noGameError',
    error_description: 'Ce Game n\'existe pas'
  },
  noBookingsError: {
    code: 500,
    error: 'noBookingsError',
    error_description: 'La base ne contient pas de booking'
  },
  noBookingError: {
    code: 500,
    error: 'noBookingError',
    error_description: 'Ce booking n\'existe pas'
  },
};

export default (err) => {
  if (err instanceof Error && err.message){
    return list[err.message] ? list[err.message] : { code: 500, error: 'UnknownError', error_description: 'Unknown error' };
  } else {
    return list[err] ? list[err] : { code: 500, error: 'UnknownError', error_description: 'Unknown error' };
  }
};