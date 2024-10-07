export interface UploadLesson {
  FileVideo: File|null
  FileAttach: File|null
  Title: string
  Level: string
  Price: number
  AccessPeriod:number
  uploadDate: string

  Description: string
}
