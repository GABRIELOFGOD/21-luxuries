import Image from "next/image";
import Link from "next/link";

export default function MerlinPage() {
  return (
    <div className="pt-20">
      <h1 className="text-center text-[#caa529] text-2xl md:text-3xl font-bold mt-16 mb-4">
        Explore More!
      </h1>
      <hr className="border-[#caa529] w-32 mx-auto mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mx-5 md:mx-8 mb-16">
        <Link href="/">
          <Image
            src="/work/Merlin-Fashion-master/images/merlin-img/merlin-1.jpg"
            alt="Merlin 1"
            width={400}
            height={300}
          />
        </Link>
        <Image
          src="/work/Merlin-Fashion-master/images/merlin-img/quote1.png"
          alt="Quote 1"
          width={400}
          height={300}
          className="pt-16"
        />
        <Link href="/">
          <Image
            src="/work/Merlin-Fashion-master/images/merlin-img/merlin-2.jpg"
            alt="Merlin 2"
            width={400}
            height={300}
          />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mx-5 md:mx-8 mb-16">
        <Link href="/">
          <Image
            src="/work/Merlin-Fashion-master/images/merlin-img/merlin-5.jpg"
            alt="Merlin 5"
            width={400}
            height={300}
          />
        </Link>
        <Image
          src="/work/Merlin-Fashion-master/images/merlin-img/quote2.png"
          alt="Quote 2"
          width={400}
          height={300}
          className="pt-16"
        />
        <Link href="/">
          <Image
            src="/work/Merlin-Fashion-master/images/merlin-img/merlin-6.jpg"
            alt="Merlin 6"
            width={400}
            height={300}
          />
        </Link>
      </div>
    </div>
  );
}
