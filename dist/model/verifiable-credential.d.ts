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

import { IProofParams, Proof } from './proof'
import { CredentialStatus, ICredentialStatusParams } from './credential-status'
import { FlexibleOrderedModel } from './flexible-ordered-model'

/**
 * This interface declares the parameters needed to construct a
 * VerifiableCredential. This interface does not specify the structure of
 * a VerifiableCredential. Due to unclarities, this interface will be
 * renamed to IVerifiableCredentialParams.
 *
 * @deprecated Will be removed in v0.2, use IVerifiableCredentialParams instead
 */
export interface IVerifiableCredential {
    id?: string;
    type: string[];
    issuer: string;
    issuanceDate: Date;
    credentialSubject: any;
    proof?: IProofParams;
    credentialStatus?: ICredentialStatusParams;
    '@context'?: string[];
}
/**
 * Declares the needed parameters
 * to construct a VerifiableCredential
 */
export interface IVerifiableCredentialParams extends IVerifiableCredential {
}
/**
 * W3C Verifiable Credential model (VC)
 * @see https://w3c.github.io/vc-data-model/#credentials
 */
export declare class VerifiableCredential extends FlexibleOrderedModel {
    /**
     * The context for this VC, used to give
     * context to the credentialsubject values
     * Is optional, so can be null
     * @return string[]|undefined
     */
    readonly context: string[] | undefined
    /**
     * The context for this VC, used to give
     * context to the credentialsubject values
     * Is optional, so can be null
     * @return string[]|undefined
     */
    readonly '@context': string[] | undefined
    /**
     * An identifier for this VC
     *
     * According to the standard, an
     * ID may be omitted
     * @see https://w3c.github.io/vc-data-model/#identifiers
     * @return string|undefined
     */
    readonly id: string | undefined
    /**
     * The VC type
     * @return string[]
     */
    readonly type: string[]
    /**
     * The issuer ID
     * @return string
     */
    readonly issuer: string
    /**
     * The issuance date in a ISO 8601 format
     * @return string
     */
    readonly issuanceDate: string
    /**
     * The collection of claims
     * The credentialSubject may contain an 'id' field,
     * but it is not mandatory
     * @see https://w3c.github.io/vc-data-model/#subject
     * @return any
     */
    readonly credentialSubject: any
    /**
     * The proof for this VC
     * @return Proof
     */
    readonly proof: Proof
    /**
     * The credential status
     * Is optional, so can be null
     * @see CredentialStatus
     * @return CredentialStatus|undefined
     */
    readonly credentialStatus: CredentialStatus | undefined
    private readonly _id?
    private readonly _type
    private readonly _issuer
    private readonly _issuanceDate
    private readonly _credentialSubject
    private readonly _proof
    private readonly _credentialStatus
    private readonly _context

    constructor (obj: IVerifiableCredentialParams);
}
