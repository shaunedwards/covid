export default function getRelativeFlagPath(country) {
  return country?.countryInfo?.iso2
    ? `/assets/img/flags/${country.countryInfo.iso2}.png`
    : '/assets/img/flags/unknown.png';
}
