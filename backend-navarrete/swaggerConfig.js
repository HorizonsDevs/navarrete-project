const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Navarrete Beef Jerky API',
            version: '1.0.0',
            description: 'API for managing products and orders in Navarrete Beef Jerky',
        },
        servers: [
            {
                url: 'http://localhost:3000', // Change this URL when deployed
            },
        ],
    },
    apis: ['./index.js'], // File(s) containing API documentation
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = swaggerDocs;
