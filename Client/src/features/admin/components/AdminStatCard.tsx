type Props = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
};

export default function AdminStatCard({
  title,
  value,
  icon,
}: Props) {
  return (
    <div>
      {icon}
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}