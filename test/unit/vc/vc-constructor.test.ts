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
import { FlexibleOrderedModel, VerifiableCredential } from '../../../src'
import { testCredentialParams } from '../test-helper'

describe('verifiable credential constructor', function () {
  it('should inherit FlexibleOrderedModel to use field validation', () => {
    const sut = new VerifiableCredential({
      id: testCredentialParams.id,
      type: testCredentialParams.type,
      issuer: testCredentialParams.issuer,
      issuanceDate: testCredentialParams.issuanceDate,
      credentialSubject: testCredentialParams.credentialSubject,
      proof: testCredentialParams.proof,
      credentialStatus: testCredentialParams.credentialStatus,
      '@context': testCredentialParams['@context']
    })

    assert.instanceOf<FlexibleOrderedModel>(sut, VerifiableCredential)
  })

  it('should not accept empty or missing fields "type", "issuer", "issuanceDate", "credentialSubject" and "proof"', () => {
    assert.deepEqual(VerifiableCredential.nonEmptyFields, ['type', 'issuer', 'issuanceDate', 'credentialSubject', 'proof'])
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
    })

    const sut1Parsed = JSON.parse(JSON.stringify(sut1))
    const sut2 = new VerifiableCredential(sut1Parsed)
    const sut2Parsed = JSON.parse(JSON.stringify(sut2))

    assert.deepEqual(sut1Parsed, sut2Parsed)
  })

})
