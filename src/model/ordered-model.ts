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

import { classToPlain } from 'class-transformer'

/**
 * This super class provides a function
 * to maintain the same order of fields
 * after parsing and/or stringifying
 * the model.
 */
export class OrderedModel {
  private readonly _keyIndexes: string[]

  constructor (sourceObj: any) {
    // Loop through all object keys and record their indexes
    this._keyIndexes = Object.keys(sourceObj).map(key => key)
  }

  /**
   * Converts this instance to a flat object
   * @return object
   */
  public toJSON (): object {
    const unorderedObj = classToPlain(this, { excludePrefixes: ['_'] }) as any
    return this.orderPlainObject(unorderedObj)
  }

  /**
   * Place the fields in the right order by using the keyIndexes
   * @param unorderedObject
   * @return {any}
   */
  protected orderPlainObject (unorderedObject: any): any {
    const orderedObj: any = {} // The result after ordering fields

    // Get all field names from the keyIndexes. Any unindexed fields
    // from the given object will be added at the end of the array.
    const objectFieldNames = this._keyIndexes.concat(
      Object.keys(unorderedObject).filter((key) => {
        return !this._keyIndexes.includes(key)
      }))

    // Loop through all ordered keys and construct a new object
    for (const key of objectFieldNames) {
      orderedObj[key] = unorderedObject[key]
    }

    return orderedObj
  }
}
