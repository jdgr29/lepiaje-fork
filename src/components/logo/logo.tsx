import Image from "next/image";
import logoPath from "../../../public/assets/logos/logo.jpeg";

const Logo = () => (
  <Image
    src={logoPath}
    alt="Le Piaje Logo"
    width={80}
    height={80}
    objectFit="cover"
    priority
  />
);

export default Logo;
