import { getLandingPageData } from '@/lib/data/landing';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import { Navbar } from '@/components/landing/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { AboutSection } from '@/components/landing/AboutSection';
import { MenuSection } from '@/components/landing/MenuSection';
import { GallerySection } from '@/components/landing/GallerySection';
import { TestimonialSection } from '@/components/landing/TestimonialSection';
import { LocationSection } from '@/components/landing/LocationSection';
import { ContactSection } from '@/components/landing/ContactSection';
import { Footer } from '@/components/landing/Footer';
import { WhatsAppFloatingButton } from '@/components/landing/WhatsAppFloatingButton';

export const revalidate = 3600;

export default async function LandingPage() {
  const { settings, categories, products, gallery, testimonials } =
    await getLandingPageData();

  return (
    <ThemeProvider primaryColor={settings.primary_color}>
      <Navbar
        brandName={settings.brand_name}
        logoUrl={settings.logo_url}
        whatsappNumber={settings.whatsapp_number}
      />
      <main>
        <HeroSection
          title={settings.hero_title}
          subtitle={settings.hero_subtitle}
          imageUrl={settings.hero_image_url}
          brandName={settings.brand_name}
          whatsappNumber={settings.whatsapp_number}
        />
        <AboutSection
          title={settings.about_title}
          description={settings.about_description}
          imageUrl={settings.about_image_url}
          brandName={settings.brand_name}
        />
        <MenuSection
          categories={categories}
          products={products}
          brandName={settings.brand_name}
          whatsappNumber={settings.whatsapp_number}
        />
        <GallerySection items={gallery} />
        <TestimonialSection testimonials={testimonials} />
        <LocationSection
          address={settings.address}
          openingHours={settings.opening_hours}
          googleMapsEmbedUrl={settings.google_maps_embed_url}
          whatsappNumber={settings.whatsapp_number}
          brandName={settings.brand_name}
        />
        <ContactSection />
      </main>
      <Footer
        brandName={settings.brand_name}
        tagline={settings.tagline}
        address={settings.address}
        whatsappNumber={settings.whatsapp_number}
        instagramUrl={settings.instagram_url}
        tiktokUrl={settings.tiktok_url}
        facebookUrl={settings.facebook_url}
      />
      <WhatsAppFloatingButton
        whatsappNumber={settings.whatsapp_number}
        brandName={settings.brand_name}
      />
    </ThemeProvider>
  );
}
