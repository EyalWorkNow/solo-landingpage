import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const Section: React.FC<SectionProps> = ({ children, className = "", id }) => {
  return (
    <section id={id} className={`py-20 md:py-32 px-6 md:px-12 relative overflow-hidden ${className}`}>
      {children}
    </section>
  );
};

export default Section;