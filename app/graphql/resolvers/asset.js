import { Asset } from '../../models';
import { GenericService, AssetService } from '../../services';
import { helpers, constants } from '../../utils';

const { createNewEntity, getCompanyEntity, findSingleEntity } = GenericService;

const { assignAsset } = AssetService;

const {
  ResponseHelper: { nonPaginatedGraphQLResponse, paginatedGraphQLResponse,
    graphQLErrorResolver } } = helpers;
const {
  RESOURCE_ADDED_OK, RESOURCE_FETCHED_OK,
  ADD_ERROR_STATUS, FETCH_ERROR_STATUS,
  httpStatusCodes: { CREATED, OK },
} = constants;

const assetResolvers = {
  Query: {
    fetchAssets: async (_, { filter, page }, ctx) => {
      try {
        const { employee: { company } } = ctx;
        const { data, hasNextPage } = await getCompanyEntity(
          Asset, { page, filters: { company, ...filter } }
        );
        return page
          ? paginatedGraphQLResponse(OK, RESOURCE_FETCHED_OK('Assets'), data, hasNextPage)
          : nonPaginatedGraphQLResponse(OK, RESOURCE_FETCHED_OK('Assets'), data);
      } catch (err) {
        return graphQLErrorResolver(err, FETCH_ERROR_STATUS('Assets'));
      }
    },
    fetchSingleAsset: async (_, { id }, ctx) => {
      try {
        const { employee: { company } } = ctx;
        const asset = await findSingleEntity(Asset, { company, _id: id });
        return nonPaginatedGraphQLResponse(OK, RESOURCE_FETCHED_OK('Asset'), asset);
      } catch (err) {
        return graphQLErrorResolver(err, FETCH_ERROR_STATUS('Asset'));
      }
    }
  },

  Mutation: {
    addNewAsset: async (_, { data }, ctx) => {
      try {
        const { employee: { company } } = ctx;
        await createNewEntity(Asset, { ...data, company });
        return nonPaginatedGraphQLResponse(CREATED, RESOURCE_ADDED_OK('Asset'), null);
      } catch (err) {
        let errorMsg;
        if (err.code === 11000) errorMsg = { message: 'DUPLICATED', resource: 'Asset\'s serial no' };
        return graphQLErrorResolver({ ...err, ...errorMsg }, ADD_ERROR_STATUS('Asset'));
      }
    },
    assignAsset: async (_, { data }, ctx) => {
      try {
        const { employee: { company } } = ctx;
        await assignAsset({ ...data, company });
        return nonPaginatedGraphQLResponse(OK, 'Asset assigned successfully', null);
      } catch (err) {
        err.resource = 'Available asset with the provided ID';
        return graphQLErrorResolver(err, 'ASSIGN_ASSET_ERROR');
      }
    }
  },

  Asset: {
    company: async (parent, _, { loaders }) => loaders.companyLoader.load(parent.company),
    assignee: async (parent, _, { loaders }) => loaders.employeeLoader.load(parent.assignee)
  }
};

export default assetResolvers;
