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

"use strict"
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc)
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r
  return c > 3 && r && Object.defineProperty(target, key, r), r
}
Object.defineProperty(exports, "__esModule", {value: true})
exports.BaseProof = void 0
const class_transformer_1 = require("class-transformer")
const flexible_ordered_model_1 = require("../flexible-ordered-model")

/**
 * The minimum required field(s) for a
 * Verifiable Credential / Presentation Proof
 */
class BaseProof extends flexible_ordered_model_1.FlexibleOrderedModel {
  constructor(obj, validateNonEmptyFields) {
    super(obj, validateNonEmptyFields !== undefined ? BaseProof.nonEmptyFields.concat(validateNonEmptyFields) : undefined)
    this._type = obj.type
    if (this.constructor.name === BaseProof.name) {
      // If the BaseProof class is being instantiated, initialize additional fields.
      // If a BaseProof-derived class is being instantiated, don't initialize.
      this.initializeAdditionalFields(obj, this)
    }
  }

  /**
   * The name of the signature type
   * @return string
   */
  get type() {
    return this._type
  }

  /**
   * Cast the object to the correct Proof type.
   * ALWAYS override this method if you built
   * your own proof type that inherits BaseProof!
   * @return this
   */
  static cast(t) {
    return new BaseProof(t.toJSON())
  }
}

/**
 * These fields must be present and not empty
 * when constructing this class.
 */
BaseProof.nonEmptyFields = ['type']
BaseProof.supportsType = '*'
__decorate([
  class_transformer_1.Expose()
], BaseProof.prototype, "type", null)
exports.BaseProof = BaseProof
//# sourceMappingURL=base-proof.js.map
