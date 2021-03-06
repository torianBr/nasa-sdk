// @flow
import {
  handleResult,
  sendRequest,
  validateDate,
} from './util';
const baseurl = 'api.nasa.gov';
const endpointbase = '/EPIC/api/';

export default function epic(): Object {
  function validateType(type: string): string {
    const validTypes = ['natural', 'enhanced'];
    const i = validTypes.indexOf(type.toLowerCase());
    return i === -1 ? '' : validTypes[i];
  }

  return {

    fetch: (type: string): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed => {
        if (!type) return reject(new Error('Image quality type is required'));
        const validType = validateType(type);
        if (!validType) return reject(new Error('Invalid image quality type'));
        return sendRequest(
          baseurl,
          `${endpointbase}${validType}`,
          {},
          resolve,
          reject,
          handleResult
        );
      }),

    date: (type: string, date: string): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed => {
        if (!type) return reject(new Error('Image quality type is required'));
        const validType = validateType(type);
        if (!validType) return reject(new Error('Invalid image quality type'));
        if (!date) return reject(new Error('date is required'));
        if (!validateDate(date)) return reject(new Error('date must be in "YYYY-MM-DD" format'));
        return sendRequest(
          baseurl,
          `${endpointbase}${type}/date/${date}`,
          {},
          resolve,
          reject,
          handleResult
        );
      }),

    all: (type: string): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed => {
        if (!type) return reject(new Error('Image quality type is required'));
        const validType = validateType(type);
        if (!validType) return reject(new Error('Invalid image quality type'));
        return sendRequest(
          baseurl,
          `${endpointbase}${type}/all`,
          {},
          resolve,
          reject,
          handleResult
        );
      }),

    available: (type: string): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed => {
        if (!type) return reject(new Error('Image quality type is required'));
        const validType = validateType(type);
        if (!validType) return reject(new Error('Invalid image quality type'));
        return sendRequest(
          baseurl,
          `${endpointbase}${type}/available`,
          {},
          resolve,
          reject,
          handleResult
        );
      }),

  };
}
