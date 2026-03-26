import { cn } from "@/lib/utils";

interface TimelineItemProps {
  title: string;
  subtitle: string;
  period: string;
  description?: string;
  items?: string[];
  logo?: string;
  isLast?: boolean;
}

export function TimelineItem({
  title,
  subtitle,
  period,
  description,
  items,
  logo,
  isLast = false,
}: TimelineItemProps) {
  return (
    <div className="relative pl-8">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[7px] top-3 h-full w-px bg-border" />
      )}

      {/* Timeline dot */}
      <div className="absolute left-0 top-2 h-3.5 w-3.5 rounded-full border-2 border-primary bg-background" />

      <div className="pb-8">
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="font-semibold">{title}</h3>
          <span className="text-sm text-muted-foreground">{period}</span>
        </div>
        <div className="flex items-center gap-2.5 mt-0.5">
          {logo && (
            <img
              src={logo}
              alt=""
              className="h-7 w-7 shrink-0 rounded-full object-cover bg-white"
              loading="lazy"
              decoding="async"
            />
          )}
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        {description && (
          <p className="mt-2 text-sm text-foreground/80">{description}</p>
        )}
        {items && items.length > 0 && (
          <ul className={cn("mt-2 space-y-1")}>
            {items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-foreground/80"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
