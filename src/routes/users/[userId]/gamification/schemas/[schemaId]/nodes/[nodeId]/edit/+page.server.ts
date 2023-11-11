import { redirect } from 'sveltekit-flash-message/server';
import { error, type RequestEvent } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createNode, getNodeById, searchNodes, updateNode } from '$routes/api/services/gamification/node';
import { getDataActionTypes, getEventActionTypes, getInputSourceTypes, getLogicalOperatorTypes, getOperandDataTypes, getOutputSourceTypes } from '$routes/api/services/gamification/types.js';
import type { PageServerLoad } from './$types';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
    const nodeId = event.params.nodeId;
		const schemaId = event.params.schemaId;
		const searchParams = {
			schemaId: schemaId
		};
    const _schemaNode = await getNodeById(sessionId,nodeId)
    const _eventActionTypes = await getEventActionTypes(sessionId);
    const _dataActionTypes = await getDataActionTypes(sessionId);
    const _inputSourceTypes = await getInputSourceTypes(sessionId);
    const _outputSourceTypes = await getOutputSourceTypes(sessionId);
    const _operandDataTypes = await getOperandDataTypes(sessionId);
		const _logicalOpratorTypes = await getLogicalOperatorTypes(sessionId);
		const _nodes = await searchNodes(sessionId,searchParams);
		if (_eventActionTypes.Status === 'failure' || _eventActionTypes.HttpCode !== 200) {
			throw error(_eventActionTypes.HttpCode, _eventActionTypes.Message);
		}

    const schemaNode = _schemaNode.Data;
   const eventActionTypes = _eventActionTypes.Data.Types;
	 const dataActionTypes = _dataActionTypes.Data.Types;
	 const inputSourceTypes = _inputSourceTypes.Data.Types;
	 const outputSourceTypes = _outputSourceTypes.Data.Types;
	 const operandDataTypes = _operandDataTypes.Data.Types;
	 const logicalOpratorTypes = _logicalOpratorTypes.Data.Types;
	 const nodes = _nodes.Data.Items;
	 
		return {
      eventActionTypes,
		  dataActionTypes,
			inputSourceTypes,
			outputSourceTypes,
			operandDataTypes,
			logicalOpratorTypes,
			nodes,
      schemaNode
		};
	} catch (error) {
		console.error(`Error retriving data: ${error.message}`);
	}
};

const updateNodeSchema = zfd.formData({
	nodeType: z.string(),
	parentNodeId: z.string().uuid().optional(),
	name: z.string().min(8).max(256),
	description: z.string().optional(),
	actionType: z.string().optional(),
  actionName:z.string().optional(),
	filters:z.string().optional(),
	recordType:z.string().optional(),
	sourceType:z.string().optional(),
	message:z.string().optional(),
	outputTag:z.string().optional(),
	destinationType:z.string().optional(),
	inputTag:z.string().optional(),
	dataActionType:z.string().optional(),
	keyDataType:z.string().optional(),
	keyName:z.string().optional(),
	valueDataType:z.string().optional(),
	valueName:z.string().optional(),
	value:zfd.checkbox({ trueValue: 'true' }),
	operator:z.string().optional(),
	continuityCount:zfd.numeric(z.number().optional()),
	storageKeys:z.string().optional(),
});

export const actions = {
	updateNodeAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const schemaId = event.params.schemaId;
		const nodeId = event.params.nodeId;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const formData = Object.fromEntries(data);
		
		type NodeSchema = z.infer<typeof updateNodeSchema>;

		let result: NodeSchema = {};
		try {
			result = updateNodeSchema.parse(formData);
			console.log('result', result);
		} catch (err: any) {
			const { fieldErrors: errors } = err.flatten();
			console.log(errors);
			const { ...rest } = formData;
			return {
				data: rest,
				errors
			};
		}
		let storageKeys;
		let filters;
		if (result.actionType === 'Store-Data'){
			storageKeys = JSON.parse(result.storageKeys as string)
		}
		if (result.actionType === 'Compare-Data' || result.actionType === 'Extract-Data'){
			filters = JSON.parse(result.filters as string)
			console.log("filters---------------",filters)
	}
	console.log("Action type", result.actionType);
	console.log("storageKeys", storageKeys);
	console.log("filters", filters);

		const response = await updateNode(
			sessionId,
			nodeId,
			result.parentNodeId,
			result.name,
			result.description,
      result.nodeType,
      result.actionType,
      result.actionName,
			result.message,
			result.outputTag,
			result.destinationType,
			result.recordType,
			result.sourceType,
			filters,
			result.inputTag,
			result.dataActionType,
			result.keyDataType,
			result.keyName,
			result.valueDataType,
			result.valueName,
		  result.value,
			result.operator,
			result.continuityCount,
			storageKeys
		);

		const id = response.Data.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(
				303,
				`/users/${userId}/gamification/schemas`,
				errorMessage(response.Message),
				event
			);
		}
		throw redirect(
			303,
			`/users/${userId}/gamification/schemas/${schemaId}/nodes/${id}/view`,
			successMessage(`Schema node updated successfully!`),
			event
		);
	}
};
