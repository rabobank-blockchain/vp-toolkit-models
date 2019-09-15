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

import { assert } from 'chai'
import { Proof } from '../../../src'

const testData = {
  sigType: 'SignatureAlgorithmName',
  created: new Date('01-01-2019'),
  verificationMethod: 'verification method',
  signatureValue: 'BavEll0/I1zpYw8XNi1bgVg/sCneO4Jugez8RwDg/W3JT24='
}

describe('proof constructor', function () {
  it('should not accept empty type field', () => {
    const createSut = () => {
      return new Proof({
        type: '',
        created: testData.created,
        verificationMethod: testData.verificationMethod
      })
    }

    assert.throws(createSut, ReferenceError, 'One or more fields are empty')
  })

  it('should not accept empty verifyMethod field', () => {
    const createSut = () => {
      return new Proof({
        type: testData.sigType,
        created: testData.created,
        verificationMethod: ''
      })
    }

    assert.throws(createSut, ReferenceError, 'One or more fields are empty')
  })

  it('should not throw on valid inputs', () => {
    const createSut = () => {
      return new Proof({
        type: testData.sigType,
        created: testData.created,
        verificationMethod: testData.verificationMethod
      })
    }

    assert.doesNotThrow(createSut)
  })

  it('constructor creates random nonce', () => {
    const sut1 = new Proof({
      type: testData.sigType,
      created: testData.created,
      verificationMethod: testData.verificationMethod
    })
    const sut2 = new Proof({
      type: testData.sigType,
      created: testData.created,
      verificationMethod: testData.verificationMethod
    })

    assert.notDeepEqual(sut1, sut2)
  })

  it('should change the signature from the proof class', () => {
    const sut = new Proof({
      type: testData.sigType,
      created: testData.created,
      verificationMethod: testData.verificationMethod
    })
    const sig1 = sut.signatureValue
    sut.signatureValue = 'someOtherSignature'
    const sig2 = sut.signatureValue

    assert.notEqual(sig1, sig2)
  })

  it('should return the same object after stringify and parse', () => {
    const sut1 = new Proof({
      type: testData.sigType,
      created: testData.created,
      verificationMethod: testData.verificationMethod,
      signatureValue: 'someSignature'
    })
    // next line to achieve 100% stryker coverage
    sut1.signatureValue = 'someOtherSignature'

    const sut1Parsed = JSON.parse(JSON.stringify(sut1))
    const sut2 = new Proof(sut1Parsed)
    const sut2Parsed = JSON.parse(JSON.stringify(sut2))

    assert.deepEqual(sut1Parsed, sut2Parsed)
  })

})
