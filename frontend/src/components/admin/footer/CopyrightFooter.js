const CopyrightFooter = () => {
  console.log('footer rerendering....')
    return (
      <div className="copyright-text">
        <p>
          © {new Date().getFullYear()} Beautime by{" "}
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
          >
            Marina Rachlin
          </a>
          . All Right Reserved.
        </p>
      </div>
    );
  };
  
  export default CopyrightFooter;
  