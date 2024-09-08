export default function DashboardPage() {
  return (
    <div className="flex h-screen">
      {/* Sidebar Navigation */}
      <nav className="w-64 bg-gray-800 p-4 text-white">
        <h2 className="mb-4 text-2xl font-bold">Dashboard</h2>
        <ul>
          <li className="mb-2">
            <a
              href="/dashboard"
              className="block rounded px-4 py-2 hover:bg-gray-700"
            >
              Home
            </a>
          </li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        <h1 className="mb-4 text-3xl font-bold">Welcome to Your Dashboard</h1>
        <p>Select an option from the menu to get started.</p>
      </main>
    </div>
  );
}
