import ReactCountUpWrapper from "@/components/global/react-count-up-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
type Props = { title: string; value: number; icon: LucideIcon };

function StatsCard({ title, value, icon }: Props) {
  const IconComponent = icon;
  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex pb-4">
        <CardTitle>{title}</CardTitle>
        <IconComponent
          size={120}
          className="text-muted-foreground absolute -bottom-4 -right-8 stroke-primary opacity-10"
        />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-primary">
          <ReactCountUpWrapper value={value} />
        </div>
      </CardContent>
    </Card>
  );
}

export default StatsCard;
