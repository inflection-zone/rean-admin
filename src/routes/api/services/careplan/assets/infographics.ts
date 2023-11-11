import { CAREPLAN_BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from '../../common';
////////////////////////////////////////////////////////////////

export const createInfographics = async (
  sessionId: string,
  name: string,
  description: string,
  pathUrl: string,
  tags: string[],
  version: string
) => {
  const body = {
    Name: name,
    Description: description,
    Url: pathUrl,
    Tags: tags,
    Version: !version || version?.length === 0 ? 'V 1.0' : version,
  };
  const url = CAREPLAN_BACKEND_API_URL + '/assets/infographics';
  return await post_(sessionId, url, body, true, false);
};

export const getInfographicsById = async (sessionId: string, infographicsId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/infographics/${infographicsId}`;
  return await get_(sessionId, url, true, false);
};

export const searchInfographics = async (sessionId: string, searchParams) => {
  let searchString = '';
  const keys = Object.keys(searchParams);
  if (keys.length > 0) {
    searchString = '?';
    for (const key of keys) {
      searchString += `${key}=${searchParams[key]}`;
    }
  }

  const url = CAREPLAN_BACKEND_API_URL + `/assets/infographics/search${searchString}`;
  return await get_(sessionId, url, true, false);
};

export const updateInfographics = async (
  sessionId: string,
  infographicsId: string,
  name: string,
  description: string,
  pathUrl: string,
  tags: string[],
  version: string
) => {
  const body = {
    Name: name,
    Description: description,
    Url: pathUrl,
    Tags: tags,
    Version: !version || version?.length === 0 ? 'V 1.0' : version,
  };

  const url = CAREPLAN_BACKEND_API_URL + `/assets/infographics/${infographicsId}`;
  return await put_(sessionId, url, body, true, false);
};

export const deleteInfographics = async (sessionId: string, infographicsId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/infographics/${infographicsId}`;
  return await delete_(sessionId, url, true, false);
};
