import Section from "./ui/Section.tsx";
import SectionHeading from "./ui/SectionHeading.tsx";

const placeholderPosts = [1, 2, 3];

export default function Blog() {
  return (
    <Section id="blog">
      <SectionHeading
        command="cat posts/*.md"
        title="Writing, Soon"
        text="I'm just getting started writing here. Check back for posts on dev, AI tooling, and whatever I'm building next."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {placeholderPosts.map((n) => (
          <div
            key={n}
            className="border border-dashed border-brand/30 rounded-lg p-8 flex flex-col items-center text-center gap-3"
          >
            <span className="text-brand/70 text-xs">coming soon</span>
            <div className="w-full h-3 bg-brand/10 rounded" />
            <div className="w-3/4 h-3 bg-brand/10 rounded" />
            <div className="w-1/2 h-3 bg-brand/10 rounded mt-2" />
          </div>
        ))}
      </div>
    </Section>
  );
}
