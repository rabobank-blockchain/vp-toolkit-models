# 0.3.0 / 19-08-2020

**BREAKING**
- Dropped support for Node version 8-11
- Detailed errors: `ConstructError("Can't construct {MODELNAME}: "' + nonEmptyField + '" field is {missing/empty}")`
- `IVerifiableCredential` renamed to `IVerifiableCredentialParams`
- `IVerifiablePresentation` renamed to `IVerifiablePresentationParams`
- `ICredentialStatus` renamed to `ICredentialStatusParams`
- `IChallengeRequest` renamed to `IChallengeRequestParams`
- `IVerifiableCredentialParams.proof` is now required (was optional before)
- The `type` field in `IVerifiableCredentialParams` was of type `string`, but is now `string | string[]`
- `Proof` was too tightly coupled with the secp256k1 proof structure. `Proof` is now `BaseProof` which only requires a `type` field and the rest is dynamic

*Migration steps:*
- Rename your `Proof` import to `Secp256k1Proof`
- Use `verifiableCredential.typeAsArray()` instead of `verifiableCredential.type` to retrieve the type as an array
- Unrecognized fields (like `verificationMethod` and `created`) can be found in `proof.additionalFields`
- To make use of proper typehinting (without relying on `additionalFields`), [cast the proof to the correct type](README.md#proofs)

**Enhancements**
- `ChallengeRequest` has a `version` property
- The `I....Params` interfaces now define a minimum set of required fields, but are not restricted to those fields only.
This means that structures like `const x: IxParams = {requiredField: 'x', someOtherField: 'x'}` are possible without casting them `as IxParams`
- Added `VerifiableCredential.typeAsArray()` to get the type consistently
- Updated all dependencies to their latest major versions
- Added support for Node v13 and v14

**Bugfixes**
- Exporting `IToVerifyParams` and `IToAttestParams` (belongs to `ChallengeRequest` model)

# 0.2.3 / 24-07-2020

**Enhancements**
- Security Patches for dependent packages

# 0.2.2 / 20-01-2020

**Bugfixes**
- Downgraded Dist files to TypeScript 3.4.5 due to a [breaking change in 3.7](https://github.com/microsoft/TypeScript/issues/33939)

# 0.2.1 / 09-01-2020

**Enhancements**
- Updated all dependencies
- Introduced [HISTORY.md](HISTORY.md)

# 0.2.0 / 24-12-2019

**BREAKING**
- Added required `postEndpoint` field to `ChallengeRequest` ([#8](https://github.com/rabobank-blockchain/vp-toolkit-models/issues/8)). When creating a `ChallengeRequest` object, you are obliged to specify the `postEndpoint` property, so the holder app knows which endpoint to call for posting information.
*Example:*
```ts
const challengeRequest = new ChallengeRequest({
      toAttest: [
        { predicate: 'https://schema.org/givenName' },
        { predicate: 'https://schema.org/familyName' }
      ],
      toVerify: [
        { predicate: 'https://schema.org/initials' }
      ],
      postEndpoint: 'https://domain.org/ssif/verifiable-presentation-endpoint', // <--- New field
      correspondenceId: '1e66fc69-05c6-4692-aa84-80eaacbf4bcc',
      proof: testProof
    }
)
```

**Enhancements**

- Made `ChallengeRequest` flexible so `additionalFields` are accessible
*Example:*
```ts
const challengeRequest = new ChallengeRequest({
      toAttest: [
        { predicate: 'https://schema.org/givenName' },
        { predicate: 'https://schema.org/familyName' }
      ],
      toVerify: [
        { predicate: 'https://schema.org/initials' }
      ],
      postEndpoint: 'https://domain.org/ssif/verifiable-presentation-endpoint',
      correspondenceId: '1e66fc69-05c6-4692-aa84-80eaacbf4bcc',
      yourOwnCustomField: 'test', // <--- Add any field of any type you'd like
      proof: testProof
    } as IChallengeRequestParams
)

console.log(challengeRequest.additionalFields.yourOwnCustomField) // = test
```

# 0.1.1 / 20-09-2019

**New features**
- Added `additionalFields` property to `VerifiablePresentation` ([#2](https://github.com/rabobank-blockchain/vp-toolkit-models/issues/2))

**Enhancements**
- Backwards-compatible interface rename for all models ([#1](https://github.com/rabobank-blockchain/vp-toolkit-models/issues/1))
- Remove duplication of `toJSON()`method ([#3](https://github.com/rabobank-blockchain/vp-toolkit-models/issues/3))

# 0.1.0 / 20-09-2019

*Initial release*
