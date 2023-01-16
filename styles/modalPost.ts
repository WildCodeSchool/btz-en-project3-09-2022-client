const styleModalPost: ReactModal.Styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(33, 37, 41, 0.90)",
  },
  content: {
    position: "absolute",
    width: "55%",
    top: "50%",
    left: "50%",
    transform: "translate(-13%, -47%)",
    background: "#E5F1FB",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "10px",
    outline: "none",
    padding: "20px",
  },
};

export default styleModalPost;
