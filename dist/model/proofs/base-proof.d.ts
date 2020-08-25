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

import { FlexibleOrderedModel } from '../flexible-ordered-model'

/**
 * The minimum required fields to construct
 * a BaseProof objects
 */
export interface IBaseProofParams extends Record<string, any> {
    /**
     * The actual type
     * (can be case sensitive)
     */
    type: string;
}
/**
 * Structure of any Proof implementation
 */
export interface IBaseProof extends IBaseProofParams {
    toJSON (): any;
}

/**
 * The minimum required field(s) for a
 * Verifiable Credential / Presentation Proof
 */
export declare class BaseProof extends FlexibleOrderedModel implements IBaseProof {
    /**
     * These fields must be present and not empty
     * when constructing this class.
     */
    static nonEmptyFields: string[]
    static supportsType: string
    private readonly _type

    constructor (obj: IBaseProofParams, validateNonEmptyFields?: string[]);

    /**
     * Get a dynamic property
     */
    get<T = any> (fieldName: string): T;

    /**
     * Set/overwrite a dynamic property
     */
    set (fieldName: string, value: any): any;

    /**
     * The name of the signature type
     * @return string
     */
    get type (): string;

    /**
     * Cast the object to the correct Proof type.
     * ALWAYS override this method if you built
     * your own proof type that inherits BaseProof!
     * @return this
     */
    static cast (t: BaseProof): BaseProof;
}
