type PageHeadingProps = {
  title: string;
  description?: string;
  toolbar?: JSX.Element;
};
export default function PageHeading({
  toolbar,
  title,
  description,
}: PageHeadingProps) {
  return (
    <div className="flex items-center justify-between space-y-2">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {toolbar ? (
        <div className="flex items-center space-x-2">{toolbar}</div>
      ) : null}
    </div>
  );
}
