import { IProofParams, Proof } from './proof';
import { CredentialStatus, ICredentialStatusParams } from './credential-status';
import { FlexibleOrderedModel } from './flexible-ordered-model';
/**
 * This interface declares the parameters needed to construct a
 * VerifiableCredential. This interface does not specify the structure of
 * a VerifiableCredential. Due to unclarities, this interface will be
 * renamed to IVerifiableCredentialParams.
 *
 * @deprecated Will be removed in v0.2, use IVerifiableCredentialParams instead
 */
export interface IVerifiableCredential {
    id?: string;
    type: string[];
    issuer: string;
    issuanceDate: Date;
    credentialSubject: any;
    proof?: IProofParams;
    credentialStatus?: ICredentialStatusParams;
    '@context'?: string[];
}
/**
 * Declares the needed parameters
 * to construct a VerifiableCredential
 */
export interface IVerifiableCredentialParams extends IVerifiableCredential {
}
/**
 * W3C Verifiable Credential model (VC)
 * @see https://w3c.github.io/vc-data-model/#credentials
 */
export declare class VerifiableCredential extends FlexibleOrderedModel {
    private readonly _id?;
    private readonly _type;
    private readonly _issuer;
    private readonly _issuanceDate;
    private readonly _credentialSubject;
    private readonly _proof;
    private readonly _credentialStatus;
    private readonly _context;
    constructor(obj: IVerifiableCredentialParams);
    /**
     * The context for this VC, used to give
     * context to the credentialsubject values
     * Is optional, so can be null
     * @return string[]|undefined
     */
    readonly context: string[] | undefined;
    /**
     * The context for this VC, used to give
     * context to the credentialsubject values
     * Is optional, so can be null
     * @return string[]|undefined
     */
    readonly '@context': string[] | undefined;
    /**
     * An identifier for this VC
     *
     * According to the standard, an
     * ID may be omitted
     * @see https://w3c.github.io/vc-data-model/#identifiers
     * @return string|undefined
     */
    readonly id: string | undefined;
    /**
     * The VC type
     * @return string[]
     */
    readonly type: string[];
    /**
     * The issuer ID
     * @return string
     */
    readonly issuer: string;
    /**
     * The issuance date in a ISO 8601 format
     * @return string
     */
    readonly issuanceDate: string;
    /**
     * The collection of claims
     * The credentialSubject may contain an 'id' field,
     * but it is not mandatory
     * @see https://w3c.github.io/vc-data-model/#subject
     * @return any
     */
    readonly credentialSubject: any;
    /**
     * The proof for this VC
     * @return Proof
     */
    readonly proof: Proof;
    /**
     * The credential status
     * Is optional, so can be null
     * @see CredentialStatus
     * @return CredentialStatus|undefined
     */
    readonly credentialStatus: CredentialStatus | undefined;
}
