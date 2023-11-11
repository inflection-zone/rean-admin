import { CAREPLAN_BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from '../../common';

////////////////////////////////////////////////////////////////

export const createReflection = async (
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
  const url = CAREPLAN_BACKEND_API_URL + '/assets/reflections';
  return await post_(sessionId, url, body, true);
};

export const getReflectionById = async (sessionId: string, reflectionId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/reflections/${reflectionId}`;
  return await get_(sessionId, url, true);
};

export const searchReflections = async (sessionId: string, searchParams: any) => {
  let searchString = '';
  const keys = Object.keys(searchParams);
  if (keys.length > 0) {
    searchString = '?';

    for (const key of keys) {
      searchString += `${key}=${searchParams[key]}`;
    }
  }

  const url = CAREPLAN_BACKEND_API_URL + `/assets/reflections/search${searchString}`;
  return await get_(sessionId, url, true);
};

export const updateReflection = async (
  sessionId: string,
  reflectionId: string,
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
  const url = CAREPLAN_BACKEND_API_URL + `/assets/reflections/${reflectionId}`;
  return await put_(sessionId, url, body, true);
};

export const deleteReflection = async (sessionId: string, reflectionId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/reflection/${reflectionId}`;
  return await delete_(sessionId, url, true);
};
