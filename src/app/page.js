import Head from "next/head";
import QuoteGenerator from "../components/quoteGenerator";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Head>
        <title>Quote Generator</title>
        <meta
          name="description"
          content="Generate and save your favorite quotes"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full">
        <h1 className="text-4xl font-bold mb-8 underline">Quote Generator</h1>
        <QuoteGenerator />
      </main>
    </div>
  );
}