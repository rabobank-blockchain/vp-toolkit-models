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

import { VerifiableCredential } from './verifiable-credential'
import { Expose, Transform } from 'class-transformer'
import { FlexibleOrderedModel } from './flexible-ordered-model'
import { BaseProof, IBaseProof, IBaseProofParams } from './proofs/base-proof'

/**
 * This interface declares the parameters needed to construct a
 * VerifiablePresentation. This interface does not specify the structure of
 * a VerifiablePresentation. Due to unclarities, this interface will be
 * renamed to IVerifiablePresentationParams.
 */
export interface IVerifiablePresentationParams extends Record<string, any> { // Basically extends 'any'
  id?: string
  type: string[]
  verifiableCredential: VerifiableCredential[]
  proof?: IBaseProofParams[]
  '@context'?: string[]
}

/**
 * W3C Verifiable Presentation model (VP)
 * @see https://w3c.github.io/vc-data-model/#presentations-0
 */
export class VerifiablePresentation extends FlexibleOrderedModel {
  private readonly _id?: string
  private readonly _type: string[]
  private readonly _verifiableCredential: VerifiableCredential[]
  private readonly _proof: IBaseProof[]
  private readonly _context?: string[]

  constructor (obj: IVerifiablePresentationParams) {
    if (!obj.type || obj.type.length === 0 || obj.type.join().length === obj.type.length - 1
      || !obj.verifiableCredential || obj.verifiableCredential.length === 0 || !obj.proof) {
      throw new ReferenceError('One or more fields are empty')
    }
    super(obj)

    this._id = obj.id
    this._type = obj.type
    this._verifiableCredential = obj.verifiableCredential.map(vc => {
      // If it is not a VC object, it is a VC-parsed JSON string (which has fields without the _ prefixes)
      return vc instanceof VerifiableCredential ? vc : new VerifiableCredential(vc)
    })
    this._proof = obj.proof.map(x => x instanceof BaseProof ? x : new BaseProof(x))
    this._context = obj['@context']
    this.initializeAdditionalFields(obj, this)
  }

  /**
   * Get the identifier for this VP
   *
   * According to the standard, an
   * ID may be omitted
   * @see https://w3c.github.io/vc-data-model/#identifiers
   * @return string|undefined
   */
  @Expose()
  get id (): string | undefined {
    return this._id
  }

  /**
   * The type(s) applicable for this instance
   * @return string[]
   */
  @Expose()
  get type (): string[] {
    return this._type
  }

  /**
   * The verifiable credentials
   * @return VerifiableCredential[]
   */
  @Expose()
  @Transform(vcArray => vcArray.map((vc: VerifiableCredential) => {
    return vc.toJSON()
  }))
  get verifiableCredential (): VerifiableCredential[] {
    return this._verifiableCredential
  }

  /**
   * The associated proof(s) from the sender,
   * proving the ownership of the VC ID's
   * @return IBaseProof[]
   */
  @Expose()
  @Transform(proofArr => proofArr.map((proof: IBaseProof) => {
    return proof.toJSON()
  }))
  get proof (): IBaseProof[] {
    return this._proof
  }

  /**
   * The context for the verifiable presentation
   * @return string[]|undefined
   */
  get context (): string[] | undefined {
    return this._context
  }

  /**
   * The context for the verifiable presentation
   * @return string[]|undefined
   */
  @Expose()
  get '@context' (): string[] | undefined {
    return this._context
  }
}
