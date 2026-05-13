"use client"


import { getDashBoard } from "@/service/dashboardService"
import { useMutation, useQuery, useQueryClient, } from "@tanstack/react-query"
import { useRouter } from "next/navigation"


export const useDashboard = () => {
  const queryClient = useQueryClient()
  const router= useRouter()

  const dashboardQuery = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashBoard,
    retry: false
  })


  return {
    dashboard: dashboardQuery.data,
    isLoading: dashboardQuery.isLoading,
  }
}
