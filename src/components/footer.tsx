export function Footer() {
  return (
    <footer className="flex items-center justify-between px-8 pt-5 pb-30 font-medium text-12 text-dim-gray-100 md:px-12 md:pt-8 md:pb-12">
      <p>Last upd. October 16 2025</p>
      <p>
        Built with AI - grab the code{' '}
        <a
          className="text-nobel-100 transition-colors hover:text-white"
          href="https://github.com/puspikselis/portfolio"
          rel="noopener noreferrer"
          target="_blank"
        >
          on GitHub
        </a>
      </p>
    </footer>
  );
}
