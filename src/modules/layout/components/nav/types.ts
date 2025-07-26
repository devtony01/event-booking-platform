export interface CardProps {
  icon: string;
  title: string;
  description: string;
}

export interface ButtonLinkProps {
  variant: 'primary' | 'secondary';
  href: string;
  children: React.ReactNode;
}

export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}