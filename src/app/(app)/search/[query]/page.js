import Search from "@/components/Search";

export async function generateMetadata({ params }) {
  const { query: rawQuery } = params;

  const query = decodeURIComponent(rawQuery).replace(/\+/g, " ");

  return {
    title: `Search "${query}"`,
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
    openGraph: {
      title: `Search "${query}" - ${process.env.NEXT_PUBLIC_APP_NAME}`,
    },
  };
}

export default function page({ params }) {
  const { query } = params;

  return <Search query={query} />;
}
