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
import { FlexibleOrderedModel } from './flexible-ordered-model'
import { BaseProof, IBaseProofParams } from './proofs/base-proof'

/**
 * This interface declares the parameters needed to construct a
 * VerifiablePresentation. This interface does not specify the structure of
 * a VerifiablePresentation. Due to unclarities, this interface will be
 * renamed to IVerifiablePresentationParams.
 */
export interface IVerifiablePresentationParams extends Record<string, any> {
    id?: string;
    type: string[];
    verifiableCredential: VerifiableCredential[];
    proof?: IBaseProofParams[];
    '@context'?: string[];
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

  constructor (obj: IVerifiablePresentationParams);

  /**
   * Get the identifier for this VP
   *
   * According to the standard, an
   * ID may be omitted
   * @see https://w3c.github.io/vc-data-model/#identifiers
   * @return string|undefined
   */
  get id (): string | undefined;

  /**
   * The type(s) applicable for this instance
   * @return string[]
   */
  get type (): string[];

  /**
   * The verifiable credentials
   * @return VerifiableCredential[]
   */
  get verifiableCredential (): VerifiableCredential[];

  /**
   * The associated proof(s) from the sender,
   * proving the ownership of the VC ID's
   * @return IBaseProof[]
   */
  get proof (): BaseProof[];

  /**
   * The context for the verifiable presentation
   * @return string[]|undefined
   */
  get context (): string[] | undefined;

  /**
   * The context for the verifiable presentation
   * @return string[]|undefined
   */
  get '@context' (): string[] | undefined;
}
