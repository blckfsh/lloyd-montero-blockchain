'use client'

import { useMutation, UseMutationResult } from "@tanstack/react-query";
import {
  simulateContract,
  waitForTransactionReceipt,
  writeContract,
} from "wagmi/actions";
import {
  type WriteContractReturnType,
  type WaitForTransactionReceiptReturnType,
} from "@wagmi/core";
import { config } from "@/app/lib/reown/config";
import { tokenAbi } from "@/app/lib/abi/token";
import useRefreshBalance from "@/app/lib/hooks/useRefreshBalance";

type MintTokenParams = {
  address: `0x${string}`;
  amount: bigint;
};

type UseMintTokenResult = {
  mintMutation: UseMutationResult<
    WaitForTransactionReceiptReturnType,
    Error,
    MintTokenParams
  >
  refreshBalance: ReturnType<typeof useRefreshBalance>
}

const useMintToken = (): UseMintTokenResult => {
  const refreshBalance = useRefreshBalance()

  const mintMutation = useMutation<
    WaitForTransactionReceiptReturnType,
    Error,
    MintTokenParams
  >({
    mutationKey: ["mintToken"],
    mutationFn: async ({ address, amount }: MintTokenParams) => {
      const simulateResult = await simulateContract(config, {
        abi: tokenAbi,
        address: process.env.NEXT_PUBLIC_TOKEN_ADDRESS as `0x${string}`,
        functionName: "mint",
        args: [address, amount],
      });

      const hash: WriteContractReturnType = await writeContract(
        config,
        simulateResult.request,
      );

      const transactionReceipt: WaitForTransactionReceiptReturnType =
        await waitForTransactionReceipt(config, {
          confirmations: 1,
          pollingInterval: 1_000,
          hash,
        });

      return transactionReceipt;
    },
    onSuccess: async (
      data: WaitForTransactionReceiptReturnType,
      params: MintTokenParams
    ) => {
      console.log("Transaction successful", data);
      try {
        await refreshBalance.mutateAsync({ address: params.address });
      } catch (error) {
        console.error("Failed to refresh balance", error);
      }
    },
    onError: (error: Error) => {
      console.error("Transaction failed", error);
    },
  });
  
  return { mintMutation, refreshBalance }
};

export default useMintToken;
