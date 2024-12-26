import { UserIcon, FireIcon, SparklesIcon } from "@heroicons/react/24/solid";

export const roles = [
    {
        value: "Cool Kid",
        icon: <UserIcon className="h-6 w-6" />,
        color: "text-blue-500"
    },
    {
        value: "Cooler Kid",
        icon: <SparklesIcon className="h-6 w-6" />,
        color: "text-yellow-500"
    },
    {
        value: "Coolest Kid",
        icon: <FireIcon className="h-6 w-6" />,
        color: "text-orange-500"
    }
];

export const getRoleConfig = (role) =>
    roles.find((r) => r.value === role) || roles[0];