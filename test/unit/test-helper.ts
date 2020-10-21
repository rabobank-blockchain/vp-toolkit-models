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

// File containing shared test variables

import {
  CredentialStatus,
  IProofParams,
  IVerifiableCredentialParams,
  IVerifiablePresentationParams,
  VerifiableCredential
} from '../../src'
import { ITermsOfUse } from '../../src/model/verifiable-credential'

/**
 * Proof containing a type, created date and verification method with static, fictive data
 */
export const testProofParams: IProofParams = {
  type: 'SignatureAlgorithmName',
  created: new Date('01-01-2019'),
  verificationMethod: 'verification method',
  nonce: 'f8bdf225-a6b3-49df-8d6a-201943a0b36d'
}

export const challengeRequestTestData = {
  toAttest: [
    { predicate: 'https://schema.org/FinancialProduct' }
  ],
  toVerify: [
    {
      predicate: 'https://schema.org/givenName',
      allowedIssuers: ['did:eth:0x348675D72d9F1a887ABC43038f59f111591540D0']
    },
    {
      predicate: 'https://schema.org/surName',
      allowedIssuers: ['did:eth:0x348675D72d9F1a887ABC43038f59f111591540D0']
    },
    {
      predicate: 'https://schema.org/baseSalary',
      allowedIssuers: ['did:eth:0x348675D72d9F1a887ABC43038f59f111591540D0'],
      lowerBound: 50000,
      upperBound: 150000
    }
  ],
  correspondenceId: '76b0efea-98e2-4c9b-bbc2-3ccddfc8fdd5',
  postEndpoint: 'https://sometestdomain.com/verifiable-presentations'
}

const testCredStatus = new CredentialStatus({
  id: '0x6AbAAFB672f60C16C604A29426aDA1Af9d96d440',
  type: 'vcStatusRegistry2019'
})

export const testCredentialTermsOfUse = [
  {
    id: 'https://corporate.com/cred-tos/v1',
    type: 'test',
    legal: 'No liabilities for the issuer'
  } as ITermsOfUse
]

export const testCredentialParams = {
  id: 'did:protocol:address',
  type: ['VerifiableCredential'],
  issuer: 'did:protocol:issueraddress',
  issuanceDate: new Date('01-01-2019 12:00:00'),
  credentialSubject: {
    id: 'did:protocol:holderaddress',
    type: 'John'
  },
  proof: {
    type: 'SignatureAlgorithmName',
    created: new Date('01-01-2019'),
    verificationMethod: 'verification method',
    nonce: '547d06de-7f1b-4040-8ad0-cbee414a4a7f'
  },
  credentialStatus: testCredStatus,
  optionalField: 'optionalContent',
  '@context': ['https://www.w3.org/2018/credentials/v1', 'https://schema.org/givenName']
} as IVerifiableCredentialParams

export const testCredential = new VerifiableCredential(testCredentialParams)

export const verifiablePresentationTestData = {
  id: 'urn:uuid:3978344f-8596-4c3a-a978-8fcaba3903c5',
  type: ['VerifiablePresentation'],
  proof: [testProofParams],
  verifiableCredential: [testCredential],
  '@context': ['https://schema.org/givenName']
}

export const testVp: IVerifiablePresentationParams = {
  id: 'urn:uuid:3978344f-8596-4c3a-a978-8fcaba3903c5',
  type: ['VerifiablePresentation'],
  proof: [testProofParams],
  verifiableCredential: [testCredential]
}
