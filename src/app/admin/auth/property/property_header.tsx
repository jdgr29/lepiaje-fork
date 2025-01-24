export function PropertyHeader({
  name,
  location_name,
}: {
  name: string;
  location_name: string;
}) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-200">{name}</h1>
      <p className="text-gray-400 mt-1">{location_name}</p>
    </div>
  );
}
