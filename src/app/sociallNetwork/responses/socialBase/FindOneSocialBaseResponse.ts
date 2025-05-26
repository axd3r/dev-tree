export const FindOneSocialBaseResponse = {
    success: (socialBase: any) => ({
        status: 201,
        message: 'socialBase created',
        data: socialBase
    }),

    notFound: () => ({
        status: 404,
        message: 'Social Base not found',
    }),

    serverError: (error: any) => ({
        status: 500,
        message: 'Server Error',
        error: error.message || error,
    }),
};