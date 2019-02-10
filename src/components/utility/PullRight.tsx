const PullRight = ({ children }) => (
  <div className="container">
    {children}
    <style jsx>{`
      .container {
        display: flex;
        justify-content: flex-end;
      }
    `}</style>
  </div>
)

export default PullRight
