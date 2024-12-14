// components/BookNowButton.jsx
import Link from 'next/link';

const BookNowButton = ({ href, children, ariaLabel }) => (
  <Link
    href={href}
    aria-label={ariaLabel}
    className="button-slanted cursor-pointer w-[250px] h-[44px] font-jura font-normal md:font-bold bg-gradient-to-r from-[#c09e5f] to-[#e3ce90] text-[#063828] ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center relative overflow-hidden"
  >
    <span className="button-slanted-content">{children}</span>
  </Link>
);

export default BookNowButton;
