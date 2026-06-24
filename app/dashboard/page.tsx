"use client"

import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ChatProvider } from "@/components/chat-context"
import { AiChatSidebar } from "@/components/ai-chat-sidebar"

import data from "./data.json"

export default function Page() {
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

  return (
    <ChatProvider>
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
                  <DataTable data={data} />
                </div>
              </div>
            </div>
            {/* AI Chat Sidebar */}
            <AiChatSidebar />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ChatProvider>
  )
}
