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

import { BaseProof, IBaseProofParams } from './proofs/base-proof'
import { CredentialStatus, ICredentialStatusParams } from './credential-status'
import { FlexibleOrderedModel } from './flexible-ordered-model'

/**
 * This interface declares the parameters needed to construct a
 * VerifiableCredential. This interface does not specify the structure of
 * a VerifiableCredential. Due to unclarities, this interface will be
 * renamed to IVerifiableCredentialParams.
 */
export interface IVerifiableCredentialParams extends Record<string, any> {
    id?: string;
    type: string | string[];
    issuer: string;
    issuanceDate: Date;
    credentialSubject: any;
    proof: IBaseProofParams;
    credentialStatus?: ICredentialStatusParams;
    '@context'?: string[];
}
/**
 * W3C Verifiable Credential model (VC)
 * @see https://w3c.github.io/vc-data-model/#credentials
 */
export declare class VerifiableCredential extends FlexibleOrderedModel {
    /**
     * These fields must be present and not empty
     * when constructing this class.
     */
    static nonEmptyFields: string[]
    private readonly _id?
    private readonly _issuer
    private readonly _issuanceDate
    private readonly _credentialSubject
    private readonly _type
    private readonly _credentialStatus
    private readonly _context
    private readonly _proof

    constructor (obj: IVerifiableCredentialParams);

    /**
     * The context for this VC, used to give
     * context to the credentialsubject values
     * Is optional, so can be null
     * @return string[]|undefined
     */
    get context (): string[] | undefined;

    /**
     * The context for this VC, used to give
     * context to the credentialsubject values
     * Is optional, so can be null
     * @return string[]|undefined
     */
    get '@context' (): string[] | undefined;

    /**
     * An identifier for this VC
     *
     * According to the standard, an
     * ID may be omitted
     * @see https://w3c.github.io/vc-data-model/#identifiers
     * @return string|undefined
     */
    get id (): string | undefined;

    /**
     * The VC type
     * @return {string | string[]}
     */
    get type (): string | string[];

    /**
     * The issuer ID
     * @return string
     */
    get issuer (): string;

    /**
     * The issuance date in a ISO 8601 format
     * @return string
     */
    get issuanceDate (): string;

    /**
     * The collection of claims
     * The credentialSubject may contain an 'id' field,
     * but it is not mandatory
     * @see https://w3c.github.io/vc-data-model/#subject
     * @return any
     */
    get credentialSubject (): any;

    /**
     * The proof for this VC
     * @return BaseProof
     */
    get proof (): BaseProof;

    /**
     * The credential status
     * Is optional, so can be null
     * @see CredentialStatus
     * @return CredentialStatus|undefined
     */
    get credentialStatus (): CredentialStatus | undefined;

    /**
     * Sometimes the Type can be of type string
     * instead of an array. This method always returns
     * the type as an array.
     * @return string[]
     */
    typeAsArray (): string[];
}
