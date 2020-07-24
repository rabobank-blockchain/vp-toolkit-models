import { OrderedModel } from './ordered-model';
/**
 * This interface declares the parameters needed to construct a
 * CredentialStatus. This interface does not specify the structure
 * of a CredentialStatus. Due to unclarities, this interface will
 * be renamed to ICredentialStatusParams.
 *
 * @deprecated Will be removed in v0.2, use ICredentialStatusParams instead
 */
export interface ICredentialStatus {
    id: string;
    type: string;
}
/**
 * Declares the needed parameters
 * to construct a CredentialStatus
 */
export interface ICredentialStatusParams extends ICredentialStatus {
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
    constructor(obj: ICredentialStatusParams);
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
}
