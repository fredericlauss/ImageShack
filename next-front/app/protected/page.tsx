import AuthButton from "@/components/AuthButton";
import ImageGalerie from "@/components/ImageGalerie";
import Uploader from "@/components/uploader";
import { createClient } from "@/utils/supabase/server";
import { createClientDelete } from "@/utils/supabase/serverDelete";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const deleteUser = async (formData: any) => {
    "use server";

    const supabase = createClientDelete();
    const userId = formData.get("userid");
    if (!userId) return;

    // Supprime l'utilisateur d'auth
    const { error } = await supabase.auth.admin.deleteUser(userId);

    if (error) {
      console.error("Error deleting user:", error);
      return;
    }

    //
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <AuthButton />
          </div>
        </nav>
      </div>

      <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          <form action={deleteUser}>
            <input type="hidden" name="userid" value={user.id} />
            <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
              Delete user
            </button>
          </form>

          <Uploader user={user} />
          <ImageGalerie user={user} />
        </main>
      </div>
      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          <a
            href="https://www.la-rache.com/"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            conforme a la RACHE
          </a>
        </p>
      </footer>
    </div>
  );
}
