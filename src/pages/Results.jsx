import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import PaperCard from "../components/PaperCard";

function Results() {
  const { section } = useParams();
  const [papers, setPapers] = useState([]);
  const topic = localStorage.getItem("topic");

  useEffect(() => {
    api.get(`/research?topic=${topic}`).then((res) => {
      setPapers(res.data[section]);
    });
  }, [section, topic]);

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 capitalize">
        {section.replace("_", " ")}
      </h2>

      {papers.map((paper, idx) => (
        <PaperCard key={idx} paper={paper} />
      ))}
    </div>
  );
}

export default Results;
