import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FooterIntro from "@/components/FooterIntro";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[2000px] mx-auto">
      <Nav />
      {children}
      <FooterIntro />
      <Footer />
    </div>
  );
}
