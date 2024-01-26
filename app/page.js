import Header from "../components/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
       <Link href="https://www.togethr.store/" className="font-semibold">TOGETHR STORE</Link>
        {/* {isSupabaseConnected && <AuthButton />} */}
      </div>
    </nav>

    <div className="animate-in flex-1 flex flex-col gap-20 max-w-4xl px-3">
      <Header />
      <main className="flex-1 flex flex-col gap-6">
     
      {/* <Link href="/search"><Button>Search products</Button></Link> */}
      </main>
    </div>

    <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
      <p>
        Powered by{" "}
        <a
          href="https://www.togethr.store/"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Togethr Store
        </a>
      </p>
    </footer>
  </div>
  );
}
