/*
 * Copyright 2020 Coöperatieve Rabobank U.A.
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

import { assert } from 'chai'
import { VerifiablePresentation } from '../../../src'
import { testVp } from '../test-helper'

describe('verifiable presentation field ordering, stringify and parse', function () {
  it('should class-transform the verifiablecredential field correctly when parsing', () => {
    const sut1 = new VerifiablePresentation({
      id: testVp.id,
      type: testVp.type,
      verifiableCredential: testVp.verifiableCredential,
      proof: testVp.proof,
      '@context': testVp['@context']
    })

    const json = JSON.stringify(sut1)
    const sut1Parsed = JSON.parse(json)

    assert.isFalse(typeof sut1Parsed.verifiableCredential === 'string')
  })

  it('should return the same object after stringify and parse', () => {
    const sut1 = new VerifiablePresentation({
      id: testVp.id,
      type: testVp.type,
      verifiableCredential: testVp.verifiableCredential,
      proof: testVp.proof,
      '@context': testVp['@context']
    })

    const sut1Parsed = JSON.parse(JSON.stringify(sut1))
    const sut2 = new VerifiablePresentation(sut1Parsed)
    const sut2Parsed = JSON.parse(JSON.stringify(sut2))

    assert.deepEqual(sut1Parsed, sut2Parsed)
  })

  it('should stringify a JSON object to a the correct format and order', () => {
    const sut1 = new VerifiablePresentation({
      id: testVp.id,
      type: testVp.type,
      'randomTestField': 'abc',
      verifiableCredential: testVp.verifiableCredential,
      proof: testVp.proof,
      '@context': testVp['@context']
    })

    const strObj = JSON.stringify(sut1.toJSON())
    const obj = JSON.parse(strObj)
    assert.equal(strObj, `{"id":"urn:uuid:3978344f-8596-4c3a-a978-8fcaba3903c5","type":["VerifiablePresentation"],"randomTestField":"abc","verifiableCredential":[{"id":"did:protocol:address","type":["VerifiableCredential"],"issuer":"did:protocol:issueraddress","issuanceDate":"${obj.verifiableCredential[0].issuanceDate}","credentialSubject":{"id":"did:protocol:holderaddress","type":"John"},"proof":{"type":"SignatureAlgorithmName","created":"${obj.verifiableCredential[0].proof.created}","verificationMethod":"verification method X","nonce":"${obj.verifiableCredential[0].proof.nonce}"},"credentialStatus":{"type":"vcStatusRegistry2019","id":"0x6AbAAFB672f60C16C604A29426aDA1Af9d96d440"},"optionalField":"optionalContent","@context":["https://www.w3.org/2018/credentials/v1","https://schema.org/givenName"]}],"proof":[{"type":"SignatureAlgorithmName","created":"${obj.proof[0].created}","verificationMethod":"verification method","nonce":"${obj.proof[0].nonce}"}]}`)
  })
})
