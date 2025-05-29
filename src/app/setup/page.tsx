import { SetupUser } from "@/actions/billing/setup-user";

type Props = {};

async function SetupPage({}: Props) {
  return await SetupUser();
}

export default SetupPage;
