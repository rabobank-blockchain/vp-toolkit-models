import { IProof, Proof } from './proof';
import { OrderedModel } from './ordered-model';
export interface IToVerifyParams {
    predicate: string;
    allowedIssuers?: string[];
    lowerBound?: number;
    upperBound?: number;
}
export interface IToAttestParams {
    predicate: string;
}
export interface IChallengeRequest {
    toAttest?: IToAttestParams[];
    toVerify?: IToVerifyParams[];
    proof?: IProof;
    correspondenceId?: string;
}
/**
 * Challenge Request model that enables an issuer/verifier
 * to request Verifiable Credentials from the holder.
 *
 * Note: This model is not part of the W3C VC standard.
 */
export declare class ChallengeRequest extends OrderedModel {
    private readonly _toAttest;
    private readonly _toVerify;
    private readonly _proof;
    private readonly _correspondenceId;
    constructor(obj: IChallengeRequest);
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
    readonly correspondenceId: string;
    /**
     * The issuer/verifier will attest
     * these predicates to the holder
     * This array can be empty
     * @return IToAttestParams[]
     */
    readonly toAttest: IToAttestParams[];
    /**
     * The verifier asks the holder to provide DIDs
     * for the given context URL's (like schema.org)
     * This is optional
     * @return IToVerifyParams[]
     */
    readonly toVerify: IToVerifyParams[];
    /**
     * The proof to ensure the integrity
     * and verifiability of the this object
     * @return Proof
     */
    readonly proof: Proof;
    /**
     * Converts a ChallengeRequest object to a json string.
     *
     * @return object
     */
    toJSON(): object;
}
