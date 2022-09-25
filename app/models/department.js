import { model, Schema as _Schema } from 'mongoose';

const departmentSchema = _Schema(
  {
    name: { type: String, required: true, lowercase: true },
    company: { type: _Schema.Types.ObjectId, ref: 'Company', required: true }
  },
  { timestamps: true }
);

departmentSchema.index({ company: 1, name: 1 }, { unique: true });

const Department = model('Department', departmentSchema);

export default Department;
