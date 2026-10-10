import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from "@/components/icons/SocialIcons";

const socials = [
  { label: "Facebook", href: "https://facebook.com", Icon: FacebookIcon },
  { label: "Twitter", href: "https://twitter.com", Icon: TwitterIcon },
  { label: "Instagram", href: "https://instagram.com", Icon: InstagramIcon },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-brand-900 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:grid-cols-3 sm:px-8 sm:py-7">
        <div>
          <h2 className="text-lg font-semibold">Filters</h2>
          <div className="mt-4 flex gap-5 text-sm text-white/90">
            <Link href="/" className="hover:underline">
              All
            </Link>
            <Link href="/?category=electronics" className="hover:underline">
              Electronics
            </Link>
          </div>
          <p className="mt-8 text-sm text-white/90">© 2024 American</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">About Us</h2>
          <ul className="mt-4 space-y-3 text-sm text-white/90">
            <li>
              <Link href="#" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Follow Us</h2>
          <ul className="mt-4 flex gap-3">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-[30px] items-center justify-center rounded-full bg-brand-500 transition hover:bg-white hover:text-brand-700"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
