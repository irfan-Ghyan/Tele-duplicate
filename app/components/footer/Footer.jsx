import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/assets/images/dome/logo.png';
import RotatingHeadings from '../header/rotatingheading/RotatingHeading';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#002718] text-white pt-10 lg:pt-20 px-8 lg:px-20 padding-px xl:px-40 max-w-full overflow-hidden">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex flex-col items-start">
          <Image
            src={logo}
            alt="Flag Icon"
            width={185}
            height={126}
            className="w-[185px] h-[126px]"
            priority={true}
          />
          <p className="text-[#e3ce90] font-jura text-[13px] font-bold py-4">
            {t('experience')}
          </p>
          <div className="flex space-x-4 mt-[15px]">
            {/* <Link href="https://www.facebook.com/people/Teleios-Dome/61561142146663/" target="_blank" rel="noopener noreferrer">
              <Image src="/assets/images/dome/Facebook.png" width={30} height={30} alt="Facebook" className="h-[30px] w-[30px] ml-4" priority={true} />
            </Link>
            <Link
              href="https://www.youtube.com/channel/UCr06C0u6WQdVO_kYi38W_4A"
              target="_blank"
              rel="noopener noreferrer"
              className=""
            >
              <Image src="/assets/images/dome/YouTube.png" width={30} height={30} alt="YouTube" className="h-[30px] w-[30px]"  priority={true}/>
            </Link> */}
            <Link
              href="https://www.instagram.com/teleiosx/"
              target="_blank"
              rel="noopener noreferrer"
              className=""
            >
              <Image src="/assets/images/dome/IG.png" width={30} height={30} alt="Instagram" className="h-[30px] w-[30px]"  priority={true}/>
            </Link>
            <Link
              href="https://www.tiktok.com/@teleiosx"
              target="_blank"
              rel="noopener noreferrer"
              className=""
            >
              <Image src="/assets/images/TikTok.png" width={30} height={30} alt="LinkedIn" className="h-[30px] w-[30px]"  priority={true}/>
            </Link>
            {/* <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className=""
            >
              <Image src="/assets/images/tripadvisor.png" width={30} height={30} alt="Instagram" className="h-[30px] w-[50px]"  priority={true}/>
            </Link> */}
           

          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="text-[#e3ce90]  font-orbitron text-[20px] font-normal mb-4">{t('quick_links')}</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/experience" className="hover:underline text-[#e3ce90] font-jura text-[13px] font-bold">
                {t('EXPERIENCES')}
              </Link>
            </li>
            <li>
              <Link href="/venue" className="hover:underline text-[#e3ce90] font-jura text-[13px] font-bold">
                {t('VENUE')}
              </Link>
            </li>
            <li>
              <Link href="/watchparties" className="hover:underline text-[#e3ce90] font-jura text-[13px] font-bold">
              {t('watchparties')}
               </Link>
             </li>
             <li>
              <Link href="/privateevents" className="hover:underline text-[#e3ce90] font-jura text-[13px] font-bold">
              {t('privateevents')}
               </Link>
             </li>
             <li>
               <Link href="/f&b" className="hover:underline text-[#e3ce90] font-jura text-[13px] font-bold">
                {t('f&b')}
               </Link>
             </li>
          </ul>
        </div>

        <div className="flex flex-col">
          <h3 className="text-[#e3ce90] font-orbitron text-[20px] font-normal mb-4">{t('location_time')}</h3>
          <div>
            <div className="mb-[10px]">
              <h3 className="text-[#e3ce90] font-jura text-[13px] font-bold">{t('address')}</h3>
              <Link href="https://maps.app.goo.gl/tpvShamGjXZv6rVq8" target="_blank" rel="noopener noreferrer" className="text-[#e3ce90] font-jura text-[13px] font-bold hover:underline">{t('saudi_address')}</Link>
            </div>
            <div className="mt-[10px]">
              <h3 className="text-[#e3ce90] font-jura text-[13px] font-bold">{t('hours')}</h3>
              <p className="text-[#e3ce90] font-jura text-[13px] font-bold">{t('openningtime')}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="text-[#e3ce90] font-orbitron text-[20px] font-normal mb-4">{t('get_in_touch')}</h3>
          <div className="mb-[10px]">
            <div className="flex">
              <Image src="/assets/images/dome/phone.png" alt="Phone Icon" height={12} width={12} className="w-[9px] h-[9px] mt-[5px]" priority={true} />
              <p className="text-[#e3ce90] font-jura text-[13px] font-bold ml-1">{t('phone')}</p>
            </div>
            <div>
              <Link href="tel:+9715554894679" className="text-[#e3ce90] font-jura text-[13px] font-bold hover:underline">+966 55 224 9297</Link>
            </div>
          </div>
          <div className="mt-[10px]">
            <div className="flex">
              <Image src="/assets/images/dome/email.png" alt="Email Icon" height={12} width={12} className="w-[9px] h-[9px] mt-[5px]" priority={true} />
              <p className="text-[#e3ce90] font-jura text-[13px] font-bold ml-1">{t('email')}</p>
            </div>
            <Link href="mailto:info@teleiosdome.ae" className="text-[#e3ce90] font-jura text-[13px] font-bold hover:underline">info@teleiosx.com</Link>
          </div>
        </div>
      </div>
      <div className="mt-[60px] container mx-auto">
        <div className="md:flex justify-between">
          <div>
            <p className="text-[#e3ce90] font-jura text-[11px] md:text-[13px] font-bold opacity-80">{t('all_rights_reserved')}</p>
          </div>
          <div className="md:text-end">
            <Link href="/privacy" className="text-[#e3ce90] font-jura text-[11px] md:text-[13px] font-bold opacity-60 hover:underline">{t('privacy_policy')}</Link>
            <span className='mx-1 font-jura text-[11px] md:text-[13px] font-bold text-[#e3ce90] opacity-80'> | </span>
            <Link href="/terms&conditions" className="text-[#e3ce90] font-jura text-[11px] md:text-[13px] font-bold opacity-60 hover:underline">{t('terms_conditions')}</Link>
          </div>
        </div>
      </div>
      <div className="bg-banner-bg bg-cover bg-center flex items-center justify-center text-[#e3ce90] relative pl-20">
        <div>
          <div className="md:mb-10">
            <RotatingHeadings />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
