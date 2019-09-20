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
import { IVerifiablePresentationParams, Proof, VerifiablePresentation } from '../../../src'
import { verifiablePresentationTestData } from '../test-helper'

describe('verfiable presentation getters', function () {
  const sut = new VerifiablePresentation({
    id: verifiablePresentationTestData.id,
    type: verifiablePresentationTestData.type,
    verifiableCredential: verifiablePresentationTestData.verifiableCredential,
    proof: verifiablePresentationTestData.proof,
    '@context': verifiablePresentationTestData['@context']
  })

  it('should return an unchanged id', () => {
    assert.strictEqual(sut.id, verifiablePresentationTestData.id)
  })

  it('should return an unchanged type', () => {
    assert.strictEqual(sut.type, verifiablePresentationTestData.type)
  })

  it('should return an unchanged proof', () => {
    assert.deepStrictEqual(sut.proof, verifiablePresentationTestData.proof.map(x => new Proof(x)))
  })

  it('should return an unchanged verifiable credential', () => {
    assert.deepStrictEqual(sut.verifiableCredential, verifiablePresentationTestData.verifiableCredential)
  })

  it('should set additional fields properly', () => {
    const vpSut = new VerifiablePresentation({
      id: verifiablePresentationTestData.id,
      type: verifiablePresentationTestData.type,
      verifiableCredential: verifiablePresentationTestData.verifiableCredential,
      proof: verifiablePresentationTestData.proof,
      '@context': verifiablePresentationTestData['@context'],
      'testFieldOne': 'abc',
      'testFieldTwo': ['def'],
      'testFieldThree': 3
    } as IVerifiablePresentationParams)

    assert.equal(Object.keys(vpSut.additionalFields).length, 3)
    assert.deepEqual(vpSut.additionalFields['testFieldOne'], 'abc')
    assert.deepEqual(vpSut.additionalFields['testFieldTwo'], ['def'])
    assert.deepEqual(vpSut.additionalFields['testFieldThree'], 3)
  })

  it('should return an unchanged context', () => {
    assert.deepStrictEqual(sut.context, verifiablePresentationTestData['@context'])
  })

  it('should return an unchanged @context', () => {
    assert.deepStrictEqual(sut['@context'], verifiablePresentationTestData['@context'])
  })
})
