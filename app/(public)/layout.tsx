export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="flex min-h-screen flex-col overflow-x-hidden">{children}</div>;
}
