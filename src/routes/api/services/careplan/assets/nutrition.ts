import { CAREPLAN_BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from '../../common';

////////////////////////////////////////////////////////////////

export const createNutrition = async (
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
  const url = CAREPLAN_BACKEND_API_URL + '/assets/nutritions';
  return await post_(sessionId, url, body, true, false);
};

export const getNutritionById = async (sessionId: string, nutritionId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/nutritions/${nutritionId}`;
  return await get_(sessionId, url, true, false);
};

export const searchNutrition = async (sessionId: string, searchParams: any) => {
  let searchString = '';
  const keys = Object.keys(searchParams);
  if (keys.length > 0) {
    searchString = '?';

    for (const key of keys) {
      searchString += `${key}=${searchParams[key]}`;
    }
  }
  const url = CAREPLAN_BACKEND_API_URL + `/assets/nutritions/search${searchString}`;
  return await get_(sessionId, url, true, false);
};

export const updateNutrition = async (
  sessionId: string,
  nutritionId: string,
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
  const url = CAREPLAN_BACKEND_API_URL + `/assets/nutritions/${nutritionId}`;
  return await put_(sessionId, url, body, true, false);
};

export const deleteNutrition = async (sessionId: string, nutritionId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/nutritions/${nutritionId}`;
  return await delete_(sessionId, url, true, false);
};
