import DataLoader from 'dataloader';
import { getDepartments } from './department';
import { getCompany } from './company';
import { getEmployees } from './employee';
import { getAssetsByAssignee } from './asset';

const deptDataLoader = () => new DataLoader(getDepartments);

const companyDataLoader = () => new DataLoader(getCompany);

const employeeDataLoader = () => new DataLoader(getEmployees);

const assetDataLoader = () => new DataLoader(getAssetsByAssignee);

const dataLoaders = {
  deptLoader: deptDataLoader(),
  companyLoader: companyDataLoader(),
  employeeLoader: employeeDataLoader(),
  assetLoader: assetDataLoader()
};

export default dataLoaders;
