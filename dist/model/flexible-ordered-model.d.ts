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

import { OrderedModel } from './ordered-model'

/**
 * This super class keeps track of all
 * additional fields which are not defined
 * in the model, but are present in the
 * model instance. This allows developers
 * to add additional fields to the model
 * without having to create a new
 * inherited model definition.
 */
export declare class FlexibleOrderedModel extends OrderedModel {
  /**
   * This property will return all
   * fields as key-value pairs.
   * @return any
   */
  readonly additionalFields: any
  protected readonly _additionalFields: any

  constructor (obj: any);

  /**
   * Converts this object to a json string
   * using the exact same field order as it
   * was constructed, including the additional
   * fields.
   * @return object
   */
  toJSON (): object;

  /**
   * This method will find all additional fields which are passed to
   * your constructor, but are not declared in your model definition.
   * These additional fields will be stored and can be accessed through
   * yourModel.additionalFields.yourCustomField
   *
   * @param constructorParams The constructor params your class received
   * @param childObject Your model instance that from extends this class
   */
  protected initializeAdditionalFields (constructorParams: any, childObject: any): void;
}
