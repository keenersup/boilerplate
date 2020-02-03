import {AuthenticationError, SchemaDirectiveVisitor} from 'apollo-server-express';
import {defaultFieldResolver, GraphQLField} from "graphql";
import {Roles} from '../types/enum';

class AdminDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field: GraphQLField<any, any>) {
        const {resolve = defaultFieldResolver} = field;
        field.resolve = async function (...args) {

            const [, , context] = args;
            if (context.user.roles !== Roles.admin) {
                throw new AuthenticationError('permission denied')
            }

            return resolve.apply(this, args)
        }
    }
}

export default AdminDirective