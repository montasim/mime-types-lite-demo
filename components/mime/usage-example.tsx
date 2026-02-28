import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { CodeBlock } from './code-block';

interface UsageExampleProps {
  title: string;
  description: string;
  code: string;
}

export function UsageExample({ title, description, code }: UsageExampleProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <CodeBlock code={code} />
      </CardContent>
    </Card>
  );
}
