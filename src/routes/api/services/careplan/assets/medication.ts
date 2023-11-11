import { CAREPLAN_BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from '../../common';

////////////////////////////////////////////////////////////////

export const createMedication = async (
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

  const url = CAREPLAN_BACKEND_API_URL + '/assets/medications';
  return await post_(sessionId, url, body, true, false);
};

export const getMedicationById = async (sessionId: string, medicationId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/medications/${medicationId}`;
  return await get_(sessionId, url, true, false);
};

export const searchMeditation = async (sessionId: string, searchParams: any) => {
  let searchString = '';
  const keys = Object.keys(searchParams);
  if (keys.length > 0) {
    searchString = '?';

    for (const key of keys) {
      searchString += `${key}=${searchParams[key]}`;
    }
  }
  const url = CAREPLAN_BACKEND_API_URL + `/assets/medications/search${searchString}`;
  return await get_(sessionId, url, true, false);
};

export const updateMedication = async (
  sessionId: string,
  medicationId: string,
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
  const url = CAREPLAN_BACKEND_API_URL + `/assets/medications/${medicationId}`;
  return await put_(sessionId, url, body, true, false);
};

export const deleteMedication = async (sessionId: string, assetId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/medications/${assetId}`;
  return await delete_(sessionId, url, true, false);
};
