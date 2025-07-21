/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'
import { useRouter } from "next/navigation";

export default function Register() {
    const router = useRouter();

    return (
        <div className="flex flex-col min-h-screen p-8 pb-20 items-center justify-center bg-blue-900">
            <div className="flex flex-col h-100 w-100 border-2 p-5 shadow-xl border-blue-900 items-center rounded-xl bg-white">
                <h1 className="text-xl font-bold text-blue-900">Login</h1>
                <form className="flex flex-col gap-4 pt-10">
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
                        Crear cuenta
                    </button>
                </form>

            </div>
        </div>
    );
}