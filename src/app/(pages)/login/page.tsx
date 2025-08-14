"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import AuxHeader from "@/components/header/auxHeader";
import TextField from "@/components/text-field";
import { Button } from "@/components/ui/button";

export default function Login() {
  const { user, loading, login, resetPassword } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace("/admin/estoque");
      return;
    }
    if (error) {
      setFade(false);
      const fadeTimer = setTimeout(() => setFade(true), 2500);
      const clearTimer = setTimeout(() => setError(""), 3000);
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(clearTimer);
      };
    }
  }, [error, user, loading, router]);

  const handleLogin = async () => {
    setError("");
    try {
      login(email, senha);
      router.push("/admin/estoque");
    } catch {
      setError("Email ou senha inválidos.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Digite seu email para redefinir a senha.");
      return;
    }
    try {
      await resetPassword(email);
      setError("Email de redefinição enviado!");
    } catch {
      setError("Erro ao enviar email de redefinição.");
    }
  };

  if (loading || user) {
    return null;
  }
  return (
    <div className="min-h-screen w-screen bg-[#FFF4EF]">
      <AuxHeader />
      <div className="flex justify-center items-center relative mt-8 mb-8 px-4">
        <h1 className="font-pixelify-sans text-[#FF3D00] text-3xl sm:text-[40px] font-bold text-center w-full">
          Login de G&G
        </h1>
      </div>
      <main className="flex justify-center items-start h-full px-2 sm:px-0">
        <form
          className="w-full max-w-md bg-white/60 rounded-xl shadow-lg p-6 sm:p-8 grid grid-cols-1 gap-6"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 gap-3 items-center">
            <label className="text-[#FF7D02] font-poppins text-[16px] font-extrabold ml-1 sm:ml-5">
              Email
            </label>
            <TextField
              placeholder="Inserir email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </div>
          <div className="grid grid-cols-1 gap-3 items-center">
            <label className="text-[#FF7D02] font-poppins text-[16px] font-extrabold ml-1 sm:ml-5">
              Senha
            </label>
            <TextField
              placeholder="Inserir senha"
              type="password"
              value={senha}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSenha(e.target.value)
              }
            />
          </div>
          <div
            onClick={handleForgotPassword}
            className="cursor-pointer font-poppins text-[#FF9633] font-extrabold underline text-[12px] text-center"
          >
            Esqueci minha senha
          </div>
          {error && (
            <div
              className={`text-red-500 text-center font-poppins font-semibold mb-2 transition-opacity duration-500 ${fade ? "opacity-0" : "opacity-100"}`}
            >
              {error}
            </div>
          )}
          <Button
            type="submit"
            variant={"conpec"}
            size={"conpec"}
            className="w-full"
          >
              Entrar
          </Button>
        </form>
      </main>
    </div>
  );
}
