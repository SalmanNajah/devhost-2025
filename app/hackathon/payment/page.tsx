import HackathonPaymentClient from "@/components/backend/hackathon/HackathonPayment";
import { adminDb, verifySessionCookie } from "@/firebase/admin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function HackathonPaymentPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("__session")?.value;

  if (!session) redirect("/");

  const decoded = await verifySessionCookie(session);
  if (!decoded) redirect("/");

  const { email } = decoded;

  const registrationQuery = await adminDb
    .collection("registrations")
    .where("eventId", "==", "hackathon")
    .where("leaderEmail", "==", email)
    .limit(1)
    .get();

  let paid = false;

  if (!registrationQuery.empty) {
    const regDoc = registrationQuery.docs[0].data();
    console.log("", regDoc);
    paid = !!regDoc.paymentDone; // true if paymentDone is true
  }

  return <HackathonPaymentClient paid={paid} />;
}
