import { useLocale, useTranslations } from "next-intl";
import LocaleSwitcherSelect from "./languageSwitcherSelect";
import usFlag from "../../../public/assets/us_flag.jpg";
import italyFlag from "../../../public/assets/italy_flag.png";

export default function LocaleSwitcher() {
  const t = useTranslations("locale_switcher");
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      items={[
        {
          value: "en",
          label: t("en"),
          flag: usFlag,
        },
        {
          value: "it",
          label: t("it"),
          flag: italyFlag,
        },
      ]}
      label={t("label")}
    />
  );
}
