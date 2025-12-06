import React from 'react';

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface TargetAudienceItem {
  title: string;
  description: string;
  image: string;
}

export interface StatItem {
  value: string;
  label: string;
}