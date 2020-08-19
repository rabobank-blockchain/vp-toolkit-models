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
import { BaseProof, FlexibleOrderedModel, IBaseProofParams } from '../../../src'

const testProof: IBaseProofParams = {
  type: 'SignatureAlgorithmName',
  field1: new Date('01-01-2019'),
  field2: true,
  field3: ['someText', 'and some more']
}

describe('base proof static', function () {
  it('should support type "*"', () => {
    assert.equal(BaseProof.supportsType, '*')
  })

  it('should inherit FlexibleOrderedModel to use field validation', () => {
    const sut = new BaseProof(testProof)
    assert.instanceOf<FlexibleOrderedModel>(sut, FlexibleOrderedModel)
  })

  it('should not accept empty or missing field "type"', () => {
    assert.deepEqual(BaseProof.nonEmptyFields, ['type'])
  })

  it('should cast another proof type to this', () => {
    const proof = new BaseProof(testProof)

    const sut = BaseProof.cast(proof)

    assert.deepEqual(sut, proof)
  })
})

describe('base proof constructor', function () {

  class TestProof extends BaseProof {
    constructor (obj: IBaseProofParams) {
      super(obj)
    }
  }

  it('should not initialize additional fields if a derived class is being constructed', () => {
    // The derived class itself is responsible for calling initializeAdditionalFields()
    const sut = new TestProof({ type: 'abc', x: 'a' })
    const sut2 = new BaseProof({ type: 'abc', x: 'a' })

    assert.notExists(sut.additionalFields['x'])
    assert.exists(sut2.additionalFields['x'])
  })

  it('should return the same object after stringify and parse', () => {
    const sut1 = new BaseProof(testProof)

    const sut1Parsed = JSON.parse(JSON.stringify(sut1))
    const sut2 = new BaseProof(sut1Parsed)
    const sut2Parsed = JSON.parse(JSON.stringify(sut2))

    assert.deepEqual(sut1Parsed, sut2Parsed)
  })

})
