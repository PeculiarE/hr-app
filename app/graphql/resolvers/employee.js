import { GenericService } from '../../services';
import { helpers, constants } from '../../utils';
import { Employee } from '../../models';

const {
  ResponseHelper: { nonPaginatedGraphQLResponse, paginatedGraphQLResponse,
    graphQLErrorResolver }
} = helpers;
const {
  RESOURCE_ADDED_OK,
  ADD_ERROR_STATUS,
  RESOURCE_FETCHED_OK,
  FETCH_ERROR_STATUS,
  httpStatusCodes: { CREATED, OK }
} = constants;
const { createNewEntity, getCompanyEntity, findSingleEntity } = GenericService;

const employeeResolvers = {
  Query: {
    fetchEmployees: async (_, { page }, ctx) => {
      try {
        const { employee: { company } } = ctx;
        logger.info('=========================================');
        const { data, hasNextPage } = await getCompanyEntity(
          Employee, { page, filters: { company } }
        );
        return page
          ? paginatedGraphQLResponse(OK, RESOURCE_FETCHED_OK('Employees'), data, hasNextPage)
          : nonPaginatedGraphQLResponse(OK, RESOURCE_FETCHED_OK('Employees'), data);
      } catch (err) {
        return graphQLErrorResolver(err, FETCH_ERROR_STATUS('Employees'));
      }
    },

    fetchSingleEmployee: async (_, { id }, ctx) => {
      try {
        const { employee: { company } } = ctx;
        const employee = await findSingleEntity(Employee, { company, _id: id });
        return nonPaginatedGraphQLResponse(OK, RESOURCE_FETCHED_OK('Employee'), employee);
      } catch (err) {
        return graphQLErrorResolver(err, FETCH_ERROR_STATUS('Employee'));
      }
    }
  },

  Mutation: {
    addNewEmployee: async (_, { data }, ctx) => {
      try {
        const { employee: { company } } = ctx;
        const employeeObj = {
          company,
          ...data
        };
        await createNewEntity(Employee, employeeObj);
        return nonPaginatedGraphQLResponse(CREATED, RESOURCE_ADDED_OK('Employee'), null);
      } catch (err) {
        let errorMsg;
        if (err.code === 11000) errorMsg = { message: 'DUPLICATED', resource: 'Email' };
        return graphQLErrorResolver({ ...err, ...errorMsg }, ADD_ERROR_STATUS('Employee'));
      }
    }
  },

  Employee: {
    company: async (parent, _, { loaders }) => loaders.companyLoader.load(parent.company),
    department: async (parent, _, { loaders }) => loaders.deptLoader.load(parent.department || []),
    assets: async (parent, _, { loaders }) => loaders.assetLoader.load(parent._id)
  }
};

export default employeeResolvers;
