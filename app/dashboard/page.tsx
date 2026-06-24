"use client"

import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ChatProvider, useChat } from "@/components/chat-context"
import { AiChatSidebar } from "@/components/ai-chat-sidebar"
import { cn } from "@/lib/utils"

import data from "./data.json"

function DashboardLayout() {
  const { isOpen, setIsOpen } = useChat()
  const [showEscTip, setShowEscTip] = React.useState(false)

  React.useEffect(() => {
    // Disable default browser (master) scrollbars for this page only
    const htmlEl = document.documentElement
    const bodyEl = document.body
    
    htmlEl.style.overflow = "hidden"
    bodyEl.style.overflow = "hidden"
    htmlEl.style.height = "100%"
    bodyEl.style.height = "100%"
    
    return () => {
      htmlEl.style.overflow = ""
      bodyEl.style.overflow = ""
      htmlEl.style.height = ""
      bodyEl.style.height = ""
    }
  }, [])

  // Listen for Escape key to close focus mode
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, setIsOpen])

  // Show Escape tip toast for 2 seconds when sidebar opens
  React.useEffect(() => {
    if (isOpen) {
      setShowEscTip(true)
      const timer = setTimeout(() => {
        setShowEscTip(false)
      }, 2000)
      return () => clearTimeout(timer)
    } else {
      setShowEscTip(false)
    }
  }, [isOpen])

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset className="bg-zinc-50/50 dark:bg-zinc-950/50 flex flex-col h-screen overflow-hidden">
        <SiteHeader />
        <div className="flex flex-1 overflow-hidden">
          {/* Scrollable Dashboard Panel */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards />
                <div className="px-4 lg:px-6">
                  <ChartAreaInteractive />
                </div>
                {/* DataTable wrapper that dims when AI sidebar is open */}
                <div 
                  className={cn(
                    "transition-all duration-300 ease-in-out origin-center",
                    isOpen && "opacity-30 scale-[0.98] blur-[0.5px] pointer-events-none saturate-50"
                  )}
                >
                  <DataTable data={data} />
                </div>
              </div>
            </div>
          </div>
          {/* AI Chat Sidebar */}
          <AiChatSidebar />
        </div>
      </SidebarInset>

      {/* Escape Key Tip Toast */}
      <div
        className={cn(
          "fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-850 dark:text-zinc-200 px-3.5 py-1.5 rounded-full text-[11px] font-bold shadow-xs z-50 flex items-center gap-2 transition-all duration-300 ease-in-out",
          showEscTip ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        <span className="bg-zinc-100 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-750 text-zinc-550 dark:text-zinc-400 rounded px-1.5 py-0.5 font-mono text-[9px] uppercase shadow-2xs">
          Esc
        </span>
        <span>Press Esc to exit focus mode</span>
      </div>
    </SidebarProvider>
  )
}

export default function Page() {
  return (
    <ChatProvider>
      <DashboardLayout />
    </ChatProvider>
  )
}
