import { Skeleton } from "../ui/skeleton";

function DashboardSkeleton() {
    return <div className="p-8 space-y-8 max-w-7xl mx-auto"><Skeleton className="h-64 w-full rounded-3xl" /><Skeleton className="h-96 w-full rounded-3xl" /></div>;
}