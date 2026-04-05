import SectionCard from "../components/SectionCard";

function Sections() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        Choose Research Section
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SectionCard title="Research Already Done" section="research_done" />
        <SectionCard title="Ongoing Research" section="ongoing_research" />
        <SectionCard title="Future Scope" section="future_scope" />
      </div>
    </div>
  );
}

export default Sections;
