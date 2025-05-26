export const DeleteSocialBaseResponse = {
    success: () => ({
        status: 200,
        message: 'Deleted successfully',
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