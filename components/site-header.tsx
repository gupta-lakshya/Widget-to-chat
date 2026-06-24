"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useChat } from "@/components/chat-context"
import { Sparkles } from "lucide-react"

export function SiteHeader() {
  const { isOpen, setIsOpen } = useChat()

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 bg-transparent">
      <div className="flex w-full items-center justify-between px-4 lg:px-6">
        {/* Left Side: Navigation & Title */}
        <div className="flex items-center gap-1 lg:gap-2">
          <SidebarTrigger className="-ml-1 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4 bg-zinc-200 dark:bg-zinc-800"
          />
          <h1 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">Dashboard</h1>
        </div>

        {/* Right Side: Simple AI Chat Toggle */}
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            variant={isOpen ? "secondary" : "outline"}
            size="sm"
            className="text-xs h-8 gap-1.5 font-bold border-zinc-250 dark:border-zinc-800 bg-white dark:bg-zinc-900 cursor-pointer"
          >
            <Sparkles className="size-3.5 text-violet-500" />
            <span>AI Chat</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
