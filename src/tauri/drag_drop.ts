import { TauriEvent, UnlistenFn } from "@tauri-apps/api/event";
import { observe } from "./event";

export interface DragDropEventPayload {
  paths: string[]
  position: { x: number, y: number}
}

export function onDragDrop(callback: (files: DragDropEventPayload) => void): UnlistenFn {
  return observe<DragDropEventPayload>(TauriEvent.DRAG_DROP, (event) => {
    callback(event.payload);
  })
}
