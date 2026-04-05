function PaperCard({ paper }) {
  return (
    <div className="bg-white p-5 rounded shadow mb-4">
      <h3 className="text-lg font-semibold">{paper.title}</h3>
      <p className="text-sm text-gray-500 mb-2">Year: {paper.year}</p>

      <ul className="list-disc ml-6 mb-3">
        {paper.summary.map((point, idx) => (
          <li key={idx}>{point}</li>
        ))}
      </ul>

      <a
        href={paper.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        View IEEE Paper
      </a>
    </div>
  );
}

export default PaperCard;
