export default function PlaceholderPage() {
  return (
    <div className="grid grid-cols-2 grid-rows-3 gap-5 border-solid border-2 border-gray-300 min-h-screen">
      <div className="col-span-2 bg-amber-400 max-h-23">header</div>
      <div className="row-span-2 bg-blue-400">sidebar</div>
      <div className="bg-green-400">content</div>
    </div>
  );
}
