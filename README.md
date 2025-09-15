
# 🚗 CarMatch AI

CarMatch AI is an AI-powered car comparison tool that helps users decide between two cars—either by entering full specifications or just the model and year. The app uses OpenAI to generate a verdict and saves data for future reference and improvement.

---

## 🔧 Tech Stack

- **Frontend**: React (Vite) + Tailwind CSS + React Router
- **Backend**: Express.js + Node.js
- **Database**: MongoDB Atlas
- **AI**: OpenAI API

---

## 🧩 Features

- Compare cars with or without specifications
- AI-generated verdicts tailored to user intent (e.g., Luxury, Family, Long Drive)
- Stores user feedback to improve verdict accuracy
- MongoDB integration for car specs and verdict history
- Clean, responsive UI with modern design

---

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/car-match-ai.git
cd car-match-ai
```


### 2. Setup Client

```bash
cd client
npm install
npm run dev
```

Runs on: `http://localhost:5173`

### 3. Setup Server

```bash
cd server
npm install
```

#### Create `.env` in `server/` directory:

```env
PORT=5000
MONGO_URI=mongodb+srv://<your-mongodb-connection>
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx
```

```bash
node server.js
```

Runs on: `http://localhost:5000`

---

## 🚀 Usage Flow

### With Specs Mode:

1. User inputs full car specs for Car A and Car B.
2. User selects intents or preferences.
3. System:

   - Saves specs to DB
   - Calls OpenAI for a verdict
   - Stores and returns rating and result

### Without Specs Mode:

1. User enters just brand/model + year.
2. System:

   - Searches MongoDB for matching specs
   - If found, sends them to OpenAI
   - If not found, asks user to enter specs manually
   - Verdict + user feedback saved for future queries

---

## 📦 API

### `POST /api/compare`

Request Example:

```json
{
  "carA": {
    "brand": "Toyota",
    "year": 2010,
    "horsepower": 130
  },
  "carB": {
    "brand": "Honda",
    "year": 2012,
    "horsepower": 125
  },
  "userIntent": ["Family", "City Drive"],
  "mode": "with-specs"
}
```

Response Example:

```json
{
  "winner": {
    "brand": "Toyota",
    "year": 2010
  },
  "reasons": "Better safety and family space",
  "rating": 4
}
```

---

## 🖼️ UI Screenshots

> _(Coming soon)_ :



---

## 📌 To-Do

- [ ] Add user authentication
- [ ] Create car spec database seeder
- [ ] Deploy to Vercel (frontend) and Render (backend)
- [ ] Add feedback-based learning logic

---

## 🤝 Contributing

Feel free to fork and submit PRs. Suggestions welcome!

---

## 📄 License

[MIT](https://opensource.org/licenses/MIT)

---

## 🧠 Author

Made by Aqsa Ali Malik(https://github.com/aqsaa-malikk99)

```

```
