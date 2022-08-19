import "./loading.css";
import loadingicon from "../../assets/cookingLoading.gif";

function Loading() {
  return (
    <>
    <div className="containerLoading">
        <div>
            <h1 className="h1Loading">Loading...</h1>
        </div>
        <div className="gifLoading">
            <img
                
                src={loadingicon}
                alt="loading icon"
            />
      </div>
    </div>
    </>
  );
}

export default Loading;
