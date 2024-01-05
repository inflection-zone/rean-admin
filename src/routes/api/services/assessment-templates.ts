import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';
import { ServerHelper } from '$lib/server/server.helper';
import { SessionManager } from '../session.manager';
import { API_CLIENT_INTERNAL_KEY } from '$env/static/private';
import * as fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';

////////////////////////////////////////////////////////////////

export const createAssessmentTemplate = async (
	sessionId: string,
	title: string,
	description: string,
	type: string,
	provider: string,
	providerAssessmentCode: string,
	serveListNodeChildrenAtOnce: boolean,
	scoringApplicable: boolean
) => {
	const body = {
		Title: title,
		Description: description ? description : null,
		Type: type,
		Provider: provider ? provider : null,
		ProviderAssessmentCode: providerAssessmentCode ? providerAssessmentCode : null,
		ServeListNodeChildrenAtOnce: serveListNodeChildrenAtOnce ? serveListNodeChildrenAtOnce : false,
		ScoringApplicable: scoringApplicable ? scoringApplicable : false
	};
	const url = BACKEND_API_URL + '/clinical/assessment-templates';
	return await post_(sessionId, url, body, true);
};

export const importAssessmentTemplate = async (
	sessionId: string,
	fileName:string,
	filePath:string,
	isPublic?:true
) => {
	const url = BACKEND_API_URL + '/clinical/assessment-templates/import-file';
	const session = await SessionManager.getSession(sessionId);
	const accessToken = session.accessToken;
	const mimeType = ServerHelper.getMimeTypeFromFileName(fileName);
	console.log(`mimeType = ${mimeType}`);
	const form = new FormData();
    form.append("name", fs.createReadStream(filePath));
	form.append("IsPublicResource", isPublic ? "true" : "false");

	const headers = {
        'Content-Type' : 'multipart/form-data',
        'x-api-key' : API_CLIENT_INTERNAL_KEY,
        'Authorization' : `Bearer ${accessToken}`,
    };

  	try{
		const res = await axios.post(url, form, { headers });
		//only for 201 status code
		const response = res.data;
		return response;
	}catch(error){
		//other than 201 status code
		return error.response.data;
	}
    
};

export const getAssessmentTemplateById = async (
	sessionId: string,
	assessmentTemplateId: string
) => {
	const url = BACKEND_API_URL + `/clinical/assessment-templates/${assessmentTemplateId}`;
	return await get_(sessionId, url, true);
};

export const searchAssessmentTemplates = async (sessionId: string, searchParams?: any) => {
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
	const url = BACKEND_API_URL + `/clinical/assessment-templates/search${searchString}`;
	return await get_(sessionId, url, true);
};

export const updateAssessmentTemplate = async (
	sessionId: string,
	assessmentTemplateId: string,
	title: string,
	description: string,
	type: string,
	provider: string,
	providerAssessmentCode: string,
	serveListNodeChildrenAtOnce: boolean,
	scoringApplicable: boolean
) => {
	const body = {
		Title: title,
		Description: description ? description : null,
		Type: type,
		Provider: provider ? provider : null,
		ProviderAssessmentCode: providerAssessmentCode ? providerAssessmentCode : null,
		ServeListNodeChildrenAtOnce: serveListNodeChildrenAtOnce ? serveListNodeChildrenAtOnce : false,
		ScoringApplicable: scoringApplicable ? scoringApplicable : false
	};

	const url = BACKEND_API_URL + `/clinical/assessment-templates/${assessmentTemplateId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteAssessmentTemplate = async (sessionId: string, assessmentTemplateId: string) => {
	const url = BACKEND_API_URL + `/clinical/assessment-templates/${assessmentTemplateId}`;
	return await delete_(sessionId, url, true);
};
