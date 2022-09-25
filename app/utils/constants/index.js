import apiMessage from './api.messages';
import httpStatusCodes from './http.status.codes';
import enums from './enum';

export default {
  ...apiMessage,
  ...httpStatusCodes,
  ...enums
};
