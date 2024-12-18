import { useRouter } from "next/router";

const ErrorPage = () => {
  const router = useRouter();
  const { error } = router.query;

  return (
    <div>
      <h1>Authentication Error</h1>
      {error && <p>{error}</p>}
    </div>
  );
};

export default ErrorPage;
