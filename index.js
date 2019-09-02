// Adds an IP address to Keystone lists

const { Text } = require("@keystone-alpha/fields");

const composeResolveInput = (originalHook, newHook) => async params => {
  let { resolvedData } = params;
  if (originalHook) {
    resolvedData = await originalHook(params);
  }
  return newHook({ ...params, resolvedData });
};

const ipTracking = ({ fieldName = "ip", ...fieldOptions } = {}) => ({
  fields = {},
  hooks = {},
  ...rest
}) => {
  const ipField = {
    type: Text,
    defaultAccess: false, // By default this field cannot be read by anyone
    ...fieldOptions
  };

  fields[fieldName] = ipField;

  const newResolveInput = ({ resolvedData, originalInput, context }) => {
    if (Object.keys(originalInput).length === 0) {
      return resolvedData;
    }

    resolvedData[fieldName] =
      context.req.headers["x-forwarded-for"] ||
      context.req.connection.remoteAddress ||
      null;

    return resolvedData;
  };

  const originalResolveInput = hooks.resolveInput;
  hooks.resolveInput = composeResolveInput(
    originalResolveInput,
    newResolveInput
  );
  return { fields, hooks, ...rest };
};

module.exports = { ipTracking };
