// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      let totalSupply = await store
        .getState()
        .blockchain.smartContract.methods.totalSupply()
        .call();
      // let cost = await store
      //   .getState()
      //   .blockchain.smartContract.methods.cost()
      //   .call();

      dispatch(
        fetchDataSuccess({
          totalSupply,
          // cost,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};


export const fetchTotalSupply = () => {
  return async (dispatch) => {

    // update to config
    const smartContractAddress = "0x5b733f8a3209a2eabbe64eba915eb433ad508e1d";
    
    let totalSupply = 0;
      const web3 = new Web3("https://rinkeby.infura.io/v3/7c18daa2505046499e29c8f240e38258");
      const contract = new web3.eth.Contract(
        MySmartContract,
        smartContractAddress // test chain address
      );
      const _totalSupply = await contract.methods.totalSupply().call();
      totalSupply = _totalSupply;

    dispatch(fetchTotalSupplySuccess({totalSupply: totalSupply}));
  }
}