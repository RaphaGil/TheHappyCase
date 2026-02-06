import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function TestInventory() {
  useEffect(() => {
    async function fetchInventory() {
      const { data, error } = await supabase
        .from("inventory_items")
        .select("*");
      console.log("Inventory data:", data, error);
    }
    fetchInventory();
  }, []);

  return <div>Check the console for inventory data</div>;
}
