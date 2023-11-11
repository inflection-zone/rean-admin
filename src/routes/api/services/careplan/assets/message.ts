import { CAREPLAN_BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from '../../common';

////////////////////////////////////////////////////////////////

export const createMessage = async (
  sessionId: string,
  name: string,
  description: string,
  messagetype: string,
  tags: string[],
  Url: string,
  version: string
) => {
  const body = {
    Name: name,
    Description: description,
    MessageType: messagetype,
    Tags: tags,
    Url: Url,
    Version: !version || version?.length === 0 ? 'V 1.0' : version,
  };
  const url = CAREPLAN_BACKEND_API_URL + '/assets/messages';
  return await post_(sessionId, url, body, true, false);
};

export const getMessageById = async (sessionId: string, messageId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/messages/${messageId}`;
  return await get_(sessionId, url, true, false);
};

export const searchMessage = async (sessionId: string, searchParams: any) => {
  let searchString = '';
  const keys = Object.keys(searchParams);
  if (keys.length > 0) {
    searchString = '?';

    for (const key of keys) {
      searchString += `${key}=${searchParams[key]}`;
    }
  }
  const url = CAREPLAN_BACKEND_API_URL + `/assets/messages/search${searchString}`;
  return await get_(sessionId, url, true, false);
};

export const updateMessage = async (
  sessionId: string,
  messageId: string,
  name: string,
  description: string,
  messagetype: string,
  tags: string[],
  pathUrl: string,
  version: string
) => {
  const body = {
    Name: name,
    Description: description,
    MessageType: messagetype,
    Tags: tags,
    Url: pathUrl,
    Version: !version || version?.length === 0 ? 'V 1.0' : version,
  };
  const url = CAREPLAN_BACKEND_API_URL + `/assets/messages/${messageId}`;
  return await put_(sessionId, url, body, true, false);
};

export const deleteMessage = async (sessionId: string, messageId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/messages/${messageId}`;
  return await delete_(sessionId, url, true, false);
};
