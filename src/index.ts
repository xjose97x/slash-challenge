import { JSONObject } from './types';

function validateType(type: string, data: any): boolean {
  switch (type) {
    case 'object':
      return typeof data === 'object' && !Array.isArray(data);
    case 'array':
      return Array.isArray(data);
    case 'string':
    case 'boolean':
    case 'number':
      return typeof data === type;
  }
  return false;
}

function validateObjectKeys(objectKeys: string[], requiredKeys: string[], validKeys: string[]): boolean {
  const hasRequiredKeys = requiredKeys.every(key => objectKeys.includes(key));
  if (!hasRequiredKeys) {
    return false;
  }
  const hasOnlyKnownKeys = objectKeys.every(key => validKeys.includes(key));
  if (!hasOnlyKnownKeys) {
    return false;
  }
  return true;
}

export function validateSchema(data: any, schema: JSONObject): boolean {
  if (!validateType(schema.type, data)) {
    return false;
  }

  if (schema.type === 'string' && schema.enum) {
    return schema.enum.includes(data);
  }
  else if (schema.type === 'array') {
    return data.every(value => validateSchema(value, schema.items));
  }
  else if (schema.type === 'object') {
    if (!validateObjectKeys(Object.keys(data), schema.required, Object.keys(schema.properties))) {
      return false;
    }
    const areKeysValid = Object.entries(data).every(([key, value]) => validateSchema(value, schema.properties[key]))
    if (!areKeysValid) {
      return false;
    }
  }

  return true;
}
