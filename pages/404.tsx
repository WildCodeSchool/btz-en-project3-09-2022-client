import Image from "next/image";
import Link from "next/link";

export default function FourOhFour() {
  return (
    <div>
      <Image
        src="/assets/confusedtravolta.jpg"
        fill
        quality={100}
        alt="not found"
        className="relative  brightness-50"
      />
      <div className="absolute  text-white-enedis top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-enedis text-[200px]">404</h1>
        <Link href="/">
          <p>Go back home</p>
        </Link>
      </div>
    </div>
  );
}
