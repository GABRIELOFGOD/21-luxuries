import Link from "next/link";

export default function Footer() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-primary py-8 px-8 md:px-16 text-background mt-16">
      <div className="text-center md:text-left">
        <Link
          href="/"
          className="text-background hover:text-background no-underline"
        >
          <h2 className="text-2xl mb-4">21 LUXURIES🦋</h2>
        </Link>
        <p className="font-bold mb-2">LUXURY SHOPPING</p>
        <h6 className="text-sm leading-6">
          Men
          <br />
          Women
          <br />
          Kids
          <br />
          Exclusive Collections
        </h6>
      </div>

      <div className="text-center md:text-left">
        <p className="font-bold mb-2">USEFUL LINKS</p>
        <h6 className="text-sm leading-6">
          Contact Us
          <br />
          FAQ
          <br />
          T&C
          <br />
          Blog
          <br />
          Privacy Policy
        </h6>
      </div>

      <div className="text-center md:text-left">
        <p className="font-bold mb-2">100% Authentic guarantee</p>
        <h6 className="text-sm mb-4">for all products at 21luxuries.com</h6>
        <p className="font-bold mb-2">Return within 30 days of</p>
        <h6 className="text-sm mb-4">receiving your order</h6>
        <p className="font-bold mb-2">Get free delivery for every</p>
        <h6 className="text-sm">order above Rs.999</h6>
      </div>
    </div>
  );
}
