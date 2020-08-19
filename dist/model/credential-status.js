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
exports.CredentialStatus = void 0
const class_transformer_1 = require("class-transformer")
const ordered_model_1 = require("./ordered-model")

/**
 * W3C Verifiable Credential CredentialStatus model
 * Used for checking whether the credential is revoked or suspended
 * @see https://w3c.github.io/vc-data-model/#status
 * @see https://w3c-ccg.github.io/vc-status-registry/
 */
class CredentialStatus extends ordered_model_1.OrderedModel {
    constructor(obj) {
        if (!obj.id || !obj.type) {
            throw new ReferenceError('One or more fields are empty');
        }
        super(obj);
        this._id = obj.id;
        this._type = obj.type;
    }
    /**
     * The name of the credential status type
     * @return string
     */
    get type() {
        return this._type;
    }
    /**
     * The ID which can be consulted according to the type
     * According to the spec this must be an URL, but we can
     * also use it to refer to a blockchain contract address
     * @return string
     */
    get id() {
        return this._id;
    }
}
__decorate([
    class_transformer_1.Expose()
], CredentialStatus.prototype, "type", null);
__decorate([
    class_transformer_1.Expose()
], CredentialStatus.prototype, "id", null);
exports.CredentialStatus = CredentialStatus;
//# sourceMappingURL=credential-status.js.map