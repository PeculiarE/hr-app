import { Department } from '../../models';
import { GenericService, CompanyService } from '../../services';
import { helpers, constants } from '../../utils';

const {
  ResponseHelper: { nonPaginatedGraphQLResponse, paginatedGraphQLResponse, graphQLErrorResolver },
} = helpers;
const {
  RESOURCE_FETCHED_OK,
  RESOURCE_CREATED_OK,
  httpStatusCodes: { CREATED, OK },
  CREATE_ERROR_STATUS,
  FETCH_ERROR_STATUS
} = constants;
const { createNewEntity, findSingleEntity, getCompanyEntity } = GenericService;
const { getCompany } = CompanyService;

const departmentResolvers = {
  Query: {
    fetchAllDepartments: async (_, { page }, ctx) => {
      try {
        const { employee: { company } } = ctx;
        const { data, hasNextPage } = await getCompanyEntity(
          Department, { page, filters: { company } }
        );
        return page
          ? paginatedGraphQLResponse(OK, RESOURCE_FETCHED_OK('Departments'), data, hasNextPage)
          : nonPaginatedGraphQLResponse(OK, RESOURCE_FETCHED_OK('Departments'), data);
      } catch (err) {
        return graphQLErrorResolver(err, FETCH_ERROR_STATUS('Departments'));
      }
    },
    fetchSingleDepartment: async (_, { id }, ctx) => {
      try {
        const { employee: { company } } = ctx;
        const department = await findSingleEntity(Department, { company, _id: id });
        return nonPaginatedGraphQLResponse(OK, RESOURCE_FETCHED_OK('Department'), department);
      } catch (err) {
        return graphQLErrorResolver(err, FETCH_ERROR_STATUS('Department'));
      }
    },
  },

  Mutation: {
    addNewDepartment: async (_, { data }, ctx) => {
      try {
        const { employee: { company } } = ctx;
        await createNewEntity(Department, { ...data, company });
        return nonPaginatedGraphQLResponse(CREATED, RESOURCE_CREATED_OK('Department'), null);
      } catch (err) {
        let errorMsg;
        if (err.code === 11000) errorMsg = { message: 'DUPLICATED', resource: 'Department' };
        return graphQLErrorResolver({ err, ...errorMsg }, CREATE_ERROR_STATUS('Department'));
      }
    }
  },

  Department: {
    company: async (parent) => getCompany(parent.company)
  }
};

export default departmentResolvers;
