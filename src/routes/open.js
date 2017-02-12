/*
 * Copyright (c) 2017, Hugo Freire <hugo@exec.sh>.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

const Route = require('./route')

const Joi = require('joi')
const Boom = require('boom')

const Browser = require('../browser')

class Open extends Route {
  constructor () {
    super('GET', '/open', 'Opens web page in headless browser', 'Returns opened web page')
  }

  handler ({ query }, reply) {
    const { url, iframe } = query

    return Browser.open(url, iframe)
      .then((report) => reply(null, report))
      .catch((error) => reply(Boom.badImplementation(error)))
  }

  validate () {
    return {
      query: {
        key: Joi.string()
          .optional()
          .description('the access API key'),
        url: Joi.string()
          .required()
          .description('the web page URL to open'),
        iframe: Joi.string()
          .optional()
          .description('the IFrame selector')
      },
      headers: Joi.object({
        'x-api-key': Joi.string()
          .optional()
          .description('the access API key')
      }).unknown()
    }
  }
}

module.exports = new Open()