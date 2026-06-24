# Widget-to-Chat Dashboard (UI Intern Task Submission)

## 🚀 How to Run the Program

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) in your browser to see the dashboard.

### 3. Build Production Bundle (Optional)
```bash
npm run build
```

---

## 📄 Key Design Decisions (Design Note)
To address the context-to-chat problem, we implemented a unified state provider (`components/chat-context.tsx`) that synchronizes the active widget's telemetry metadata directly with the AI sidebar's response engine. Visually, the moment of transition is defined by a dynamic **"spotlight focus" transition**—clicking a widget scales it up with soft border rings and deep shadows, while simultaneously dimming and blurring the rest of the dashboard workspace to prioritize focus. We also introduced fluid focus-switching (clicking any dimmed card instantly updates focus) and keyboard exits (pressing `Escape` closes the chat view), guided by a translucent, glassmorphic reminder toast to ensure natural, distraction-free interaction.

---

## ▦ Key Features

* **Spotlight Focus Mode**: Clicking a widget scales it up and highlights it while dimming and blurring the rest of the page.
* **Fluid Focus Switching**: Click on any dimmed widget to instantly switch the AI chat focus to that card.
* **Escape to Exit & Toast Tip**: Press `Esc` to close the sidebar. A soft, translucent tip appears at the bottom to remind you.
* **Clean Context Banner**: The active widget name and metrics are shown in a flat text banner below the simplified header.
* **Clean AI Text**: Bold text in mock AI responses is formatted into clean strong text, removing raw asterisks.
