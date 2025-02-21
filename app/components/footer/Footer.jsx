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
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 ">
        <div className="flex flex-col items-start">
          <Image
            src={logo}
            alt="Flag Icon"
            width={185}
            height={126}
            className="w-[185px] h-[126px]"
            priority={true}
          />
          <p className="text-[#C09E5F] text-opacity-[60%] font-jura text-[13px] font-bold py-4 flex-wrap">
            {t('experience')}
          </p>
          
        </div>

        <div className="flex flex-col">
          <h3 className="text-[#C09E5F] font-orbitron text-[20px] font-normal mb-4">{t('quick_links')}</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/experience" className="hover:underline text-[#C09E5F] text-opacity-[60%] font-jura text-[13px] font-bold">
                {t('EXPERIENCES')}
              </Link>
            </li>
            <li>
              <Link href="/teleiosx" className="hover:underline text-[#C09E5F] text-opacity-[60%] font-jura text-[13px] font-bold">
                {t('VENUE')}
              </Link>
            </li>
            <li>
              <Link href="/watchparties" className="hover:underline text-[#C09E5F] text-opacity-[60%] font-jura text-[13px] font-bold">
              {t('watchparties')}
               </Link>
             </li>
             <li>
              <Link href="/privateevents" className="hover:underline text-[#C09E5F] text-opacity-[60%] text-[13px] font-bold">
              {t('privateevents')}
               </Link>
             </li>
             <li>
               <Link href="/f&b" className="hover:underline text-[#C09E5F] text-opacity-[60%] font-jura text-[13px] font-bold">
                {t('f&b')}
               </Link>
             </li>
          </ul>
        </div>

        <div className="flex flex-col">
          <h3 className="text-[#C09E5F] font-orbitron text-[20px] font-normal mb-4">{t('location_time')}</h3>
          <div>
            <div className="mb-[10px]">
              <h3 className="text-[#C09E5F] text-opacity-[60%] font-jura text-[13px] font-bold">{t('address')}</h3>
              <Link href="https://maps.app.goo.gl/tpvShamGjXZv6rVq8" target="_blank" rel="noopener noreferrer" className="text-[#C09E5F] text-opacity-[60%] font-jura text-[13px] font-bold hover:underline">{t('saudi_address')}</Link>
            </div>
            <div className="mt-[10px]">
              <h3 className="text-[#C09E5F] text-opacity-[60%] font-jura text-[13px] font-bold">{t('hours')}</h3>
              <p className="text-[#C09E5F] text-opacity-[60%] font-jura text-[13px] font-bold">{t('openningtime')}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="text-[#C09E5F] font-orbitron text-[20px] font-normal mb-4">{t('get_in_touch')}</h3>
          <div className="mb-[10px]">
            <div className="flex">
              <Image src="/assets/icons/phone.png" alt="Phone Icon" height={12} width={12} className="w-[9px] h-[9px] mt-[5px]" priority={true} />
              <p className="text-[#C09E5F] text-opacity-[60%] font-jura text-[13px] font-bold ml-1">{t('phone')}</p>
            </div>
            <div>
              <Link href="tel:+9715554894679" className="text-[#C09E5F] text-opacity-[60%] font-jura text-[13px] font-bold hover:underline">+966 55 224 9297</Link>
            </div>
          </div>
          <div className="mt-[10px]">
            <div className="flex">
              <Image src="/assets/icons/mail.png" alt="Email Icon" height={12} width={12} className="w-[9px] h-[9px] mt-[5px]" priority={true} />
              <p className="text-[#C09E5F] text-opacity-[60%] font-jura text-[13px] font-bold ml-1">{t('email')}</p>
            </div>
            <Link href="mailto:info@teleiosdome.ae" className="text-[#C09E5F] text-opacity-[60%] font-jura text-[13px] font-bold hover:underline">info@teleiosx.com</Link>
          </div>
        </div>
        
        <div className="flex">
            <Link
              href="https://www.instagram.com/teleiosx/"
              target="_blank"
              rel="noopener noreferrer"
              className=""
            >
              <Image src="/assets/icons/insta.png" width={30} height={30} alt="Instagram" className="h-[30px] w-[30px] mr-4 ml-4"  priority={true}/>
            </Link>
            <Link
              href="https://www.tiktok.com/@teleiosx"
              target="_blank"
              rel="noopener noreferrer"
              className=""
            >
              <Image src="/assets/icons/tiktok.png" width={30} height={30} alt="LinkedIn" className="h-[30px] w-[30px]"  priority={true}/>
            </Link>

          </div>

      </div>
      <div className="mt-[60px] container mx-auto">
        <div className="md:flex justify-between">
          <div>
            <p className="text-[#C09E5F] text-opacity-[60%] font-jura text-[11px] md:text-[13px] font-bold">{t('all_rights_reserved')}</p>
          </div>
          <div className="md:text-end">
            <Link href="/privacy" className="text-[#C09E5F] text-opacity-[60%] font-jura text-[11px] md:text-[13px] font-bold  hover:underline">{t('privacy_policy')}</Link>
            <span className='mx-1 font-jura text-[11px] md:text-[13px] font-bold text-[#C09E5F] text-opacity-[60%] '> | </span>
            <Link href="/terms&conditions" className="font-jura text-[11px] md:text-[13px] font-bold text-[#C09E5F] text-opacity-[60%] hover:underline">{t('terms_conditions')}</Link>
          </div>
        </div>
      </div>
      <div className="bg-banner-bg bg-cover bg-center flex items-center justify-center leading-[130px] lg:leading-[150px] text-[#C09E5F] relative pl-20">
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
