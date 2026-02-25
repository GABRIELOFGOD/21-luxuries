import Image from "next/image";
import Link from "next/link";

export default function Categories() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          CATEGORIES
        </h1>
        <p className="text-lg text-foreground">
          Explore our luxury collections
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12 mb-16">
        {/* Men's Category */}
        <div className="group cursor-pointer">
          <Link href="/products?category=men">
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/work/Merlin-Fashion-master/images/categories-img/men.jpg"
                alt="Men's Fashion"
                width={400}
                height={500}
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h2 className="text-white text-2xl font-bold">MEN'S</h2>
              </div>
            </div>
          </Link>
        </div>

        {/* Women's Category */}
        <div className="group cursor-pointer">
          <Link href="/products?category=women">
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/work/Merlin-Fashion-master/images/categories-img/women.jpg"
                alt="Women's Fashion"
                width={400}
                height={500}
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h2 className="text-white text-2xl font-bold">WOMEN'S</h2>
              </div>
            </div>
          </Link>
        </div>

        {/* Accessories Category */}
        <div className="group cursor-pointer md:col-span-2 lg:col-span-1">
          <Link href="/products?category=accessories">
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/work/Merlin-Fashion-master/images/categories-img/accessories.jpg"
                alt="Accessories"
                width={400}
                height={500}
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h2 className="text-white text-2xl font-bold">ACCESSORIES</h2>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Featured Collections */}
      <div className="bg-primary py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-background mb-4">
            FEATURED COLLECTIONS
          </h2>
          <p className="text-background text-lg">
            Discover our most exclusive pieces
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-12">
          <div className="text-center">
            <div className="bg-background rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold text-primary mb-2">
                SUMMER ESSENTIALS
              </h3>
              <p className="text-foreground">
                Light, breezy pieces for the perfect summer
              </p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-background rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold text-primary mb-2">
                EVENING WEAR
              </h3>
              <p className="text-foreground">
                Elegant dresses and suits for special occasions
              </p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-background rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold text-primary mb-2">
                CASUAL CHIC
              </h3>
              <p className="text-foreground">
                Comfortable yet stylish everyday wear
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
