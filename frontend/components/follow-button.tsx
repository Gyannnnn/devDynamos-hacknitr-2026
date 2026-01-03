"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { UserPlus, Check } from "lucide-react"

export function FollowButton({ initial = false }: { initial?: boolean }) {
  const [isFollowing, setIsFollowing] = useState(initial)
  const toggleFollow = () => setIsFollowing((v) => !v)

  return (
    <Button
      variant={isFollowing ? "secondary" : "outline"}
      onClick={toggleFollow}
      aria-pressed={isFollowing}
      title={isFollowing ? "Following" : "Follow"}
      className="flex items-center gap-2 w-full sm:w-auto justify-center"
    >
      {isFollowing ? <Check className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
      <span className="text-sm">{isFollowing ? "Following" : "Follow"}</span>
    </Button>
  )
}

export default FollowButton
