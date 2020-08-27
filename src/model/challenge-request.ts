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

import { v4 as uuid } from 'uuid'
import { Expose, Transform } from 'class-transformer'
import { FlexibleOrderedModel } from './flexible-ordered-model'
import { BaseProof, IBaseProofParams } from './proofs/base-proof'

/**
 * A verifier can specify the allowed issuers and, optionally,
 * Zero Knowledge Proof boundaries per predicate.
 */
export interface IToVerifyParams extends Record<string, any> { // Basically extends 'any'
  predicate: string, // For example, 'http://schema.org/baseSalary'
  allowedIssuers?: string[], // A collection of DID's. Can be empty/undefined to allow all.
  // lowerBound and upperBound are used for ZK proofs. Here an example to prove income between 0 - 1000000
  lowerBound?: number, // A value like 0
  upperBound?: number // A value like 1000000
}

/**
 * The issuer specifies which predicates will be issued.
 * This interface provides flexibility for the issuer to
 * add more metadata or constraints for each predicate in
 * the future.
 */
export interface IToAttestParams extends Record<string, any> { // Basically extends 'any'
  predicate: string // For example, 'http://schema.org/givenName'
}

/**
 * This interface declares the parameters needed to construct a
 * ChallengeRequest.
 *
 */
export interface IChallengeRequestParams {
  toAttest?: IToAttestParams[]
  toVerify?: IToVerifyParams[]
  proof?: IBaseProofParams
  postEndpoint: string
  correspondenceId?: string
}

/**
 * Challenge Request model that enables an issuer/verifier
 * to request Verifiable Credentials from the holder.
 *
 * Note: This model is not part of the W3C VC standard.
 */
export class ChallengeRequest extends FlexibleOrderedModel {
  private readonly _toAttest: IToAttestParams[]
  private readonly _toVerify: IToVerifyParams[]
  private readonly _proof: BaseProof
  private readonly _postEndpoint: string
  private readonly _correspondenceId: string
  public static version = 1

  constructor (obj: IChallengeRequestParams) {
    if (!obj.proof) {
      throw new ReferenceError('One or more fields are empty')
    }
    super(obj)

    this._toAttest = obj.toAttest || []
    this._toVerify = obj.toVerify || []
    this._proof = obj.proof instanceof BaseProof ? obj.proof : new BaseProof(obj.proof)
    this._postEndpoint = obj.postEndpoint
    this._correspondenceId = obj.correspondenceId || uuid()
  }

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
  @Expose()
  get correspondenceId (): string {
    return this._correspondenceId
  }

  /**
   * This endpoint is used by the holder app
   * to send information that is requested
   * in the ChallengeRequest
   *
   * @return string
   */
  @Expose()
  get postEndpoint (): string {
    return this._postEndpoint
  }

  /**
   * The issuer/verifier will attest
   * these predicates to the holder
   * This array can be empty
   * @return IToAttestParams[]
   */
  @Expose()
  get toAttest (): IToAttestParams[] {
    return this._toAttest
  }

  /**
   * The verifier asks the holder to provide DIDs
   * for the given context URL's (like schema.org)
   * This is optional
   * @return IToVerifyParams[]
   */
  @Expose()
  get toVerify (): IToVerifyParams[] {
    return this._toVerify
  }

  /**
   * The proof to ensure the integrity
   * and verifiability of the this object
   * @return Proof
   */
  @Expose()
  @Transform((proof: BaseProof) => proof.toJSON())
  public get proof (): BaseProof {
    return this._proof
  }

  /**
   * ChallengeRequest model version
   * @return {number}
   */
  @Expose()
  get version (): number {
    return ChallengeRequest.version
  }
}
