"use client"

import * as React from "react"

export interface Message {
  id: string
  sender: "user" | "assistant"
  text: string
  timestamp: Date
}

interface ChatContextProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  activeTopic: string
  setActiveTopic: (topic: string) => void
  messages: Record<string, Message[]>
  sendMessage: (text: string) => void
  isTyping: boolean
}

const ChatContext = React.createContext<ChatContextProps | null>(null)

export function useChat() {
  const context = React.useContext(ChatContext)
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}

const initialMessages = (topic: string): Message[] => {
  switch (topic) {
    case "Total Revenue":
      return [
        {
          id: "init",
          sender: "assistant",
          text: "Welcome to the **Total Revenue** analysis space. The current total is **$1,250.00**, which is up by **+12.5%** this month. What insights or forecasts would you like me to generate for this metric?",
          timestamp: new Date(),
        },
      ]
    case "Active Users":
      return [
        {
          id: "init",
          sender: "assistant",
          text: "Hello! I've loaded the **Active Users** monthly data. The current total active users stands at **14,820**. Active users peaked in June at 264. Let me know if you want to run user cohort analysis or check trend correlations.",
          timestamp: new Date(),
        },
      ]
    case "Traffic Sources":
      return [
        {
          id: "init",
          sender: "assistant",
          text: "I am ready to help you analyze **Traffic Sources** data. Currently, **Direct** leads with **44%** of the 900 sessions, followed by **Referral** at **33%** and **Organic** at **22%**. What segment details would you like to explore?",
          timestamp: new Date(),
        },
      ]
    case "Performance Index":
      return [
        {
          id: "init",
          sender: "assistant",
          text: "Hi! I've loaded the **Performance Index** radar dataset. The overall system score is **86/100**. Uptime is leading at 95, while UX has the lowest score at 70. How should we proceed with analyzing these performance vectors?",
          timestamp: new Date(),
        },
      ]
    case "Total Visitors":
      return [
        {
          id: "init",
          sender: "assistant",
          text: "Welcome! I've loaded the interactive **Total Visitors** chart. It displays desktop and mobile visits for the selected period. How can I help you analyze visitor trends, device distribution, or seasonal spikes?",
          timestamp: new Date(),
        },
      ]
    default:
      return [
        {
          id: "init",
          sender: "assistant",
          text: "Hello! I'm here to assist with dashboard analytics. Select a chart focus to begin.",
          timestamp: new Date(),
        },
      ]
  }
}

const getMockAIResponse = (topic: string, query: string): string => {
  const q = query.toLowerCase()
  if (topic === "Total Revenue") {
    if (q.includes("why") || q.includes("reason") || q.includes("up")) {
      return "The +12.5% revenue growth is primarily driven by a 15% increase in contract renewals and an upgraded tier selection from existing corporate accounts. New customer acquisition contributed a secondary 4% boost."
    }
    return "To project next month's revenue, we can apply the current 12.5% growth rate, which forecasts a total of approximately $1,406.25, assuming active account churn remains below 2%."
  } else if (topic === "Active Users") {
    if (q.includes("jun") || q.includes("peak") || q.includes("high")) {
      return "The June peak of 264 new active accounts correlates directly with the marketing campaign launched in late May and a smoother self-serve onboarding flow we deployed on June 3rd."
    }
    return "Our current daily active to monthly active user (DAU/MAU) ratio is 42%. We can improve this with targeted in-app micro-interactions or notification nudges."
  } else if (topic === "Traffic Sources") {
    if (q.includes("organic") || q.includes("seo") || q.includes("search")) {
      return "Organic search is currently at 22% (198 sessions). We can boost this by expanding our content cluster strategy and targeting higher-intent long-tail keywords in our core niche."
    }
    return "Referral traffic (33%) is displaying a higher conversion rate (4.2%) compared to Direct traffic (2.8%). It would be highly beneficial to double down on our top 3 referral affiliate channels."
  } else if (topic === "Performance Index") {
    if (q.includes("ux") || q.includes("improve") || q.includes("70")) {
      return "To improve our UX score from 70 to 85+, we should: \n1. Optimize page loading speed (currently blocking UI rendering).\n2. Reduce form field friction on checkout.\n3. Make navigation collapse states persistent. \n\nWould you like me to write a technical card for this sprint?"
    }
    return "Our system uptime is exceptionally healthy at 95/100, and support responsiveness is at 90/100. This indicates core infrastructure stability, letting us pivot engineering focus entirely to UX optimizations."
  } else if (topic === "Total Visitors") {
    if (q.includes("desktop") || q.includes("mobile") || q.includes("device")) {
      return "Desktop users currently make up about 60% of total traffic, but mobile users represent a rising 40% with a higher bounce rate. Optimizing mobile chart interactions should be our immediate focus."
    }
    return "Looking at the 3-month trend, traffic spikes are occurring consistently on Tuesday mornings at 9:00 AM UTC. This would be the optimal window for sending product announcements."
  }
  return `I have analyzed your query regarding ${topic}. Based on the loaded telemetry, we should monitor current trends weekly and check back once the next data sync is complete. Let me know if you'd like a detailed report.`
}

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [activeTopic, setActiveTopic] = React.useState("Total Revenue")
  const [messages, setMessages] = React.useState<Record<string, Message[]>>({})
  const [isTyping, setIsTyping] = React.useState(false)

  // Lazy initialize messages for activeTopic if not exists
  React.useEffect(() => {
    if (!messages[activeTopic]) {
      setMessages((prev) => ({
        ...prev,
        [activeTopic]: initialMessages(activeTopic),
      }))
    }
  }, [activeTopic, messages])

  const sendMessage = React.useCallback(
    (text: string) => {
      if (!text.trim()) return

      const userMsg: Message = {
        id: `user-${Date.now()}`,
        sender: "user",
        text,
        timestamp: new Date(),
      }

      // Add user message
      setMessages((prev) => ({
        ...prev,
        [activeTopic]: [...(prev[activeTopic] || []), userMsg],
      }))

      // Trigger typing indicator
      setIsTyping(true)

      // Generate mock response after a delay
      setTimeout(() => {
        const aiMsg: Message = {
          id: `ai-${Date.now()}`,
          sender: "assistant",
          text: getMockAIResponse(activeTopic, text),
          timestamp: new Date(),
        }
        setMessages((prev) => ({
          ...prev,
          [activeTopic]: [...(prev[activeTopic] || []), aiMsg],
        }))
        setIsTyping(false)
      }, 1000)
    },
    [activeTopic]
  )

  const value = React.useMemo(
    () => ({
      isOpen,
      setIsOpen,
      activeTopic,
      setActiveTopic: (topic: string) => {
        setActiveTopic(topic)
        setIsOpen(true)
      },
      messages,
      sendMessage,
      isTyping,
    }),
    [isOpen, activeTopic, messages, sendMessage, isTyping]
  )

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
