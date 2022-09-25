import { model, Schema as _Schema } from 'mongoose';
import { constants } from '../utils';

const { COMPANY_SIZE } = constants;

const companySchema = _Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, unique: true },
    industry: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    size: { type: String, enum: COMPANY_SIZE, required: true },
  },
  { timestamps: true }
);

const Company = model('Company', companySchema);

export default Company;
