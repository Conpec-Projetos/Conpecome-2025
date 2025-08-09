"use client";
import { SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuxHeader from "@/app/components/ui/auxHeader"
import TextField from "@/app/components/text-field";
import { auth } from "@/firebase/firebase-config";
import { confirmPasswordReset } from "firebase/auth";

const ResetPasswordPage = () => {
    const router = useRouter();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const oobCode = urlParams.get('oobCode');
        if (!oobCode) {
            setError('Link de recuperação inválido.');
        }
    }, []);

    const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Senhas não coincidem.');
            return;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const oobCode: string | null = urlParams.get('oobCode');

        try {
            if (!oobCode) {
                setError('Senha ou codigo de recuperação inválidos.');
                setSuccess(false);
                return;
            }
            await confirmPasswordReset(auth, oobCode, newPassword);
            setSuccess(true);
            setError("");
        } catch {
            setError("Algum erro inesperado ocorreu");
            setSuccess(false);
        }
    };

    return (
        <main className="min-h-screen w-screen bg-[#FFF4EF]">
            <AuxHeader />
            <div className="flex justify-center items-center relative mt-8 mb-8">
                <h1 className="font-pixelify-sans text-[#FF3D00] text-[40px] font-bold ">
                    Nova senha
                </h1>
            </div>
            <div className="flex justify-center items-start h-full">
                {success ? (
                    <p
                    onClick={() => router.push("/admin/login")}
                    className="cursor-pointer font-poppins text-[#FF9633] font-extrabold underline text-[12px] col-start-2"
                    >Senha recuperada com sucesso! <br/>
                    Retorne a página de login</p>
                ) : (
                    
                    <form
                        className="w-1/3 grid grid-cols-3 grid-rows-2 gap-6"
                        onSubmit={handlePasswordReset}
                    >
                        <div className="grid grid-cols-1 col-span-3 gap-3 items-center">
                            <label className="text-[#FF7D02] col-span-1 font-poppins text-[16px] font-extrabold ml-5">Nova senha</label>
                            <TextField
                                type="password"
                                placeholder="Nova senha"
                                value={newPassword}
                                onChange={(e: { target: { value: SetStateAction<string>; }; }) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-3 col-span-3 items-center">
                            <label className="text-[#FF7D02] col-span-1 font-poppins text-[16px] font-extrabold ml-5">Confirmar senha</label>
                            <TextField
                                type="password"
                                placeholder="Confirmar nova senha"
                                value={confirmPassword}
                                onChange={(e: { target: { value: SetStateAction<string>; }; }) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && (
                            <div className="col-span-3 text-red-500 text-center font-poppins font-semibold mb-2 transition-opacity duration-500">
                                {error}
                            </div>
                        )}
                        <button
                            type="submit"
                            className="font-poppins rounded-full bg-[#ff5a01c3] col-start-2 h-12 mt-4 font-bold"
                        >
                            Enviar
                        </button>
                    </form>
                )}
            </div>
        </main>
    );
};

export default ResetPasswordPage;
