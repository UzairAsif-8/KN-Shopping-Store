import { memo } from 'react';
import HeroSection from '../components/common/HeroSection';
import CategoryGrid from '../components/common/CategoryGrid';
import EditorialBlock from '../components/common/EditorialBlock';
import PhilosophyBanner from '../components/common/PhilosophyBanner';
import BestSellers from '../components/common/BestSellers';
import Newsletter from '../components/common/Newsletter';
import { useSiteContent } from '../context';

const HomePage = () => {
  const { collections } = useSiteContent();

  return (
    <>
      <HeroSection />
      <CategoryGrid />
      {collections.map((block, index) => (
        <div key={block.id} className={index > 0 ? 'section-gap' : 'pt-16 md:pt-24'}>
          <EditorialBlock block={block} index={index} />
        </div>
      ))}
      <PhilosophyBanner />
      <BestSellers />
      <Newsletter />
    </>
  );
};

export default memo(HomePage);
