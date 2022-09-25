import { Asset } from '../models';
import { entityCheck } from './generic';

export const assignAsset = async ({ id, company, assignee }) => Asset
  .findOneAndUpdate(
    { _id: id, company, isAvailable: true },
    {
      $set: {
        isAvailable: false,
        status: 'assigned',
        assignee
      }
    }
  ).then((entity) => entityCheck(entity, 'NOT FOUND'));

export const getAssetByAssignee = async (assignee) => Asset.find({ assignee });
