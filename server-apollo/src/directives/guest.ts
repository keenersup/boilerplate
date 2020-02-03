import {AuthenticationError, SchemaDirectiveVisitor} from 'apollo-server-express';
import {defaultFieldResolver, GraphQLField} from "graphql";

class GuestDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field: GraphQLField<any, any>) {
        const {resolve = defaultFieldResolver} = field;
        field.resolve = function (...args) {
            const [, , context] = args;

            /********* ********* ********* ********* ********* ********* ********* ********* *********
             todo: includes user change to admin
             ********* ********* ********* ********* ********* ********* ********* ********* *********/
            if (context.user) {
                throw new AuthenticationError('You are already logged in.')
            }
            return resolve.apply(this, args)
        }
    }
}

export default GuestDirective
