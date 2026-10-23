const SUPABASE_URL = "https://xitkarxaglzluqfxdqvv.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_fPx0YEWFkFgZ4AZ4MYLDcA_i8qfZiLX";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);
console.log("Supabase conectado:", supabaseClient);
async function probarProductos() {
    const { data, error } = await supabaseClient
        .from("productos")
        .select("*")
        .eq("disponible", true)
        .order("orden", { ascending: true });

    if (error) {
        console.error("Error cargando productos:", error);
        return;
    }

    console.log("Productos encontrados:", data);
}

probarProductos();