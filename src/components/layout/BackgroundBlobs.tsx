export default function BackgroundBlobs() {
  return (
    <div className="absolute inset-0 opacity-30 pointer-events-none">
      <div className="absolute top-0 -left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
    </div>
  );
}
