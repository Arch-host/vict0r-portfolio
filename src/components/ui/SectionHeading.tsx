type Props = { command: string; title: string; text: string };

export default function SectionHeading({ command, title, text }: Props) {
  return (
    <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
      <p className="text-brand font-semibold mb-3">
        <span aria-hidden="true">$ </span>
        {command}
      </p>
      <h2 className="text-3xl md:text-4xl font-bold text-heading mb-6">{title}</h2>
      <p>{text}</p>
    </div>
  );
}
