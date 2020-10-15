# 0.2.3 / 15-10-2020

**Enhancements**
- Added fields `termsOfUse` and `expirationDate` ([#21](https://github.com/rabobank-blockchain/vp-toolkit-models/issues/21))

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
