import { useEffect, useRef } from 'react'

const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:5001/ws'
const RECONNECT_MS = 3000

/**
 * Connects to the WS server and calls onUpdate({ batch_id, sold_count, capacity })
 * whenever a batch_update event arrives. Auto-reconnects on disconnect.
 */
export function useBatchWs(onUpdate) {
    const onUpdateRef = useRef(onUpdate)
    onUpdateRef.current = onUpdate

    useEffect(() => {
        let ws
        let timer

        function connect() {
            ws = new WebSocket(WS_URL)

            ws.onmessage = (e) => {
                try {
                    const data = JSON.parse(e.data)
                    if (data.type === 'batch_update') onUpdateRef.current(data)
                } catch {}
            }

            ws.onclose = () => {
                timer = setTimeout(connect, RECONNECT_MS)
            }

            ws.onerror = () => ws.close()
        }

        connect()

        return () => {
            clearTimeout(timer)
            ws?.close()
        }
    }, [])
}
