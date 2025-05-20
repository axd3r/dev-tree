export const FindOneSocialNetworkResponse = {
    success: (socialNetwork: any) => ({
        status: 201,
        message: 'socialNetwork created',
        data: socialNetwork
    }),

    notFound: () => ({
        status: 404,
        message: 'Social Network not found',
    }),

    serverError: (error: any) => ({
        status: 500,
        message: 'Server Error',
        error: error.message || error,
    }),
};