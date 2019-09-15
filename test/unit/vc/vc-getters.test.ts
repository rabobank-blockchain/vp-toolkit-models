/*
 * Copyright 2019 Coöperatieve Rabobank U.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as sinon from 'sinon'
import { assert } from 'chai'
import { IProof, IVerifiableCredential, Proof, VerifiableCredential } from '../../../src'
import { testCredentialParams } from '../test-helper'

describe('verifiable credential getters', function () {
  let clock: sinon.SinonFakeTimers
  const sut = new VerifiableCredential({
    id: testCredentialParams.id,
    type: testCredentialParams.type,
    issuer: testCredentialParams.issuer,
    issuanceDate: testCredentialParams.issuanceDate,
    credentialSubject: testCredentialParams.credentialSubject,
    proof: testCredentialParams.proof,
    credentialStatus: testCredentialParams.credentialStatus,
    '@context': testCredentialParams['@context']
  })

  beforeEach(() => {
    clock = sinon.useFakeTimers({
      now: new Date(2019, 0, 1, 12, 34),
      shouldAdvanceTime: false
    })
  })

  it('should return an unchanged id', () => {
    assert.strictEqual(sut.id, testCredentialParams.id)
  })

  it('should return an unchanged type', () => {
    assert.strictEqual(sut.type, testCredentialParams.type)
  })

  it('should return an issuer type', () => {
    assert.strictEqual(sut.issuer, testCredentialParams.issuer)
  })

  it('should return "issuanceDate" in ISO 8601 format', () => {
    // We are using UTC dates here so the unit test is deterministic
    const issued = new Date(Date.UTC(2019, 0, 30, 12, 23, 34, 456))
    const vcSut = new VerifiableCredential({
      id: testCredentialParams.id,
      type: testCredentialParams.type,
      issuer: testCredentialParams.issuer,
      issuanceDate: issued,
      credentialSubject: testCredentialParams.credentialSubject,
      proof: testCredentialParams.proof
    })

    assert.strictEqual(vcSut.issuanceDate, '2019-01-30T12:23:34.456Z')
  })

  it('should return an credential subject type', () => {
    assert.strictEqual(sut.credentialSubject, testCredentialParams.credentialSubject)
  })

  it('should return an proof type', () => {
    assert.deepEqual(sut.proof, new Proof(testCredentialParams.proof as IProof))
  })

  it('should set additional fields properly', () => {
    const vcSut = new VerifiableCredential({
      id: testCredentialParams.id,
      type: testCredentialParams.type,
      issuer: testCredentialParams.issuer,
      issuanceDate: testCredentialParams.issuanceDate,
      credentialSubject: testCredentialParams.credentialSubject,
      proof: testCredentialParams.proof,
      credentialStatus: testCredentialParams.credentialStatus,
      '@context': testCredentialParams['@context'],
      testFieldOne: 'abc',
      testFieldTwo: ['def'],
      testFieldThree: 3
    } as IVerifiableCredential)

    assert.equal(Object.keys(vcSut.additionalFields).length, 3)
    assert.deepEqual(vcSut.additionalFields['testFieldOne'], 'abc')
    assert.deepEqual(vcSut.additionalFields['testFieldTwo'], ['def'])
    assert.deepEqual(vcSut.additionalFields['testFieldThree'], 3)
  })

  it('should return a @context type through the regular context getter', () => {
    assert.deepEqual(sut.context, testCredentialParams['@context'])
  })

  it('should return a @context type', () => {
    assert.deepEqual(sut['@context'], testCredentialParams['@context'])
  })

  it('should return a correct flattened object with extra optional fields', () => {
    const proof = testCredentialParams.proof as IProof
    const vcSut = new VerifiableCredential({
      id: testCredentialParams.id,
      type: testCredentialParams.type,
      issuer: testCredentialParams.issuer,
      issuanceDate: testCredentialParams.issuanceDate,
      credentialSubject: testCredentialParams.credentialSubject,
      proof: proof,
      credentialStatus: testCredentialParams.credentialStatus,
      '@context': testCredentialParams['@context'],
      testFieldOne: 'abc',
      testFieldTwo: ['def'],
      testFieldThree: 3
    } as IVerifiableCredential)

    assert.deepEqual(JSON.stringify(vcSut), `{"id":"did:protocol:address","type":["VerifiableCredential"],"issuer":"did:protocol:issueraddress","issuanceDate":"${testCredentialParams.issuanceDate.toISOString()}","credentialSubject":{"id":"did:protocol:holderaddress","type":"John"},"proof":{"type":"SignatureAlgorithmName","created":"${proof.created.toISOString()}","verificationMethod":"verification method","nonce":"${proof.nonce}"},"credentialStatus":{"type":"vcStatusRegistry2019","id":"0x6AbAAFB672f60C16C604A29426aDA1Af9d96d440"},"@context":["https://www.w3.org/2018/credentials/v1","https://schema.org/givenName"],"testFieldOne":"abc","testFieldTwo":["def"],"testFieldThree":3}`)
  })

  it('should return an unchanged context', () => {
    assert.deepStrictEqual(sut['@context'], testCredentialParams['@context'])
  })
})
