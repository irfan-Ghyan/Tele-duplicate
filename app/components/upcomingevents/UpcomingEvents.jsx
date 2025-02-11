


'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import bahrain from '../../../public/assets/images/events/img3.png';
import { useTranslation } from 'react-i18next';
import { getImageCall } from '@/app/utils/api';

const UpcomingEvents = () => {
  const { t } = useTranslation();
  const [upcomingEntry, setUpcomingEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError('');

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      console.log('Base URL:', baseUrl);

      // Fetch section data
      const sectionResponse = await fetch(`${baseUrl}/api/content/sections/Upcoming Events`);
      if (!sectionResponse.ok) {
        throw new Error('Failed to fetch section data from the server.');
      }

      const sectionData = await sectionResponse.json();
      console.log('Section Data:', sectionData);

      if (sectionData.success) {
        const domeSection = sectionData.data.sections.find(
          (section) => section.title === 'Virtual GP'
        );

        console.log('Dome Section:', domeSection);

        if (domeSection && domeSection.section_fields) {
          const latestField = domeSection.section_fields
            .filter((field) => field.key.startsWith('title'))
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))[0];

          const descriptionField = domeSection.section_fields.find(
            (field) => field.key === `description${latestField.key.replace('title', '')}`
          );

          if (latestField && descriptionField) {
            const entry = {
              title: latestField.value,
              description: descriptionField.value,
              imageUrl: '',
            };

            const imageResponse = await getImageCall(`${baseUrl}/api/content/getImages/Virtual GP`);
            if (imageResponse.ok) {
              const imageData = await imageResponse.json();
              if (imageData.success && imageData.data.length > 0) {
                entry.imageUrl = imageData.data[0].url;
              }
            }

            setUpcomingEntry(entry);
          }
        }
      }
    } catch (err) {
      console.error('Error fetching data:', err.message);
      setError(err.message || 'An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-full lg:overflow-hidden xl:h-[700px] px-4 bg-cover bg-center flex items-center justify-center mx-auto">
      <div className="inset-0 bg-transparent flex flex-col items-center justify-center md:flex-col md:pr-6">
        <div className="flex flex-col justify-between pt-[20px] py-[30px] items-center">
          <div className="flex flex-col lg:flex-row lg:space-x-8 mb-10 lg:mb-0 w-full max-w-7xl items-center">
            {!loading && !error && upcomingEntry ? (
              <>
                {/* Mobile Image */}
                <div className="lg:w-1/2 flex justify-center lg:hidden mb-6">
                  <Image
                    src={upcomingEntry.imageUrl || bahrain}
                    width={520}
                    height={566}
                    alt="lounge"
                    className="h-[460px] w-[430px] xl:h-[566px] xl:w-[520px]"
                  />
                </div>


                <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center md:text-left mb-6 lg:mb-0">
                  <h1 className="text-[24px] lg:text-[34px] text-[#c09e5f] font-black font-orbitron">
                    {upcomingEntry.title || t('defaultTitle')}
                  </h1>
                  <p className="w-[340px] md:w-[550px] xl:w-[600px] md:text-[14px] lg:text-[18px] text-[#e3ce90] font-bold font-jura mt-6">
                    {upcomingEntry.description || t('defaultDescription')}
                  </p>
                  <div className="py-10">
                    <Link
                      href="/virtualgp"
                      className="button-slanted w-[300px] md:w-[475px] h-[44px] px-4 py-6 button font-jura font-boldbuton border-[1px] border-[#c09e5f] hover:bg-gradient-to-r hover:from-[#e3ce90] hover:to-[#c09e5f] text-[#c09e5f] hover:text-[#002718] transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center hover:border-0"
                    >
                      <span className="button-slanted-content md:text-[14px] lg:text-[18px] text-[#c09e5f] hover:text-[#002718] font-bold font-jura">
                        {t('LEARN MORE ABOUT VIRTUAL GP')}
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="lg:w-1/2 flex justify-center lg:justify-end hidden lg:flex">
                  <Image
                    src={upcomingEntry.imageUrl || bahrain}
                    width={520}
                    height={566}
                    alt="lounge"
                    className="h-[460px] w-[430px] xl:h-[566px] xl:w-[520px]"
                  />
                </div>
              </>
            ) : (
              <p className="text-[#c09e5f]">
                {loading ? 'Loading...' : error || 'No upcoming events found.'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
