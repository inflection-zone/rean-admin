import { CAREPLAN_BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from '../../common';

////////////////////////////////////////////////////////////////

export const createExercise = async (
  sessionId: string,
  name: string,
  description: string,
  exerciseType: string,
  intensityLevel: string,
  recommendedDurationMin: number,
  tags: string[],
  version: string
) => {
  const body = {
    Name: name,
    Description: description,
    ExerciseType: exerciseType,
    IntensityLevel: intensityLevel,
    RecommendedDurationMin: recommendedDurationMin,
    Tags: tags,
    Version: !version || version?.length === 0 ? 'V 1.0' : version,
  };

  const url = CAREPLAN_BACKEND_API_URL + '/assets/exercises';
  return await post_(sessionId, url, body, true, false);
};

export const getExerciseById = async (sessionId: string, exerciseId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/exercises/${exerciseId}`;
  return await get_(sessionId, url, true, false);
};

export const searchExercise = async (sessionId: string, searchParams) => {
  let searchString = '';
  const keys = Object.keys(searchParams);
  if (keys.length > 0) {
    searchString = '?';
    for (const key of keys) {
      searchString += `${key}=${searchParams[key]}`;
    }
  }
  const url = CAREPLAN_BACKEND_API_URL + `/assets/exercises/search${searchString}`;
  return await get_(sessionId, url, true, false);
};

export const updateExercise = async (
  sessionId: string,
  exerciseId: string,
  name: string,
  description: string,
  exerciseType: string,
  intensityLevel: string,
  recommendedDurationMin: number,
  tags: string[],
  version: string
) => {
  const body = {
    Name: name,
    Description: description,
    ExerciseType: exerciseType,
    IntensityLevel: intensityLevel,
    RecommendedDurationMin: recommendedDurationMin,
    Tags: tags,
    Version: !version || version?.length === 0 ? 'V 1.0' : version,
  };
  console.log("body", body)
  const url = CAREPLAN_BACKEND_API_URL + `/assets/exercises/${exerciseId}`;
  return await put_(sessionId, url, body, true, false);
};

export const deleteExercise = async (sessionId: string, exerciseId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/exercises/${exerciseId}`;
  return await delete_(sessionId, url, true, false);
};
