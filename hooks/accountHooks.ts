"use client"


import { getMyAccount } from "@/service/accountService"
import { useMutation, useQuery, useQueryClient, } from "@tanstack/react-query"
import { useRouter } from "next/navigation"


export const useAccount = () => {
  const queryClient = useQueryClient()
  const router= useRouter()

  const myAccountQuery = useQuery({
    queryKey: ["myAccount"],
    queryFn: getMyAccount,
    retry: false
  })


  return {
    myAccount: myAccountQuery.data,
    isAccountLoading: myAccountQuery.isLoading,
  }
}
