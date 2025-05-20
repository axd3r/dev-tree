export const DeleteUserResponse = {
    success: () => ({
      status: 200,
      message: 'Registro eliminado con exito',
    }),
  
    notFound: () => ({
      status: 404,
      message: 'Usuario no encontrado',
    }),
  
    serverError: (error: any) => ({
      status: 500,
      message: 'Error del servidor',
      error: error.message || error,
    }),
  };