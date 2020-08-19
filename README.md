# vp-toolkit-models

[![Build Status](https://travis-ci.org/rabobank-blockchain/vp-toolkit-models.svg?branch=master)](https://travis-ci.org/rabobank-blockchain/vp-toolkit-models)
[![Test Coverage](https://api.codeclimate.com/v1/badges/4bbc4f19c005b7b7ff3b/test_coverage)](https://codeclimate.com/github/rabobank-blockchain/vp-toolkit-models/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/4bbc4f19c005b7b7ff3b/maintainability)](https://codeclimate.com/github/rabobank-blockchain/vp-toolkit-models/maintainability)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A TypeScript/JavaScript library containing models for [w3c verifiable credentials](https://w3c.github.io/vc-data-model/):
- [Verifiable Credential](src/model/verifiable-credential.ts)
- [Verifiable Presentation](src/model/verifiable-presentation.ts)
- [Challenge Request](src/model/challenge-request.ts) _(not part of the w3c specification)_
- [Proof](src/model/proofs/base-proof.ts) _(will be part of the objects above)_

## Installation

In an existing project (with `package.json`), install `vp-toolkit-models`

```bash
npm install vp-toolkit-models --save
```

## Usage

### Example (VerifiableCredential)

The example below creates an unsigned VerifiableCredential object. To create a signed object easily, please use [`vp-toolkit`](github.com/rabobank-blockchain/vp-toolkit).
```typescript
import { VerifiableCredential } from 'vp-toolkit-models'

const verifiableCredential = new VerifiableCredential({
  '@context': ['https://www.w3.org/2018/credentials/v1'], // Optional
  type: ['VerifiableCredential', 'GovernmentId'],
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
  proof: { // Required when sending to the counterparty
    type: 'Secp256k1Signature2019', // Mandatory, the rest is optional
    created: new Date(), // UTC time
    verificationMethod: 'publicKey',
    nonce: '547d06de-7f1b-4040-8ad0-cbee414a4a7f',
    signatureValue: 'generated signature value'
  }
})

// Dynamic fields can be found in the additionalFields property
const someOtherRandomField = verifiableCredential.additionalFields['someOtherRandomField']

// Models can be stringified and parsed - the order of fields will remain as original
const string = JSON.stringify(verifiableCredential)
```

The same approach works for a VerifiablePresentation and ChallengeRequest - but with different fields, obviously.
The ChallengeRequest object supports Zero Knowledge Range Proof by offering the `lowerBound` and `upperBound` fields.

## Proofs

Verifiable Credentials and Presentations can be signed using various cryptographic suites.
Every signature method has its own set of fields.
This model definition instantiates all proofs as a BaseProof, only requiring a `type` field. Other fields are accessible through the `additionalFields` property.
An out-of-the-box definition for `Secp256k1Signature2019` is provided, but if you'd like to introduce your own proof model definition, feel free to copy-paste and specify the fields you need.

### Casting the BaseProof to a specific proof

Since the default `BaseProof` causes loss of strict typing, you can cast it to another Type.
For example, the VerifiableCredential's proof can be casted to a `Secp256k1Signature2019`: 
```typescript
const castedProof = Secp256k1Proof.cast(verifiableCredential.proof)
```

*Note, `BaseProof` does not cause any loss of fields. `BaseProof.toJSON()` puts the fields back in order as they originally were.*

### Your own proof

Introduce your own proof structure by filling this class template:
```typescript
export interface IYourProofParams extends Record<string, any> { // Basically extends 'any'
  yourCustomField: string
}

export class YourProof extends BaseProof {
  private readonly _yourCustomField: string

  public static nonEmptyFields = ['yourCustomField']
  public static supportsType = 'YourProofType'

  constructor (obj: IYourProofParams) {
    super(obj, YourProof.nonEmptyFields)

    this._yourCustomField = obj.yourCustomField

    this.initializeAdditionalFields(obj, this) // Inherited from BaseProof
  }

  @Expose()
  public get yourCustomField (): string {
    return this._yourCustomField
  }

  public static cast (t: BaseProof): YourProof {
    return new YourProof(t.toJSON() as IYourProofParams)
  }
}
```

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
