import { useRefresh } from "../../services/context/RefreshContext";

const BtnRefresh = () => {
  const refresh = useRefresh();

  const handleRefreshClick = () => {
    refresh();
  };

  return (
    <button
      onClick={handleRefreshClick}
      type="button"
      className="mb-2 rounded-full bg-purple-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
    >
      Prochaine offre
    </button>
  );
};

export default BtnRefresh;
