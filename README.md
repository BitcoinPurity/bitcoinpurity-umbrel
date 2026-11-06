# Bitcoin Purity for Umbrel

Bitcoin Purity (BTC1) v1.1.2 with the original Umbrel node dashboard.
Node source and releases: https://github.com/saltduck/bitcoinpurity/tree/v1.1.2

Build the local application image from this repository root:

```sh
docker build -f apps/backend/Dockerfile -t bitcoin-purity:1.1.2 .
```

The Dockerfile downloads the official v1.1.2 binaries for amd64 or arm64 and
checks their SHA-256 digests. Docker Compose uses this local image with
`pull_policy: never`; no published application image is assumed.

The app ID is `bitcoin-purity`. Node and application data stay in this app's
`data/bitcoin` and `data/app` directories. Do not mount another Bitcoin app's
data directory. Technical names `bitcoind`, `bitcoin-cli` and `bitcoin.conf`
are retained because Bitcoin Purity uses them.

The browser UI uses Umbrel app_proxy on host port 10330, targeting
`bitcoin-purity_app_1:3000`. RPC 9332 and P2P 9333 inside the node container
are published as host ports 10332 and 10333. These are application overrides,
not Bitcoin Purity protocol defaults. The dashboard shows host ports for local
connections and hidden-service ports for Tor.

Three separate static container IPs are exported by `exports.sh`: node
`10.21.22.14`, Tor `10.21.22.15`, and I2P `10.21.22.16`. This follows the
official Bitcoin Knots package pattern; Umbrel does not automatically allocate
these package variables. These IPs and host ports have no matches in the
official App Store catalog at commit
`e7fbf7f0daabe1938166cc858a80165a476f8d93`. They are candidate allocations
for App Store review, not reservations; recheck before merging. Internal
container ports may coincide with other apps because their container IPs differ.

RPC, ZMQ, Tor/I2P, pruning, indexes and supported mempool policy settings use
the packaged Bitcoin Purity node. Block subsidies, fees and fee-rate statistics
come from RPC. The backend starts the node with `-service-mode=1`, as required
for unattended first use of a non-empty data directory in v1.1.2.

This application is adapted from Umbrel's Bitcoin Knots application:
https://github.com/getumbrel/umbrel-apps/tree/master/bitcoin-knots
The upstream license and copyright notices are preserved in LICENSE.md.
The logo is sourced from https://bitcoinpurity.org/brand/logo.png.
