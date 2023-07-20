// tracing.js

'use strict';
const HoneycombSDK = require('@honeycombio/opentelemetry-node').HoneycombSDK;
const getNodeAutoInstrumentations = require('@opentelemetry/auto-instrumentations-node').getNodeAutoInstrumentations;
require("dotenv").config();

// prisma adding imports works with honeycomb
const {SemanticResourceAttributes} = require ('@opentelemetry/semantic-conventions')
const { OTLPTraceExporter } = require ('@opentelemetry/exporter-trace-otlp-http')
const { registerInstrumentations } = require ('@opentelemetry/instrumentation')
const { SimpleSpanProcessor } = require ('@opentelemetry/sdk-trace-base')
const { NodeTracerProvider } = require ('@opentelemetry/sdk-trace-node')
const { PrismaInstrumentation } = require ('@prisma/instrumentation')
const { Resource } = require ( '@opentelemetry/resources')

//prisma
// const {
//   SemanticResourceAttributes,
// } = require("@opentelemetry/semantic-conventions");
// const {
//   OTLPTraceExporter,
// } = require("@opentelemetry/exporter-trace-otlp-http");
// const { registerInstrumentations } = require("@opentelemetry/instrumentation");
// const { SimpleSpanProcessor } = require("@opentelemetry/sdk-trace-base");
// const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
// const { PrismaInstrumentation } = require("@prisma/instrumentation");
// const { Resource } = require("@opentelemetry/resources");

// // Configure the trace provider
// const provider = new NodeTracerProvider({
//   resource: new Resource({
//     [SemanticResourceAttributes.SERVICE_NAME]: 'example application',
//   }),
// })

// // Configure how spans are processed and exported. In this case we're sending spans
// // as we receive them to an OTLP-compatible collector (e.g. Jaeger).
// provider.addSpanProcessor(new SimpleSpanProcessor(new OTLPTraceExporter()))

// // Register your auto-instrumentors
// registerInstrumentations({
//   tracerProvider: provider,
//   instrumentations: [new PrismaInstrumentation()],
// })

// // Register the provider globally
// provider.register()
// uses the HONEYCOMB_API_KEY and OTEL_SERVICE_NAME environment variables
const sdk = new HoneycombSDK({
    instrumentations: [ 
      new PrismaInstrumentation(),   
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