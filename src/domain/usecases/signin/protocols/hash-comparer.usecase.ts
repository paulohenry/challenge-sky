export interface HashCompareData {
  value: string
  hash: string
}

export interface HashComparer {
  compare: (data: HashCompareData) => Promise<boolean>
}
