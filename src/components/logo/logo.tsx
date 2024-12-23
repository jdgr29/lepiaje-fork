import Image from "next/image";
import logoPath from "../../../public/assets/logos/place_holder_logo.png";

const Logo = () => (
  <Image
    src={logoPath}
    alt="LePiaje Logo"
    width={80}
    height={80}
    objectFit="cover"
    priority
  />
);

export default Logo;
