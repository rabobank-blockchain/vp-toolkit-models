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

export { Secp256k1Proof, ISecp256k1ProofParams } from './model/proofs/secp256k1-proof'
export { FlexibleOrderedModel } from './model/flexible-ordered-model'
export { BaseProof, IBaseProof, IBaseProofParams } from './model/proofs/base-proof'
export { ICredentialStatusParams, CredentialStatus } from './model/credential-status'
export { IVerifiableCredentialParams, VerifiableCredential } from './model/verifiable-credential'
export { IVerifiablePresentationParams, VerifiablePresentation } from './model/verifiable-presentation'
export { IChallengeRequestParams, ChallengeRequest, IToAttestParams, IToVerifyParams } from './model/challenge-request'
export { ConstructError } from './error/construct-error'
