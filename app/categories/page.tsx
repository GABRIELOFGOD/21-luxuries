import Image from "next/image";
import Link from "next/link";

export default function CategoriesPage() {
  return (
    <div className="pt-20">
      <h1 className="text-center text-[#caa529] text-2xl md:text-3xl font-bold mt-20 mb-4">
        Unskippable Categories
      </h1>
      <hr className="border-[#caa529] w-32 mx-auto mb-8" />

      <div className="flex justify-center mb-8">
        <Image
          src="/work/Merlin-Fashion-master/images/categories-img/nordwood-themes-Nv4QHkTVEaI-unsplash (1).jpg"
          alt="Categories banner"
          width={1160}
          height={400}
          className="max-w-full"
        />
      </div>

      <br />
      <br />

      <h2 className="text-center text-[#caa529] text-xl md:text-2xl font-bold mb-8">
        TRENDING NOW
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mx-5 md:mx-10 mb-16">
        <Link href="/products">
          <Image
            src="/work/Merlin-Fashion-master/images/categories-img/category1.png"
            alt="Trending 1"
            width={400}
            height={300}
          />
        </Link>
        <Link href="/products">
          <Image
            src="/work/Merlin-Fashion-master/images/categories-img/category2.png"
            alt="Trending 2"
            width={400}
            height={300}
          />
        </Link>
        <Link href="/products">
          <Image
            src="/work/Merlin-Fashion-master/images/categories-img/category3.png"
            alt="Trending 3"
            width={400}
            height={300}
          />
        </Link>
        <Link href="/products">
          <Image
            src="/work/Merlin-Fashion-master/images/categories-img/category4.png"
            alt="Trending 4"
            width={400}
            height={300}
          />
        </Link>
        <Link href="/products">
          <Image
            src="/work/Merlin-Fashion-master/images/categories-img/category5.png"
            alt="Trending 5"
            width={400}
            height={300}
          />
        </Link>
        <Link href="/products">
          <Image
            src="/work/Merlin-Fashion-master/images/categories-img/category6.png"
            alt="Trending 6"
            width={400}
            height={300}
          />
        </Link>
      </div>

      <h2 className="text-center text-[#caa529] text-xl md:text-2xl font-bold mb-8">
        +For Her
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mx-5 md:mx-10 mb-16">
        <Link href="/products">
          <Image
            src="/work/Merlin-Fashion-master/images/categories-img/for-her1.png"
            alt="For Her 1"
            width={600}
            height={400}
          />
        </Link>
        <Link href="/products">
          <Image
            src="/work/Merlin-Fashion-master/images/categories-img/for-her2.png"
            alt="For Her 2"
            width={600}
            height={400}
          />
        </Link>
      </div>

      <h2 className="text-center text-[#caa529] text-xl md:text-2xl font-bold mb-8">
        +For Him
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-5 mx-5 md:mx-10 mb-16">
        <Link href="/products">
          <Image
            src="/work/Merlin-Fashion-master/images/categories-img/brands-for-him1.png"
            alt="For Him 1"
            width={300}
            height={400}
          />
        </Link>
        <Link href="/products">
          <Image
            src="/work/Merlin-Fashion-master/images/categories-img/brands-for-him2.png"
            alt="For Him 2"
            width={300}
            height={400}
          />
        </Link>
        <Link href="/products">
          <Image
            src="/work/Merlin-Fashion-master/images/categories-img/brands-for-him3.png"
            alt="For Him 3"
            width={300}
            height={400}
          />
        </Link>
        <Link href="/products">
          <Image
            src="/work/Merlin-Fashion-master/images/categories-img/brands-for-him4.png"
            alt="For Him 4"
            width={300}
            height={400}
          />
        </Link>
        <Link href="/products">
          <Image
            src="/work/Merlin-Fashion-master/images/categories-img/brands-for-him5.png"
            alt="For Him 5"
            width={300}
            height={400}
          />
        </Link>
      </div>
    </div>
  );
}
