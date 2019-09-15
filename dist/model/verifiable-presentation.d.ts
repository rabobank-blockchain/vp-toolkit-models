import { IProof, Proof } from './proof';
import { VerifiableCredential } from './verifiable-credential';
import { OrderedModel } from './ordered-model';
export interface IVerifiablePresentation {
    id?: string;
    type: string[];
    verifiableCredential: VerifiableCredential[];
    proof?: IProof[];
    '@context'?: string[];
}
/**
 * W3C Verifiable Presentation model (VP)
 * @see https://w3c.github.io/vc-data-model/#presentations-0
 */
export declare class VerifiablePresentation extends OrderedModel {
    private readonly _id?;
    private readonly _type;
    private readonly _verifiableCredential;
    private readonly _proof;
    private readonly _context?;
    constructor(obj: IVerifiablePresentation);
    /**
     * Get the identifier for this VP
     *
     * According to the standard, an
     * ID may be omitted
     * @see https://w3c.github.io/vc-data-model/#identifiers
     * @return string|undefined
     */
    readonly id: string | undefined;
    /**
     * The type(s) applicable for this instance
     * @return string[]
     */
    readonly type: string[];
    /**
     * The verifiable credentials
     * @return VerifiableCredential[]
     */
    readonly verifiableCredential: VerifiableCredential[];
    /**
     * The associated proof(s) from the sender,
     * proving the ownership of the VC ID's
     * @return Proof[]
     */
    readonly proof: Proof[];
    /**
     * The context for the verifiable presentation
     * @return string[]|undefined
     */
    readonly context: string[] | undefined;
    /**
     * The context for the verifiable presentation
     * @return string[]|undefined
     */
    readonly '@context': string[] | undefined;
    /**
     * Converts a VerifiablePresentation object
     * to a json string using the exact same
     * field order as it was constructed.
     * @return object
     */
    toJSON(): object;
}
