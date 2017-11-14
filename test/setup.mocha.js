/* globals expect: true, describe: true, it: true, sinon: true */

require('babel-register')()

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const sinon = require('sinon')

chai.use(chaiAsPromised)

const expect = chai.expect

global.expect = expect
global.sinon = sinon
