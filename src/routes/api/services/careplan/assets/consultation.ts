import { CAREPLAN_BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from '../../common';

////////////////////////////////////////////////////////////////

export const createConsultation = async (
  sessionId: string,
  name: string,
  description: string,
  consultationType: string,
  tags: string[],
  version: string
) => {
  const body = {
    Name: name,
    Description: description,
    ConsultationType: consultationType,
    Tags: tags,
    Version: !version || version?.length === 0 ? 'V 1.0' : version,
  };
  const url = CAREPLAN_BACKEND_API_URL + '/assets/consultations';
  return await post_(sessionId, url, body, true, false);
};

export const getConsultationById = async (sessionId: string, consultationId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/consultations/${consultationId}`;
  return await get_(sessionId, url, true, false);
};

export const searchConsultation = async (sessionId: string, searchParams) => {
  let searchString = '';
  const keys = Object.keys(searchParams);
  if (keys.length > 0) {
    searchString = '?';
    for (const key of keys) {
      searchString += `${key}=${searchParams[key]}`;
    }
  }
  const url = CAREPLAN_BACKEND_API_URL + `/assets/consultations/search${searchString}`;
  return await get_(sessionId, url, true, false);
};

export const updateConsultation = async (
  sessionId: string,
  consultationId: string,
  name: string,
  description: string,
  consultationType: string,
  tags: string[],
  version: string
) => {
  const body = {
    Name: name,
    Description: description,
    ConsultationType: consultationType,
    Tags: tags,
    Version: !version || version?.length === 0 ? 'V 1.0' : version,
  };

  const url = CAREPLAN_BACKEND_API_URL + `/assets/consultations/${consultationId}`;
  return await put_(sessionId, url, body, true, false);
};

export const deleteConsultation = async (sessionId: string, consultationId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/consultations/${consultationId}`;
  return await delete_(sessionId, url, true, false);
};
