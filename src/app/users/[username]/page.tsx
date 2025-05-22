import AppLineChart from "@/components/AppLineChart";
import CardList from "@/components/CardList";
import EditUser from "@/components/EditUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { BadgeCheck, Candy, Citrus, Shield, Slash } from "lucide-react";
import { LucideIcon } from "lucide-react";

// Define badge type for better type safety
type UserBadge = {
  id: string;
  icon: LucideIcon;
  size: number;
  bgColor: string;
  borderColor: string;
  title: string;
  description: string;
  textColor: string;
  dateAwarded?: string;
  level?: "basic" | "intermediate" | "advanced";
  points?: number;
  achievements?: string[];
  unlocks?: string[];
};

// User badges data
const userBadges: UserBadge[] = [
  {
    id: "verified",
    icon: BadgeCheck,
    size: 38,
    bgColor: "bg-blue-500/30",
    borderColor: "border-blue-500/50",
    title: "Verified User",
    description: "This user has been verified by the admin.",
    textColor: "text-sm",
    dateAwarded: "2023-09-15",
    level: "basic",
    points: 50,
    achievements: ["Email verified", "Phone verified", "Identity confirmed"],
    unlocks: ["Access to premium content", "Ability to post comments"],
  },
  {
    id: "admin",
    icon: Shield,
    size: 36,
    bgColor: "bg-green-800/30",
    borderColor: "border-green-800/50",
    title: "Admin",
    description:
      "Admin users have access to all features and can manage users.",
    textColor: "text-sm text-muted-foreground",
    dateAwarded: "2023-10-20",
    level: "advanced",
    points: 500,
    achievements: [
      "Completed admin training",
      "Passed security verification",
      "Moderation experience",
    ],
    unlocks: [
      "User management",
      "Content moderation",
      "System configuration",
      "Analytics access",
    ],
  },
  {
    id: "awarded",
    icon: Candy,
    size: 36,
    bgColor: "bg-yellow-500/30",
    borderColor: "border-yellow-500/50",
    title: "Awarded",
    description: "This user has been awarded for their contributions.",
    textColor: "text-sm text-muted-foreground",
    dateAwarded: "2024-01-10",
    level: "intermediate",
    points: 250,
    achievements: [
      "10+ quality posts",
      "Helpful community member",
      "Regular contributor",
    ],
    unlocks: ["Special profile flair", "Increased visibility in community"],
  },
  {
    id: "popular",
    icon: Citrus,
    size: 36,
    bgColor: "bg-orange-500/30",
    borderColor: "border-orange-500/50",
    title: "Popular",
    description: "This user has been popular in the community.",
    textColor: "text-sm text-muted-foreground",
    dateAwarded: "2024-03-05",
    level: "intermediate",
    points: 300,
    achievements: [
      "1000+ followers",
      "Content regularly featured",
      "High engagement rate",
    ],
    unlocks: [
      "Featured on homepage",
      "Priority support",
      "Early access to new features",
    ],
  },
];

const SingleUserPage = () => {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/users">Users</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Rajasva</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/*Container*/}
      <div className="mt-4 flex flex-col xl:flex-row gap-8">
        {/*Left*/}
        <div className="w-full xl:w-1/3 space-y-6">
          {/*USER BADGES CONTAINER*/}
          <div className="bg-primary-foreground p-4 rounded-lg">
            <h1 className="text-xl font-semibold">Users Badges</h1>
            <div className="flex gap-4 mt-4">
              {userBadges.map((badge) => (
                <HoverCard key={badge.id}>
                  <HoverCardTrigger>
                    <badge.icon
                      size={badge.size}
                      className={`rounded-full ${badge.bgColor} border-1 ${badge.borderColor} p-2`}
                    />
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <badge.icon
                          size={24}
                          className={`${badge.bgColor} rounded-full p-1`}
                        />
                        <h1 className="font-bold">{badge.title}</h1>
                        <Badge variant="outline" className="ml-auto">
                          {badge.level}
                        </Badge>
                      </div>
                      <p className={badge.textColor}>{badge.description}</p>

                      {badge.dateAwarded && (
                        <div className="text-xs text-muted-foreground">
                          Awarded on{" "}
                          {new Date(badge.dateAwarded).toLocaleDateString()}
                        </div>
                      )}

                      {badge.points && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Points:</span>
                          <span className="text-sm">{badge.points}</span>
                        </div>
                      )}

                      {badge.achievements && badge.achievements.length > 0 && (
                        <div>
                          <h3 className="text-sm font-medium mb-1">
                            Achievements:
                          </h3>
                          <ul className="text-xs space-y-1">
                            {badge.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {badge.unlocks && badge.unlocks.length > 0 && (
                        <div>
                          <h3 className="text-sm font-medium mb-1">Unlocks:</h3>
                          <ul className="text-xs space-y-1">
                            {badge.unlocks.map((unlock, i) => (
                              <li key={i} className="flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                                {unlock}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>
          </div>
          {/*INFORMATION CONTAINER*/}
          <div className="bg-primary-foreground p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">User Information</h1>
              <Sheet>
                <SheetTrigger asChild>
                  <Button>Edit User</Button>
                </SheetTrigger>
                <EditUser />
              </Sheet>
            </div>
            <div className="space-y-4 mt-4">
              <div className="flex flex-col gap-2 mb-8">
                <p className="text-sm text-muted-foreground">
                  Profile completion
                </p>
                <Progress value={66} />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Username:</span>
                <span>rajasva</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Email:</span>
                <span>rajasva@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Phone:</span>
                <span>+1 234 5678</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Location:</span>
                <span>New York, NY</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Role:</span>
                <Badge>Admin</Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Joined on 2025.01.01
            </p>
          </div>

          {/*CARD LIST CONTAINER*/}
          <div className="bg-primary-foreground p-4 rounded-lg">
            <CardList title="Latest Transactions" />
          </div>
        </div>
        {/*Right*/}
        <div className="w-full xl:w-2/3 space-y-6">
          {/*USER CARD CONTAINER*/}
          <div className="bg-primary-foreground p-4 rounded-lg space-y-2">
            <div className="flex items-center gap-2">
              <Avatar className="size-12">
                <AvatarImage src="https://randomuser.me/api/portraits/men/36.jpg" />
                <AvatarFallback>RR</AvatarFallback>
              </Avatar>
              <h1 className="text-xl font-semibold">Rajasva Raj Srivastava</h1>
            </div>
            <p>
              Senior software developer with 5+ years of experience in web
              development. Specializes in React, Next.js, and TypeScript.
              Passionate about creating intuitive user interfaces and optimizing
              application performance.
            </p>
          </div>
          {/*CHART CONTAINER*/}
          <div className="bg-primary-foreground p-4 rounded-lg">
            <h1 className="text-xl font-semibold">User Activity</h1>
            <AppLineChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUserPage;
