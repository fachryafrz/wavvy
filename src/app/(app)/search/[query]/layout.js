import Type from "@/components/Search/Type";

export default function layout({ children }) {
  return (
    <div className={`flex flex-col gap-2`}>
      <Type />

      {children}
    </div>
  );
}
