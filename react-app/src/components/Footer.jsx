export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low py-space-xl shadow-[0_-1px_12px_rgba(8,18,48,0.03)]">
      <div className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin flex flex-col md:flex-row items-center justify-between gap-space-lg">
        <p className="font-label-md text-label-md text-primary">© 2026 한창수</p>
        <div className="flex items-center gap-space-md font-label-sm text-label-sm text-on-surface-variant">
          <a
            className="hover:text-primary transition-colors"
            href="https://github.com/changsoo2609"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </a>
          <a className="hover:text-primary transition-colors" href="mailto:changsoo2609@gmail.com">
            이메일
          </a>
        </div>
      </div>
    </footer>
  );
}
