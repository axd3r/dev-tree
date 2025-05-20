export const CreateUserResponse = {
    success: (user: any) => {
      return {
        status: 201,
        message: 'Usuario creado exitosamente',
        data: user
      };
    },
  
    serverError: (error: any) => {
      return {
        status: 500,
        message: 'Error del servidor',
        error: error.message || error
      };
    }
  };
  