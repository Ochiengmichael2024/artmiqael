import React, { createContext, useCallback, useEffect, useState, type ReactNode } from "react";
import type { Address, Order, User } from "@/types";
import { storageService } from "@/services/storage.service";
import { authService } from "@/services/auth.service";
import { orderService, type PlaceOrderInput } from "@/services/order.service";
import { useToast } from "@/hooks/useToast";

interface AuthContextValue {
  user: User | null;
  addresses: Address[];
  orders: Order[];
  isAuthenticated: boolean;
  login: (email: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  addAddress: (address: Address) => void;
  removeAddress: (index: number) => void;
  placeOrder: (input: PlaceOrderInput) => Promise<Order>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

const ADDRESSES_KEY = "addresses";

export function AuthProvider({ children }: { children: ReactNode }) {
  const { pushToast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setUser(authService.loadPersistedUser());
    setAddresses(storageService.get<Address[]>(ADDRESSES_KEY, []));
    setOrders(orderService.loadAll());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    storageService.set(ADDRESSES_KEY, addresses);
  }, [addresses, hydrated]);

  const login = useCallback(
    async (email: string, name?: string) => {
      const signedIn = name ? await authService.signUp(name, email) : await authService.signIn(email);
      setUser(signedIn);
      pushToast("Signed in");
    },
    [pushToast]
  );

  const logout = useCallback(async () => {
    await authService.signOut();
    setUser(null);
    pushToast("Signed out");
  }, [pushToast]);

  const addAddress = useCallback((address: Address) => {
    setAddresses((a) => [...a, address]);
  }, []);

  const removeAddress = useCallback((index: number) => {
    setAddresses((a) => a.filter((_, i) => i !== index));
  }, []);

  const placeOrder = useCallback(async (input: PlaceOrderInput) => {
    const order = await orderService.place(input);
    setOrders((o) => [...o, order]);
    return order;
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, addresses, orders, isAuthenticated: !!user, login, logout, addAddress, removeAddress, placeOrder }}
    >
      {children}
    </AuthContext.Provider>
  );
}
