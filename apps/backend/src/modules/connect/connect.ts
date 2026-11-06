import type {ConnectionDetails} from '#types'

export async function getConnectionDetails(): Promise<ConnectionDetails> {
	// P2P
	const p2pPort = process.env['P2P_PORT'] ?? '9333'
	const p2pHostPort = process.env['P2P_HOST_PORT'] ?? p2pPort
	const p2pTorHost = process.env['P2P_HIDDEN_SERVICE'] ?? 'somehiddenservice.onion'
	const p2pLocalHost = process.env['DEVICE_DOMAIN_NAME'] ?? '127.0.0.1'

	// RPC
	const label = 'Umbrel Bitcoin Purity'
	const rpcPort = process.env['RPC_PORT'] ?? '9332'
	const rpcHostPort = process.env['RPC_HOST_PORT'] ?? rpcPort
	const rpcUser = process.env['RPC_USER'] ?? 'umbrel'
	const rpcPassword = process.env['RPC_PASS'] ?? 'moneyprintergobrrr'
	const rpcTorHost = process.env['RPC_HIDDEN_SERVICE'] ?? 'someotherhiddenservice.onion'
	const rpcLocalHost = process.env['DEVICE_DOMAIN_NAME'] ?? '127.0.0.1'

	return {
		p2p: {
			tor: {
				host: p2pTorHost,
				port: p2pPort,
				uri: `${p2pTorHost}:${p2pPort}`,
			},
			local: {
				host: p2pLocalHost,
				port: p2pHostPort,
				uri: `${p2pLocalHost}:${p2pHostPort}`,
			},
		},

		rpc: {
			tor: {
				host: rpcTorHost,
				port: rpcPort,
				username: rpcUser,
				password: rpcPassword,
				uri: `btcrpc://${rpcUser}:${rpcPassword}@${rpcTorHost}:${rpcPort}?label=${encodeURIComponent(label)}`,
			},
			local: {
				host: rpcLocalHost,
				port: rpcHostPort,
				username: rpcUser,
				password: rpcPassword,
				uri: `btcrpc://${rpcUser}:${rpcPassword}@${rpcLocalHost}:${rpcHostPort}?label=${encodeURIComponent(label)}`,
			},
		},
	}
}
