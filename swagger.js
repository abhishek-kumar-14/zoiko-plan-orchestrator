const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Zoiko Mobile Plan API",
      version: "1.0.0",
      description: "API for accessing Zoiko mobile plans"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ["./server.js"]
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;