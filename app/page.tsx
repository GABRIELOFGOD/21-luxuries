import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Main Image */}
      <div className="flex justify-center pt-20 md:pt-10">
        <Link href="/">
          <Image
            id="main-index-img"
            src="/work/Merlin-Fashion-master/images/index-img/Off-the-Wall.jpg"
            alt="Main fashion image"
            width={800}
            height={600}
            className="w-full max-w-4xl"
            priority
          />
        </Link>
      </div>

      <br />

      {/* Offers Images */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mx-6 md:mx-12 mt-2.5 mb-2.5">
        <Link href="/categories">
          <Image
            src="/work/Merlin-Fashion-master/images/index-img/1.png"
            alt="Offer 1"
            width={300}
            height={200}
          />
        </Link>
        <Link href="/categories">
          <Image
            src="/work/Merlin-Fashion-master/images/index-img/2.png"
            alt="Offer 2"
            width={300}
            height={200}
          />
        </Link>
        <Link href="/categories">
          <Image
            src="/work/Merlin-Fashion-master/images/index-img/3.png"
            alt="Offer 3"
            width={300}
            height={200}
          />
        </Link>
        <Link href="/categories">
          <Image
            src="/work/Merlin-Fashion-master/images/index-img/4.png"
            alt="Offer 4"
            width={300}
            height={200}
          />
        </Link>
      </div>

      <br />
      <br />

      {/* Grid Images 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mx-5 md:mx-5">
        <Link href="/categories">
          <Image
            src="/work/Merlin-Fashion-master/images/index-img/anton-levin-P8prss71psk-unsplash.jpg"
            alt="Fashion 1"
            width={400}
            height={300}
          />
        </Link>
        <Link href="/categories">
          <Image
            src="/work/Merlin-Fashion-master/images/index-img/bogdan-glisik-2WgOPYJuPsU-unsplash (1).jpg"
            alt="Fashion 2"
            width={400}
            height={300}
          />
        </Link>
        <Link href="/categories">
          <Image
            src="/work/Merlin-Fashion-master/images/index-img/calvin-lupiya--yPg8cusGD8-unsplash.jpg"
            alt="Fashion 3"
            width={400}
            height={300}
          />
        </Link>
        <div className="text-center bg-primary text-background h-12 flex items-center justify-center text-sm md:text-base">
          For the Young, Wild & Stylish
        </div>
        <div className="text-center bg-primary text-background h-12 flex items-center justify-center text-sm md:text-base">
          Just like your way to Conquer
        </div>
        <div className="text-center bg-primary text-background h-12 flex items-center justify-center text-sm md:text-base">
          Stands out like the Sun
        </div>
      </div>

      <br />
      <br />
      <br />

      <h2 className="text-center text-foreground text-2xl md:text-3xl font-bold pl-5 md:pl-16">
        TRENDING NOW
      </h2>
      <p className="text-center text-foreground text-lg pl-5 md:pl-16">
        From the runway to your wardrobe
      </p>

      <br />
      <br />

      {/* Grid Images 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mx-5 md:mx-5">
        <Link href="/products">
          <Image
            src="/work/Merlin-Fashion-master/images/index-img/ethan-haddox-QHGcADeeT00-unsplash.jpg"
            alt="Trending 1"
            width={400}
            height={400}
            className="object-cover"
          />
        </Link>
        <Link href="/products">
          <Image
            src="/work/Merlin-Fashion-master/images/index-img/andres-jasso-PqbL_mxmaUE-unsplash (1).jpg"
            alt="Trending 2"
            width={400}
            height={400}
          />
        </Link>
        <Link href="/products">
          <Image
            src="/work/Merlin-Fashion-master/images/index-img/raul-hender-afc4HxPy2GM-unsplash (1).jpg"
            alt="Trending 3"
            width={400}
            height={400}
          />
        </Link>
        <Link href="/products">
          <Image
            src="/work/Merlin-Fashion-master/images/index-img/nike.png"
            alt="Nike"
            width={400}
            height={200}
          />
        </Link>
        <Link href="/products">
          <Image
            src="/work/Merlin-Fashion-master/images/index-img/my-shoes2.png"
            alt="Shoes 2"
            width={400}
            height={200}
          />
        </Link>
        <Link href="/products">
          <Image
            src="/work/Merlin-Fashion-master/images/index-img/my-shoes3.png"
            alt="Shoes 3"
            width={400}
            height={200}
          />
        </Link>
      </div>

      <h2 className="text-center text-foreground text-2xl md:text-3xl font-bold pl-5 md:pl-16 mt-16">
        STYLES TO STEAL
      </h2>
      <p className="text-center text-foreground text-lg pl-5 md:pl-16">
        Inspired by influencer
      </p>

      <br />
      <br />

      {/* Grid Images 3 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mx-5 md:mx-5 mb-16">
        <Link href="/products">
          <Image
            src="/work/Merlin-Fashion-master/images/index-img/girl1.png"
            alt="Style 1"
            width={300}
            height={400}
          />
        </Link>
        <Link href="/products">
          <Image
            src="/work/Merlin-Fashion-master/images/index-img/girl2.png"
            alt="Style 2"
            width={300}
            height={400}
          />
        </Link>
        <Link href="/products">
          <Image
            src="/work/Merlin-Fashion-master/images/index-img/girl3.png"
            alt="Style 3"
            width={300}
            height={400}
          />
        </Link>
        <Link href="/products">
          <Image
            src="/work/Merlin-Fashion-master/images/index-img/girl4.png"
            alt="Style 4"
            width={300}
            height={400}
          />
        </Link>
      </div>
    </div>
  );
}
