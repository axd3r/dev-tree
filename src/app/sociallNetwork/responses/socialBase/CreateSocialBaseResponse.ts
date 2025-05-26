export const CreateSocialBaseResponse = {
    success: (socialBase: any) => {
      return {
        status: 201,
        message: 'socialBase created',
        data: socialBase
      };
    },
  
    serverError: (error: any) => {
      return {
        status: 500,
        message: 'Server Error',
        error: error.message || error
      };
    }
  };
  