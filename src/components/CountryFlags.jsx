import * as Flags from "country-flag-icons/react/3x2";

import "../styles/CountryFlags.scss";

export default function CouontryFlags({ country }) {
  const FlagComponent = country ? Flags[country] : null; // Dynamically select the flag component

  return (
    <>
      {FlagComponent && (
        <FlagComponent title={country.name} className="flag-icon" />
      )}
    </>
  );
}
