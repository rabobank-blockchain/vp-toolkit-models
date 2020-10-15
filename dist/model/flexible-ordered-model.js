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

"use strict";
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
Object.defineProperty(exports, "__esModule", {value: true})
exports.FlexibleOrderedModel = void 0
const ordered_model_1 = require("./ordered-model")
const class_transformer_1 = require("class-transformer")
const __1 = require("..")

/**
 * This super class keeps track of all
 * additional fields which are not defined
 * in the model, but are present in the
 * model instance. This allows developers
 * to add additional fields to the model
 * without having to create a new
 * inherited model definition.
 */
class FlexibleOrderedModel extends ordered_model_1.OrderedModel {
  constructor(obj, validateNonEmptyFields) {
    super(obj)
    this._additionalFields = []
    if (!validateNonEmptyFields)
      return
    for (const nonEmptyField of validateNonEmptyFields) {
      if (!Object.keys(obj).includes(nonEmptyField)) {
        throw new __1.ConstructError('Can\'t construct ' + this.constructor.name + ': "' + nonEmptyField + '" field is missing')
      }
      if (obj[nonEmptyField] === undefined || obj[nonEmptyField] === null || obj[nonEmptyField].length === 0
        || (Array.isArray(obj[nonEmptyField]) && obj[nonEmptyField].filter((val) => val.length > 0).length === 0)) {
        throw new __1.ConstructError('Can\'t construct ' + this.constructor.name + ': "' + nonEmptyField + '" field is empty')
      }
    }
  }

  /**
   * This property will return all
   * fields as key-value pairs.
   * @return any
   */
  get additionalFields() {
    return this._additionalFields
  }

  /**
   * Converts this object to a json string
   * using the exact same field order as it
   * was constructed, including the additional
   * fields.
   * @return object
   */
  toJSON() {
    const unorderedObj = class_transformer_1.classToPlain(this, {excludePrefixes: ['_']})
    // Merge the dynamic fields with the object
    for (const key of Object.keys(this._additionalFields)) {
      unorderedObj[key] = this._additionalFields[key]
    }
    return this.orderPlainObject(unorderedObj)
  }

  /**
   * This method will find all additional fields which are passed to
   * your constructor, but are not declared in your model definition.
   * These additional fields will be stored and can be accessed through
   * yourModel.additionalFields.yourCustomField
   *
   * @param constructorParams The constructor params your class received
   * @param childObject Your model instance that from extends this class
   */
  initializeAdditionalFields(constructorParams, childObject) {
    const objectKeys = Object.keys(class_transformer_1.classToPlain(childObject))
    for (const key of Object.keys(constructorParams)) {
      if (!objectKeys.includes(key)) {
        this._additionalFields[key] = constructorParams[key]
      }
    }
  }
}
exports.FlexibleOrderedModel = FlexibleOrderedModel;
//# sourceMappingURL=flexible-ordered-model.js.map
