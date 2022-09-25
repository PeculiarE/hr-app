import { model, Schema as _Schema } from 'mongoose';
import { constants } from '../utils';

const { MARITAL_STATUS, WORK_FORMAT } = constants;

const employeeSchema = _Schema(
  {
    firstName: { type: String, required: true, index: true, lowercase: true },
    lastName: { type: String, required: true, index: true, lowercase: true },
    middleName: { type: String, index: true, lowercase: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    maritalStatus: { type: String, enum: MARITAL_STATUS, lowercase: true },
    company: { type: _Schema.Types.ObjectId, ref: 'Company', required: true },
    department: { type: _Schema.Types.ObjectId, ref: 'Department' },
    employmentInfo: {
      hireDate: { type: Date },
      exitDate: { type: Date },
      workFormat: { type: String, enum: WORK_FORMAT, lowercase: true }
    },
    password: { type: String },
    salt: { type: String },
    isAdmin: { type: Boolean, default: false }
  },
  { timestamps: true }
);

employeeSchema.index({ company: 1, email: 1 }, { unique: true });

const Employee = model('Employee', employeeSchema);

export default Employee;
