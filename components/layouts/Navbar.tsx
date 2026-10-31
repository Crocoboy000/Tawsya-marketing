'use client';
import { nav } from '@/content/navItems';
import { useSectionMotion } from '@/lib/animations/useSectionMotion';
import Image from 'next/image';
import Link from 'next/link';
import { NavMotion } from '../motion/navMotion';
import { ButtonLink } from '../ui/button-link';

function Navbar() {
  const ref = useSectionMotion(NavMotion);
  return (
    <header
      ref={ref}
      className="sticky z-5 mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-3 md:flex-nowrap md:justify-around md:gap-x-8"
    >
      <nav className="order-3 flex w-full list-none items-center justify-center gap-4 text-sm md:order-0 md:w-auto md:gap-8 md:text-base">
        {nav.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </nav>
      <Image
        height={120}
        width={100}
        className="h-auto w-25 md:w-auto"
        alt="thats a logo"
        src={'/Logo.svg'}
      />
      <ButtonLink href="" className="min-w-35">
        Get Started
      </ButtonLink>
    </header>
  );
}

export default Navbar;
