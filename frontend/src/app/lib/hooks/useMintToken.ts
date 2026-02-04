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

type MintTokenParams = {
  address: `0x${string}`;
  amount: bigint;
};

const useMintToken = (): UseMutationResult<
  WaitForTransactionReceiptReturnType,
  Error,
  MintTokenParams
> => {
  return useMutation<
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
    onSuccess: (data: WaitForTransactionReceiptReturnType) => {
      console.log("Transaction successful", data);
    },
    onError: (error: Error) => {
      console.error("Transaction failed", error);
    },
  });
};

export default useMintToken;
