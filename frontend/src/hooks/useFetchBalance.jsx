// useFetchBalance.js
import { useEffect, useState } from "react";
import API from "../api";

const useFetchBalance = () => {
  const [balance, setBalance] = useState(0);
  const token = localStorage.getItem("token"); // Changed to localStorage

  useEffect(() => {
    const getBalance = async () => {
      try {
        const response = await API.get(
          "/account/balance",
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };
    getBalance();
  }, [token]);

  return balance;
};

export default useFetchBalance;