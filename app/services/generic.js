import { helpers } from '../utils';

const {
  GenericHelper: { getPageCount }
} = helpers;

export const createNewEntity = async (model, data) => model.create(data);

export const getCompanyEntity = async (model, { page, filters, include = [], limit = 10 }) => {
  if (!page) {
    const entity = await model
      .find({ ...filters })
      .populate([...include])
      .sort({ updatedAt: -1 });
    return { data: entity };
  }
  const [data, pages] = await Promise.all([
    model
      .find({ ...filters })
      .sort({ updatedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate([...include]),
    getPageCount(model, { ...filters })
  ]);

  return { data, hasNextPage: pages > page };
};

export const findSingleEntity = async (model, filters) => model.findOne(filters);

export const entityCheck = (entity, msg) => {
  if (entity) {
    return entity;
  }
  throw new Error(msg);
};

export const rollBackEntityCreation = async (model, resource) => {
  if (resource) {
    return model.findByIdAndDelete(resource._id);
  }
  return false;
};
