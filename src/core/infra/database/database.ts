export interface Database<T = any> {
  getConnection(): T
}
