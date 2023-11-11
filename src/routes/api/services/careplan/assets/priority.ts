import { CAREPLAN_BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from '../../common';

////////////////////////////////////////////////////////////////

export const createPriority = async (
  sessionId: string,
  name: string,
  description: string,
  tags: string[],
  version: string
) => {
  const body = {
    Name: name,
    Description: description,
    Tags: tags,
    Version: !version || version?.length === 0 ? 'V 1.0' : version,
  };
  const url = CAREPLAN_BACKEND_API_URL + '/assets/priorities';
  return await post_(sessionId, url, body, true, false);
};

export const getPriorityById = async (sessionId: string, priorityId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/priorities/${priorityId}`;
  return await get_(sessionId, url, true, false);
};

export const searchPriority = async (sessionId: string, searchParams: any) => {
  let searchString = '';
  const keys = Object.keys(searchParams);
  if (keys.length > 0) {
    searchString = '?';

    for (const key of keys) {
      searchString += `${key}=${searchParams[key]}`;
    }
  }

  const url = CAREPLAN_BACKEND_API_URL + `/assets/priorities/search${searchString}`;
  return await get_(sessionId, url, true, false);
};

export const updatePriority = async (
  sessionId: string,
  priorityId: string,
  name: string,
  description: string,
  tags: string[],
  version: string
) => {
  const body = {
    Name: name,
    Description: description,
    Tags: tags,
    Version: !version || version?.length === 0 ? 'V 1.0' : version,
  };

  const url = CAREPLAN_BACKEND_API_URL + `/assets/priorities/${priorityId}`;
  return await put_(sessionId, url, body, true, false);
};

export const deletePriority = async (sessionId: string, priorityId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/priority/${priorityId}`;
  return await delete_(sessionId, url, true, false);
};
