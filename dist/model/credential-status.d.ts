import { OrderedModel } from './ordered-model';
export interface ICredentialStatus {
    id: string;
    type: string;
}
/**
 * W3C Verifiable Credential CredentialStatus model
 * Used for checking whether the credential is revoked or suspended
 * @see https://w3c.github.io/vc-data-model/#status
 * @see https://w3c-ccg.github.io/vc-status-registry/
 */
export declare class CredentialStatus extends OrderedModel {
    private readonly _id;
    private readonly _type;
    constructor(obj: ICredentialStatus);
    /**
     * The name of the credential status type
     * @return string
     */
    readonly type: string;
    /**
     * The ID which can be consulted according to the type
     * According to the spec this must be an URL, but we can
     * also use it to refer to a blockchain contract address
     * @return string
     */
    readonly id: string;
    /**
     * Converts a ChallengeRequest object to a json string.
     *
     * @return object
     */
    toJSON(): object;
}
