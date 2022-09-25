/* eslint-disable class-methods-use-this */
import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';

class AdminDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const resolve = field ? field.resolve : defaultFieldResolver;
    field.resolve = async function resolver(...args) {
      const { employee } = args[2];
      if (employee.isAdmin) {
        return resolve.apply(this, args);
      }
      throw new Error('FORBIDDEN');
    };
  }
}

export default AdminDirective;
