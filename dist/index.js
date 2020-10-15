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
var secp256k1_proof_1 = require("./model/proofs/secp256k1-proof")
Object.defineProperty(exports, "Secp256k1Proof", {
  enumerable: true, get: function () {
    return secp256k1_proof_1.Secp256k1Proof
  }
})
var flexible_ordered_model_1 = require("./model/flexible-ordered-model")
Object.defineProperty(exports, "FlexibleOrderedModel", {
  enumerable: true, get: function () {
    return flexible_ordered_model_1.FlexibleOrderedModel
  }
})
var base_proof_1 = require("./model/proofs/base-proof")
Object.defineProperty(exports, "BaseProof", {
  enumerable: true, get: function () {
    return base_proof_1.BaseProof
  }
})
var credential_status_1 = require("./model/credential-status")
Object.defineProperty(exports, "CredentialStatus", {
  enumerable: true, get: function () {
    return credential_status_1.CredentialStatus
  }
})
var verifiable_credential_1 = require("./model/verifiable-credential")
Object.defineProperty(exports, "VerifiableCredential", {
  enumerable: true, get: function () {
    return verifiable_credential_1.VerifiableCredential
  }
})
var verifiable_presentation_1 = require("./model/verifiable-presentation")
Object.defineProperty(exports, "VerifiablePresentation", {
  enumerable: true, get: function () {
    return verifiable_presentation_1.VerifiablePresentation
  }
})
var challenge_request_1 = require("./model/challenge-request")
Object.defineProperty(exports, "ChallengeRequest", {
  enumerable: true, get: function () {
    return challenge_request_1.ChallengeRequest
  }
})
var construct_error_1 = require("./error/construct-error")
Object.defineProperty(exports, "ConstructError", {
  enumerable: true, get: function () {
    return construct_error_1.ConstructError
  }
})
//# sourceMappingURL=index.js.map
