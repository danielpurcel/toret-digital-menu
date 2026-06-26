import { Clock, MapPin, Phone, Mail, Instagram } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { siteConfig } from "@/data/siteConfig";
import { allergenComplianceNote, euAllergens } from "@/data/allergens";
import { AllergenBadge } from "@/components/menu/AllergenBadge";
import { useLocale } from "@/i18n/LocaleContext";

const InfoPage = () => {
  const { locale, t } = useLocale();

  return (
    <AppShell>
      <div className="px-5 pt-6 pb-4">
        <p className="eyebrow mb-1">{siteConfig.city}</p>
        <h1 className="font-serif text-[34px] leading-tight text-toret-ink">{siteConfig.name}</h1>
        <p className="text-[14px] text-toret-ink-muted mt-3 leading-relaxed">
          {siteConfig.tagline[locale]}
        </p>
      </div>

      <div className="px-5 py-3 space-y-3">
        <InfoCard icon={<Clock className="h-4 w-4" />} title={t("openingHours")}>
          <p>
            <span className="font-semibold text-toret-ink">
              {siteConfig.hours.label[locale]}
            </span>
            <span className="text-toret-ink-muted"> · {siteConfig.hours.time}</span>
          </p>
          <p className="text-toret-ink-muted text-[13px]">{siteConfig.hours.closed[locale]}</p>
        </InfoCard>

        <InfoCard icon={<MapPin className="h-4 w-4" />} title={t("address")}>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.contact.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-toret-ink hover:text-toret-green transition-colors underline underline-offset-2 decoration-toret-gold/50"
          >
            {siteConfig.contact.address}
          </a>
        </InfoCard>

        <InfoCard icon={<Phone className="h-4 w-4" />} title={t("contacts")}>
          <a
            href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2.5 py-1 text-toret-ink hover:text-toret-green transition-colors"
          >
            <Phone className="h-4 w-4 text-toret-gold-warm" strokeWidth={1.5} />
            {siteConfig.contact.phone}
          </a>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="flex items-center gap-2.5 py-1 text-toret-ink hover:text-toret-green transition-colors"
          >
            <Mail className="h-4 w-4 text-toret-gold-warm" strokeWidth={1.5} />
            {siteConfig.contact.email}
          </a>
          <a
            href={`https://instagram.com/${siteConfig.contact.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 py-1 text-toret-ink hover:text-toret-green transition-colors"
          >
            <Instagram className="h-4 w-4 text-toret-gold-warm" strokeWidth={1.5} />
            {siteConfig.contact.instagram}
          </a>
        </InfoCard>

        <InfoCard icon={<span className="text-xs font-bold">!</span>} title={t("allergens")}>
          <p className="text-[13px] text-toret-ink-muted leading-relaxed">
            {siteConfig.allergensNote[locale]}
          </p>
          <p className="text-[13px] text-toret-ink-muted leading-relaxed">
            {allergenComplianceNote[locale]}
          </p>
          <div className="flex flex-wrap gap-1.5 pt-2">
            {euAllergens.map((allergen) => (
              <AllergenBadge key={allergen} allergen={allergen} locale={locale} compact />
            ))}
          </div>
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
  <section
    className="bg-toret-paper rounded-2xl p-5 warm-border"
    style={{ boxShadow: "var(--shadow-1)" }}
  >
    <div className="flex items-center gap-2.5 mb-3">
      <span className="h-8 w-8 rounded-full bg-toret-cream text-toret-green grid place-items-center">
        {icon}
      </span>
      <h2 className="font-serif text-[18px] text-toret-ink">{title}</h2>
    </div>
    <div className="space-y-1 text-toret-ink text-[14px]">{children}</div>
  </section>
);

export default InfoPage;
