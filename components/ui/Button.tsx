import React from 'react';
import { playSound } from '../../utils/audio';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  label: string;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', label, icon, className = "", onClick, ...props }) => {
  const baseStyles = "relative px-8 py-3 font-cinzel font-bold tracking-wider transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden group";
  
  const variants = {
    primary: "text-gold border-2 border-gold/70 hover:border-gold hover:text-gold-glow hover:shadow-[0_0_20px_rgba(200,161,91,0.2)] bg-gradient-to-r from-transparent via-gold/10 to-transparent",
    secondary: "text-neutral-400 border border-neutral-600 hover:text-neutral-200 hover:border-neutral-400 hover:bg-neutral-800",
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playSound('click');
    if (onClick) onClick(e);
  };

  const handleMouseEnter = () => {
    playSound('hover');
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {label}
        {icon}
      </span>
      {variant === 'primary' && (
        <div className="absolute inset-0 w-full h-full bg-gold/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
      )}
    </button>
  );
};

export default Button;