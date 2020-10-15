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
Object.defineProperty(exports, "__esModule", {value: true})
exports.Secp256k1Proof = void 0
const uuid_1 = require("uuid")
const base_proof_1 = require("./base-proof")

/**
 * Secp256k1 Proof model
 */
class Secp256k1Proof extends base_proof_1.BaseProof {
  constructor(obj) {
    // Proof type is set in BaseProof
    const fieldsToConstruct = Object.assign({}, obj)
    fieldsToConstruct.created = new Date(obj.created)
    fieldsToConstruct.nonce = obj.nonce || uuid_1.v4()
    super(fieldsToConstruct, Secp256k1Proof.nonEmptyFields)
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
    return this.get('nonce')
  }

  /**
   * The Created date in a ISO 8601 format
   * @return string
   */
  get created() {
    return this.get('created').toISOString()
  }

  /**
   * The verification method to verify the signature
   * can be an url, public key, DID, etc.
   * @return string
   */
  get verificationMethod() {
    return this.get('verificationMethod')
  }

  /**
   * The signature value
   * @return string|undefined
   */
  get signatureValue() {
    return this.get('signatureValue')
  }

  /**
   * Set the signature value
   */
  set signatureValue(value) {
    this.set('signatureValue', value)
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

exports.Secp256k1Proof = Secp256k1Proof
/**
 * These fields must be present and not empty
 * when constructing this class.
 */
Secp256k1Proof.nonEmptyFields = ['created', 'verificationMethod']
Secp256k1Proof.supportsType = 'Secp256k1Signature2019'
//# sourceMappingURL=secp256k1-proof.js.map
