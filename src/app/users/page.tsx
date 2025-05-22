import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { User2 } from "lucide-react";

// Mock user data
const users = [
  {
    id: "1",
    username: "rajasva",
    fullName: "Rajasva Raj Srivastava",
    email: "rajasva@gmail.com",
    role: "admin",
    avatarUrl: "https://randomuser.me/api/portraits/men/36.jpg",
    location: "New York, NY",
    joinDate: "2025-01-01",
    bio: "Senior software developer with 5+ years of experience in web development. Specializes in React, Next.js, and TypeScript.",
  },
  {
    id: "2",
    username: "johndoe",
    fullName: "John Doe",
    email: "johndoe@gmail.com",
    role: "user",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    location: "San Francisco, CA",
    joinDate: "2024-05-15",
    bio: "Frontend developer passionate about creating beautiful user interfaces.",
  },
  {
    id: "3",
    username: "janedoe",
    fullName: "Jane Doe",
    email: "janedoe@gmail.com",
    role: "user",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    location: "Chicago, IL",
    joinDate: "2024-06-20",
    bio: "UX designer with a focus on creating intuitive and accessible interfaces.",
  },
  {
    id: "4",
    username: "mikegalloway",
    fullName: "Mike Galloway",
    email: "mikegalloway@gmail.com",
    role: "admin",
    avatarUrl: "https://randomuser.me/api/portraits/men/41.jpg",
    location: "Austin, TX",
    joinDate: "2024-03-10",
    bio: "Backend developer specializing in Node.js and database optimization.",
  },
  {
    id: "5",
    username: "mableclayton",
    fullName: "Mable Clayton",
    email: "mableclayton@gmail.com",
    role: "user",
    avatarUrl: "https://randomuser.me/api/portraits/women/63.jpg",
    location: "Seattle, WA",
    joinDate: "2024-07-05",
    bio: "Full-stack developer with expertise in React and Express.",
  },
];

const Users = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Users</h1>
        <Button>Add New User</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <Card key={user.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-4">
                <Avatar className="size-12">
                  <AvatarImage src={user.avatarUrl} alt={user.fullName} />
                  <AvatarFallback>
                    <User2 className="size-6" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{user.fullName}</CardTitle>
                  <CardDescription>@{user.username}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Email:</span>
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Location:</span>
                  <span className="text-sm">{user.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Role:</span>
                  <Badge variant={user.role === "admin" ? "default" : "outline"}>
                    {user.role}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Joined:</span>
                  <span className="text-sm">
                    {new Date(user.joinDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/users/${user.username}`}>View Profile</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Users;
