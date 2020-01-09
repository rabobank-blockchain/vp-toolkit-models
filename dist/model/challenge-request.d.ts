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
import { FlexibleOrderedModel } from './flexible-ordered-model'

/**
 * A verifier can specify the allowed issuers and, optionally,
 * Zero Knowledge Proof boundaries per predicate.
 */
export interface IToVerifyParams {
    predicate: string;
    allowedIssuers?: string[];
    lowerBound?: number;
    upperBound?: number;
}
/**
 * The issuer specifies which predicates will be issued.
 * This interface provides flexibility for the issuer to
 * add more metadata or constraints for each predicate in
 * the future.
 */
export interface IToAttestParams {
    predicate: string;
}
/**
 * This interface declares the parameters needed to construct a
 * ChallengeRequest. This interface does not specify the structure
 * of a ChallengeRequest. Due to unclarities, this interface will
 * be renamed to IProofParams.
 *
 * @deprecated Will be removed in v0.2, use IChallengeRequestParams instead
 */
export interface IChallengeRequest {
    toAttest?: IToAttestParams[];
    toVerify?: IToVerifyParams[];
    proof?: IProofParams;
    postEndpoint: string;
    correspondenceId?: string;
}
/**
 * Declares the needed parameters
 * to construct a ChallengeRequest
 */
export interface IChallengeRequestParams extends IChallengeRequest {
}
/**
 * Challenge Request model that enables an issuer/verifier
 * to request Verifiable Credentials from the holder.
 *
 * Note: This model is not part of the W3C VC standard.
 */
export declare class ChallengeRequest extends FlexibleOrderedModel {
    private readonly _toAttest;
    private readonly _toVerify;
    private readonly _proof;
    private readonly _postEndpoint;
    private readonly _correspondenceId;
    constructor(obj: IChallengeRequestParams);

    /**
     * This is the correspondence ID which will
     * be used in the VP proof (nonce field)
     * from the holder to the counterparty
     * (which is an issuer or verifier).
     *
     * If no correspondenceId is provided, a
     * random uuid will be used.
     * @return string
     */
    get correspondenceId (): string;

    /**
     * This endpoint is used by the holder app
     * to send information that is requested
     * in the ChallengeRequest
     *
     * @return string
     */
    get postEndpoint (): string;

    /**
     * The issuer/verifier will attest
     * these predicates to the holder
     * This array can be empty
     * @return IToAttestParams[]
     */
    get toAttest (): IToAttestParams[];

    /**
     * The verifier asks the holder to provide DIDs
     * for the given context URL's (like schema.org)
     * This is optional
     * @return IToVerifyParams[]
     */
    get toVerify (): IToVerifyParams[];

    /**
     * The proof to ensure the integrity
     * and verifiability of the this object
     * @return Proof
     */
    get proof (): Proof;
}
