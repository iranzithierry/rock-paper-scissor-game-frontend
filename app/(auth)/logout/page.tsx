import { logout } from "@/lib/sessions";
import Logout from "./logout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Logout',
};
export default function LogoutPage() {
    return (<Logout logout={async () => { "use server"; await logout() }} />)
}