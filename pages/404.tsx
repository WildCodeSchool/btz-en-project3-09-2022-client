import Image from "next/image";
import Link from "next/link";

export default function FourOhFour() {
  return (
    <>
      <Image
        src="/assets/confusedtravolta.jpg"
        fill
        quality={100}
        alt="not found"
        className="relative opacity-"
      />
      <div className="absolute">
        <h1 className="font-enedis text-desk-4xl(welcome)">404</h1>
        <p>There&apos;s nothing here.</p>
        <Link href="/">
          <p>Go back home</p>
        </Link>
      </div>
    </>
  );
}
