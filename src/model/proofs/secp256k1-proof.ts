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
import { BaseProof, IBaseProofParams } from './base-proof'

/**
 * This interface declares the parameters
 * needed to construct a Secp256k1 Proof.
 */
export interface ISecp256k1ProofParams extends IBaseProofParams {
  created: Date | string
  verificationMethod: string
  nonce?: string
  signatureValue?: string | undefined
}

/**
 * Secp256k1 Proof model
 */
export class Secp256k1Proof extends BaseProof {

  /**
   * These fields must be present and not empty
   * when constructing this class.
   */
  public static nonEmptyFields = ['created', 'verificationMethod']
  public static supportsType = 'Secp256k1Signature2019'

  constructor (obj: ISecp256k1ProofParams) {
    // Proof type is set in BaseProof
    const fieldsToConstruct = Object.assign({}, obj)
    fieldsToConstruct.created = new Date(obj.created)
    fieldsToConstruct.nonce = obj.nonce || uuid()

    super(fieldsToConstruct, Secp256k1Proof.nonEmptyFields)
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
  public get nonce (): string {
    return this.get<string>('nonce')
  }

  /**
   * The Created date in a ISO 8601 format
   * @return string
   */
  public get created (): string {
    return this.get<Date>('created').toISOString()
  }

  /**
   * The verification method to verify the signature
   * can be an url, public key, DID, etc.
   * @return string
   */
  public get verificationMethod (): string {
    return this.get<string>('verificationMethod')
  }

  /**
   * The signature value
   * @return string|undefined
   */
  public get signatureValue (): string | undefined {
    return this.get<string | undefined>('signatureValue')
  }

  /**
   * Set the signature value
   */
  public set signatureValue (value: string | undefined) {
    this.set('signatureValue', value)
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
