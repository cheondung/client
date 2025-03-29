interface SupportRequestProps {
  content: string;
}

export default function SupportRequest({ content }: Readonly<SupportRequestProps>) {
  return (
    <div className="max-w-56 self-end rounded-md border bg-secondary text-secondary-foreground">
      <div className="break-words px-3 py-2">{content}</div>
    </div>
  );
}
