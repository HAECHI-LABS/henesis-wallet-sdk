const API_VERSION = process.env.API_VERSION;
const ENDPOINT = process.env.ENDPOINT;

export function OpenApiNameGenerator() {
  return ENDPOINT ? ENDPOINT.toUpperCase() : "API PROXY";
}

export function OpenApiDescriptionGenerator() {
  return `Henesis API Proxy ${API_VERSION
    ? `- ${API_VERSION}`
    : ""}${ENDPOINT
    ? ` - ${ENDPOINT} `
    : ""}OpenAPI Documentation`;
}

export function OpenApiDocumentFileName() {
  return `./swagger/swagger-spec${API_VERSION
    ? `-${API_VERSION}`
    : ""}${ENDPOINT
    ? `-${ENDPOINT}`
    : ""}`;
}

export function OpenApiOperationId(controllerKey: string, methodKey: string) {
  return `${ENDPOINT ? `${ENDPOINT.toLowerCase()}-` : ""}${controllerKey}_${methodKey}`;
}