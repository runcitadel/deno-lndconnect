# simple-lndconnect

[![codecov](https://codecov.io/github/runcitadel/deno-lndconnect/branch/main/graph/badge.svg?token=Uh0EXCsxAH)](https://codecov.io/github/runcitadel/deno-lndconnect)

> Generate and parse lndconnect uris https://github.com/LN-Zap/lndconnect ⚡️

This package is a modernized and cleaned up version of the original [node-lndconnect](https://github.com/LN-Zap/node-lndconnect).

For more information take a look at the [specification of the uri format](https://github.com/LN-Zap/lndconnect/blob/master/lnd_connect_uri.md).

## Table of Contents

- [Usage](#usage)
- [Maintainers](#maintainers)
- [Contribute](#contribute)

## Usage

**format({ host, cert, macaroon }):**

Formats a host / cert / macaroon combo into an lndconnect link.

```javascript
import { format } from 'https://deno.land/x/lndconnect/mod.ts'
const connectionString = format({
  host: '1.2.3.4:10009',
  cert: 'MIICuDCCAl...',
  macaroon: '0201036c6...',
})
expect(connectionString).toEqual('lndconnect://1.2.3.4:10009?cert=MIICuDCCAl...&macaroon=0201036c6...')
```

**encode({ host, cert, macaroon }):**

Encodes a host / cert / macaroon combo and formats into an lndconnect link.

```javascript
import { encode } from 'https://deno.land/x/lndconnect/mod.ts'
const connectionString = encode({
  host: '1.2.3.4:10009',
  cert: '-----BEGIN CERTIFICATE-----\n...',
  macaroon: '0201036c6...',
})
expect(connectionString).toEqual('lndconnect://1.2.3.4:10009?cert=MIICuDCCAl...&macaroon=AgEDbG5kAr...')
```

**decode(lndconnectUri):**

Decodes an lndconnect link into it's component parts (host / cert as utf8 / macaroon as hex)

```javascript
import { decode } from 'https://deno.land/x/lndconnect/mod.ts'
const { host, cert, macaroon } = decode('lndconnect://1.2.3.4:10009?cert=MIICuDCCAl...&macaroon=AgEDbG5kAr...')
expect(host).toEqual('1.2.3.4:10009')
expect(cert).toEqual('MIICuDCCAl...')
expect(macaroon).toEqual('0201036c6...')
```

#### Certificate

**encodeCert(cert):**

Encodes a certificate (String) or a path to a certifiate (string) to base64url encoded DER format.
If you provide a path, the path is encoded, not the contents of the file with that path.

```javascript
import { encodeCert } from 'https://deno.land/x/lndconnect/mod.ts'
const certPath = path.join(__dirname, 'tls.cert')
const cert = encodeCert(certPath)
// returns base64url encoded DER cert.
expect(cert).toEqual('MIICuDCCAl...')
```

**decodeCert(encodedCert):**

Decodes a certificate from base64url encoded DER format to a string.

```javascript
import { decodeCert } from 'https://deno.land/x/lndconnect/mod.ts'
// pass a base64url encoded DER cert
const cert = decodeCert(encodedCert)
// returns utf8 encoded PEM cert.
expect(cert).toEqual('-----BEGIN CERTIFICATE-----\n...')
```

#### Macaroon

**encodeMacaroon(macaroon):**

Encodes a binary macaroon (hex string or binary UInt8Array) or a path to a macaroon (string) to base64url encoded string.
If you provide a path, the path is encoded, not the contents of the file with that path.

```javascript
import { encodeMacaroon } from 'https://deno.land/x/lndconnect/mod.ts'
const macaroonPath = path.join(__dirname, 'admin.macaroon')
const macaroon = encodeMacaroon(macaroonPath)
// returns base64url encoded macaroon.
expect(macaroon).toEqual('AgEDbG5kAr...')
```

**decodeMacaroon(encodedMacaroon):**

Decodes a base64url encoded macaroon to a hex encoded macaroon.

```javascript
import { decodeMacaroon } from 'https://deno.land/x/lndconnect/mod.ts'
// pass a base64url encoded macaroon
const macaroon = decodeMacaroon(encodedMacaroon)
// returns hex encoded macaroon.
expect(macaroon).toEqual('0201036c6...')
```

### Testing

Run the tests suite:

```bash
  deno test
```

## Maintainers

[@AaronDewes](https://github.com/AaronDewes).

## Contribute

Feel free to dive in! [Open an issue](https://github.com/runcitadel/deno-lndconnect/issues/new) or submit PRs.
