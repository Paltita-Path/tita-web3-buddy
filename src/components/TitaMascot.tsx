import mascot from "@/assets/tita-mascot.png";
import clsx from "clsx";

type Props = { size?: number; className?: string };

const TitaMascot = ({ size = 160, className }: Props) => {
  return (
    <img
      src={mascot}
      width={size}
      height={size}
      alt="TITA 🥑, mascota palta sonriente"
      className={clsx("select-none animate-float", className)}
      loading="lazy"
    />
  );
};

export default TitaMascot;
