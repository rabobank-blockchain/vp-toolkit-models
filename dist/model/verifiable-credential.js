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
exports.VerifiableCredential = void 0
const base_proof_1 = require("./proofs/base-proof")
const credential_status_1 = require("./credential-status")
const class_transformer_1 = require("class-transformer")
const flexible_ordered_model_1 = require("./flexible-ordered-model")

/**
 * W3C Verifiable Credential model (VC)
 * @see https://w3c.github.io/vc-data-model/#credentials
 */
class VerifiableCredential extends flexible_ordered_model_1.FlexibleOrderedModel {
  constructor(obj) {
    super(obj, VerifiableCredential.nonEmptyFields)
    this._id = obj.id
    this._type = obj.type
    this._issuer = obj.issuer
    this._issuanceDate = new Date(obj.issuanceDate)
    this._credentialSubject = obj.credentialSubject
    this._proof = obj.proof instanceof base_proof_1.BaseProof ? obj.proof : new base_proof_1.BaseProof(obj.proof)
    this._credentialStatus = obj.credentialStatus ? new credential_status_1.CredentialStatus(obj.credentialStatus) : undefined
    this._context = obj['@context']
    this.initializeAdditionalFields(obj, this)
  }

  /**
   * The context for this VC, used to give
   * context to the credentialsubject values
   * Is optional, so can be null
   * @return string[]|undefined
   */
  get context() {
    return this._context
  }

  /**
   * The context for this VC, used to give
   * context to the credentialsubject values
   * Is optional, so can be null
   * @return string[]|undefined
   */
  get '@context'() {
    return this._context
  }

  /**
   * An identifier for this VC
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
   * The VC type
   * @return {string | string[]}
   */
  get type() {
    return this._type
  }

  /**
   * The issuer ID
   * @return string
   */
  get issuer() {
    return this._issuer
  }

  /**
   * The issuance date in a ISO 8601 format
   * @return string
   */
  get issuanceDate() {
    return this._issuanceDate.toISOString()
  }

  /**
   * The collection of claims
   * The credentialSubject may contain an 'id' field,
   * but it is not mandatory
   * @see https://w3c.github.io/vc-data-model/#subject
   * @return any
   */
  get credentialSubject() {
    return this._credentialSubject
  }

  /**
   * The proof for this VC
   * @return BaseProof
   */
  get proof() {
    return this._proof
  }

  /**
   * The credential status
   * Is optional, so can be null
   * @see CredentialStatus
   * @return CredentialStatus|undefined
   */
  get credentialStatus() {
    return this._credentialStatus
  }

  /**
   * Sometimes the Type can be of type string
   * instead of an array. This method always returns
   * the type as an array.
   * @return string[]
   */
  typeAsArray() {
    return typeof this._type === 'string' ? [this._type] : this._type
  }
}

/**
 * These fields must be present and not empty
 * when constructing this class.
 */
VerifiableCredential.nonEmptyFields = ['type', 'issuer', 'issuanceDate', 'credentialSubject', 'proof']
__decorate([
  class_transformer_1.Expose({name: '@context'})
], VerifiableCredential.prototype, "context", null)
__decorate([
  class_transformer_1.Expose()
], VerifiableCredential.prototype, "id", null)
__decorate([
  class_transformer_1.Expose()
], VerifiableCredential.prototype, "type", null)
__decorate([
  class_transformer_1.Expose()
], VerifiableCredential.prototype, "issuer", null)
__decorate([
  class_transformer_1.Expose()
], VerifiableCredential.prototype, "issuanceDate", null)
__decorate([
    class_transformer_1.Expose()
], VerifiableCredential.prototype, "credentialSubject", null);
__decorate([
    class_transformer_1.Expose(),
    class_transformer_1.Transform((proof) => proof.toJSON())
], VerifiableCredential.prototype, "proof", null);
__decorate([
    class_transformer_1.Expose(),
    class_transformer_1.Transform((cs) => {
        return cs ? cs.toJSON() : undefined;
    })
], VerifiableCredential.prototype, "credentialStatus", null);
exports.VerifiableCredential = VerifiableCredential;
//# sourceMappingURL=verifiable-credential.js.map
