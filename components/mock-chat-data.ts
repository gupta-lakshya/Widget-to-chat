export interface TopicMetadata {
  title: string
  context: string
  initialGreeting: string
}

export const TOPICS_METADATA: Record<string, TopicMetadata> = {
  "Total Revenue": {
    title: "Total Revenue",
    context: "$1,250.00 (+12.5% trending up)",
    initialGreeting: "Welcome to the **Total Revenue** analysis space. The current total is **$1,250.00**, which is up by **+12.5%** this month. What insights or forecasts would you like me to generate for this metric?",
  },
  "Active Users": {
    title: "Active Users",
    context: "14,820 views (Active vs. New)",
    initialGreeting: "Hello! I've loaded the **Active Users** monthly data. The current total active users stands at **14,820**. Active users peaked in June at 264. Let me know if you want to run user cohort analysis or check trend correlations.",
  },
  "Traffic Sources": {
    title: "Traffic Sources",
    context: "900 sessions (44% Direct, 33% Referral, 22% Organic)",
    initialGreeting: "I am ready to help you analyze **Traffic Sources** data. Currently, **Direct** leads with **44%** of the 900 sessions, followed by **Referral** at **33%** and **Organic** at **22%**. What segment details would you like to explore?",
  },
  "Performance Index": {
    title: "Performance Index",
    context: "86/100 system score (Speed/Uptime/Security/UX)",
    initialGreeting: "Hi! I've loaded the **Performance Index** radar dataset. The overall system score is **86/100**. Uptime is leading at 95, while UX has the lowest score at 70. How should we proceed with analyzing these performance vectors?",
  },
  "Total Visitors": {
    title: "Total Visitors",
    context: "Last 3 months data (Desktop vs. Mobile)",
    initialGreeting: "Welcome! I've loaded the interactive **Total Visitors** chart. It displays desktop and mobile visits for the selected period. How can I help you analyze visitor trends, device distribution, or seasonal spikes?",
  },
}

export const getMockAIResponse = (topic: string, query: string): string => {
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
