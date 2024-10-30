import * as Flags from "country-flag-icons/react/3x2";

import "../styles/components/CountryFlags.scss";

export default function CouontryFlags({ country }) {
  const FlagComponent = country ? Flags[country] : null;

  return (
    <>
      {FlagComponent && (
        <FlagComponent title={country.name} className="flag-icon" />
      )}
    </>
  );
}
