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

import { Expose } from 'class-transformer'
import { FlexibleOrderedModel } from '../flexible-ordered-model'

/**
 * The minimum required fields to construct
 * a BaseProof objects
 */
export interface IBaseProofParams extends Record<string, any> { // Basically extends 'any'
  /**
   * The actual type
   * (can be case sensitive)
   */
  type: string
}

/**
 * Structure of any Proof implementation
 */
export interface IBaseProof extends IBaseProofParams {
  toJSON (): any
}

/**
 * The minimum required field(s) for a
 * Verifiable Credential / Presentation Proof
 */
export class BaseProof extends FlexibleOrderedModel implements IBaseProof {
  /**
   * These fields must be present and not empty
   * when constructing this class.
   */
  public static nonEmptyFields = ['type']
  public static supportsType = '*'
  private readonly _type: string

  constructor (obj: IBaseProofParams, validateNonEmptyFields?: string[]) {
    super(obj, validateNonEmptyFields !== undefined ? BaseProof.nonEmptyFields.concat(validateNonEmptyFields) : undefined)

    this._type = obj.type

    // All fields (except Type) will end up in additionalFields.
    // If you extend this class, please use the get() method to access
    // specific fields that are defined in your model definition.
    this.initializeAdditionalFields(obj, this)
  }

  /**
   * Get a dynamic property
   */
  public get<T = any> (fieldName: string): T {
    return this.additionalFields[fieldName] as T
  }

  /**
   * Set/overwrite a dynamic property
   */
  public set (fieldName: string, value: any) {
    return this.additionalFields[fieldName] = value
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
   * Cast the object to the correct Proof type.
   * ALWAYS override this method if you built
   * your own proof type that inherits BaseProof!
   * @return this
   */
  public static cast (t: BaseProof): BaseProof {
    return new BaseProof(t.toJSON())
  }
}
