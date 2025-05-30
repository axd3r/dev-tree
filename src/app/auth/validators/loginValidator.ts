import validator from 'validator';

interface Params {
    email: string;
    password: string;
}

const loginValidator = (params: Params): boolean => {
    if (!params || typeof params !== 'object') {
        throw new Error('Object invalid');
    }

    if (!params.email || validator.isEmpty(params.email)) {
        throw new Error('The email is required');
    }

    if (!params.password || validator.isEmpty(params.password)) {
        throw new Error('The password is required');
    }
    
    return true;
}

export default loginValidator;