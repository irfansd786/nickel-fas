import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import CategorySection from '../components/home/CategorySection';
import TrendingSection from '../components/home/TrendingSection';
import NewSeasonBanner from '../components/home/NewSeasonBanner';
import EssentialsSection from '../components/home/EssentialsSection';
import StyleGallery from '../components/home/StyleGallery';
import AboutSection from '../components/home/AboutSection';
import ContactSection from '../components/home/ContactSection';
import Footer from '../components/layout/Footer';

import '../styles/home.css';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="home-page-wrapper">
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <CategorySection />
      <TrendingSection />
      <NewSeasonBanner />
      <EssentialsSection />
      <StyleGallery />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
