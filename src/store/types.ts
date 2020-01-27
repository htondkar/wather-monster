export interface Action<T extends string, Payload = any> {
  type: T
  payload: Payload
  error: boolean
}
