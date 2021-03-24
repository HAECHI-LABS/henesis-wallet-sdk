/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CoinsController } from './../src/v2/eth/coins.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { EventsController } from './../src/v2/eth/events.controller';
import * as express from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "CoinDTO": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
            "ticker": {"dataType":"string","required":true},
            "address": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "blockchain": {"dataType":"string","required":true},
            "decimals": {"dataType":"double","required":true},
            "attributes": {"dataType":"array","array":{"dataType":"string"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EventStatus": {
        "dataType": "refEnum",
        "enums": ["PENDING_APPROVAL","REJECTED","REQUESTED","PENDING","FAILED","REVERTED","REPLACED","MINED","CONFIRMED"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BN": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EthCallEvent": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "createdAt": {"dataType":"string","required":true},
            "updatedAt": {"dataType":"string","required":true},
            "status": {"ref":"EventStatus","required":true},
            "transactionHash": {"dataType":"string"},
            "walletId": {"dataType":"string","required":true},
            "transactionId": {"dataType":"string"},
            "orgId": {"dataType":"string"},
            "masterWalletId": {"dataType":"string"},
            "confirmation": {"ref":"BN","required":true},
            "fromAddress": {"dataType":"string","required":true},
            "toAddress": {"dataType":"string","required":true},
            "data": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pagination_EthCallEvent_": {
        "dataType": "refObject",
        "properties": {
            "pagination": {"dataType":"nestedObjectLiteral","nestedProperties":{"totalCount":{"dataType":"double","required":true},"previousUrl":{"dataType":"string","required":true},"nextUrl":{"dataType":"string","required":true}},"required":true},
            "results": {"dataType":"array","array":{"ref":"EthCallEvent"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Timestamp": {
        "dataType": "refAlias",
        "type": {"dataType":"double","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TransferType": {
        "dataType": "refEnum",
        "enums": ["WITHDRAWAL","DEPOSIT"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WalletType": {
        "dataType": "refEnum",
        "enums": ["MASTER_WALLET","USER_WALLET"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ValueTransferEvent": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "createdAt": {"dataType":"string","required":true},
            "updatedAt": {"dataType":"string","required":true},
            "status": {"ref":"EventStatus","required":true},
            "transactionHash": {"dataType":"string"},
            "walletId": {"dataType":"string","required":true},
            "transactionId": {"dataType":"string"},
            "orgId": {"dataType":"string"},
            "masterWalletId": {"dataType":"string"},
            "confirmation": {"ref":"BN","required":true},
            "amount": {"ref":"BN","required":true},
            "decimals": {"dataType":"double","required":true},
            "coinSymbol": {"dataType":"string","required":true},
            "from": {"dataType":"string","required":true},
            "to": {"dataType":"string","required":true},
            "transferType": {"ref":"TransferType","required":true},
            "walletName": {"dataType":"string","required":true},
            "walletType": {"ref":"WalletType","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pagination_ValueTransferEvent_": {
        "dataType": "refObject",
        "properties": {
            "pagination": {"dataType":"nestedObjectLiteral","nestedProperties":{"totalCount":{"dataType":"double","required":true},"previousUrl":{"dataType":"string","required":true},"nextUrl":{"dataType":"string","required":true}},"required":true},
            "results": {"dataType":"array","array":{"ref":"ValueTransferEvent"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.get('/api/v2/eth/coins/:coinTicker',
            function CoinsController_getCoin(request: any, response: any, next: any) {
            const args = {
                    coinTicker: {"in":"path","name":"coinTicker","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new CoinsController();


            const promise = controller.getCoin.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v2/eth/coins',
            function CoinsController_getCoins(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new CoinsController();


            const promise = controller.getCoins.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v2/eth/events/call-events',
            function EventsController_getCallEvents(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    address: {"in":"query","name":"address","dataType":"string"},
                    toAddress: {"in":"query","name":"toAddress","dataType":"string"},
                    fromAddress: {"in":"query","name":"fromAddress","dataType":"string"},
                    transactionHash: {"in":"query","name":"transactionHash","dataType":"string"},
                    updatedAtGte: {"in":"query","name":"updatedAtGte","ref":"Timestamp"},
                    updatedAtLt: {"in":"query","name":"updatedAtLt","ref":"Timestamp"},
                    status: {"in":"query","name":"status","ref":"EventStatus"},
                    walletId: {"in":"query","name":"walletId","dataType":"string"},
                    orgId: {"in":"query","name":"orgId","dataType":"string"},
                    masterWalletId: {"in":"query","name":"masterWalletId","dataType":"string"},
                    transactionId: {"in":"query","name":"transactionId","dataType":"string"},
                    symbol: {"in":"query","name":"symbol","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new EventsController();


            const promise = controller.getCallEvents.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v2/eth/events/value-transfer-events',
            function EventsController_getValueTransferEvents(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    address: {"in":"query","name":"address","dataType":"string"},
                    toAddress: {"in":"query","name":"toAddress","dataType":"string"},
                    fromAddress: {"in":"query","name":"fromAddress","dataType":"string"},
                    transactionHash: {"in":"query","name":"transactionHash","dataType":"string"},
                    updatedAtGte: {"in":"query","name":"updatedAtGte","ref":"Timestamp"},
                    updatedAtLt: {"in":"query","name":"updatedAtLt","ref":"Timestamp"},
                    status: {"in":"query","name":"status","ref":"EventStatus"},
                    walletId: {"in":"query","name":"walletId","dataType":"string"},
                    orgId: {"in":"query","name":"orgId","dataType":"string"},
                    masterWalletId: {"in":"query","name":"masterWalletId","dataType":"string"},
                    transactionId: {"in":"query","name":"transactionId","dataType":"string"},
                    symbol: {"in":"query","name":"symbol","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new EventsController();


            const promise = controller.getValueTransferEvents.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus() || statusCode;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            data.pipe(response);
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors  = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    }
                case 'res':
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
