"use server";

import { google } from "googleapis";
import { adminDb } from "@/firebase/admin";
import { eventDetails } from "@/assets/data/eventPayment";

type Params = {
  team_id: string;
  leaderEmail: string;
  eventId: string;
  upi_id: string;
  utr: string;
};

export async function registerAndInsert(params: Params) {
  const { leaderEmail, eventId, upi_id, utr, team_id } = params;

  // --- Firestore update ---
  const registrationsRef = adminDb.collection("registrations");
  const query = await registrationsRef
    .where("eventId", "==", eventId)
    .where("leaderEmail", "==", leaderEmail)
    .limit(1)
    .get();

  if (query.empty) return { status: "error", message: "Team not found" };

  const doc = query.docs[0];
  const data = doc.data();

  if (data.verified === true) return { status: "already_verified" };

  await doc.ref.update({
    registered: true,
    paymentDone: false,
  });

  // --- Google Sheets setup ---
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.SHEET_ID!;
  const sheetName = "Sheet1";

  const amount = eventDetails[parseInt(eventId)].amount ?? 0;
  const verified = false;
  const newRow = [team_id, leaderEmail, eventId, amount, upi_id, utr, verified];

  // --- Check if row already exists ---
  const readRes = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A:G`,
  });

  const rows = readRes.data.values || [];
  const idIndex = 0;

  let existingRowIndex = -1;
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][idIndex] === team_id) {
      existingRowIndex = i + 1;
      break;
    }
  }

  if (existingRowIndex !== -1) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A${existingRowIndex}:G${existingRowIndex}`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [newRow],
      },
    });
    return { status: "inserted", row: newRow };
  } else {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:G`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [newRow],
      },
    });
    return { status: "inserted", row: newRow };
  }
}
