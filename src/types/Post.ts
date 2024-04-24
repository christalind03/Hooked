export type Post = {
  id: string
  title: string
  content: string
  creatorID: string
  creationTimestamp: string
}

export function isPost(obj: any): obj is Post {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj.id === "string" &&
    typeof obj.title === "string" &&
    typeof obj.content === "string" &&
    typeof obj.creatorID === "string" &&
    typeof obj.creationTimestamp === "string"
  )
}
