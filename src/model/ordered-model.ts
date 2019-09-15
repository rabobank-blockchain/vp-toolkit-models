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

/**
 * This super class provides a function
 * to maintain the same order of fields
 * after parsing and/or stringifying
 * the model.
 */
export class OrderedModel {
  private readonly _keyIndexes: string[]

  constructor (sourceObj: any) {
    // Loop through all object keys and record their indexes, concatenate them with the object keys if they are missing
    this._keyIndexes = Object.keys(sourceObj).map(key => key)
  }

  protected orderPlainObject (unorderedObject: any): any {
    const orderedObj: any = {}
    const keys = this._keyIndexes.concat(Object.keys(unorderedObject).filter((key) => {
      return !this._keyIndexes.includes(key)
    }))
    for (const key of keys) {
      orderedObj[key] = unorderedObject[key]
    }

    return orderedObj
  }
}
