import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
    return (
      <div className="flex flex-col gap-16 items-center">
        <div className="flex gap-8 justify-center items-center">
          <a target="_blank"
            rel="noreferrer" className="p-3  hover:rounded-xl transition ease-in-out " href="https://www.togethr.store/">
            <span className="text-3xl font-light text-black">TOGETHR</span> <span className="font-extrabold text-3xl text-black" >STORE</span>
          </a>
        
         
        </div>
        <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
          Find your favourite products with AI-powered insights from{" "}
          <a
            href="https://www.togethr.store/"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Togethr
          </a>{" "}
         
        </p>
          <Link href="/search-product"><Button>Search products</Button></Link>
        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
      </div>
    );
  }
  