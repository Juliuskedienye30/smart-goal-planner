# Smart Goal Planner

**Smart Goal Planner** is a financial planning React app that helps users create, manage, and track their savings goals efficiently. Users can define goals, set target amounts, deposit savings, monitor progress, and visualize financial overviews—all in a clean and dark-themed UI.

---

##  Features

-  Add new savings goals with deadline, category, and target amount.
-  Make deposits to individual goals and track saved progress.
-  View a real-time financial overview: total goals, saved, and remaining amounts.
-  Sort and organize your financial goals visually.
-  Smart categorization (e.g., overdue, completed goals).
-  Dark mode for a sleek modern look.
-  Clean layout: Overview, Goal Form, Deposit Form, and Goal List arranged clearly.

---

##  Project Layout

```Smart Goal Planner/
│
├── public/
│ └── index.html
│
├── src/
│ ├── components/
│ │ ├── GoalForm.jsx
│ │ ├── DepositForm.jsx
│ │ ├── GoalList.jsx
│ │ ├── Overview.jsx
│ │ └── GoalCard.jsx
│ ├── api.js
│ ├── App.js
│ ├── App.css
│ └── index.js
│
├── db.json (used with JSON Server)
├── package.json
└── README.md```

yaml
Copy
Edit

---

##  Tech Stack

- **React** – Frontend framework
-  **CSS** – Custom styling with responsive layout
-  **JSON Server** – Simulated backend for data persistence

---

##  Installation

```bash
# Clone the repository
git clone https://github.com/your-username/smart-goal-planner.git
cd smart-goal-planner

# Install dependencies
npm install
 Running the App
1. Start JSON Server
bash
Copy
Edit
npx json-server --watch db.json --port 3000
Make sure db.json contains:

json
Copy
Edit
{
  "goals": []
}
2. Start the React App
In another terminal:

bash
Copy
Edit
npm start
The app will run at: `http://localhost:5173 (or http://localhost:3001 if Vite is used)`

# Screenshots
<img width="782" height="323" alt="image" src= `"https://github.com/user-attachments/assets/fab948d2-6fa7-489d-bcd8-9f2762060b74"` />
<img width="815" height="411" alt="image" src= `"https://github.com/user-attachments/assets/8d8636c6-feca-4508-84ea-e354f98032be"` />





 Future Improvements
Add edit mode for goals

Add charts for savings trends

Reminder system for overdue goals

User authentication

Author
Kedienye July

License
This project is licensed under the MIT License. See the LICENSE file for details.
