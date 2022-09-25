export const validateInput = (schema, object) => schema.validateAsync(object);

export const calcNoOfPages = (total, limit = 10) => {
  const displayPage = Math.floor(total / limit);
  return total % limit ? displayPage + 1 : displayPage;
};

export const countDocuments = async (model, filter) => model.countDocuments(filter);

export const getPageCount = async (model, filter, limit = 10) => {
  const count = await countDocuments(model, filter);
  return calcNoOfPages(count, limit);
};
