type BaseTypes = 'string' | 'number' | 'object';
type ArrayTypes = `${BaseTypes}[]`;
export type Type = BaseTypes | ArrayTypes;

export type Response = {
	field: string;
	type: Type;
	description: string;
	allowedValues?: string[];
	max?: number;
	min?: number;
};
