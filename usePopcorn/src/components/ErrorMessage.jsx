import { usePopcorn } from "../context/PopcornContext";

function ErrorMessage() {
  const { error: message } = usePopcorn();
  return (
    <p className="error">
      <span>❌</span> {message}
    </p>
  );
}

export default ErrorMessage;
