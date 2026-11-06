import {useQuery} from '@tanstack/react-query'

import {api} from '@/lib/api'

import type {Block} from '#types'
import type {SyncStage} from '@/lib/sync-progress'

// Pure REST query for Block[] data.
// Used by both the home page (limit=5) and insights charts (limit=200).
//
// Data flow:
//   1. Initial fetch when blocks are available (IBD or synced)
//   2. Real-time updates via useBlockStream (single global WebSocket in Layout)
//   3. refetchOnWindowFocus (React Query default) catches up after tab blur
//
// Poll during IBD, when the block WebSocket is not active. Once synced,
// WebSocket is the primary update channel; REST handles load and focus recovery.

export function useBlocks({limit = 200, stage}: {limit?: number; stage: SyncStage}) {
	return useQuery<Block[]>({
		queryKey: ['rpc', 'blocks', limit],
		queryFn: () => api<Block[]>(`/rpc/blocks?limit=${limit}`),
		enabled: stage === 'IBD' || stage === 'synced',
		refetchInterval: stage === 'IBD' ? 15_000 : false,
	})
}
