import {ValidationError, ValidationErrorItem} from "@hapi/joi";

interface FormatError {
    [index: string]: string
}

const formatError = (err: ValidationError | any): FormatError | undefined => {
    //joi errors
    if ('isJoi' in err) {
        return err.details.reduce((acc: FormatError, cur: ValidationErrorItem) => {
            acc[`${cur.path[0]}`] = cur.message
            return acc
        }, {})
    }
    //mongoose validation errors
    else if ('errors' in err) {
        let errors: FormatError = {}
        Object.keys(err.errors).forEach(key => {
            errors[`${err.errors[key].path}`] = err.errors[key].message
        })
        return errors
    }
    //throw new Error format
    else {
        // console.log(err);
        // return {message: err.message}
        return err
    }
}

export default formatError
