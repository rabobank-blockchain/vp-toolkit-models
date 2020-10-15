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
import { ISecp256k1ProofParams, Secp256k1Proof } from '../../../src'

const testProof: ISecp256k1ProofParams = {
  type: 'SignatureAlgorithmName',
  created: new Date('01-01-2019'),
  verificationMethod: 'verification method',
  signatureValue: 'BavEll0/I1zpYw8XNi1bgVg/sCneO4Jugez8RwDg/W3JT24='
}

describe('proof getters', function () {
  const sut = new Secp256k1Proof(testProof)

  it('should return a valid uuid v4 nonce', () => {
    const proofSut = new Secp256k1Proof(testProof)

    assert.isNotEmpty(proofSut.nonce)
    assert.match(proofSut.nonce, /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
  })

  it('should return a unique uuid v4 nonce for each instance', () => {
    const proofSut1 = new Secp256k1Proof(testProof)
    const proofSut2 = new Secp256k1Proof(testProof)

    assert.notEqual(proofSut1.nonce, proofSut2.nonce)
  })

  it('should return the same nonce every time, for a single instance', () => {
    const proofSut = new Secp256k1Proof(testProof)

    const sutResult = proofSut.nonce

    for (let i = 0; i < 15; i++) {
      assert.strictEqual(proofSut.nonce, sutResult)
    }
  })

  it('should return an unchanged type', () => {
    assert.strictEqual(sut.type, testProof.type)
  })

  it('should return "created" in ISO 8601 format', () => {
    // We are using UTC dates here so the unit test is deterministic
    const created = new Date(Date.UTC(2019, 0, 30, 12, 23, 34, 456))
    const proof = new Secp256k1Proof({
      type: testProof.type,
      created: created,
      verificationMethod: testProof.verificationMethod
    })

    assert.strictEqual(proof.created, '2019-01-30T12:23:34.456Z')
  })

  it('should return an unchanged verificationMethod', () => {
    assert.strictEqual(sut.verificationMethod, testProof.verificationMethod)
  })

  it('should return an undefined signatureValue if it is not set', () => {
    const localSut = new Secp256k1Proof({
      type: testProof.type,
      created: testProof.created,
      verificationMethod: testProof.verificationMethod
    })
    assert.strictEqual(localSut.signatureValue, undefined)
  })

  it('should set and get signatureValue without changing', () => {
    sut.signatureValue = testProof.signatureValue
    assert.strictEqual(sut.signatureValue, testProof.signatureValue)
  })

  it('should be able to set signatureValue back to undefined', () => {
    sut.signatureValue = testProof.signatureValue
    sut.signatureValue = undefined
    assert.strictEqual(sut.signatureValue, undefined)
  })
})
