import React from 'react';
import LogoGreen from '../../../assets/images/logos/logogreen.svg';
import LogoWhite from '../../../assets/images/logos/logowhite.svg';

interface LogoProps {
  size?: number;
  variant?: 'green' | 'white';
}

export const Logo: React.FC<LogoProps> = ({size = 64, variant = 'green'}) => {
  const SvgLogo = variant === 'white' ? LogoWhite : LogoGreen;

  return <SvgLogo width={size} height={size} />;
};