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
import { ChallengeRequest, Proof } from '../../../src'
import { challengeRequestTestData, testProofParams } from '../test-helper'

describe('challenge request getters', function () {
  const sut = new ChallengeRequest({
    toAttest: challengeRequestTestData.toAttest,
    toVerify: challengeRequestTestData.toVerify,
    correspondenceId: challengeRequestTestData.correspondenceId,
    postEndpoint: challengeRequestTestData.postEndpoint,
    proof: testProofParams
  })

  it('should return a valid uuid v4 correspondenceId when it is not provided', () => {
    const challengeRequest = new ChallengeRequest({
      toAttest: challengeRequestTestData.toAttest,
      toVerify: challengeRequestTestData.toVerify,
      postEndpoint: challengeRequestTestData.postEndpoint,
      proof: testProofParams
    })

    assert.isNotEmpty(challengeRequest.correspondenceId)
    assert.match(challengeRequest.correspondenceId, /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
  })

  it('should return a unique uuid v4 correspondenceId for each instance if it is not provided', () => {
    const challengeRequest1 = new ChallengeRequest({
      toAttest: challengeRequestTestData.toAttest,
      toVerify: challengeRequestTestData.toVerify,
      postEndpoint: challengeRequestTestData.postEndpoint,
      proof: testProofParams
    })
    const challengeRequest2 = new ChallengeRequest({
      toAttest: challengeRequestTestData.toAttest,
      toVerify: challengeRequestTestData.toVerify,
      postEndpoint: challengeRequestTestData.postEndpoint,
      proof: testProofParams
    })

    assert.notEqual(challengeRequest1.correspondenceId, challengeRequest2.correspondenceId)
  })

  it('should return the same correspondenceId every time, for a single instance', () => {
    assert.strictEqual(sut.correspondenceId, challengeRequestTestData.correspondenceId)
  })

  it('should return an unchanged toattest value', () => {
    assert.deepEqual(sut.toAttest, challengeRequestTestData.toAttest)
  })

  it('should return an unchanged toverify value', () => {
    assert.deepEqual(sut.toVerify, challengeRequestTestData.toVerify)
  })

  it('should return an unchanged postEndpoint value', () => {
    assert.deepEqual(sut.postEndpoint, challengeRequestTestData.postEndpoint)
  })

  it('should return an empty toAttest array if it is undefined', () => {
    const challengeRequest = new ChallengeRequest({
      toVerify: challengeRequestTestData.toVerify,
      postEndpoint: challengeRequestTestData.postEndpoint,
      proof: testProofParams
    })
    assert.deepEqual(challengeRequest.toAttest, [])
  })

  it('should return an empty toVerify array if it is undefined', () => {
    const challengeRequest = new ChallengeRequest({
      toAttest: challengeRequestTestData.toAttest,
      postEndpoint: challengeRequestTestData.postEndpoint,
      proof: testProofParams
    })
    assert.deepEqual(challengeRequest.toVerify, [])
  })

  it('should return an unchanged proof value', () => {
    assert.deepEqual(sut.proof, new Proof(testProofParams))
  })
})
