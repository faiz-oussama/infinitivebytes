import Link from "next/link";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";

export const Header = () => {
    return (
        <div className="fixed z-50 pt-4 md:pt-6 top-0 left-0 w-full">
            <header className="flex items-center justify-between container mx-auto px-4 md:px-8">
                <Link href="/">
                    <Logo className="w-[50px] md:w-[60px]" />
                </Link>
                <nav className="flex max-lg:hidden absolute left-1/2 -translate-x-1/2 items-center justify-center gap-x-10">
                    {[
                        { name: "Features", href: "/features" },
                        { name: "Pricing", href: "/pricing" },
                        { name: "Sign In", href: "/sign-in" },
                    ].map((item) => (
                        <Link
                            className="uppercase inline-block font-mono text-white/60 hover:text-white/100 duration-150 transition-colors ease-out"
                            href={item.href}
                            key={item.name}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
                <Link className="uppercase max-lg:hidden transition-colors ease-out duration-150 font-mono text-white hover:text-white/80" href="/sign-in">
                    Get Started
                </Link>
                <MobileMenu />
            </header>
        </div>
    );
};
