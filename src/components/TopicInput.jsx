import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TopicInput() {
  const [topic, setTopic] = useState("");
  const navigate = useNavigate();

  const submitHandler = () => {
    if (!topic.trim()) return;
    localStorage.setItem("topic", topic);
    navigate("/sections");
  };

  return (
    <div className="bg-white p-8 rounded shadow-md w-96">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Smart Research System
      </h1>

      <input
        type="text"
        placeholder="Enter research topic"
        className="border w-full p-2 mb-4"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <button
        onClick={submitHandler}
        className="bg-blue-600 text-white w-full py-2 rounded"
      >
        Explore Research
      </button>
    </div>
  );
}

export default TopicInput;
