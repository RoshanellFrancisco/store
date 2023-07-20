// tracing.js

'use strict';
const HoneycombSDK = require('@honeycombio/opentelemetry-node').HoneycombSDK;
const getNodeAutoInstrumentations = require('@opentelemetry/auto-instrumentations-node').getNodeAutoInstrumentations;
require("dotenv").config();
const NodeTracerProvider = require('@opentelemetry/sdk-trace-node');
const registerInstrumentations = require('@opentelemetry/instrumentation');
const HttpInstrumentation = require('@opentelemetry/instrumentation-http');
const ExpressInstrumentation = require('@opentelemetry/instrumentation-express');


const provider = new NodeTracerProvider();
provider.register();

registerInstrumentations({
  instrumentations: [
    // Express instrumentation expects HTTP layer to be instrumented
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
  ],
});

// uses the HONEYCOMB_API_KEY and OTEL_SERVICE_NAME environment variables
const sdk = new HoneycombSDK({
    instrumentations: [    
        getNodeAutoInstrumentations({
            // we recommend disabling fs autoinstrumentation since it can be noisy
            // and expensive during startup
            '@opentelemetry/instrumentation-fs': {
                enabled: false,
            },
        }),
    ],
});

sdk.start();