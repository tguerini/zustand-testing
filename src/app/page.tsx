/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'
import { userStore } from "@/store/user";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { HTTP_STATUS } from "@/utils/httpStatus";

export default function Home() {
    const user = userStore((state: any) => state.user)
    const updateUser = userStore((state: any) => state.updateUser)
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = userStore.subscribe(() => {
            console.log("userStore:", user);
        });
        return () => unsubscribe();
    }, []);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        fetch("http://localhost:3001/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
            .then(async response => {
                switch (response.status) {
                    case HTTP_STATUS.OK:
                        console.log("Login exitoso");
                        const data = await response.json();
                        updateUser({id:data.id, email: data.email, password: data.password });
                        router.push(`/tasks/${data.id}`);
                        break;
                    case HTTP_STATUS.BAD_REQUEST:
                        alert("Solicitud incorrecta. Verifica los datos ingresados.");
                        break;
                    case HTTP_STATUS.UNAUTHORIZED:
                        alert("Credenciales inválidas.");
                        break;
                    case HTTP_STATUS.NOT_FOUND:
                        alert("Usuario no encontrado.");
                        break;
                    case HTTP_STATUS.INTERNAL_ERROR:
                        alert("Error interno del servidor. Intenta más tarde.");
                        break;
                    default:
                        alert("Error desconocido. Código: " + response.status);
                        break;
                }
            })
            .catch(error => {
                alert("Error de red: " + error);
            });

    }

    return (
        <div className="flex flex-col min-h-screen p-8 pb-20 items-center justify-center bg-blue-900">
            <div className="flex flex-col h-100 w-100 border-2 p-5 shadow-xl border-blue-900 items-center rounded-xl bg-white">
                <h1 className="text-xl font-bold text-blue-900">Login</h1>
                <form className="flex flex-col gap-4 pt-10" onSubmit={handleSubmit}>
                    <label className="flex flex-col text-blue-900 font-semibold">
                        Email
                        <input
                            name="email"
                            type="email"
                            required
                            className="border border-blue-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Introduce tu email"
                        />
                    </label>
                    <label className="flex flex-col text-blue-900 font-semibold">
                        Contraseña
                        <input
                            type="password"
                            name="password"
                            required
                            className="border border-blue-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Introduce tu contraseña"
                        />
                    </label>
                    <button
                        type="submit"
                        className="bg-blue-900 text-white font-bold py-2 px-4 rounded hover:bg-blue-800 transition"
                    >
                        Iniciar sesión
                    </button>
                </form>

            </div>
        </div>
    );
}