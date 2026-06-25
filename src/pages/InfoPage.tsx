import { Clock, MapPin, Phone, Mail, Instagram } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { siteConfig } from "@/data/siteConfig";
import { useLocale } from "@/i18n/LocaleContext";

const InfoPage = () => {
  const { locale, t } = useLocale();

  return (
    <AppShell>
      <div className="px-6 pt-8 pb-10 flex flex-col items-center text-center bg-gradient-to-b from-brand-green/40 to-transparent">
        <img
          src={siteConfig.logo}
          alt="Caffè Torèt"
          width={140}
          height={140}
          className="h-28 w-28 mb-4 rounded-full gold-border-strong p-1"
        />
        <h1 className="font-serif text-3xl italic">{siteConfig.name}</h1>
        <p className="text-[10px] uppercase tracking-[0.3em] text-brand-gold mt-2">
          {siteConfig.city}
        </p>
        <p className="text-sm text-brand-cream/70 mt-4 max-w-xs leading-relaxed">
          {siteConfig.tagline[locale]}
        </p>
      </div>

      <div className="px-5 py-4 space-y-3">
        <InfoCard icon={<Clock className="h-4 w-4" />} title={t("openingHours")}>
          <p>
            <span className="font-medium text-brand-cream">
              {siteConfig.hours.label[locale]}
            </span>{" "}
            · {siteConfig.hours.time}
          </p>
          <p className="text-brand-cream/60 text-sm">{siteConfig.hours.closed[locale]}</p>
        </InfoCard>

        <InfoCard icon={<MapPin className="h-4 w-4" />} title={t("address")}>
          <p>{siteConfig.contact.address}</p>
        </InfoCard>

        <InfoCard icon={<Phone className="h-4 w-4" />} title={t("contacts")}>
          <p className="flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 text-brand-gold" /> {siteConfig.contact.phone}
          </p>
          <p className="flex items-center gap-2">
            <Mail className="h-3.5 w-3.5 text-brand-gold" /> {siteConfig.contact.email}
          </p>
          <p className="flex items-center gap-2">
            <Instagram className="h-3.5 w-3.5 text-brand-gold" /> {siteConfig.contact.instagram}
          </p>
        </InfoCard>

        <InfoCard icon={<span className="text-xs font-bold">!</span>} title={t("allergens")}>
          <p className="text-sm text-brand-cream/60 leading-relaxed">
            {siteConfig.allergensNote[locale]}
          </p>
        </InfoCard>
      </div>
    </AppShell>
  );
};

const InfoCard = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <section className="bg-brand-green/60 rounded-2xl p-5 shadow-[var(--shadow-soft)] gold-border">
    <div className="flex items-center gap-2 mb-3">
      <span className="h-7 w-7 rounded-full bg-brand-gold text-brand-dark grid place-items-center">
        {icon}
      </span>
      <h2 className="font-serif text-lg italic text-brand-cream">{title}</h2>
    </div>
    <div className="space-y-1 text-brand-cream/90 text-sm">{children}</div>
  </section>
);

export default InfoPage;