import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/assets/images/dome/logo.png';
import RotatingHeadings from '../header/rotatingheading/RotatingHeading';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#022F29] text-white pt-10 lg:pt-20 px-8 lg:px-20 padding-px xl:px-40 max-w-full overflow-hidden">
      <div className="container mx-auto flex flex-col md:flex-row lg:flex-row flex-wrap justify-between">
        <div className="flex flex-col items-center md:items-start lg:w-[352px]">
          <Image
            src={logo}
            alt="Flag Icon"
            width={185}
            height={126}
            className="w-[185px] h-[126px]"
            priority={true}
          />
          <p className="text-[#C09E5F] text-opacity-[60%] font-jura text-[13px] font-bold py-4 flex-wrap text-center md:text-start">
            {t('experience')}
          </p>
          <div className=''>
            <p className="text-[#C09E5F] text-opacity-[60%] font-jura text-[11px] md:text-[13px] font-bold pb-8">{t('all_rights_reserved')}</p>
          </div>
        </div>
        <div className='flex flex-col md:flex-row lg:flex-row items-start justify-between w-full md:w-[772px] lg:w-[772px]'>
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

          <div className="flex flex-col mt-4 md:mt-0 lg:mt-0 lg:w-[200px]">
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
        
          <div className="flex flex-col mt-4 md:mt-0 lg:mt-0 ">
            <h3 className="text-[#C09E5F] font-orbitron text-[20px] font-normal mb-4">{t('get_in_touch')}</h3>
            <div className="mb-[10px]">
              <div className="flex ">
                <Image src="/assets/icons/phone.png" alt="Phone Icon" height={12} width={12} className="w-[9px] h-[9px] mt-[5px]" priority={true} />
                <div className='flex flex-row md:flex-col lg:flex-col'>
                <p className="text-[#C09E5F] text-opacity-[60%] font-jura text-[13px] font-bold ml-1">{t('phone')}</p>
                <Link href="tel:+9715554894679" className="text-[#C09E5F] text-opacity-[60%] font-jura text-[13px] font-bold hover:underline mx-4 md:mx-0 lg:mx-0">+966 55 224 9297</Link>
                </div>
              </div>

            </div>
            <div className="mt-[10px]">
              <div className="flex">
                <Image src="/assets/icons/mail.png" alt="Email Icon" height={12} width={12} className="w-[9px] h-[9px] mt-[5px]" priority={true} />
                <div className='flex flex-row md:flex-col lg:flex-col'>
                <p className="text-[#C09E5F] text-opacity-[60%] font-jura text-[13px] font-bold ml-1">{t('email')}</p>
                <Link href="mailto:info@teleiosdome.ae" className="text-[#C09E5F] text-opacity-[60%] font-jura text-[13px] font-bold hover:underline mx-4 md:mx-0 lg:mx-0">info@teleiosx.com</Link>
                </div>
              </div>

            </div>
          </div>
          </div>
        <div className=" mt-4 sm:mt-4 md:mt-4 lg:mt-0 xl:mt-0 hidden md:block">
            <Link
              href="https://www.instagram.com/teleiosx/"
              target="_blank"
              rel="noopener noreferrer"
              className=""
            >
              <Image src="/assets/icons/insta.png" width={30} height={30} alt="Instagram" className="h-[30px] w-[30px] lg:mr-4 lg:ml-4 md:mr-2 mr-2"  priority={true}/>
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
      <div className="flex mt-4 sm:mt-4 md:mt-4 lg:mt-0 xl:mt-0 block md:hidden justify-center">
            <Link
              href="https://www.instagram.com/teleiosx/"
              target="_blank"
              rel="noopener noreferrer"
              className=""
            >
              <Image src="/assets/icons/insta.png" width={30} height={30} alt="Instagram" className="h-[30px] w-[30px] lg:mr-4 lg:ml-4 md:mr-2 mr-2"  priority={true}/>
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
        <div className="md:flex justify-between  ">
          {/* <div>
            <p className="text-[#C09E5F] text-opacity-[60%] font-jura text-[11px] md:text-[13px] font-bold">{t('all_rights_reserved')}</p>
          </div> */}
          <div className="md:text-end text-center">
            <Link href="#" className="text-[#C09E5F] text-opacity-[60%] font-jura text-[11px] md:text-[13px] font-bold  hover:underline ">{t('privacy_policy')}</Link>
            <span className='mx-1 font-jura text-[11px] md:text-[13px] font-bold text-[#C09E5F] text-opacity-[60%] '> | </span>
            <Link href="#" className="font-jura text-[11px] md:text-[13px] font-bold text-[#C09E5F] text-opacity-[60%] hover:underline ">{t('terms_conditions')}</Link>
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
