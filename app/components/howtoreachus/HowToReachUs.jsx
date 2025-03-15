import Image from 'next/image'
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export default function HowToReachUs() {
      const { t } = useTranslation();
  return (
    <div className="w-full py-16 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start mb-10">
          <h2 className="text-[54px] text-[#C09E5F] font-black font-orbitron leading-[54px]">
          {t('how.title')}
          </h2>
          
          <Link href="https://maps.app.goo.gl/tpvShamGjXZv6rVq8" target="_blank" rel="noopener noreferrer" className="pt-[12px] text-[#C09E5F] font-jura font-normal leading-[15px] md:leading-[28px] text-[15px] md:text-[18px]">
            <p>  {t('how.des')}</p>
            <p>  {t('how.des1')}</p>
          </Link>
        </div>
        
        {/* Map section */}
        <div className="w-full h-[400px] relative overflow-hidden">
          {/* You can replace this with an actual Google Maps embed */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.6554789518113!2d46.6252!3d24.7354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQ0JzA3LjQiTiA0NsKwMzcnMzAuNyJF!5e0!3m2!1sen!2sus!4v1615200000000!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="TeleiosX Location"
            className=""
          />
          
          {/* Alternative using Image component if you have a static map image */}
          {/* 
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-E6MAISEOSgWqh8gzJLrFdPNx3MpZ1c.png"
            alt="Map showing TeleiosX location"
            fill
            className="object-cover rounded-md"
          />
          */}
        </div>
      </div>
    </div>
  )
}
