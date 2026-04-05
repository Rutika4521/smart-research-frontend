import { useNavigate } from "react-router-dom";

function SectionCard({ title, section }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white p-6 rounded shadow cursor-pointer hover:shadow-lg"
      onClick={() => navigate(`/results/${section}`)}
    >
      <h3 className="text-xl font-semibold text-center">{title}</h3>
    </div>
  );
}

export default SectionCard;
