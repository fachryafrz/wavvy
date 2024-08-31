export default function loading() {
  return (
    <div className={`flex items-center gap-2`}>
      <span className="loading loading-spinner loading-sm"></span>
      <span>Loading...</span>
    </div>
  );
}
