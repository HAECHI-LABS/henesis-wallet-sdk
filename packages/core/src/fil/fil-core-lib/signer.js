const addressAsBytes = require("./utils");
const serializeBigNum = require("./data");
const cbor = require("ipld-dag-cbor").util;

const lowercaseKeys = require("lowercase-keys");

function transactionSerializeRaw(message) {
  message = lowercaseKeys(message);

  if (!("to" in message) || typeof message.to !== "string") {
    throw new Error("'to' is a required field and has to be a 'string'");
  }
  if (!("from" in message) || typeof message.from !== "string") {
    throw new Error("'from' is a required field and has to be a 'string'");
  }
  if (!("nonce" in message) || typeof message.nonce !== "number") {
    throw new Error("'nonce' is a required field and has to be a 'number'");
  }
  if (
    !("value" in message) ||
    typeof message.value !== "string" ||
    message.value === "" ||
    message.value.includes("-")
  ) {
    throw new Error(
      "'value' is a required field and has to be a 'string' but not empty or negative"
    );
  }
  if (!("gasfeecap" in message) || typeof message.gasfeecap !== "string") {
    throw new Error("'gasfeecap' is a required field and has to be a 'string'");
  }
  if (!("gaspremium" in message) || typeof message.gaspremium !== "string") {
    throw new Error(
      "'gaspremium' is a required field and has to be a 'string'"
    );
  }
  if (!("gaslimit" in message) || typeof message.gaslimit !== "number") {
    throw new Error("'gaslimit' is a required field and has to be a 'number'");
  }
  if (!("method" in message) || typeof message.method !== "number") {
    throw new Error("'method' is a required field and has to be a 'number'");
  }
  if (!("params" in message) || typeof message.params !== "string") {
    throw new Error("'params' is a required field and has to be a 'string'");
  }

  const to = addressAsBytes(message.to);
  const from = addressAsBytes(message.from);

  const value = serializeBigNum(message.value);
  const gasfeecap = serializeBigNum(message.gasfeecap);
  const gaspremium = serializeBigNum(message.gaspremium);

  const message_to_encode = [
    0,
    to,
    from,
    message.nonce,
    value,
    message.gaslimit,
    gasfeecap,
    gaspremium,
    message.method,
    Buffer.from(message.params, "base64"),
  ];

  return cbor.serialize(message_to_encode);
}

function transactionSerialize(message) {
  const raw_cbor = transactionSerializeRaw(message);
  return Buffer.from(raw_cbor).toString("hex");
}

module.exports = {
  transactionSerializeRaw,
  transactionSerialize,
};
