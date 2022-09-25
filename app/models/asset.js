import { model, Schema as _Schema } from 'mongoose';
import { constants } from '../utils';

const { ASSET_CATEGORY, ASSET_STATUS } = constants;

const assetSchema = _Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: _Schema.Types.ObjectId, ref: 'Company', required: true },
    category: { type: String, enum: ASSET_CATEGORY, required: true, lowercase: true },
    serialNo: { type: String, required: true, lowercase: true },
    isAvailable: { type: Boolean, default: true },
    status: { type: String, enum: ASSET_STATUS, default: 'unassigned', required: true, lowercase: true },
    assignee: { type: _Schema.Types.ObjectId, ref: 'Employee' }
  },
  { timestamps: true }
);

assetSchema.index({ company: 1, serialNo: 1 }, { unique: true });

const Asset = model('Asset', assetSchema);

export default Asset;
