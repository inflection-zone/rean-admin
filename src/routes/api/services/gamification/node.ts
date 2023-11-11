import { AWARDS_BACKEND_API_URL, AWARDS_SERVICE_API_KEY } from '$env/static/private';
import { delete_, get_, post_, put_ } from '../common';

////////////////////////////////////////////////////////////////

export const createNode = async (
	sessionId: string,
	schemaId: string,
	parentNodeId: string,
	name: string,
	description: string,
	type: string,
	actionType: string,
	actionName: string,
	message: string,
	outputTag: string,
	destinationType: string,
	recordType: string,
	sourceType: string,
	filters: string[],
	inputTag: string,
	dataActionType: string,
	keyDataType: string,
	keyName: string,
	valueDataType: string,
	valueName: string,
	value: boolean,
	operator: string,
	continuityCount: number,
	storageKeys: string[]
) => {
	let inputParams = {};
	if (actionType === 'Extract-Data') {
		inputParams = {
			RecordType: recordType,
			SourceType: sourceType,
			Filters: filters
		};
	}
	if (actionType === 'Compare-Data') {
		inputParams = {
			RecordType: recordType,
			SourceType: sourceType,
			InputTag: inputTag,
			DataActionType: dataActionType,
			Filters: filters
		};
	}
	if (actionType === 'Process-Data') {
		inputParams = {
			RecordType: recordType,
			SourceType: sourceType,
			InputTag: inputTag,
			DataActionType: dataActionType,
			KeyDataType: keyDataType,
			KeyName: keyName,
			ValueDataType: valueDataType,
			ValueName: valueName,
			Value: value,
			Operator: operator,
			ContinuityCount: continuityCount
		};
	}
	if (actionType === 'Store-Data') {
		inputParams = {
			RecordType: recordType,
			SourceType: sourceType,
			InputTag: inputTag,
			StorageKeys: storageKeys
		};
	}
	console.log('actionType----------', actionType);
	console.log('inputParams----------', inputParams);
	const body = {
		ParentNodeId: parentNodeId,
		SchemaId: schemaId,
		Name: name,
		Description: description ? description : null,
		Type: type,
		Action: {
			ActionType: actionType,
			Name: actionName,
			InputParams: inputParams,
			OutputParams: {
				Message: message,
				OutputTag: outputTag,
				DestinationType: destinationType
			}
		}
	};
	const url = AWARDS_BACKEND_API_URL + '/engine/nodes';
	return await post_(sessionId, url, body, true, true, AWARDS_SERVICE_API_KEY);
};

export const getNodeById = async (sessionId: string, nodeId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/engine/nodes/${nodeId}`;
	return await get_(sessionId, url, true, true, AWARDS_SERVICE_API_KEY);
};

export const searchNodes = async (sessionId: string, searchParams?: any) => {
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
	const url = AWARDS_BACKEND_API_URL + `/engine/nodes/search${searchString}`;
	return await get_(sessionId, url, true, true, AWARDS_SERVICE_API_KEY);
};

export const updateNode = async (
	sessionId: string,
	nodeId: string,
	parentNodeId: string,
	name: string,
	description: string,
	type: string,
	actionType: string,
	actionName: string,
	message: string,
	outputTag: string,
	destinationType: string,
	recordType: string,
	sourceType: string,
	filters: string[],
	inputTag: string,
	dataActionType: string,
	keyDataType: string,
	keyName: string,
	valueDataType: string,
	valueName: string,
	value: boolean,
	operator: string,
	continuityCount: number,
	storageKeys: string[]
) => {
	let inputParams = {};
	if (actionType === 'Extract-Data') {
		inputParams = {
			RecordType: recordType,
			SourceType: sourceType,
			Filters: filters
		};
	}
	if (actionType === 'Compare-Data') {
		inputParams = {
			RecordType: recordType,
			SourceType: sourceType,
			InputTag: inputTag,
			DataActionType: dataActionType,
			Filters: filters
		};
	}
	if (actionType === 'Process-Data') {
		inputParams = {
			RecordType: recordType,
			SourceType: sourceType,
			InputTag: inputTag,
			DataActionType: dataActionType,
			KeyDataType: keyDataType,
			KeyName: keyName,
			ValueDataType: valueDataType,
			ValueName: valueName,
			Value: value,
			Operator: operator,
			ContinuityCount: continuityCount
		};
	}
	if (actionType === 'Store-Data') {
		inputParams = {
			RecordType: recordType,
			SourceType: sourceType,
			InputTag: inputTag,
			StorageKeys: storageKeys
		};
	}

	const body = {
		ParentNodeId: parentNodeId,
		Name: name,
		Description: description ? description : null,
		Type: type,
		Action: {
			ActionType: actionType,
			Name: actionName,
			InputParams: inputParams,
			OutputParams: {
				Message: message,
				OutputTag: outputTag,
				DestinationType: destinationType
			}
		}
	};
	const url = AWARDS_BACKEND_API_URL + `/engine/nodes/${nodeId}`;
	return await put_(sessionId, url, body, true, true, AWARDS_SERVICE_API_KEY);
};

export const deleteNode = async (sessionId: string, nodeId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/engine/nodes/${nodeId}`;
	return await delete_(sessionId, url, true, true, AWARDS_SERVICE_API_KEY);
};
