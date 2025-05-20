export const DeleteSocialNetworkResponse = {
    success: () => ({
        status: 200,
        message: 'Deleted successfully',
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