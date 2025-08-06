import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import { NodeConnectionType, NodeOperationError } from 'n8n-workflow';

import * as bcrypt from 'bcryptjs';

export class Bcryptjs implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Bcryptjs',
		name: 'bcryptjs',
		icon: 'file:bcryptjs.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Perform password hashing and verification using bcryptjs',
		defaults: {
			name: 'Bcryptjs',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Compare Password',
						value: 'compare',
						description: 'Asynchronously compare password with hash',
						action: 'Compare password',
					},
					{
						name: 'Generate Salt',
						value: 'genSalt',
						description: 'Asynchronously generate salt value',
						action: 'Generate salt',
					},
					{
						name: 'Get Rounds',
						value: 'getRounds',
						description: 'Get the number of rounds used in the hash',
						action: 'Get rounds',
					},
					{
						name: 'Get Salt',
						value: 'getSalt',
						description: 'Extract salt portion from hash',
						action: 'Get salt',
					},
					{
						name: 'Hash Password',
						value: 'hash',
						description: 'Asynchronously hash password',
						action: 'Hash password',
					},
					{
						name: 'Test Truncation',
						value: 'truncates',
						description: 'Test if password will be truncated',
						action: 'Test truncation',
					},
				],
				default: 'hash',
			},
			{
				displayName: 'Rounds',
				name: 'rounds',
				type: 'number',
				default: 10,
				description: 'The cost of processing the data. Default is 10.',
				displayOptions: {
					show: {
						operation: ['genSalt', 'hash'],
					},
				},
			},
			{
				displayName: 'Minor Version',
				name: 'minor',
				type: 'options',
				options: [
					{
						name: 'A',
						value: 'a',
					},
					{
						name: 'B',
						value: 'b',
					},
				],
				default: 'b',
				description: 'The minor version of bcrypt to use',
				displayOptions: {
					show: {
						operation: ['genSalt'],
					},
				},
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				placeholder: 'Password to hash or compare',
				description: 'The password to process',
				displayOptions: {
					show: {
						operation: ['hash', 'compare', 'truncates'],
					},
				},
			},
			{
				displayName: 'Salt or Rounds',
				name: 'saltOrRounds',
				type: 'string',
				default: '',
				placeholder: 'Salt value or number of rounds',
				description: 'Salt value to use for hashing, or number specifying rounds',
				displayOptions: {
					show: {
						operation: ['hash'],
					},
				},
			},
			{
				displayName: 'Hash',
				name: 'hash',
				type: 'string',
				default: '',
				placeholder: 'Hash value to compare',
				description: 'The hash value to compare against the password',
				displayOptions: {
					show: {
						operation: ['compare', 'getRounds', 'getSalt'],
					},
				},
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				options: [
					{
						displayName: 'Output Field Name',
						name: 'outputField',
						type: 'string',
						default: 'result',
						description: 'Field name where the result will be saved',
					},
				],
			},

		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const operation = this.getNodeParameter('operation', 0) as string;
		const options = this.getNodeParameter('options', 0) as {
			outputField?: string;
		};

		for (let i = 0; i < items.length; i++) {
			const item = items[i];
			let result: any;

			try {
				switch (operation) {
					case 'genSalt': {
						const rounds = this.getNodeParameter('rounds', i) as number;
						result = await bcrypt.genSalt(rounds);
						break;
					}

					case 'hash': {
						const password = this.getNodeParameter('password', i) as string;
						const saltOrRounds = this.getNodeParameter('saltOrRounds', i) as string;

						// Try to convert saltOrRounds to number, use as string if conversion fails
						let saltOrRoundsValue: string | number = saltOrRounds;
						const numericValue = parseInt(saltOrRounds, 10);
						if (!isNaN(numericValue) && numericValue.toString() === saltOrRounds) {
							saltOrRoundsValue = numericValue;
						}

						result = await bcrypt.hash(password, saltOrRoundsValue);
						break;
					}

					case 'compare': {
						const password = this.getNodeParameter('password', i) as string;
						const hash = this.getNodeParameter('hash', i) as string;

						result = await bcrypt.compare(password, hash);
						break;
					}

					case 'getRounds': {
						const hash = this.getNodeParameter('hash', i) as string;
						result = bcrypt.getRounds(hash);
						break;
					}

					case 'getSalt': {
						const hash = this.getNodeParameter('hash', i) as string;
						result = bcrypt.getSalt(hash);
						break;
					}

					case 'truncates': {
						const password = this.getNodeParameter('password', i) as string;
						result = bcrypt.truncates(password);
						break;
					}

					default:
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
				}

				// Build output data
				const outputFieldName = options.outputField || 'result';
				const newItem: INodeExecutionData = {
					json: {
						...item.json,
						[outputFieldName]: result,
					},
				};

				returnData.push(newItem);
			} catch (error) {
				// If error continues, throw error to stop execution
				throw new NodeOperationError(this.getNode(), `Bcryptjs ${operation} operation failed: ${error.message}`);
			}
		}

		return [returnData];
	}
}
