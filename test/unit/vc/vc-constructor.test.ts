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
import { IVerifiableCredentialParams, VerifiableCredential } from '../../../src'
import { testCredentialParams } from '../test-helper'

describe('verifiable credential constructor', function () {
  it('should not accept empty type array', () => {
    const createSut = () => {
      return new VerifiableCredential({
        id: testCredentialParams.id,
        type: [],
        issuer: testCredentialParams.issuer,
        issuanceDate: testCredentialParams.issuanceDate,
        credentialSubject: testCredentialParams.credentialSubject,
        proof: testCredentialParams.proof
      })
    }

    assert.throws(createSut, ReferenceError, 'One or more fields are empty')
  })

  it('should not accept type array with one empty string', () => {
    const createSut = () => {
      return new VerifiableCredential({
        id: testCredentialParams.id,
        type: [''],
        issuer: testCredentialParams.issuer,
        issuanceDate: testCredentialParams.issuanceDate,
        credentialSubject: testCredentialParams.credentialSubject,
        proof: testCredentialParams.proof
      })
    }

    assert.throws(createSut, ReferenceError, 'One or more fields are empty')
  })

  it('should not accept type array with multiple empty strings', () => {
    const createSut = () => {
      return new VerifiableCredential({
        id: testCredentialParams.id,
        type: ['', '', ''],
        issuer: testCredentialParams.issuer,
        issuanceDate: testCredentialParams.issuanceDate,
        credentialSubject: testCredentialParams.credentialSubject,
        proof: testCredentialParams.proof
      })
    }

    assert.throws(createSut, ReferenceError, 'One or more fields are empty')
  })

  it('should not accept empty issuer field', () => {
    const createSut = () => {
      return new VerifiableCredential({
        id: testCredentialParams.id,
        type: testCredentialParams.type,
        issuer: '',
        issuanceDate: testCredentialParams.issuanceDate,
        credentialSubject: testCredentialParams.credentialSubject,
        proof: testCredentialParams.proof
      })
    }

    assert.throws(createSut, ReferenceError, 'One or more fields are empty')
  })

  it('should not accept null credentialSubject field', () => {
    const createSut = () => {
      return new VerifiableCredential({
        id: testCredentialParams.id,
        type: testCredentialParams.type,
        issuer: testCredentialParams.issuer,
        issuanceDate: testCredentialParams.issuanceDate,
        credentialSubject: null,
        proof: testCredentialParams.proof
      })
    }

    assert.throws(createSut, ReferenceError, 'One or more fields are empty')
  })

  it('should not throw on minimum amount of valid inputs', () => {
    const createSut = () => {
      return new VerifiableCredential({
        id: testCredentialParams.id,
        type: testCredentialParams.type,
        issuer: testCredentialParams.issuer,
        issuanceDate: testCredentialParams.issuanceDate,
        credentialSubject: testCredentialParams.credentialSubject,
        proof: testCredentialParams.proof
      })
    }

    assert.doesNotThrow(createSut)
  })

  it('should not throw on all valid inputs', () => {
    const createSut = () => {
      return new VerifiableCredential({
        id: testCredentialParams.id,
        type: testCredentialParams.type,
        issuer: testCredentialParams.issuer,
        issuanceDate: testCredentialParams.issuanceDate,
        credentialSubject: testCredentialParams.credentialSubject,
        proof: testCredentialParams.proof,
        credentialStatus: testCredentialParams.credentialStatus,
        '@context': testCredentialParams['@context']
      })
    }

    assert.doesNotThrow(createSut)
  })

  it('should return the same object after stringify and parse', () => {
    const sut1 = new VerifiableCredential({
      id: testCredentialParams.id,
      type: testCredentialParams.type,
      issuer: testCredentialParams.issuer,
      issuanceDate: testCredentialParams.issuanceDate,
      credentialSubject: testCredentialParams.credentialSubject,
      proof: testCredentialParams.proof,
      credentialStatus: testCredentialParams.credentialStatus,
      '@context': testCredentialParams['@context'],
      'optionalField': 12345
    } as IVerifiableCredentialParams)

    const sut1Parsed = JSON.parse(JSON.stringify(sut1))
    const sut2 = new VerifiableCredential(sut1Parsed)
    const sut2Parsed = JSON.parse(JSON.stringify(sut2))

    assert.deepEqual(sut1Parsed, sut2Parsed)
  })

})
