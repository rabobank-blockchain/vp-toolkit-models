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
exports.Secp256k1Proof = void 0
const uuid_1 = require("uuid")
const class_transformer_1 = require("class-transformer")
const base_proof_1 = require("./base-proof")

/**
 * Secp256k1 Proof model
 */
class Secp256k1Proof extends base_proof_1.BaseProof {
  constructor(obj) {
    super(obj, Secp256k1Proof.nonEmptyFields)
    // Proof type is set in BaseProof
    this._created = new Date(obj.created)
    this._verificationMethod = obj.verificationMethod
    this._nonce = obj.nonce || uuid_1.v4()
    this._signatureValue = obj.signatureValue
    this.initializeAdditionalFields(obj, this)
  }

  /**
   * The nonce in uuidv4 format
   *
   * Can be a correspondenceId to
   * prove to the verifier that the
   * same session is used for the
   * exchange of credentials.
   * @return string
   */
  get nonce() {
    return this._nonce
  }

  /**
   * The Created date in a ISO 8601 format
   * @return string
   */
  get created() {
    return this._created.toISOString()
  }

  /**
   * The verification method to verify the signature
   * can be an url, public key, DID, etc.
   * @return string
   */
  get verificationMethod() {
    return this._verificationMethod
  }

  /**
   * The signature value
   * @return string|undefined
   */
  get signatureValue() {
    return this._signatureValue
  }

  /**
   * Set the signature value
   */
  set signatureValue(value) {
    this._signatureValue = value
  }

  /**
   * Cast a BaseProof object to this object
   * @param {BaseProof} t
   * @return {this}
   */
  static cast(t) {
    return new Secp256k1Proof(t.toJSON())
  }
}

/**
 * These fields must be present and not empty
 * when constructing this class.
 */
Secp256k1Proof.nonEmptyFields = ['created', 'verificationMethod']
Secp256k1Proof.supportsType = 'Secp256k1Signature2019'
__decorate([
  class_transformer_1.Expose()
], Secp256k1Proof.prototype, "nonce", null)
__decorate([
  class_transformer_1.Expose()
], Secp256k1Proof.prototype, "created", null)
__decorate([
  class_transformer_1.Expose()
], Secp256k1Proof.prototype, "verificationMethod", null)
__decorate([
  class_transformer_1.Expose()
], Secp256k1Proof.prototype, "signatureValue", null)
exports.Secp256k1Proof = Secp256k1Proof
//# sourceMappingURL=secp256k1-proof.js.map
