"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuxHeader from "@/app/components/ui/auxHeader"
import TextField from "@/app/components/text-field";
import { auth } from "@/firebase/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";


export default function Login(){
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    const [fade, setFade] = useState(false);

    useEffect(() => { //Animação pra senha errada
        if (error) {
            setFade(false);
            const fadeTimer = setTimeout(() => setFade(true), 2500); 
            const clearTimer = setTimeout(() => setError(""), 3000); 
            return () => {
                clearTimeout(fadeTimer);
                clearTimeout(clearTimer);
            };
        }
    }, [error]);

    const handleLogin = async () => { //Auth de login
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, senha);
            router.push("/admin/estoque");
        } catch {
            setError("Email ou senha inválidos.");
        }
    };

    const handleSubmit = (e: React.FormEvent) => { 
        e.preventDefault();
        handleLogin();
    };

    const handleForgotPassword = async () => { //Auth do email de reset de senha
        if (!email) {
            setError("Digite seu email para redefinir a senha.");
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            setError("Email de redefinição enviado!");
        } catch {
            setError("Erro ao enviar email de redefinição.");
        }
    };

    return(
        <div className="min-h-screen w-screen bg-[#FFF4EF]">
            <AuxHeader />
            <div className="flex justify-center items-center relative mt-8 mb-8">
                <h1 className="font-pixelify-sans text-[#FF3D00] text-[40px] font-bold ">
                    Login
                </h1>
            </div>
            <main className="flex justify-center items-start h-full">
                <form
                    className="w-1/3 grid grid-cols-3 grid-rows-2 gap-6"
                    onSubmit={handleSubmit}
                >
                    <div className="grid grid-cols-1 col-span-3 gap-3 items-center">
                        <label className="text-[#FF7D02] col-span-1 font-poppins text-[16px] font-extrabold ml-5">Email</label>
                        <TextField
                            placeholder="Inserir email"
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-3 col-span-3 items-center">
                        <label className="text-[#FF7D02] col-span-1 font-poppins text-[16px] font-extrabold ml-5">Senha</label>
                        <TextField
                            placeholder="Inserir senha"
                            type="password"
                            value={senha}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSenha(e.target.value)}
                        />
                    </div>
                    <div
                        onClick={handleForgotPassword}
                        className="cursor-pointer font-poppins text-[#FF9633] font-extrabold underline text-[12px] col-start-2 text-center"
                    >
                        Esqueci minha senha
                    </div>
                    {error && (
                        <div className={`col-span-3 text-red-500 text-center font-poppins font-semibold mb-2 transition-opacity duration-500 ${fade ? "opacity-0" : "opacity-100"}`}>
                            {error}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="group h-12 w-32 col-start-2 mt-10  m-2 botao-laranja"
                    >
                        <span className="text-white font-Poppins font-bold text-lg block transition duration-[175ms] group-hover:scale-[1.08]">Enviar </span>
                    </button>
                </form>
            </main>
        </div>
    );
}
