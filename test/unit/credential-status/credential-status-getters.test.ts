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

describe('credential status getters', function () {
  const sut = new CredentialStatus({
    id: testData.id,
    type: testData.type
  })

  it('should return an unchanged id', () => {
    assert.strictEqual(sut.id, testData.id)
  })

  it('should return an unchanged type', () => {
    assert.strictEqual(sut.type, testData.type)
  })

  it('should flatten an object using JSON.stringify()', () => {
    assert.strictEqual(JSON.stringify(sut), '{"id":"0x6AbAAFB672f60C16C604A29426aDA1Af9d96d440","type":"vcStatusRegistry2019"}')
  })
})
