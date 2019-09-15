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
import { ChallengeRequest } from '../../../src'
import { challengeRequestTestData, testProofParams } from '../test-helper'

describe('challenge request constructor', function () {

  it('should accept undefined toverify field', () => {
    const createSut = () => {
      return new ChallengeRequest({
        toAttest: challengeRequestTestData.toAttest,
        proof: testProofParams
      })
    }

    assert.doesNotThrow(createSut)
  })

  it('should accept empty toattest array', () => {
    const createSut = () => {
      return new ChallengeRequest({
        toAttest: [],
        toVerify: challengeRequestTestData.toVerify,
        proof: testProofParams
      })
    }

    assert.doesNotThrow(createSut)
  })

  it('should not accept empty proof', () => {
    const createSut = () => {
      return new ChallengeRequest({
        toAttest: [],
        toVerify: challengeRequestTestData.toVerify
      })
    }

    assert.throws(createSut, ReferenceError, 'One or more fields are empty')
  })

  it('should not throw on valid inputs', () => {
    const createSut = () => {
      return new ChallengeRequest({
        toAttest: challengeRequestTestData.toAttest,
        toVerify: challengeRequestTestData.toVerify,
        proof: testProofParams
      })
    }

    assert.doesNotThrow(createSut)
  })

  it('constructor creates random correspondenceId', () => {
    const sut1 = new ChallengeRequest({
      toAttest: challengeRequestTestData.toAttest,
      toVerify: challengeRequestTestData.toVerify,
      proof: testProofParams
    })
    const sut2 = new ChallengeRequest({
      toAttest: challengeRequestTestData.toAttest,
      toVerify: challengeRequestTestData.toVerify,
      proof: testProofParams
    })

    assert.notDeepEqual(sut1, sut2)
  })

  it('should return the same object after stringify and parse', () => {
    const sut1 = new ChallengeRequest({
      toAttest: challengeRequestTestData.toAttest,
      toVerify: challengeRequestTestData.toVerify,
      proof: testProofParams
    })

    const sut1Parsed = JSON.parse(JSON.stringify(sut1))
    const sut2 = new ChallengeRequest(sut1Parsed)
    const sut2Parsed = JSON.parse(JSON.stringify(sut2))

    assert.deepEqual(sut1Parsed, sut2Parsed)
  })

})
