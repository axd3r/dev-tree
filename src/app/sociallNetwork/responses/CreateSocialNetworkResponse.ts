export const CreateSocialNetworkResponse = {
    success: (socialNetwork: any) => {
      return {
        status: 201,
        message: 'socialNetwork created',
        data: socialNetwork
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
  