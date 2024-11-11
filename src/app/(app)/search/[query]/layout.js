import Type from "@/components/Search/Type";

export default function layout({ children }) {
  return (
    <div>
      <Type />

      {children}
    </div>
  );
}
