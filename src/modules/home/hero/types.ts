export interface ButtonProps {
  text: string;
  variant: "primary" | "secondary";
  imageSrc: string;
}

export interface HeroSectionProps {
  title: string[];
  subtitle: string[];
  description: string[];
  buttons: ButtonProps[];
}
