import { CAREPLAN_BACKEND_API_URL } from "$env/static/private";
import { delete_, get_, post_, put_ } from "./../common";

// ////////////////////////////////////////////////////////////////

export const createCareplan = async (
  sessionId: string,
  code: string,
  categoryId:string,
  name: string,
  description: string,
  tags: string[],
  version: string
      ) => {
    const url = CAREPLAN_BACKEND_API_URL + '/careplans';
    const body = {
        Code: code,
        CategoryId:categoryId,
        Name: name,
        Description: description ? description : null,
        Tags: tags,
        Version: !version || version?.length === 0 ? 'V 1.0' : version,
    };
    return await post_(sessionId, url, body, true, false);
};

export const getCareplanById = async (sessionId: string, careplanId: string) => {
    const url = CAREPLAN_BACKEND_API_URL + `/careplans/${careplanId}`;
    return await get_(sessionId, url,true, false);
};

export const searchCareplans = async (sessionId: string,
    searchParams? : any, 
    ) => {
    let searchString = '';
    if (searchParams) {
        const keys = Object.keys(searchParams);
        if (keys.length > 0) {
            searchString = '?';
            const params = [];
            for (const key of keys) {
                if (searchParams[key]) {
                    const param = `${key}=${searchParams[key]}`;
                    params.push(param);
                }
            }
            searchString += params.join('&');
        }
    }
    const url = CAREPLAN_BACKEND_API_URL + `/careplans/search${searchString}`;
    console.log('Timestamp ', new Date().toTimeString());
    return await get_(sessionId, url, true, false);
};

export const updateCareplan = async (
    sessionId: string,
    careplanId:string,
    code: string,
    categoryId:string,
    name: string,
    description: string,
    tags: string[],
    version: string) => {
    const url = CAREPLAN_BACKEND_API_URL + (`/careplans/${careplanId}`);
  const body = {
    Code: code,
        CategoryId:categoryId,
        Name: name,
        Description: description ? description : null,
        Tags: tags,
        Version: !version || version?.length === 0 ? 'V 1.0' : version,
  };
  return await put_(sessionId, url, body, true, false);
};

export const deleteCareplan = async (sessionId: string, careplanId: string) => {
    const url = CAREPLAN_BACKEND_API_URL + `/careplans/${careplanId}`;
    return await delete_(sessionId, url, true, false);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////

export const searchCareplanCategories = async (sessionId: string) => {
    const url = CAREPLAN_BACKEND_API_URL + `/careplan-categories/search`;
    return await get_(sessionId, url, true, false);
};
