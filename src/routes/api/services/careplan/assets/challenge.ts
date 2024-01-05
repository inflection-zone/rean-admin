import { CAREPLAN_BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from '../../common';

////////////////////////////////////////////////////////////////

export const createChallenge = async (
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
  const url = CAREPLAN_BACKEND_API_URL + '/assets/challenges';
  return await post_(sessionId, url, body, true, false);
};

export const getChallengeById = async (sessionId: string, challengeId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/challenges/${challengeId}`;
  return await get_(sessionId, url, true, false);
};

export const searchChallenges = async (sessionId: string, searchParams) => {
  let searchString = '';
  const keys = Object.keys(searchParams);
  if (keys.length > 0) {
    searchString = '?';
    for (const key of keys) {
      searchString += `${key}=${searchParams[key]}`;
    }
  }
  const url = CAREPLAN_BACKEND_API_URL + `/assets/challenges/search${searchString}`;
  return await get_(sessionId, url, true, false);
};

export const updateChallenge = async (
  sessionId: string,
  challengeId: string,
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
  const url = CAREPLAN_BACKEND_API_URL + `/assets/challenges/${challengeId}`;
  return await put_(sessionId, url, body, true, false);
};

export const deleteChallenge = async (sessionId: string, challengeId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/challenges/${challengeId}`;
  return await delete_(sessionId, url, true, false);
};

