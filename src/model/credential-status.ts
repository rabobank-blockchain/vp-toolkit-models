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
import { OrderedModel } from './ordered-model'

/**
 * This interface declares the parameters needed
 * to construct a CredentialStatus
 */
export interface ICredentialStatusParams extends Record<string, any> { // Basically extends 'any'
  id: string
  type: string
}

/**
 * W3C Verifiable Credential CredentialStatus model
 * Used for checking whether the credential is revoked or suspended
 * @see https://w3c.github.io/vc-data-model/#status
 * @see https://w3c-ccg.github.io/vc-status-registry/
 */
export class CredentialStatus extends OrderedModel {
  private readonly _id: string
  private readonly _type: string

  constructor (obj: ICredentialStatusParams) {
    if (!obj.id || !obj.type) {
      throw new ReferenceError('One or more fields are empty')
    }
    super(obj)

    this._id = obj.id
    this._type = obj.type
  }

  /**
   * The name of the credential status type
   * @return string
   */
  @Expose()
  public get type (): string {
    return this._type
  }

  /**
   * The ID which can be consulted according to the type
   * According to the spec this must be an URL, but we can
   * also use it to refer to a blockchain contract address
   * @return string
   */
  @Expose()
  public get id (): string {
    return this._id
  }
}
