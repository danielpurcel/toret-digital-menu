import { Clock, MapPin, Phone, Mail, Instagram } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { siteConfig } from "@/data/siteConfig";
import { useLocale } from "@/i18n/LocaleContext";

const InfoPage = () => {
  const { locale, t } = useLocale();

  return (
    <AppShell>
      <div className="px-6 pt-8 pb-10 flex flex-col items-center text-center bg-primary text-primary-foreground">
        <img
          src={siteConfig.logo}
          alt="Caffè Torèt"
          width={140}
          height={140}
          className="h-32 w-32 mb-4"
        />
        <h1 className="font-serif text-3xl">{siteConfig.name}</h1>
        <p className="text-sm uppercase tracking-[0.3em] text-brand-gold mt-1">
          {siteConfig.city}
        </p>
        <p className="text-sm text-primary-foreground/80 mt-4 max-w-xs">
          {siteConfig.tagline[locale]}
        </p>
      </div>

      <div className="p-4 space-y-3">
        <InfoCard icon={<Clock className="h-4 w-4" />} title={t("openingHours")}>
          <p>
            <span className="font-medium text-foreground">
              {siteConfig.hours.label[locale]}
            </span>{" "}
            · {siteConfig.hours.time}
          </p>
          <p className="text-muted-foreground text-sm">{siteConfig.hours.closed[locale]}</p>
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
          <p className="text-sm text-muted-foreground leading-relaxed">
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
  <section className="bg-card rounded-2xl p-5 shadow-[var(--shadow-soft)] border border-border/40">
    <div className="flex items-center gap-2 mb-3">
      <span className="h-7 w-7 rounded-full bg-primary text-primary-foreground grid place-items-center">
        {icon}
      </span>
      <h2 className="font-serif text-lg">{title}</h2>
    </div>
    <div className="space-y-1 text-foreground">{children}</div>
  </section>
);

export default InfoPage;