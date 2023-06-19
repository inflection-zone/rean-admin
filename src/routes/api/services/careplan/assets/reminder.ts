import { CAREPLAN_BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from '../../common';

////////////////////////////////////////////////////////////////

export const createReminder = async (
  sessionId: string,
  // assetCode: string,
  name: string,
  description: string,
  tags: string[],
  version: string
) => {
  const body = {
    // AssetCode: assetCode,
    Name: name,
    Description: description,
    Tags: tags,
    Version: !version || version?.length === 0 ? 'V 1.0' : version,
  };
  const url = CAREPLAN_BACKEND_API_URL + '/assets/reminders';
  return await post_(sessionId, url, body, true);
};

export const getReminderById = async (sessionId: string, reminderId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/reminders/${reminderId}`;
  return await get_(sessionId, url, true);
};

export const searchReminders = async (sessionId: string, searchParams: any) => {
  let searchString = '';
  const keys = Object.keys(searchParams);
  if (keys.length > 0) {
    searchString = '?';
    for (const key of keys) {
      searchString += `${key}=${searchParams[key]}`;
    }
  }
  const url = CAREPLAN_BACKEND_API_URL + `/assets/reminders/search${searchString}`;
  return await get_(sessionId, url, true);
};

export const updateReminder = async (
  sessionId: string,
  reminderId: string,
  // assetCode: string,
  name: string,
  description: string,
  tags: string[],
  version: string
) => {
  const body = {
    // AssetCode: assetCode,
    Name: name,
    Description: description,
    Tags: tags,
    Version: version
  };

  const url = CAREPLAN_BACKEND_API_URL + `/assets/reminders/${reminderId}`;

  return await put_(sessionId, url, body, true);
};

export const deleteReminder = async (sessionId: string, reminderId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/reminder/${reminderId}`;
  return await delete_(sessionId, url, true);
};