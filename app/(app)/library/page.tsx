import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { libraryItems } from '@/lib/data';

export default function LibraryPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-headline text-3xl font-bold">Mental Health Library</h1>
        <p className="text-muted-foreground">
          A collection of articles, books, and resources to support your well-being.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {libraryItems.map((item) => (
          <Card key={item.id} className="flex flex-col">
            <CardHeader>
              <div className="aspect-video relative overflow-hidden rounded-md mb-4">
                <Image src={item.imageUrl} alt={item.title} fill className="object-cover" data-ai-hint={item.imageHint} />
              </div>
              <CardTitle className="font-headline">{item.title}</CardTitle>
              <CardDescription>by {item.author}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </CardContent>
            <CardFooter>
              <Badge variant="outline">{item.type}</Badge>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
