import { type Post } from "@/types/Post"

type Props = {
  postData: Post
}

export function PostPreview({ postData }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-bold text-lg">{postData.title}</h3>
      <p className="line-clamp-5 text-sm">{postData.description}</p>
    </div>
  )
}