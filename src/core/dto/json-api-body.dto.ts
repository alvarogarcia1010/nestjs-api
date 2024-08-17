export class JsonApiBodyDto<T> {
  data: {
    type: string
    id?: number
    attributes: T
  }
}