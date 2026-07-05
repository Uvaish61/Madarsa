// Full-screen spinner shown while auth state resolves or a route guard is
// deciding where to send the user — replaces the old blank-screen (`null`)
// flash on protected/auth pages.
export default function RouteLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper">
      <div
        className="h-9 w-9 animate-spin rounded-full border-[3px] border-green-200 border-t-green-600"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
