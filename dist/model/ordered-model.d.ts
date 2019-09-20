/**
 * This super class provides a function
 * to maintain the same order of fields
 * after parsing and/or stringifying
 * the model.
 */
export declare class OrderedModel {
    private readonly _keyIndexes;
    constructor(sourceObj: any);
    /**
     * Converts this instance to a flat object
     * @return object
     */
    toJSON(): object;
    /**
     * Place the fields in the right order by using the keyIndexes
     * @param unorderedObject
     * @return {any}
     */
    protected orderPlainObject(unorderedObject: any): any;
}
