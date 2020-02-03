import {SchemaDirectiveVisitor, AuthenticationError} from 'apollo-server-express';
import {GraphQLField, defaultFieldResolver} from "graphql";

 class AuthDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field: GraphQLField<any, any>) {
        const {resolve = defaultFieldResolver} = field;
        field.resolve = function (...args) {

            const [, , context] = args;
            if (!context.user) {
                throw new AuthenticationError('You must login.')
            }
            return resolve.apply(this, args)
        }
    }
}
export default AuthDirective
