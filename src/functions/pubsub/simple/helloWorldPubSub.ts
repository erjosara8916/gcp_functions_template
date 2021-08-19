import { decodeFromBase64 } from '../../../utils/base64';

export const helloWorldPubSub = <T>(event: { data: string }, _context: any): T => {
  const data = decodeFromBase64<T>(event.data);
  console.log(data);
  return data;
};
