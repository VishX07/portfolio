export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-white/5 text-center">
      <p className="font-mono text-xs text-mist-dim">
        Designed & built by Vishal · {new Date().getFullYear()}
      </p>
    </footer>
  );
}
