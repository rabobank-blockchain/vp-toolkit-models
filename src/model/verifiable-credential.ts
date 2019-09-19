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

import { IProofParams, Proof } from './proof'
import { CredentialStatus, ICredentialStatusParams } from './credential-status'
import { Expose, Transform } from 'class-transformer'
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
  id?: string
  type: string[]
  issuer: string
  issuanceDate: Date
  credentialSubject: any
  proof?: IProofParams
  credentialStatus?: ICredentialStatusParams
  '@context'?: string[]
}

/**
 * Declares the needed parameters
 * to construct a VerifiableCredential
 */
// tslint:disable-next-line
export interface IVerifiableCredentialParams extends IVerifiableCredential {
}

/**
 * W3C Verifiable Credential model (VC)
 * @see https://w3c.github.io/vc-data-model/#credentials
 */
export class VerifiableCredential extends FlexibleOrderedModel {
  private readonly _id?: string
  private readonly _type: string[]
  private readonly _issuer: string
  private readonly _issuanceDate: Date
  private readonly _credentialSubject: any
  private readonly _proof: Proof
  private readonly _credentialStatus: CredentialStatus | undefined
  private readonly _context: string[] | undefined

  constructor (obj: IVerifiableCredentialParams) {
    if (!obj.type || obj.type.length === 0 || obj.type.join().length === obj.type.length - 1
      || !obj.issuer || !obj.issuanceDate || !obj.credentialSubject || !obj.proof) {
      throw new ReferenceError('One or more fields are empty')
    }
    super(obj)

    this._id = obj.id
    this._type = obj.type
    this._issuer = obj.issuer
    this._issuanceDate = new Date(obj.issuanceDate)
    this._credentialSubject = obj.credentialSubject
    this._proof = new Proof(obj.proof)
    this._credentialStatus = obj.credentialStatus ? new CredentialStatus(obj.credentialStatus) : undefined
    this._context = obj['@context']
    this.initializeAdditionalFields(obj, this)
  }

  /**
   * The context for this VC, used to give
   * context to the credentialsubject values
   * Is optional, so can be null
   * @return string[]|undefined
   */
  @Expose({ name: '@context' })
  public get context (): string[] | undefined {
    return this._context
  }

  /**
   * The context for this VC, used to give
   * context to the credentialsubject values
   * Is optional, so can be null
   * @return string[]|undefined
   */
  get '@context' (): string[] | undefined {
    return this._context
  }

  /**
   * An identifier for this VC
   *
   * According to the standard, an
   * ID may be omitted
   * @see https://w3c.github.io/vc-data-model/#identifiers
   * @return string|undefined
   */
  @Expose()
  public get id (): string | undefined {
    return this._id
  }

  /**
   * The VC type
   * @return string[]
   */
  @Expose()
  public get type (): string[] {
    return this._type
  }

  /**
   * The issuer ID
   * @return string
   */
  @Expose()
  public get issuer (): string {
    return this._issuer
  }

  /**
   * The issuance date in a ISO 8601 format
   * @return string
   */
  @Expose()
  public get issuanceDate (): string {
    return this._issuanceDate.toISOString()
  }

  /**
   * The collection of claims
   * The credentialSubject may contain an 'id' field,
   * but it is not mandatory
   * @see https://w3c.github.io/vc-data-model/#subject
   * @return any
   */
  @Expose()
  public get credentialSubject (): any {
    return this._credentialSubject
  }

  /**
   * The proof for this VC
   * @return Proof
   */
  @Expose()
  @Transform((proof: Proof) => proof.toJSON())
  public get proof (): Proof {
    return this._proof
  }

  /**
   * The credential status
   * Is optional, so can be null
   * @see CredentialStatus
   * @return CredentialStatus|undefined
   */
  @Expose()
  @Transform((cs: CredentialStatus | undefined) => {
    return cs ? cs.toJSON() : undefined
  })
  public get credentialStatus (): CredentialStatus | undefined {
    return this._credentialStatus
  }
}
