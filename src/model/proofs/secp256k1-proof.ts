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
import { BaseProof, IBaseProofParams } from './base-proof'

/**
 * This interface declares the parameters
 * needed to construct a Secp256k1 Proof.
 */
export interface ISecp256k1ProofParams extends IBaseProofParams {
  created: Date
  verificationMethod: string
  nonce?: string
  signatureValue?: string | undefined
}

/**
 * Secp256k1 Proof model
 */
export class Secp256k1Proof extends BaseProof {
  private readonly _created: Date
  private readonly _verificationMethod: string
  private readonly _nonce: string
  private _signatureValue: string | undefined

  /**
   * These fields must be present and not empty
   * when constructing this class.
   */
  public static nonEmptyFields = ['created', 'verificationMethod']
  public static supportsType = 'Secp256k1Signature2019'

  constructor (obj: ISecp256k1ProofParams) {
    super(obj, Secp256k1Proof.nonEmptyFields)

    // Proof type is set in BaseProof
    this._created = new Date(obj.created)
    this._verificationMethod = obj.verificationMethod
    this._nonce = obj.nonce || uuid()
    this._signatureValue = obj.signatureValue

    this.initializeAdditionalFields(obj, this)
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

  /**
   * Cast a BaseProof object to this object
   * @param {BaseProof} t
   * @return {this}
   */
  public static cast (t: BaseProof): Secp256k1Proof {
    return new Secp256k1Proof(t.toJSON() as ISecp256k1ProofParams)
  }
}
