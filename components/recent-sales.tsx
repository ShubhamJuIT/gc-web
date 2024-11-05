import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
const users = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "+$39.00",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "+$299.00",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    amount: "+$99.00",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "+$39.00",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
  },
];
export function RecentSales() {
  return (
    <div className="space-y-8 w-full">
      {users.map((user, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.avatar} alt={`${user.name}'s avatar`} />
            <AvatarFallback>
              <Image src="/svgs/user.svg" alt="User icon" width={30} height={30} />
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-sm text-white/70">{user.email}</p>
          </div>
          <div className="ml-auto font-medium">{user.amount}</div>
        </div>
      ))}
    </div>
  );
}
