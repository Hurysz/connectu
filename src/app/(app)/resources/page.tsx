import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { resources } from '@/lib/data';

type ResourceItem = {
  id: number;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  imageHint: string;
};

function ResourceCard({ item }: { item: ResourceItem }) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="aspect-video relative overflow-hidden rounded-md mb-4">
             <Image src={item.imageUrl} alt={item.title} fill className="object-cover" data-ai-hint={item.imageHint} />
        </div>
        <CardTitle className="font-headline">{item.title}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow" />
      <CardFooter>
        <Badge variant="secondary">{item.date}</Badge>
      </CardFooter>
    </Card>
  );
}

export default function ResourcesPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-headline text-3xl font-bold">Resource Library</h1>
        <p className="text-muted-foreground">
          Find announcements, events, and help materials for students.
        </p>
      </div>

      <Tabs defaultValue="announcements" className="w-full">
        <TabsList>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="help">Help Materials</TabsTrigger>
        </TabsList>
        <TabsContent value="announcements" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resources.announcements.map((item) => (
              <ResourceCard key={item.id} item={item} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="events" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resources.events.map((item) => (
              <ResourceCard key={item.id} item={item} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="help" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resources.help.map((item) => (
              <ResourceCard key={item.id} item={item} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
