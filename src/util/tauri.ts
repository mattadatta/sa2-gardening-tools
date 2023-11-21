import { EventCallback, EventName, UnlistenFn, listen } from '@tauri-apps/api/event'

function observe<T>(event: EventName, handler: EventCallback<T>): UnlistenFn {
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

export function onFileDrop(callback: (files: string[]) => void): UnlistenFn {
  return observe<string[]>('tauri://file-drop', (event) => {
    callback(event.payload);
  })
}
