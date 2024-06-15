"use client"

// Business Logic
import { type Post } from "@/types/Post"
import debounce from "lodash.debounce"
import { useCallback, useEffect, useRef, useState } from "react"
import { useUser } from "@/components/UserProvider"

// UI Components
import { PostPreview } from "@/components/App/Post/PostPreview"
import { Separator } from "@/components/ui/Separator"

type Props = {
  refreshToken: number
  filterPosts: (limit: number, offset: number) => Promise<Post[]>
}

export function InfiniteFeed({ refreshToken, filterPosts }: Props) {
  const [offset, setOffset] = useState<number>(0)
  const [loadedPosts, setLoadedPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const feedContainer = useRef<HTMLDivElement>(null)
  const supabaseUser = useUser()

  const debounceScroll = useCallback(
    debounce(() => {
      if (feedContainer.current && typeof window !== "undefined") {
        const { bottom } = feedContainer.current.getBoundingClientRect()
        const { innerHeight } = window

        setIsVisible((prevState) => bottom <= innerHeight)
      }
    }, 250),
    []
  )

  useEffect(() => {
    loadPosts(true)
    window.addEventListener("scroll", debounceScroll)

    return () => window.removeEventListener("scroll", debounceScroll)
  }, [refreshToken])

  useEffect(() => {
    if (isVisible) {
      loadPosts(false)
    }
  }, [isVisible])

  async function loadPosts(refreshPosts: boolean) {
    setIsLoading(true)
    setOffset((prevState) => {
      if (refreshPosts) {
        return 0
      }

      return prevState + 1
    })

    const newPosts = await filterPosts(25, offset)

    setLoadedPosts((prevState) =>
      refreshPosts ? newPosts : [...prevState, ...newPosts]
    )

    setIsLoading(false)
  }

  return (
    <div
      className="flex flex-col gap-3 items-center justify-center"
      ref={feedContainer}
    >
      {loadedPosts.length === 0 ? (
        <div className="flex flex-col items-center justify-center m-5">
          <h3 className="font-extrabold m-5 text-3xl">Uh oh!</h3>
          <p>We couldn't find any results matching your search.</p>
          <p>Try searching for something else.</p>
        </div>
      ) : (
        loadedPosts.map((postData, postIndex) => (
          <div className="space-y-3 w-full" key={postIndex}>
            {!!postIndex && <Separator />}
            <PostPreview postData={postData} userID={supabaseUser?.id || ""} />
          </div>
        ))
      )}
    </div>
  )
}
