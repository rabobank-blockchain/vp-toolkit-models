# vp-toolkit-models

[![Build Status](https://travis-ci.org/rabobank-blockchain/vp-toolkit-models.svg?branch=master)](https://travis-ci.org/rabobank-blockchain/vp-toolkit-models)
[![Test Coverage](https://api.codeclimate.com/v1/badges/4bbc4f19c005b7b7ff3b/test_coverage)](https://codeclimate.com/github/rabobank-blockchain/vp-toolkit-models/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/4bbc4f19c005b7b7ff3b/maintainability)](https://codeclimate.com/github/rabobank-blockchain/vp-toolkit-models/maintainability)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A TypeScript/JavaScript library containing models for [w3c verifiable credentials](https://w3c.github.io/vc-data-model/):
- [Verifiable Credential](src/model/verifiable-credential.ts)
- [Verifiable Presentation](src/model/verifiable-presentation.ts)
- [Challenge Request](src/model/challenge-request.ts) _(not part of the official specification)_
- [Proof](src/model/proof.ts) _(will be part of the objects above)_

## Installation

In an existing project (with `package.json`), install `vp-toolkit-models`

```bash
npm install vp-toolkit-models --save
```

## Usage

We strongly advise the [vp-toolkit](https://github.com/rabobank-blockchain/vp-toolkit) library to generate and verify these models more easily.
You can create the models by passing the required values through the constructor.

### Example (VerifiableCredential)

The example below creates an unsigned VerifiableCredential object. To create a signed object, please use `vp-toolkit`.
```typescript
import { VerifiableCredential, IVerifiableCredential } from 'vp-toolkit-models'

const verifiableCredential = new VerifiableCredential({
  '@context': ['https://www.w3.org/2018/credentials/v1'], // Optional
  type: ['VerifiableCredential'],
  issuer: 'did:eth:0x6E29B1AE22195f9d59C1a468E292b78A8E6e15D1', // Issuer DID
  issuanceDate: new Date(),
  credentialSubject: {
    // The id is the DID as received from the holder / end-user, mandatory field
    id: 'did:eth:0x37F0d79f04b9C15dE4b31Bb70e828243644F5f49',
    givenName: 'John'
    // We advise to attest one property per credential to reduce correlation
  },
  credentialStatus: { // Optional
    // The ID/url/contract address of the credential (revoke) registry
    id: '0x6AbAAFB672f60C16C604A29426aDA1Af9d96d440',
    type: 'vcStatusRegistry2019' // The registry type
  },
  someOtherRandomField: 'anyValue', // Dynamic fields are accepted
  issuerName: 'YourOrganisation', // Optional
  issuerIcon: 'https://example.com/logo.png', // Optional
  proof: { // Required when sending to the counterparty
    type: 'SignatureAlgorithmName',
    created: new Date(), // UTC time will be used from this value
    verificationMethod: 'publicKey',
    nonce: '547d06de-7f1b-4040-8ad0-cbee414a4a7f',
    signatureValue: 'generated signature value'
  }
} as IVerifiableCredential)

// Dynamic fields can be found in the additionalFields property
const someOtherRandomField = verifiableCredential.additionalFields['someOtherRandomField']

// Models can be stringified and parsed - the order of fields will not change.
const string = JSON.stringify(verifiableCredential)
```

The same approach works for a VerifiablePresentation and ChallengeRequest - but with different fields, obviously.
The ChallengeRequest object supports Zero Knowledge Range Proof by offering the `lowerBound` and `upperBound` fields.

## Extending models

If you don't prefer to use the dynamic fields, you can also extend the models in your own codebase.
But when using the `vp-toolkit`, you might need to write or override a signer and generator in order to include your custom fields into the signature.

## Running tests

Besides unit testing with Mocha, the effectivity of all tests are also measured with the Stryker mutation testing framework.
```bash
npm run test
npm run stryker
```

We aim to achieve a coverage of 100%. Stryker and/or mocha test scores below 80% will fail the build.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License and disclaimer

[apache-2.0](https://choosealicense.com/licenses/apache-2.0/) with a [notice](NOTICE).

We discourage the use of this work in production environments as it is in active development and not mature enough.
