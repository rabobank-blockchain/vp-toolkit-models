/**
 * This super class provides a function
 * to maintain the same order of fields
 * after parsing and/or stringifying
 * the model.
 */
export declare class OrderedModel {
    private readonly _keyIndexes;
    constructor(sourceObj: any);
    protected orderPlainObject(unorderedObject: any): any;
}
