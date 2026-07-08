import React, { useState } from "react";
import axios from "axios";
import { TypeAnimation } from "react-type-animation";
import Button from "react-bootstrap/Button";
import "./book.css";

function Book() {
  const [bookName, setBookName] = useState("");
  const [bookInfo, setBookInfo] = useState("");
  const [bookUrl, setBookUrl] = useState("");
  const [animationKey, setAnimationKey] = useState(0);
  const [questions, setQuestions] = useState({});
  const [showquestion, setShowQuestion] = useState("");

  const API = "http://127.0.0.1:8000";

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Get summary
      const response = await axios.get(
        `${API}/info/${encodeURIComponent(bookName)}`
      );

      console.log("Summary:", response.data);

      setBookInfo(response.data.data);
      setShowQuestion("");

      // Get questions
      const questionRes = await axios.get(`${API}/questions/`);

      console.log("Questions:", questionRes.data);

      setQuestions(questionRes.data);

      // Get book cover (optional)
      try {
        const bookmeta = await axios.get(`${API}/bookinfo`);

const cover = await axios.get(
  `${API}/cover`,
  {
    params: {
      title: bookmeta.data.title,
    },
  }
);

setBookUrl(cover.data.url);
      } catch (err) {
        console.log("Book cover unavailable");
      }

      setAnimationKey((prev) => prev + 1);
    } catch (error) {
      console.error("Submit Error:", error);
    }
  };

  const qCalled = async (key) => {
    try {
      const ans = await axios.post(`${API}/questions/`, {
        q: questions[key],
      });

      setBookInfo(ans.data.data);
      setShowQuestion(questions[key]);

      const nextQuestion = await axios.get(`${API}/question/`);

      setQuestions((prev) => ({
        ...prev,
        [key]: nextQuestion.data.q,
      }));

      setAnimationKey((prev) => prev + 1);
    } catch (error) {
      console.error("Question Error:", error);
    }
  };

  return (
<div className="main">

<h1 className="heading">
📚 AI Book Summarizer
</h1>

<form onSubmit={handleSubmit} className="search-box">

<input
className="book-input"
id="bookName"
name="bookName"
type="text"
value={bookName}
onChange={(e)=>setBookName(e.target.value)}
placeholder="Search any book..."
/>

<button className="search-btn">
Search
</button>

</form>

{bookUrl && (
<img
className="book-cover"
src={bookUrl}
alt={bookName}
/>
)}

{bookInfo && (

<div className="summary-card">

<h3 className="summary-title">
{showquestion || "Book Summary"}
</h3>

<div className="answer">

<TypeAnimation
key={animationKey}
sequence={[bookInfo]}
speed={40}
cursor={false}
style={{
whiteSpace:"pre-line"
}}
/>

</div>

<div className="question-section d-grid gap-3">

<Button
className="question-btn q1"
onClick={()=>qCalled("q1")}
>
{questions.q1}
</Button>

<Button
className="question-btn q2"
onClick={()=>qCalled("q2")}
>
{questions.q2}
</Button>

<Button
className="question-btn q3"
onClick={()=>qCalled("q3")}
>
{questions.q3}
</Button>

</div>

</div>

)}

</div>
);
}

export default Book;