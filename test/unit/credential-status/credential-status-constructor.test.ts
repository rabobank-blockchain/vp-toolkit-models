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
import { CredentialStatus } from '../../../src'

const testData = {
  id: '0x6AbAAFB672f60C16C604A29426aDA1Af9d96d440',
  type: 'vcStatusRegistry2019'
}

describe('credential status constructor', function () {
  it('should not accept empty id field', () => {
    const createSut = () => {
      return new CredentialStatus({
        id: '',
        type: testData.type
      })
    }

    assert.throws(createSut, ReferenceError, 'One or more fields are empty')
  })

  it('should not accept empty type field', () => {
    const createSut = () => {
      return new CredentialStatus({
        id: testData.id,
        type: ''
      })
    }

    assert.throws(createSut, ReferenceError, 'One or more fields are empty')
  })

  it('should not throw on valid inputs', () => {
    const createSut = () => {
      return new CredentialStatus({
        id: testData.id,
        type: testData.type
      })
    }

    assert.doesNotThrow(createSut)
  })

  it('should convert a JSON object to a Proof class', () => {
    const sut1 = new CredentialStatus({
      id: testData.id,
      type: testData.type
    })
    const jsonObj = JSON.parse(JSON.stringify(sut1))
    const sut2 = new CredentialStatus(jsonObj)

    assert.deepEqual(sut1, sut2)
  })

})
