import { http, pubsub } from '../src/index';

const getHttpFunction = async (req, res, module) => {
  const { params } = req;
  const { functionGroup, functionName } = params;
  const webhook = module[functionGroup][functionName];
  if (!webhook) {
    res.status(404).send('webhook not found');
  }

  const result = await webhook(req, res);
  return result;
};

const getFunctionNames = (group) => {
  const keys = Object.keys(group);
  const functionNames = keys.reduce((prev: string[], current) => {
    const keys = Object.keys(group[current]);
    keys.forEach((key) => {
      prev.push(`${current}.${key}`);
    });
    return prev;
  }, []);
  return functionNames;
};

const pubsubModule = async (req, res) => {
  const { body, params } = req;
  const { functionGroup, functionName } = params;
  const event = {
    data: Buffer.from(JSON.stringify(body)),
  };
  const context = {};
  const trigger = pubsub[functionGroup][functionName];
  if (!trigger) {
    res.status(404).send('trigger not found');
  }

  const result = await trigger(event, context);
  return res.json(result);
};

const httpModule = async (req, res) => {
  const result = await getHttpFunction(req, res, http);
  return result;
};

const gcpFunctions = {
  http: getFunctionNames(http),
  pubsub: getFunctionNames(pubsub),
};

export { gcpFunctions, httpModule, pubsubModule };
