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
import { Expose } from 'class-transformer'
import { OrderedModel } from './ordered-model'

/**
 * This interface declares the parameters needed to construct a
 * Proof. This interface does not specify the structure of
 * a Proof. Due to unclarities, this interface will be
 * renamed to IProofParams.
 *
 * @deprecated Will be removed in v0.2, use IProofParams instead
 */
export interface IProof {
  type: string
  created: Date
  verificationMethod: string
  nonce?: string
  signatureValue?: string | undefined
}

/**
 * Declares the needed parameters
 * to construct a Proof
 */
// tslint:disable-next-line
export interface IProofParams extends IProof {
}

/**
 * JSON-LD Proof model
 *
 * The nonce can be a correspondenceId
 * originating from the ChallengeRequest!
 */
export class Proof extends OrderedModel {
  private readonly _type: string
  private readonly _created: Date
  private readonly _verificationMethod: string
  private readonly _nonce: string
  private _signatureValue: string | undefined

  constructor (obj: IProofParams) {
    if (!obj.type || !obj.created || !obj.verificationMethod) {
      throw new ReferenceError('One or more fields are empty')
    }
    super(obj)

    this._type = obj.type
    this._created = new Date(obj.created)
    this._verificationMethod = obj.verificationMethod
    this._nonce = obj.nonce || uuid()
    this._signatureValue = obj.signatureValue
  }

  /**
   * The nonce in uuidv4 format
   *
   * Can be a correspondenceId to
   * prove to the verifier that the
   * same session is used for the
   * exchange of credentials.
   * @return string
   */
  @Expose()
  public get nonce (): string {
    return this._nonce
  }

  /**
   * The name of the signature type
   * @return string
   */
  @Expose()
  public get type (): string {
    return this._type
  }

  /**
   * The Created date in a ISO 8601 format
   * @return string
   */
  @Expose()
  public get created (): string {
    return this._created.toISOString()
  }

  /**
   * The verification method to verify the signature
   * can be an url, public key, DID, etc.
   * @return string
   */
  @Expose()
  public get verificationMethod (): string {
    return this._verificationMethod
  }

  /**
   * The signature value
   * @return string|undefined
   */
  @Expose()
  public get signatureValue (): string | undefined {
    return this._signatureValue
  }

  /**
   * Set the signature value
   */
  public set signatureValue (value: string | undefined) {
    this._signatureValue = value
  }
}
