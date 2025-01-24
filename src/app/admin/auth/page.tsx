import Link from "next/link";

export default function AdminPanel() {
  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-200 mb-2">Admin Panel</h1>
        <h2 className="text-2xl text-gray-200">Select property</h2>
      </header>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
        <Link
          href="/admin/auth/villa-perlata"
          className="flex-1 bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
        >
          <div className="text-xl font-semibold text-gray-800">
            La villa Perlata
          </div>
        </Link>

        <Link
          href="/admin/auth/centesimo-chilometro"
          className="flex-1 bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
        >
          <div className="text-xl font-semibold text-gray-800">
            Al centesimo chilometro
          </div>
        </Link>
      </div>
    </div>
  );
}
