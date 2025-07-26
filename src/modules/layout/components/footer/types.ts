export interface ContactItemProps {
  title: string;
  items: string[];
}

export interface SocialButtonProps {
  icon: string;
  alt: string;
  onClick: () => void;
}

export interface AddressBlockProps {
  address: string;
}
