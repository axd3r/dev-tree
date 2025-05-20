export const FindOneUserResponse = {
  success: (user: any) => ({
    status: 200,
    message: 'Usuario encontrado',
    data: user,
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