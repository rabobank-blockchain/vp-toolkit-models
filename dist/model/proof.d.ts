import { OrderedModel } from './ordered-model';
export interface IProof {
    type: string;
    created: Date;
    verificationMethod: string;
    nonce?: string;
    signatureValue?: string | undefined;
}
/**
 * JSON-LD Proof model
 *
 * The nonce can be a correspondenceId
 * originating from the ChallengeRequest!
 */
export declare class Proof extends OrderedModel {
    private readonly _type;
    private readonly _created;
    private readonly _verificationMethod;
    private readonly _nonce;
    private _signatureValue;
    constructor(obj: IProof);
    /**
     * The nonce in uuidv4 format
     *
     * Can be a correspondenceId to
     * prove to the verifier that the
     * same session is used for the
     * exchange of credentials.
     * @return string
     */
    readonly nonce: string;
    /**
     * The name of the signature type
     * @return string
     */
    readonly type: string;
    /**
     * The Created date in a ISO 8601 format
     * @return string
     */
    readonly created: string;
    /**
     * The verification method to verify the signature
     * can be an url, public key, DID, etc.
     * @return string
     */
    readonly verificationMethod: string;
    /**
     * The signature value
     * @return string|undefined
     */
    /**
    * Set the signature value
    */
    signatureValue: string | undefined;
    /**
     * Converts a ChallengeRequest object to a json string.
     *
     * @return object
     */
    toJSON(): object;
}
