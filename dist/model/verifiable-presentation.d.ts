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
import { VerifiableCredential } from './verifiable-credential'
import { FlexibleOrderedModel } from './flexible-ordered-model'

/**
 * This interface declares the parameters needed to construct a
 * VerifiablePresentation. This interface does not specify the structure of
 * a VerifiablePresentation. Due to unclarities, this interface will be
 * renamed to IVerifiablePresentationParams.
 *
 * @deprecated Will be removed in v0.2, use IVerifiablePresentationParams instead
 */
export interface IVerifiablePresentation {
    id?: string;
    type: string[];
    verifiableCredential: VerifiableCredential[];
    proof?: IProofParams[];
    '@context'?: string[];
}
/**
 * Declares the needed parameters
 * to construct a VerifiablePresentation
 */
export interface IVerifiablePresentationParams extends IVerifiablePresentation {
}
/**
 * W3C Verifiable Presentation model (VP)
 * @see https://w3c.github.io/vc-data-model/#presentations-0
 */
export declare class VerifiablePresentation extends FlexibleOrderedModel {
  private readonly _id?
  private readonly _type
  private readonly _verifiableCredential
  private readonly _proof
  private readonly _context?
  /**
   * Get the identifier for this VP
   *
   * According to the standard, an
   * ID may be omitted
   * @see https://w3c.github.io/vc-data-model/#identifiers
   * @return string|undefined
   */
  readonly id: string | undefined
  /**
   * The type(s) applicable for this instance
   * @return string[]
   */
  readonly type: string[]
  /**
   * The verifiable credentials
   * @return VerifiableCredential[]
   */
  readonly verifiableCredential: VerifiableCredential[]
  /**
   * The associated proof(s) from the sender,
   * proving the ownership of the VC ID's
   * @return Proof[]
   */
  readonly proof: Proof[]
  /**
   * The context for the verifiable presentation
   * @return string[]|undefined
   */
  readonly context: string[] | undefined
  /**
   * The context for the verifiable presentation
   * @return string[]|undefined
   */
  readonly '@context': string[] | undefined

  constructor (obj: IVerifiablePresentationParams);
}
