import { EventCallback, EventName, UnlistenFn, listen } from '@tauri-apps/api/event'

export function observe<T>(event: EventName, handler: EventCallback<T>): UnlistenFn {
  const promise = listen(event, handler)

  let unlisten: UnlistenFn | null = null
  let cancelled = false

  const checkInvalidated = () => {
    if (cancelled && unlisten != null) {
      unlisten()
    }
  }

  promise.then((u) => {
    unlisten = u
    checkInvalidated()
  });

  const unsubscribe: UnlistenFn = () => {
    cancelled = true
    checkInvalidated()
  }

  return unsubscribe
}
