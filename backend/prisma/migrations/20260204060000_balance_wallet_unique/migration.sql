-- Add unique constraint for Balance.walletAddress
ALTER TABLE "Balance"
ADD CONSTRAINT "Balance_walletAddress_key" UNIQUE ("walletAddress");

