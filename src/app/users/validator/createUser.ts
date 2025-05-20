import validator from "validator"

interface UseParams {
    name: string;
    lastname: string;
    nickname: string;
    email: string;
    password: string;
}

const UserValidator = (params: UseParams): boolean => {
    if(!params || typeof params !== "object"){
        throw new Error("This object is not valid whitd data User");
    }

    if(!params.name || validator.isEmpty(params.name)){
        throw new Error("The name needs a valid value");
    }

    if(!validator.isLength(params.name, {min:3, max: 50})){
        throw new Error("The name must be between 3 and 50 characters.");
    }

    if(!params.lastname || validator.isEmpty(params.lastname)){
        throw new Error("The lastname needs a valid value");
    }

    if(!validator.isLength(params.lastname, {min: 3, max: 50})){
        throw new Error("The lastname must be between 3 and 50 characters.");
    }

    if(!params.nickname || validator.isEmpty(params.nickname)){
        throw new Error("The nickname needs a valid value");
    }

    if(!validator.isLength(params.nickname, {min: 3, max: 50})){
        throw new Error("The nickname must be between 3 and 50 characters");
    }

    if(!params.email || validator.isEmpty(params.email)){
        throw new Error("The email needs a valid value");
    }

    if(!validator.isEmail(params.email)){
        throw new Error("The email does not contain the correct format");
    }

    if(!params.password || validator.isEmpty(params.password)){
        throw new Error("The password needs a valid value");
    }

    if(!validator.isLength(params.password, {min: 6})){
        throw new Error("The password needs min 6 characters");
    }
    
    return true;
}

export default UserValidator