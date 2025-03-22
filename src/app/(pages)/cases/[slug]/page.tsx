export default function SimpleCaseStudyPage({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>Case Study: {params.slug}</h1>
      <p>This is a simplified placeholder page.</p>
    </div>
  );
}