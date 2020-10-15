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
import { BaseProof, ISecp256k1ProofParams, Secp256k1Proof } from '../../../src'

const testProof: ISecp256k1ProofParams = {
  type: 'SignatureAlgorithmName',
  created: new Date('01-01-2019'),
  nonce: 'abc',
  verificationMethod: 'verification method',
  signatureValue: 'BavEll0/I1zpYw8XNi1bgVg/sCneO4Jugez8RwDg/W3JT24='
}

describe('secp256k1 proof static', function () {
  it('should only support type "Secp256k1Signature2019"', () => {
    assert.equal(Secp256k1Proof.supportsType, 'Secp256k1Signature2019')
  })

  it('should inherit BaseProof to use field validation', () => {
    const sut = new Secp256k1Proof(testProof)
    assert.instanceOf<BaseProof>(sut, BaseProof)
  })

  it('should not accept empty or missing fields "created", "verificationMethod"', () => {
    assert.deepEqual(Secp256k1Proof.nonEmptyFields, ['created', 'verificationMethod'])
  })

  it('should cast another proof type to this', () => {
    const otherProof = new BaseProof(testProof)

    const sut = Secp256k1Proof.cast(otherProof)
    const expectedObject = new Secp256k1Proof(testProof)

    assert.deepEqual(sut, expectedObject)
  })
})

describe('secp256k1 proof constructor', function () {
  it('should change the signature from the proof class', () => {
    const sut = new Secp256k1Proof(testProof)
    const sig1 = sut.signatureValue
    sut.signatureValue = 'someOtherSignature'
    const sig2 = sut.signatureValue

    assert.notEqual(sig1, sig2)
  })

  it('should return the same object after stringify and parse', () => {
    const sut1 = new Secp256k1Proof({
      type: testProof.type,
      created: testProof.created,
      verificationMethod: testProof.verificationMethod,
      signatureValue: 'someSignature'
    })
    // next line to achieve 100% stryker coverage
    sut1.signatureValue = 'someOtherSignature'

    const sut1Parsed = JSON.parse(JSON.stringify(sut1))
    const sut2 = new Secp256k1Proof(sut1Parsed)
    const sut2Parsed = JSON.parse(JSON.stringify(sut2))

    assert.deepEqual(sut1Parsed, sut2Parsed)
  })

})
