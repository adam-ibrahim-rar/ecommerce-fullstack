export default function Skeleton({ ClassName }: { ClassName: string }) {
  return <div className={`animate-pulse bg-one ${ClassName}`}></div>;
}
