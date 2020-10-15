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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc)
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r
  return c > 3 && r && Object.defineProperty(target, key, r), r
}
Object.defineProperty(exports, "__esModule", {value: true})
exports.VerifiablePresentation = void 0
const verifiable_credential_1 = require("./verifiable-credential")
const class_transformer_1 = require("class-transformer")
const flexible_ordered_model_1 = require("./flexible-ordered-model")
const base_proof_1 = require("./proofs/base-proof")

/**
 * W3C Verifiable Presentation model (VP)
 * @see https://w3c.github.io/vc-data-model/#presentations-0
 */
class VerifiablePresentation extends flexible_ordered_model_1.FlexibleOrderedModel {
  constructor(obj) {
    if (!obj.type || obj.type.length === 0 || obj.type.join().length === obj.type.length - 1
      || !obj.verifiableCredential || obj.verifiableCredential.length === 0 || !obj.proof) {
      throw new ReferenceError('One or more fields are empty')
    }
    super(obj)
    this._id = obj.id
    this._type = obj.type
    this._verifiableCredential = obj.verifiableCredential.map(vc => {
      // If it is not a VC object, it is a VC-parsed JSON string (which has fields without the _ prefixes)
      return vc instanceof verifiable_credential_1.VerifiableCredential ? vc : new verifiable_credential_1.VerifiableCredential(vc)
    })
    this._proof = obj.proof.map(x => x instanceof base_proof_1.BaseProof ? x : new base_proof_1.BaseProof(x))
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
  get id() {
    return this._id
    }
    /**
     * The type(s) applicable for this instance
     * @return string[]
     */
    get type() {
      return this._type
    }
    /**
     * The verifiable credentials
     * @return VerifiableCredential[]
     */
    get verifiableCredential() {
      return this._verifiableCredential
    }
    /**
     * The associated proof(s) from the sender,
     * proving the ownership of the VC ID's
     * @return IBaseProof[]
     */
    get proof() {
      return this._proof
    }
    /**
     * The context for the verifiable presentation
     * @return string[]|undefined
     */
    get context() {
      return this._context
    }
    /**
     * The context for the verifiable presentation
     * @return string[]|undefined
     */
    get '@context'() {
      return this._context
    }
}
__decorate([
    class_transformer_1.Expose()
], VerifiablePresentation.prototype, "id", null);
__decorate([
    class_transformer_1.Expose()
], VerifiablePresentation.prototype, "type", null);
__decorate([
    class_transformer_1.Expose(),
    class_transformer_1.Transform(vcArray => vcArray.map((vc) => {
        return vc.toJSON();
    }))
], VerifiablePresentation.prototype, "verifiableCredential", null);
__decorate([
    class_transformer_1.Expose(),
    class_transformer_1.Transform(proofArr => proofArr.map((proof) => {
        return proof.toJSON();
    }))
], VerifiablePresentation.prototype, "proof", null);
__decorate([
    class_transformer_1.Expose()
], VerifiablePresentation.prototype, "@context", null);
exports.VerifiablePresentation = VerifiablePresentation;
//# sourceMappingURL=verifiable-presentation.js.map
