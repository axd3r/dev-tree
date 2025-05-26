export const UpdateSocialBaseResponse = {
    success: (socialBase: any) => ({
      status: 200,
      message: 'Data Updated',
      data: socialBase,
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