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

export const getAssetsByAssignee = async (assigneeIds) => {
  const assets = await Asset.find({ assignee: { $in: assigneeIds } });
  return assigneeIds.map((assigneeId) => assets.filter(
    (asset) => `${asset.assignee}` === `${assigneeId}`
  ));
};
