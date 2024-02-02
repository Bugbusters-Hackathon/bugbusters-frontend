import RefreshIcon from "../../assets/img/icons/refresh-icon.png"; 
import { useState } from "react";
import { getData } from "../../services/api/getData";
import { useRefresh } from "../../services/context/RefreshContext";

const IconRefresh = () => {
    const refresh = useRefresh();

    const handleRefreshClick = () => {
      refresh();
    };

    return (
        <div 
        onClick={handleRefreshClick}
        className="refresh-icon flex bg-purple-700">
           <img src={RefreshIcon} alt="Refresh page" />
        </div>
    );
};

export default IconRefresh;