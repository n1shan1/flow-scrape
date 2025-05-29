import { SetupUser } from "@/actions/billing/setup-user";
import { waitFor } from "@/lib/waitFor";
import React from "react";

type Props = {};

async function SetupPage({}: Props) {
  return await SetupUser();
}

export default SetupPage;
