import { SvgIconProps } from "../types";

export const SvgIcon = ({ src, width, height }: SvgIconProps) => (
  <img src={`${import.meta.env.BASE_URL}img/svg/${src}`} alt={src} width={width} height={height} />
);
