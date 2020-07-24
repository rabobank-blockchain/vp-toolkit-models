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
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
/**
 * This super class provides a function
 * to maintain the same order of fields
 * after parsing and/or stringifying
 * the model.
 */
class OrderedModel {
    constructor(sourceObj) {
        // Loop through all object keys and record their indexes
        this._keyIndexes = Object.keys(sourceObj).map(key => key);
    }
    /**
     * Converts this instance to a flat object
     * @return object
     */
    toJSON() {
        const unorderedObj = class_transformer_1.classToPlain(this, { excludePrefixes: ['_'] });
        return this.orderPlainObject(unorderedObj);
    }
    /**
     * Place the fields in the right order by using the keyIndexes
     * @param unorderedObject
     * @return {any}
     */
    orderPlainObject(unorderedObject) {
        const orderedObj = {}; // The result after ordering fields
        // Get all field names from the keyIndexes. Any unindexed fields
        // from the given object will be added at the end of the array.
        const objectFieldNames = this._keyIndexes.concat(Object.keys(unorderedObject).filter((key) => {
            return !this._keyIndexes.includes(key);
        }));
        // Loop through all ordered keys and construct a new object
        for (const key of objectFieldNames) {
            orderedObj[key] = unorderedObject[key];
        }
        return orderedObj;
    }
}
exports.OrderedModel = OrderedModel;
//# sourceMappingURL=ordered-model.js.map