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
exports.ChallengeRequest = void 0
const uuid_1 = require("uuid")
const class_transformer_1 = require("class-transformer")
const flexible_ordered_model_1 = require("./flexible-ordered-model")
const base_proof_1 = require("./proofs/base-proof")

/**
 * Challenge Request model that enables an issuer/verifier
 * to request Verifiable Credentials from the holder.
 *
 * Note: This model is not part of the W3C VC standard.
 */
class ChallengeRequest extends flexible_ordered_model_1.FlexibleOrderedModel {
  constructor(obj) {
    if (!obj.proof) {
      throw new ReferenceError('One or more fields are empty')
    }
    super(obj)
    this._toAttest = obj.toAttest || []
    this._toVerify = obj.toVerify || []
    this._proof = obj.proof instanceof base_proof_1.BaseProof ? obj.proof : new base_proof_1.BaseProof(obj.proof)
    this._postEndpoint = obj.postEndpoint
    this._correspondenceId = obj.correspondenceId || uuid_1.v4()
  }
    /**
     * This is the correspondence ID which will
     * be used in the VP proof (nonce field)
     * from the holder to the counterparty
     * (which is an issuer or verifier).
     *
     * If no correspondenceId is provided, a
     * random uuid will be used.
     * @return string
     */
    get correspondenceId() {
        return this._correspondenceId;
    }
    /**
     * This endpoint is used by the holder app
     * to send information that is requested
     * in the ChallengeRequest
     *
     * @return string
     */
    get postEndpoint() {
        return this._postEndpoint;
    }
    /**
     * The issuer/verifier will attest
     * these predicates to the holder
     * This array can be empty
     * @return IToAttestParams[]
     */
    get toAttest() {
        return this._toAttest;
    }
    /**
     * The verifier asks the holder to provide DIDs
     * for the given context URL's (like schema.org)
     * This is optional
     * @return IToVerifyParams[]
     */
    get toVerify() {
        return this._toVerify;
    }
    /**
     * The proof to ensure the integrity
     * and verifiability of the this object
     * @return Proof
     */
    get proof() {
        return this._proof;
    }
}
__decorate([
    class_transformer_1.Expose()
], ChallengeRequest.prototype, "correspondenceId", null);
__decorate([
    class_transformer_1.Expose()
], ChallengeRequest.prototype, "postEndpoint", null);
__decorate([
    class_transformer_1.Expose()
], ChallengeRequest.prototype, "toAttest", null);
__decorate([
    class_transformer_1.Expose()
], ChallengeRequest.prototype, "toVerify", null);
__decorate([
    class_transformer_1.Expose(),
    class_transformer_1.Transform((proof) => proof.toJSON())
], ChallengeRequest.prototype, "proof", null);
exports.ChallengeRequest = ChallengeRequest;
//# sourceMappingURL=challenge-request.js.map
