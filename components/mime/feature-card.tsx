import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import type { LucideIcon } from 'lucide-react';


interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card>
      <CardHeader>
        <Icon className="mb-2 h-8 w-8 text-primary" />
        <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent />
    </Card>
  );
}
