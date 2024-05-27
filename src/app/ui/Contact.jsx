import Link from "next/link";
import Image from "next/image";

export default function Contact() {
  return (
    <div className="flex justify-center">
      <Link 
        href="https://x.com/davidlc9113" 
        target="_blank" 
        className="px-2">
        <Image 
          priority 
          src="/twitter.svg" 
          alt="twitter logo" 
          width={0} 
          height={0} 
          className="w-8 h-auto" />
      </Link>
      <Link 
        href="https://github.com/davidlc9113" 
        target="_blank" 
        className="px-2">
        <Image 
          priority 
          src="/github.svg" 
          alt="github logo" 
          width={0} 
          height={0} 
          className="w-8 h-auto" />
      </Link>
    </div>
  )
}