'use strict';

import Confidence from 'confidence';

const criteria = {
    env: process.env.NODE_ENV
};

const config = {

  $meta: 'Our main Application config',

  pkg: require('../package.json'),

  server : {
    debug: {
      $filter: 'env',
      production: false,
      test: false,
      $default: {
        log: ['error'],
        request: ['error']
      }
    }
  },

  connection : {
    port : '8069',
    host : '0.0.0.0'
  },

  api: {
    swagger: {
      info: {
        title: 'echolon-project',
        description: 'API Documentation',
      },
      securityDefinitions: [{
        type: 'apiKey',
        in: 'header',
        name: 'Authorization'
      }]
    }
  },

  security: {
    saltWorkFactor: 10,
    jwtSecret: 'T6^9v@q24c&WVhUv)3.Zu3'
  },

  logging : {
    opsInterval: 1000,
    reporters: {
      $filter: 'env',
      test: [],
      $default: [{
        reporter: require('good-console'),
        events: { log: '*', response: '*' }
      }]
    }
  },

  aws: {
    accessKeyId: '',
    secretAccessKey: '',
    region: '' //aws region here, recommended: us-west-2
  },

  media: {
    bucket: '',
    cloudfront: '' //cloudfront URL here
  },

  db: {
    sequelize: {
      name: process.env.ECHOLON_PROJECT_DB_NAME,
      user: process.env.ECHOLON_PROJECT_DB_USER,
      pass: process.env.ECHOLON_PROJECT_DB_PASS,
      port: process.env.ECHOLON_PROJECT_DB_PORT,
      host: process.env.ECHOLON_PROJECT_DB_HOST,
      database: process.env.ECHOLON_PROJECT_DB_NAME,
      dialect: 'postgres',
      logging: {
        $filter: 'env',
        test: false,
        $default: console.log
      },
      models: 'server/**/*.Model.js',
      sequelize: {
        define: {
          paranoid: true // Data should never be deleted, only flagged as deleted
        }
      }
    }
  }

}

const store = new Confidence.Store(config);

export default {
  get(key) {
    return store.get(key, criteria);
  },
  meta(key) {
    return store.meta(key, criteria);
  }
}
