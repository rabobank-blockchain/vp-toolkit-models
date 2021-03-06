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
import { BaseProof } from '../../../src'

describe('baseproof getters', function () {
  const baseProofParams = {
    type: 'someType',
    someOtherField: 'xyz'
  }
  const sut = new BaseProof(baseProofParams)

  it('should return an unchanged type', () => {
    assert.strictEqual(sut.type, baseProofParams.type)
  })

  it('should return an additionalField when calling get()', () => {
    const result = sut.get('someOtherField')

    assert.strictEqual(result, baseProofParams.someOtherField)
    assert.strictEqual(sut.additionalFields['someOtherField'], result)
  })
})
