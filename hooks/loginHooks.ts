"use client"


import { login, logout, register,verify } from "@/service/authService"
import { useMutation, useQuery, useQueryClient, } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export const useAuth = () => {
  const queryClient = useQueryClient()
  const router= useRouter()

  const authQuery = useQuery({
    queryKey: ["auth"],
    queryFn: verify,
    retry: false
  })

  const registerMutation = useMutation({
    mutationFn: register,
      onSuccess: (data) => {
    toast.success(data.message);
    queryClient.invalidateQueries({queryKey:['auth']})
   
  },
  onError: (error: any) => {
    toast.error(
      error?.response?.data?.message || "error registering user"
    );
  },
  })

  const loginMutation = useMutation({
    mutationFn: login,
     onSuccess: (data) => {
    toast.success(data.message);
    queryClient.invalidateQueries({queryKey:['auth']})
    
    const user = JSON.parse(atob(data.token.split(".")[1]));
    if (user.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  
    
  },

  onError: (error: any) => {
    toast.error(
      error?.response?.data?.message || "error validating user"
    );
  },
  })


  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess:()=>{
      toast.success('Logout successfully')
     queryClient.setQueryData(["auth"], null);
     router.push('/login')
    }
  })


  return {
    user: authQuery.data,
    isLoading: authQuery.isLoading,
    isAuthenticated: !!authQuery.data,
    register: registerMutation,
    login: loginMutation,
    logout: logoutMutation,
  }
}
