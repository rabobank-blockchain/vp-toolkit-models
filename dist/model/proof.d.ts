import { OrderedModel } from './ordered-model';
/**
 * This interface declares the parameters needed to construct a
 * Proof. This interface does not specify the structure of
 * a Proof. Due to unclarities, this interface will be
 * renamed to IProofParams.
 *
 * @deprecated Will be removed in v0.2, use IProofParams instead
 */
export interface IProof {
    type: string;
    created: Date;
    verificationMethod: string;
    nonce?: string;
    signatureValue?: string | undefined;
}
/**
 * Declares the needed parameters
 * to construct a Proof
 */
export interface IProofParams extends IProof {
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
    constructor(obj: IProofParams);
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
