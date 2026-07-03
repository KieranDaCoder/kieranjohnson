export function Footer() {
  return (
    <footer className="mt-24 border-t border-hairline pt-8 text-center text-sm text-muted">
      <span className="font-medium text-charcoal">{new Date().getFullYear()}</span> — Built by
      Kieran Johnson
    </footer>
  );
}
