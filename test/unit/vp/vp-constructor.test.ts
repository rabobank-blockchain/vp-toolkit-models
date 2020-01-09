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
import { VerifiablePresentation } from '../../../src'
import { verifiablePresentationTestData } from '../test-helper'

describe('verifiable presentation constructor', function () {
  it('should not accept empty type array', () => {
    const createSut = () => {
      return new VerifiablePresentation({
        id: verifiablePresentationTestData.id,
        type: [],
        verifiableCredential: verifiablePresentationTestData.verifiableCredential,
        proof: verifiablePresentationTestData.proof,
        '@context': verifiablePresentationTestData['@context']
      })
    }

    assert.throws(createSut, ReferenceError, 'One or more fields are empty')
  })

  it('should not accept type array with one empty string', () => {
    const createSut = () => {
      return new VerifiablePresentation({
        id: verifiablePresentationTestData.id,
        type: [''],
        verifiableCredential: verifiablePresentationTestData.verifiableCredential,
        proof: verifiablePresentationTestData.proof,
        '@context': verifiablePresentationTestData['@context']
      })
    }

    assert.throws(createSut, ReferenceError, 'One or more fields are empty')
  })

  it('should not accept type array with multiple empty strings', () => {
    const createSut = () => {
      return new VerifiablePresentation({
        id: verifiablePresentationTestData.id,
        type: ['', '', ''],
        verifiableCredential: verifiablePresentationTestData.verifiableCredential,
        proof: verifiablePresentationTestData.proof,
        '@context': verifiablePresentationTestData['@context']
      })
    }

    assert.throws(createSut, ReferenceError, 'One or more fields are empty')
  })

  it('should accept empty proof field', () => {
    const createSut = () => {
      return new VerifiablePresentation({
        id: verifiablePresentationTestData.id,
        type: verifiablePresentationTestData.type,
        verifiableCredential: verifiablePresentationTestData.verifiableCredential,
        proof: []
      })
    }

    assert.doesNotThrow(createSut)
  })

  it('should not accept empty verifiablecredential array', () => {
    const createSut = () => {
      return new VerifiablePresentation({
        id: verifiablePresentationTestData.id,
        type: verifiablePresentationTestData.type,
        verifiableCredential: [],
        proof: verifiablePresentationTestData.proof
      })
    }

    assert.throws(createSut, ReferenceError, 'One or more fields are empty')
  })

  it('should accept empty context array', () => {
    const createSut = () => {
      return new VerifiablePresentation({
        id: verifiablePresentationTestData.id,
        type: verifiablePresentationTestData.type,
        verifiableCredential: verifiablePresentationTestData.verifiableCredential,
        proof: verifiablePresentationTestData.proof,
        '@context': []
      })
    }

    assert.doesNotThrow(createSut, ReferenceError)
  })

  it('should not throw on minimum amount of valid inputs', () => {
    const createSut = () => {
      return new VerifiablePresentation({
        id: verifiablePresentationTestData.id,
        type: verifiablePresentationTestData.type,
        verifiableCredential: verifiablePresentationTestData.verifiableCredential,
        proof: verifiablePresentationTestData.proof
      })
    }

    assert.doesNotThrow(createSut)
  })

  it('should not throw on all valid inputs', () => {
    const createSut = () => {
      return new VerifiablePresentation({
        id: verifiablePresentationTestData.id,
        type: verifiablePresentationTestData.type,
        verifiableCredential: verifiablePresentationTestData.verifiableCredential,
        proof: verifiablePresentationTestData.proof,
        '@context': verifiablePresentationTestData['@context']
      })
    }

    assert.doesNotThrow(createSut)
  })
})
