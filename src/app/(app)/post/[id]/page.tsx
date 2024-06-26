import { createClient } from "@/utils/supabase/server"
import { Post } from "@/components/App/Post/Post"

type Props = {
  params: {
    id: string
  }
}

export default async function PostID({ params: { id } }: Props) {
  const supabaseClient = await createClient()

  const {
    data: { user },
  } = await supabaseClient.auth.getUser()

  const { data, error } = await supabaseClient
    .from("posts")
    .select("*")
    .match({
      id,
    })
    .single()

  return <Post postData={data} userID={user?.id} />
}
